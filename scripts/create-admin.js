
import nextEnv from "@next/env";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "spmb_nextjs",
});

const rl = readline.createInterface({ input: stdin, output: stdout });

async function askHidden(question) {
  stdout.write(question);

  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    return rl.question("");
  }

  return new Promise((resolve) => {
    let answer = "";

    const onData = (key) => {
      const char = key.toString();

      if (char === "\u0003") {
        stdin.removeListener("data", onData);
        stdin.setRawMode(false);
        process.exit(1);
      }

      if (char === "\r" || char === "\n") {
        stdin.removeListener("data", onData);
        stdin.setRawMode(false);
        stdin.pause();
        stdout.write("\n");
        resolve(answer);
      } else if (char === "\u007f" || char === "\b") {
        answer = answer.slice(0, -1);
      } else if (char >= " ") {
        answer += char;
      }
    };

    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function main() {
  try {
    if (!process.env.DB_HOST || !process.env.DB_NAME) {
      throw new Error("DB_HOST atau DB_NAME belum diatur di .env");
    }

    const nama = (await rl.question("Nama admin: ")).trim();
    const email = (
      await rl.question("Email admin: ")
    ).trim().toLowerCase();
    const password = await askHidden(
      "Password admin (min. 8 karakter): "
    );

    if (!nama || nama.length > 100) {
      throw new Error("Nama wajib diisi dan maksimal 100 karakter.");
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 100
    ) {
      throw new Error("Format email tidak valid.");
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      throw new Error("Password harus 8–72 byte.");
    }

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      throw new Error("Email sudah terdaftar. Gunakan email lain.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.execute(
      `INSERT INTO users (nama, email, password, role)
       VALUES (?, ?, ?, 'admin')`,
      [nama, email, hashedPassword]
    );

    console.log("\nAkun admin berhasil dibuat!");
    console.log("Nama:", nama);
    console.log("Email:", email);
    console.log("Role: admin");
    console.log("Password tidak ditampilkan.");
  } finally {
    rl.close();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("\nGagal membuat akun:", error.message);
  process.exitCode = 1;
});
