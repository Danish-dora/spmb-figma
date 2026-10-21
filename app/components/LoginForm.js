"use client";

import Link from "next/link";

const roles = [
  { key: "principal", label: "Kepala Sekolah" },
  { key: "student", label: "Siswa" },
  { key: "admin", label: "Admin" },
];

export default function LoginForm({ role }) {
  const current = roles.find((r) => r.key === role);

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Login sebagai ${current.label} berhasil (contoh tampilan)`);
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Login {current.label}</h1>
        <p className="auth-sub">SMK Citra Negara Depok</p>

        <label className="auth-label" htmlFor="username">
          Username
        </label>
        <input id="username" className="auth-input" type="text" required />

        <label className="auth-label" htmlFor="password">
          Password
        </label>
        <input id="password" className="auth-input" type="password" required />

        <button type="submit" className="auth-button">
          Masuk
        </button>

        <div className="auth-links">
          {roles
            .filter((r) => r.key !== role)
            .map((r) => (
              <Link key={r.key} href={`/login/${r.key}`}>
                Login {r.label}
              </Link>
            ))}
        </div>

        <Link href="/register" className="auth-back">
          Belum punya akun? Daftar
        </Link>
      </form>
    </main>
  );
}