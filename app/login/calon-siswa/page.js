"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitLogin } from "../../../lib/login-client.js";



const LOGO = "/asset/logo.png";
const EMAIL_ICON = "/icon/email.jpg";
const PHOTO = "/asset/sekolah.jpg";

const CSS = `
body { margin: 0; }
.stu-page, .stu-page * { box-sizing: border-box; }
.stu-page {
  display: flex;
  height: 100vh;
  height: 100dvh;
  background: #fff;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: #172e24;
  overflow: hidden;
}

/* Panel kiri */
.stu-panel {
  width: 650px;
  flex-shrink: 0;
  height: 100%;
  padding: 32px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
}

.stu-hero { display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
.stu-hero img { width: 130px; height: auto; max-height: 110px; object-fit: contain; }
.stu-heroCopy { display: flex; flex-direction: column; gap: 8px; }
.stu-title { margin: 0; font-size: 36px; font-weight: 700; line-height: 1.15; }
.stu-subtitle { margin: 0; font-size: 15px; line-height: 1.6; color: #69766e; }

.stu-form { display: flex; flex-direction: column; gap: 18px; }
.stu-field {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 54px;
  padding: 0 16px;
  border: 1px solid #dce4dd;
  border-radius: 8px;
  background: #fff;
  cursor: text;
}
.stu-field:focus-within { border-color: #236644; box-shadow: 0 0 0 3px rgba(35, 102, 68, 0.12); }
.stu-field img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; }
.stu-lockIcon { display: flex; flex-shrink: 0; }
.stu-lockIcon svg { width: 28px; height: 28px; }
.stu-field input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: 14px;
  color: #172e24;
}
.stu-field input::placeholder { color: #69766e; }

.stu-error { margin: 0; font-size: 13px; color: #b42318; }

.stu-actions { display: flex; flex-direction: column; align-items: stretch; gap: 14px; margin-top: 6px; }
.stu-login {
  height: 54px;
  border: 0;
  border-radius: 8px;
  background: #236644;
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.stu-login:hover { background: #1c5538; }
.stu-or { margin: 0; text-align: center; font-size: 12px; color: #69766e; }
.stu-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  border: 1px solid #236644;
  border-radius: 8px;
  background: #fff;
  color: #236644;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}
.stu-register:hover { background: #eef5ef; }

/* Panel kanan (foto) */
.stu-visual { position: relative; flex: 1; height: 100%; overflow: hidden; }
.stu-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.stu-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 61, 43, 0.16) 0%, rgba(18, 61, 43, 0.02) 50%, rgba(10, 40, 25, 0.6) 100%);
}

/* Layar pendek: kecilkan supaya muat satu layar */
@media (min-width: 1025px) and (max-height: 850px) {
  .stu-panel { padding: 24px 64px; gap: 26px; }
  .stu-hero { gap: 14px; }
  .stu-hero img { width: 104px; max-height: 88px; }
  .stu-title { font-size: 30px; }
  .stu-subtitle { font-size: 14px; }
  .stu-form { gap: 14px; }
  .stu-field, .stu-login, .stu-register { height: 48px; }
  .stu-actions { gap: 10px; }
}
@media (min-width: 1025px) and (max-height: 680px) {
  .stu-panel { padding: 16px 64px; gap: 16px; }
  .stu-hero { gap: 8px; }
  .stu-hero img { width: 80px; max-height: 68px; }
  .stu-title { font-size: 26px; }
  .stu-subtitle { font-size: 13px; }
  .stu-form { gap: 10px; }
  .stu-field, .stu-login, .stu-register { height: 42px; }
  .stu-actions { gap: 8px; margin-top: 2px; }
}

/* Tablet & HP: tumpuk ke bawah dan boleh scroll */
@media (max-width: 1024px) {
  .stu-page { flex-direction: column; height: auto; min-height: 100vh; overflow: visible; }
  .stu-panel { width: 100%; height: auto; padding: 40px 24px; }
  .stu-visual { height: 320px; flex: none; }
}
`;

export default function StudentLoginPage() {
  const router = useRouter();
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e) => {
    submitLogin(e, router, setPesan);
  };

  return (
    <main className="stu-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="stu-panel">
        <div className="stu-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Logo SMA Citra Negara" width={150} height={126} />

          <div className="stu-heroCopy">
            <h1 className="stu-title">Selamat datang</h1>
            <p className="stu-subtitle">
              Silahkan login untuk mengakses layanan sekolah
            </p>
          </div>
        </div>

        <form className="stu-form" onSubmit={handleSubmit}>
          <label className="stu-field">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EMAIL_ICON} alt="" width={32} height={32} />
            <input type="email" name="email" placeholder="Email" required />
          </label>

          <label className="stu-field">
            <span className="stu-lockIcon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9.333 14.667V9.333a6.667 6.667 0 0 1 13.334 0v5.334M6.667 14.667h18.666c1.473 0 2.667 1.194 2.667 2.666v9.334c0 1.473-1.194 2.667-2.667 2.667H6.667A2.667 2.667 0 0 1 4 26.667v-9.334c0-1.472 1.194-2.666 2.667-2.666Z"
                  stroke="#3DA449"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input type="password" name="password" placeholder="Password" required />
          </label>

          {pesan && <p className="stu-error">{pesan}</p>}

          <div className="stu-actions">
            <button type="submit" className="stu-login">
              Masuk
            </button>

            <p className="stu-or">Jika belum punya akun</p>

            <Link href="/register" className="stu-register">
              Daftar akun
            </Link>
          </div>
        </form>
      </section>

      <section className="stu-visual">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO} alt="" className="stu-photo" />
        <div className="stu-overlay" />
      </section>
    </main>
  );
}