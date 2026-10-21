import Link from "next/link";

const logos = [
  { src: "/logo-1.png", alt: "Logo jurusan 1", top: "11%", left: "4%", width: 54 },
  { src: "/logo-dkv.png", alt: "Logo DKV", top: "6%", left: "24%", width: 52 },
  { src: "/logo-3.png", alt: "Logo jurusan 3", top: "6%", left: "53%", width: 46 },
  { src: "/logo-4.png", alt: "Logo SMK Citra Negara", top: "11%", left: "79%", width: 50 },
];

export default function LandingPage() {
  return (
    <main className="lp-page">
      <section className="lp-hero">
        <div className="lp-left">
          <p className="lp-text">
            SMK Citra Negara Depok adalah sekolah kejuruan yang menyiapkan siswa
            siap kerja lewat program keahlian seperti Multimedia/DKV, Teknik
            Komputer &amp; Jaringan (TKJ), dan Bisnis Daring Pemasaran, dengan
            fasilitas dan pembelajaran yang mendukung skill digital masa kini.
          </p>

          <p className="lp-text">
            Yuk gabung jadi bagian dari SMK Citra Negara — wujudkan masa depanmu
            di CITRA NEGARA
          </p>

          <Link href="/daftar" className="lp-button">
            <span>daftar</span>
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden="true">
              <path
                d="M0 8h22M15 1l7 7-7 7"
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="lp-right">
          <svg className="lp-lines" viewBox="0 0 440 330" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="80" x2="260" y2="190" stroke="#1de9b6" strokeWidth="2" />
            <line x1="60" y1="25" x2="330" y2="250" stroke="#1de9b6" strokeWidth="2" />
            <line x1="85" y1="25" x2="215" y2="25" stroke="#111" strokeWidth="2" />
            <line x1="215" y1="25" x2="372" y2="180" stroke="#1de9b6" strokeWidth="2" />
            <line x1="85" y1="290" x2="370" y2="120" stroke="#1de9b6" strokeWidth="2" />
            <line x1="260" y1="190" x2="400" y2="130" stroke="#111" strokeWidth="2" />
          </svg>

          {logos.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={l.src}
              src={l.src}
              alt={l.alt}
              className="lp-logo"
              style={{ top: l.top, left: l.left, width: l.width }}
            />
          ))}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/siswi.png" alt="Siswi membawa laptop" className="lp-siswi" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/siswa.png" alt="Siswa membawa mesin kasir" className="lp-siswa" />
        </div>
      </section>
    </main>
  );
}