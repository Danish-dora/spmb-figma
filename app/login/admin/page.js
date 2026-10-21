"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitLogin } from "@/lib/login-client";

const LOGO = "/asset/logo.png";
const PHOTO = "/asset/sekolah.jpg";

const CSS = `
body { margin: 0; }
.adm-page, .adm-page * { box-sizing: border-box; }
.adm-page {
  display: flex;
  min-height: 100vh;
  background: #fff;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: #172e24;
}
.adm-left {
  width: 650px;
  flex-shrink: 0;
  padding: 42px 72px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}
.adm-brand { display: flex; align-items: center; gap: 14px; }
.adm-brand img { width: 64px; height: 54px; object-fit: contain; }
.adm-brandText { display: flex; flex-direction: column; gap: 5px; }
.adm-brandName { font-size: 20px; font-weight: 700; }
.adm-brandSub { font-size: 12px; color: #69766e; }

.adm-formWrap { display: flex; flex-direction: column; gap: 28px; }
.adm-intro { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.adm-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 12px; border-radius: 100px;
  background: #eef5ef; color: #236644;
  font-size: 12px; font-weight: 600;
}
.adm-title { margin: 0; font-size: 40px; font-weight: 700; line-height: 1.15; }
.adm-desc { margin: 0; font-size: 15px; line-height: 1.65; color: #69766e; }

.adm-form { display: flex; flex-direction: column; gap: 20px; }
.adm-field { display: flex; flex-direction: column; gap: 9px; }
.adm-label { font-size: 14px; font-weight: 600; }
.adm-input {
  display: flex; align-items: center; gap: 12px;
  height: 54px; padding: 0 16px;
  border: 1px solid #dce4dd; border-radius: 8px; background: #fff;
}
.adm-input:focus-within { border-color: #236644; box-shadow: 0 0 0 3px rgba(35, 102, 68, 0.12); }
.adm-input svg { flex-shrink: 0; }
.adm-input input {
  flex: 1; min-width: 0; border: 0; outline: 0;
  background: transparent; font: inherit; font-size: 14px; color: #172e24;
}
.adm-input input::placeholder { color: #69766e; }
.adm-eye { display: flex; padding: 0; border: 0; background: none; cursor: pointer; }

.adm-options { display: flex; justify-content: space-between; align-items: center; }
.adm-remember { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #69766e; cursor: pointer; }
.adm-remember input { width: 16px; height: 16px; margin: 0; accent-color: #236644; }
.adm-link { font-size: 12px; font-weight: 600; color: #236644; text-decoration: none; }
.adm-link:hover { text-decoration: underline; }

.adm-error { margin: 0; font-size: 13px; color: #b42318; }

.adm-submit {
  display: flex; justify-content: center; align-items: center; gap: 12px;
  height: 54px; border: 0; border-radius: 8px;
  background: #236644; color: #fff;
  font: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
}
.adm-submit:hover { background: #1c5538; }
.adm-secure { display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 11px; color: #69766e; }

.adm-help { display: flex; gap: 12px; padding: 18px; border-radius: 8px; background: #f8faf8; }
.adm-help svg { flex-shrink: 0; }
.adm-helpText { display: flex; flex-direction: column; gap: 7px; font-size: 12px; color: #69766e; line-height: 1.5; }
.adm-helpText strong { font-size: 13px; font-weight: 600; color: #172e24; }

.adm-footer { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #69766e; }
.adm-footer a { color: inherit; text-decoration: none; }
.adm-footer span { font-size: 11px; }

.adm-right {
  position: relative; flex: 1; min-height: 100vh; padding: 48px;
  display: flex; flex-direction: column; justify-content: space-between;
  overflow: hidden;
}
.adm-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.adm-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(18, 61, 43, 0.16) 0%, rgba(18, 61, 43, 0.02) 50%, rgba(10, 40, 25, 0.91) 100%);
}
.adm-pill {
  position: relative; align-self: flex-start;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: 100px;
  background: rgba(255, 255, 255, 0.93); color: #236644;
  font-size: 12px; font-weight: 600;
}
.adm-message { position: relative; display: flex; flex-direction: column; gap: 22px; }
.adm-kicker { font-size: 11px; font-weight: 600; color: #c9dcd0; }
.adm-heroTitle { margin: 0; font-size: 42px; font-weight: 600; line-height: 1.18; color: #fff; }
.adm-heroDesc { margin: 0; max-width: 550px; font-size: 15px; line-height: 1.65; color: #c9dcd0; }
.adm-divider { width: 100%; height: 1px; margin: 0; border: 0; background: rgba(255, 255, 255, 0.25); }
.adm-scope { display: flex; flex-wrap: wrap; gap: 28px; margin: 0; padding: 0; list-style: none; }
.adm-scope li { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #fff; }

@media (max-width: 1024px) {
  .adm-page { flex-direction: column; }
  .adm-left { width: 100%; padding: 32px 24px; }
  .adm-right { min-height: 520px; padding: 32px 24px; }
}

@media (min-width: 1025px) and (max-height: 900px) {
  .adm-left { padding: 24px 56px 20px; gap: 16px; }
  .adm-formWrap { gap: 18px; }
  .adm-intro { gap: 10px; }
  .adm-title { font-size: 32px; }
  .adm-desc { font-size: 14px; line-height: 1.5; }
  .adm-form { gap: 14px; }
  .adm-field { gap: 6px; }
  .adm-input { height: 46px; }
  .adm-submit { height: 46px; }
  .adm-help { padding: 12px 14px; }
  .adm-helpText { gap: 4px; }
  .adm-right { padding: 32px; }
  .adm-heroTitle { font-size: 36px; }
  .adm-message { gap: 16px; }
}

@media (min-width: 1025px) and (max-height: 720px) {
  .adm-left { padding: 18px 56px 14px; gap: 10px; }
  .adm-formWrap { gap: 12px; }
  .adm-title { font-size: 28px; }
  .adm-desc { display: none; }
  .adm-input { height: 42px; }
  .adm-submit { height: 42px; }
  .adm-form { gap: 10px; }
  .adm-secure { display: none; }
}
`;

