"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lora } from "next/font/google";
import { submitLogin } from "@/lib/login-client";

const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], weight: "400" });

const LOGO = "/asset/logo.png";
const PHOTO = "/asset/sekolah.jpg";

const CSS = `
body { margin: 0; }
.kep-page, .kep-page * { box-sizing: border-box; }
.kep-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #f7f6f0;
  color: #172e24;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
}

.kep-header {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  height: 88px; flex-shrink: 0; padding: 0 72px;
  border-bottom: 1px solid #dce4dd;
}
.kep-brand { display: flex; align-items: center; gap: 14px; }
.kep-brand img { width: 56px; height: 48px; object-fit: contain; }
.kep-brandText { display: flex; flex-direction: column; gap: 4px; }
.kep-brandName { font-size: 20px; font-weight: 700; }
.kep-brandSub { font-size: 12px; color: #69766e; }
.kep-back { font-size: 12px; color: #236644; text-decoration: none; }
.kep-back:hover { text-decoration: underline; }

.kep-content {
  flex: 1; min-height: 0;
  display: flex; align-items: center; gap: 96px;
  padding: 28px 96px;
}

.kep-story {
  width: 616px; flex-shrink: 1; height: 100%; max-height: 640px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 18px;
  justify-content: center;
}
.kep-eyebrow { display: flex; align-items: center; gap: 12px; color: #236644; font-size: 11px; font-weight: 600; }
.kep-accent { width: 32px; height: 2px; background: #236644; }
.kep-headline {
  margin: 0; font-family: var(--serif), serif;
  font-size: 44px; font-weight: 400; line-height: 1.15; color: #123d2b;
}
.kep-lead { margin: 0; max-width: 540px; font-size: 14px; line-height: 1.7; color: #69766e; }

.kep-figure { display: flex; flex-direction: column; gap: 10px; width: 100%; margin: 0; flex: 1; min-height: 110px; }
.kep-figure img { width: 100%; flex: 1; min-height: 0; height: 100%; object-fit: cover; border-radius: 4px; }
.kep-figure figcaption { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #69766e; }
.kep-stamp { font-size: 10px; color: #236644; }

.kep-motto { display: flex; align-items: center; gap: 16px; width: 100%; }
.kep-mottoLine { width: 2px; height: 34px; background: #b7a574; flex-shrink: 0; }
.kep-motto p { margin: 0; font-family: var(--serif), serif; font-size: 19px; font-style: italic; color: #123d2b; }

.kep-panel {
  flex: 1; min-width: 0; max-height: 100%;
  display: flex; flex-direction: column; gap: 18px;
  padding: 28px 32px;
  border: 1px solid #dce4dd; border-radius: 16px; background: #fff;
}
.kep-intro { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.kep-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 12px; border-radius: 100px;
  background: #eef5ef; color: #236644; font-size: 12px; font-weight: 600;
}
.kep-title { margin: 0; font-family: var(--serif), serif; font-size: 30px; font-weight: 400; line-height: 1.2; color: #123d2b; }
.kep-desc { margin: 0; font-size: 13px; line-height: 1.6; color: #69766e; }

.kep-form { display: flex; flex-direction: column; gap: 14px; }
.kep-field { display: flex; flex-direction: column; gap: 8px; }
.kep-label { font-size: 14px; font-weight: 600; }
.kep-input {
  display: flex; align-items: center; gap: 12px;
  height: 48px; padding: 0 16px;
  border: 1px solid #dce4dd; border-radius: 8px; background: #fff;
}
.kep-input:focus-within { border-color: #236644; box-shadow: 0 0 0 3px rgba(35, 102, 68, 0.12); }
.kep-input svg { flex-shrink: 0; }
.kep-input input {
  flex: 1; min-width: 0; border: 0; outline: 0;
  background: transparent; font: inherit; font-size: 14px; color: #172e24;
}
.kep-input input::placeholder { color: #69766e; }
.kep-eye { display: flex; padding: 0; border: 0; background: none; cursor: pointer; }

.kep-options { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.kep-remember { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #69766e; cursor: pointer; }
.kep-remember input { width: 16px; height: 16px; margin: 0; accent-color: #236644; }
.kep-link { font-size: 12px; font-weight: 600; color: #236644; text-decoration: none; }
.kep-link:hover { text-decoration: underline; }

.kep-error { margin: 0; font-size: 13px; color: #b42318; }

.kep-submit {
  display: flex; justify-content: center; align-items: center; gap: 12px;
  height: 48px; border: 0; border-radius: 8px;
  background: #236644; color: #fff;
  font: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
}
.kep-submit:hover { background: #1c5538; }
.kep-secure { display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 11px; color: #69766e; }

.kep-rule { width: 100%; height: 1px; margin: 0; border: 0; background: #dce4dd; }

.kep-help { display: flex; flex-direction: column; gap: 6px; font-size: 12px; line-height: 1.5; color: #69766e; }
.kep-help strong { font-size: 13px; font-weight: 600; color: #172e24; line-height: normal; }
.kep-helpLink { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: #236644; text-decoration: none; }
.kep-helpLink:hover { text-decoration: underline; }

.kep-footer {
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
  flex-shrink: 0; padding: 18px 72px;
  border-top: 1px solid #dce4dd; font-size: 11px; color: #69766e;
}
.kep-privacy { display: inline-flex; align-items: center; gap: 8px; }

/* Layar laptop sedang */
@media (min-width: 1025px) and (max-height: 860px) {
  .kep-header { height: 72px; }
  .kep-brand img { width: 46px; height: 40px; }
  .kep-brandName { font-size: 18px; }
  .kep-content { padding: 18px 96px; }
  .kep-story { gap: 14px; }
  .kep-headline { font-size: 38px; }
  .kep-lead { font-size: 13px; line-height: 1.6; }
  .kep-panel { padding: 22px 28px; gap: 12px; }
  .kep-intro { gap: 10px; }
  .kep-title { font-size: 26px; }
  .kep-form { gap: 10px; }
  .kep-field { gap: 6px; }
  .kep-input, .kep-submit { height: 42px; }
  .kep-help { gap: 4px; }
  .kep-footer { padding: 12px 72px; }
}

/* Layar laptop kecil / pendek */
@media (min-width: 1025px) and (max-height: 700px) {
  .kep-header { height: 60px; }
  .kep-content { padding: 12px 72px; gap: 56px; }
  .kep-headline { font-size: 32px; }
  .kep-lead { display: none; }
  .kep-motto { display: none; }
  .kep-panel { padding: 16px 24px; gap: 10px; }
  .kep-desc, .kep-secure, .kep-rule { display: none; }
  .kep-title { font-size: 24px; }
  .kep-input, .kep-submit { height: 38px; }
  .kep-help span { display: none; }
  .kep-footer { padding: 8px 72px; }
}

@media (max-width: 1200px) {
  .kep-content { gap: 48px; padding-left: 48px; padding-right: 48px; }
  .kep-header { padding: 0 48px; }
  .kep-footer { padding-left: 48px; padding-right: 48px; }
}

/* Tablet & HP: tumpuk ke bawah, boleh scroll */
@media (max-width: 1024px) {
  .kep-page { height: auto; min-height: 100vh; overflow: visible; }
  .kep-content { flex-direction: column; align-items: stretch; gap: 32px; padding: 32px 24px; }
  .kep-story { width: 100%; height: auto; max-height: none; }
  .kep-figure { flex: none; }
  .kep-figure img { flex: none; height: 240px; }
  .kep-panel { max-height: none; padding: 24px; }
  .kep-header { padding: 16px 24px; height: auto; flex-wrap: wrap; }
  .kep-footer { padding: 20px 24px; }
}

@media (max-width: 640px) {
  .kep-headline { font-size: 34px; }
  .kep-title { font-size: 26px; }
  .kep-footer { flex-direction: column; align-items: flex-start; }
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

export default function PrincipalLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [pesan, setPesan] = useState("");

  function handleSubmit(e) {
    submitLogin(e, router, setPesan);
  }

  return (
    <main className={`kep-page ${lora.className}`} style={{ "--serif": lora.style.fontFamily }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="kep-header">
        <div className="kep-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Logo SMA Citra Negara" width={64} height={54} />
          <div className="kep-brandText">
            <span className="kep-brandName">SMA Citra Negara</span>
            <span className="kep-brandSub">Portal manajemen sekolah</span>
          </div>
        </div>
        <Link href="/" className="kep-back">←&nbsp; Kembali ke beranda</Link>
      </header>

      <div className="kep-content">
        <section className="kep-story">
          <div className="kep-eyebrow">
            <span className="kep-accent" />
            <span>KEPEMIMPINAN SEKOLAH</span>
          </div>
          <h1 className="kep-headline">
            Melihat lebih utuh.
            <br />
            Melangkah lebih terarah.
          </h1>
          <p className="kep-lead">
            Ruang akses bagi Kepala Sekolah untuk meninjau perkembangan penerimaan siswa dan mendukung keputusan yang
            bermakna.
          </p>
          <figure className="kep-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="Lingkungan SMA Citra Negara" />
            <figcaption>
              <span>Lingkungan SMA Citra Negara</span>
              <span className="kep-stamp">CITRA NEGARA</span>
            </figcaption>
          </figure>
          <div className="kep-motto">
            <span className="kep-mottoLine" />
            <p>Berprestasi, berkarakter, dan siap kerja.</p>
          </div>
        </section>

        <section className="kep-panel">
          <div className="kep-intro">
            <span className="kep-badge">
              <Icon size={16} color="#1E1E1E">
                <path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333a2.667 2.667 0 0 0-2.666 2.667V14M10.667 4.667a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0Z" />
              </Icon>
              KEPALA SEKOLAH
            </span>
            <h2 className="kep-title">Selamat datang kembali.</h2>
            <p className="kep-desc">Silakan masuk dengan akun Kepala Sekolah yang telah terdaftar.</p>
          </div>

          <form className="kep-form" onSubmit={handleSubmit}>
            <div className="kep-field">
              <label htmlFor="email" className="kep-label">Email Kepala Sekolah</label>
              <div className="kep-input">
                <Icon>
                  <path d="m18.333 5.833-7.492 4.773a1.67 1.67 0 0 1-1.674 0L1.667 5.834M3.333 3.333h13.334c.92 0 1.667.746 1.667 1.667v10c0 .92-.747 1.667-1.667 1.667H3.333c-.92 0-1.667-.747-1.667-1.667V5c0-.92.747-1.667 1.667-1.667Z" />
                </Icon>
                <input id="email" name="email" type="email" placeholder="Masukkan email terdaftar" required />
              </div>
            </div>

            <div className="kep-field">
              <label htmlFor="password" className="kep-label">Kata sandi</label>
              <div className="kep-input">
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
                  className="kep-eye"
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

            <div className="kep-options">
              <label className="kep-remember">
                <input type="checkbox" />
                Ingat perangkat ini
              </label>
              <Link href="#" className="kep-link">Lupa kata sandi?</Link>
            </div>

            {pesan && <p className="kep-error">{pesan}</p>}

            <button type="submit" className="kep-submit">
              Masuk sebagai Kepala Sekolah
              <Icon color="#fff">
                <path d="M4.166 10h11.668M10 15.834 15.834 10 10 4.166" />
              </Icon>
            </button>

            <div className="kep-secure">
              <Icon size={16}>
                <path d="m6 8 1.333 1.333L10 6.667M13.333 8.667c0 3.333-2.333 5-5.106 5.966a.8.8 0 0 1-.447 0C5 13.667 2.667 12 2.667 8.667V4c0-.177.07-.346.195-.471A.667.667 0 0 1 3.333 3.333c1.333 0 3-.8 4.16-1.813a.8.8 0 0 1 1.013 0c1.167 1.02 2.827 1.813 4.16 1.813.177 0 .346.07.471.195.125.125.196.294.196.472v4.667Z" />
              </Icon>
              Akses terbatas untuk pimpinan sekolah
            </div>
          </form>

          <hr className="kep-rule" />

          <div className="kep-help">
            <strong>Memerlukan bantuan akses?</strong>
            <span>Untuk aktivasi akun atau kendala masuk, hubungi administrator sekolah.</span>
            <Link href="#" className="kep-helpLink">
              Hubungi administrator
              <Icon size={14} color="#236644">
                <path d="M9.916 9.916V4.084H4.084M9.916 4.084 4.084 9.916" />
              </Icon>
            </Link>
          </div>
        </section>
      </div>

      <footer className="kep-footer">
        <span>© SMA Citra Negara. Seluruh hak dilindungi.</span>
        <span className="kep-privacy">
          <Icon size={14}>
            <path d="M4.083 5.833v-1.75a2.917 2.917 0 0 1 5.834 0v1.75M7.583 9.333a.583.583 0 1 1-1.166 0 .583.583 0 0 1 1.166 0ZM2.917 5.833h8.166c.644 0 1.167.522 1.167 1.167v4.667c0 .644-.523 1.166-1.167 1.166H2.917a1.167 1.167 0 0 1-1.167-1.166V7c0-.645.523-1.167 1.167-1.167Z" />
          </Icon>
          Jaga kerahasiaan akun dan data sekolah.
        </span>
      </footer>
    </main>
  );
}