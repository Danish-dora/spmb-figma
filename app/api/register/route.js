import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const nama = body.nama?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (
      !nama ||
      !email ||
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return Response.json(
        { message: "Nama, email, dan password (min. 8 karakter) wajib diisi." },
        { status: 400 }
      );
    }

    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return Response.json(
        { message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // role dikunci di server, TIDAK diambil dari body
    await pool.execute(
      `INSERT INTO users (nama, email, password, role)
       VALUES (?, ?, ?, 'calon_siswa')`,
      [nama, email, hashedPassword]
    );

    return Response.json(
      { message: "Registrasi berhasil." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return Response.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}