const stroke = { fill: "none", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

function Icon({ size = 20, color = "#69766E", children }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} stroke={color} {...stroke} aria-hidden="true">
      {children}
    </svg>
  );
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [pesan, setPesan] = useState("");

  function handleSubmit(e) {
    submitLogin(e, router, setPesan);
  }

  return (
    <main className="adm-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="adm-left">
        <div className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Logo SMA Citra Negara" width={64} height={54} />
          <div className="adm-brandText">
            <span className="adm-brandName">SMA Citra Negara</span>
            <span className="adm-brandSub">Portal manajemen sekolah</span>
          </div>
        </div>

        <div className="adm-formWrap">
          <div className="adm-intro">
            <span className="adm-badge">
              <Icon size={16} color="#1E1E1E">
                <path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333a2.667 2.667 0 0 0-2.666 2.667V14M10.667 4.667a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0Z" />
              </Icon>
              PORTAL ADMIN
            </span>
            <h1 className="adm-title">
              Selamat datang,
              <br />
              Admin.
            </h1>
            <p className="adm-desc">
              Masuk untuk mengelola pendaftaran, verifikasi data, dan administrasi sekolah dalam satu tempat.
            </p>
          </div>

          <form className="adm-form" onSubmit={handleSubmit}>
            <div className="adm-field">
              <label htmlFor="email" className="adm-label">Email admin</label>
              <div className="adm-input">
                <Icon>
                  <path d="m18.333 5.833-7.492 4.773a1.67 1.67 0 0 1-1.674 0L1.667 5.834M3.333 3.333h13.334c.92 0 1.667.746 1.667 1.667v10c0 .92-.747 1.667-1.667 1.667H3.333c-.92 0-1.667-.747-1.667-1.667V5c0-.92.747-1.667 1.667-1.667Z" />
                </Icon>
                <input id="email" name="email" type="email" placeholder="Masukkan email terdaftar" required />
              </div>
            </div>

            <div className="adm-field">
              <label htmlFor="password" className="adm-label">Kata sandi</label>
              <div className="adm-input">
                <Icon>
                  <path d="M5.833 8.333V5.833a4.167 4.167 0 0 1 8.334 0v2.5M10.833 13.333a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0ZM4.167 8.333h11.666c.92 0 1.667.746 1.667 1.667v6.667c0 .92-.747 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667V10c0-.92.747-1.667 1.667-1.667Z" />
                </Icon>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  required
                />
                <button
                  type="button"
                  className="adm-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  <Icon>
                    <path d="M1.718 9.711a.8.8 0 0 0 0 .58C2.395 11.931 3.543 13.333 5.017 14.32A8.3 8.3 0 0 0 10 15.834a8.3 8.3 0 0 0 4.983-1.514c1.474-.987 2.622-2.39 3.298-4.03a.8.8 0 0 0 0-.58c-.676-1.64-1.824-3.043-3.298-4.03A8.3 8.3 0 0 0 10 4.168a8.3 8.3 0 0 0-4.983 1.514C3.543 6.668 2.395 8.07 1.718 9.711Z" />
                    <circle cx="10" cy="10" r="2.5" />
                  </Icon>
                </button>
              </div>
            </div>

            <div className="adm-options">
              <label className="adm-remember">
                <input type="checkbox" />
                Ingat saya
              </label>
              <Link href="#" className="adm-link">Lupa kata sandi?</Link>
            </div>

            {pesan && <p className="adm-error">{pesan}</p>}

            <button type="submit" className="adm-submit">
              Masuk sebagai Admin
              <Icon color="#fff">
                <path d="M4.166 10h11.668M10 15.834 15.834 10 10 4.166" />
              </Icon>
            </button>

            <div className="adm-secure">
              <Icon size={16}>
                <path d="m6 8 1.333 1.333L10 6.667M13.333 8.667c0 3.333-2.333 5-5.106 5.966a.8.8 0 0 1-.447 0C5 13.667 2.667 12 2.667 8.667V4c0-.177.07-.346.195-.471A.667.667 0 0 1 3.333 3.333c1.333 0 3-.8 4.16-1.813a.8.8 0 0 1 1.013 0c1.167 1.02 2.827 1.813 4.16 1.813.177 0 .346.07.471.195.125.125.196.294.196.472v4.667Z" />
              </Icon>
              Akses aman khusus pengelola sekolah
            </div>
          </form>

          <div className="adm-help">
            <Icon color="#236644">
              <path d="M2.5 9.167H5a1.667 1.667 0 0 1 1.667 1.666v2.5A1.667 1.667 0 0 1 5 15h-.833a1.667 1.667 0 0 1-1.667-1.667V9.167Zm0 0a7.5 7.5 0 1 1 15 0m0 0v4.166m0-4.166H15a1.667 1.667 0 0 0-1.667 1.666v2.5A1.667 1.667 0 0 0 15 15h.833a1.667 1.667 0 0 0 1.667-1.667m0 0V15a3.333 3.333 0 0 1-3.333 3.333H10" />
            </Icon>
            <div className="adm-helpText">
              <strong>Belum memiliki akun admin?</strong>
              <span>Akun diberikan oleh pengelola sistem sekolah.</span>
              <Link href="#" className="adm-link">Hubungi pengelola sistem &nbsp;↗</Link>
            </div>
          </div>
        </div>

        <div className="adm-footer">
          <Link href="/">←&nbsp; Kembali ke beranda</Link>
          <span>© SMA Citra Negara</span>
        </div>
      </section>

      <section className="adm-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="adm-photo" src={PHOTO} alt="" />
        <div className="adm-overlay" />

        <span className="adm-pill">
          <Icon size={16} color="#236644">
            <path d="M9.333 14v-2a1.333 1.333 0 0 0-2.666 0v2M12 3.333V14M2.667 4l4.737-2.526a1.33 1.33 0 0 1 1.192 0L13.333 4M4 7.333 1.653 8.765a.67.67 0 0 0-.32.569v3.333c0 .354.14.693.39.943.25.25.59.39.944.39h10.666c.354 0 .693-.14.943-.39.25-.25.39-.59.39-.943V9.333a.67.67 0 0 0-.32-.568L12 7.333M4 3.333V14M9.333 6a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z" />
          </Icon>
          SMA Citra Negara
        </span>

        <div className="adm-message">
          <span className="adm-kicker">TERTATA. TERHUBUNG. TERKELOLA.</span>
          <h2 className="adm-heroTitle">
            Pendaftaran lebih mudah.
            <br />
            Verifikasi lebih cepat.
          </h2>
          <p className="adm-heroDesc">
            Dukung setiap langkah calon siswa dengan pengelolaan data dan layanan sekolah yang terarah.
          </p>
          <hr className="adm-divider" />
          <ul className="adm-scope">
            {["Data pendaftar", "Verifikasi berkas", "Informasi sekolah"].map((t) => (
              <li key={t}>
                <Icon size={16} color="#C9DCD0">
                  <path d="M13.333 4 6 11.333 2.667 8" />
                </Icon>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}