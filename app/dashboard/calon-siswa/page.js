import Link from "next/link";
import { requireRole } from "@/lib/auth";

const LOGO = "/asset/logo.png";
const PHOTO = "/asset/sekolah.jpg";

const CSS = `
body { margin: 0; }
.ds-page, .ds-page * { box-sizing: border-box; }
.ds-page {
  display: flex;
  min-height: 100vh;
  background: #f4f6f4;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: #111;
}

/* Sidebar */
.ds-side {
  position: relative;
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 28px 16px;
  background: #8fcf86;
  overflow: hidden;
}
.ds-side img.ds-logo { width: 64px; height: 64px; object-fit: contain; }
.ds-sideTitle { margin: 0; font-size: 20px; font-weight: 700; color: #fff; text-align: center; }
.ds-sideSub { margin: 0; font-size: 11px; font-weight: 600; color: #fff; text-align: center; }
.ds-nav { display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 8px; position: relative; z-index: 1; }
.ds-nav a {
  display: block; padding: 10px 14px;
  background: #fff; border-radius: 4px; border: 1px solid #dce4dd;
  font-size: 13px; font-weight: 600; color: #111; text-decoration: none;
}
.ds-nav a.active { background: #5fcf4a; color: #fff; border-color: #5fcf4a; }
.ds-nav a:hover { background: #eef5ef; }
.ds-nav a.active:hover { background: #52bd3e; }
.ds-sidePhoto {
  position: absolute; left: 0; right: 0; bottom: 0; height: 220px;
  width: 100%; object-fit: cover; opacity: 0.35;
}

/* Konten */
.ds-main { flex: 1; min-width: 0; padding: 20px 40px 40px; }
.ds-top { display: flex; justify-content: space-between; align-items: center; }
.ds-top img { width: 44px; height: 44px; object-fit: contain; }
.ds-user { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: #333; }
.ds-user svg { flex-shrink: 0; }

.ds-head { text-align: center; margin: 12px 0 28px; }
.ds-head h1 { margin: 0; font-size: 26px; font-weight: 700; }
.ds-head p { margin: 6px 0 0; font-size: 13px; font-weight: 600; }

.ds-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 980px; margin: 0 auto; }
.ds-card {
  background: #fff; border: 1.5px solid #3dae49; border-radius: 10px;
  padding: 20px; display: flex; flex-direction: column; gap: 14px;
}

.ds-fields { display: flex; gap: 12px; }
.ds-field {
  flex: 1; padding: 12px; border: 1px solid #222; border-radius: 4px;
  background: #fff; font-size: 13px; font-weight: 700; text-align: center;
}
.ds-uploads { display: flex; gap: 12px; }
.ds-upload {
  flex: 1; height: 78px; display: flex; align-items: center; justify-content: center;
  border: 1px solid #aaa; border-radius: 4px; background: #f1f1f1;
}

.ds-tes {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 12px; border: 1px solid #222; border-radius: 4px; background: #fff;
  font-size: 14px; font-weight: 700; text-align: center;
}
.ds-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 6px 26px; border: 0; border-radius: 3px;
  background: #3de05a; color: #111;
  font: inherit; font-size: 13px; font-weight: 700; text-decoration: none; cursor: pointer;
}
.ds-btn:hover { background: #2fc84c; }

.ds-center { align-items: center; justify-content: center; text-align: center; }
.ds-center h3 { margin: 0; font-size: 14px; font-weight: 700; }
.ds-notice {
  width: 100%; padding: 16px 12px; border: 1px solid #222; border-radius: 4px;
  font-size: 13px; font-weight: 700; text-align: center;
}

@media (max-width: 900px) {
  .ds-page { flex-direction: column; }
  .ds-side { width: 100%; padding: 20px 16px; }
  .ds-sidePhoto { display: none; }
  .ds-main { padding: 20px 16px 32px; }
  .ds-grid { grid-template-columns: 1fr; }
}
`;

function DownloadIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M6 14a4 4 0 0 1 4-4h8l4 4h12a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V14Z" fill="#111" />
      <path d="M22 17v11m0 0-5-5m5 5 5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function DashboardCalonSiswa() {
  const session = await requireRole(["calon_siswa"]);

  return (
    <main className="ds-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <aside className="ds-side">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ds-logo" src={LOGO} alt="Logo SMA Citra Negara" />
        <div>
          <h2 className="ds-sideTitle">Citra Negara</h2>
          <p className="ds-sideSub">sekolahnya para juara</p>
        </div>

        <nav className="ds-nav">
          <Link href="/dashboard/calon-siswa" className="active">Home</Link>
          <Link href="#">isi bidata</Link>
          <Link href="#">ikuti tes</Link>
          <Link href="#">hasil tes</Link>
          <Link href="#">Pengumuman</Link>
        </nav>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ds-sidePhoto" src={PHOTO} alt="" />
      </aside>

      <section className="ds-main">
        <div className="ds-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="" />
          <div className="ds-user">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            </svg>
            <span>{session.nama}</span>
          </div>
        </div>

        <div className="ds-head">
          <h1>Citra Negara</h1>
          <p>berprestasi, Berkarakter, dan siap kerja</p>
        </div>

        <div className="ds-grid">
          <div className="ds-card">
            <div className="ds-fields">
              <div className="ds-field">Isi tanggal lahir :</div>
              <div className="ds-field">jurusan yang dipilih :</div>
            </div>
            <div className="ds-uploads">
              <div className="ds-upload"><DownloadIcon /></div>
              <div className="ds-upload"><DownloadIcon /></div>
              <div className="ds-upload"><DownloadIcon /></div>
            </div>
          </div>

          <div className="ds-card">
            <div className="ds-tes">
              tes komputer jumat 1/3/2026
              <Link href="#" className="ds-btn">Ikut tes</Link>
            </div>
            <div className="ds-tes">
              tes mtk 9/31/2026
              <Link href="#" className="ds-btn">Ikut tes</Link>
            </div>
          </div>

          <div className="ds-card ds-center">
            <h3>Hasil tes</h3>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="#111" aria-hidden="true">
              <rect x="6" y="8" width="5" height="32" />
              <rect x="15" y="20" width="5" height="20" />
              <rect x="24" y="14" width="5" height="26" />
              <rect x="33" y="26" width="5" height="14" />
              <rect x="6" y="40" width="34" height="3" />
            </svg>
            <Link href="#" className="ds-btn">
              Lihat hasil
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <circle cx="6" cy="6" r="6" fill="#111" />
                <path d="M4 6h4M6.5 4.5 8 6 6.5 7.5" stroke="#3de05a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
          </div>

          <div className="ds-card ds-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
              <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v.6A6.5 6.5 0 0 1 18.5 10.5c0 4.2 1.6 5.7 2.5 6.5H3c.9-.8 2.5-2.3 2.5-6.5a6.5 6.5 0 0 1 5-6.4v-.6A1.5 1.5 0 0 1 12 2Zm-2.5 17h5a2.5 2.5 0 0 1-5 0Z" />
            </svg>
            <div className="ds-notice">Selamat anda telah abc</div>
          </div>
        </div>
      </section>
    </main>
  );
}