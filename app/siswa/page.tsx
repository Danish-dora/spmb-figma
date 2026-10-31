import Link from "next/link";
import SidebarSiswa from "../components/SidebarSiswa";
import HeaderSiswa from "../components/HeaderSiswa";
import "../components/siswa.css";

const hasilTerbaru = {
  mataPelajaran: "Tes Matematika",
  tanggal: "Belum ada jadwal",
  nilai: null,
};

const jadwal = [
  {
    nama: "Tes Komputer",
    tanggal: "Menunggu jadwal resmi",
    icon: "▣",
  },
  {
    nama: "Tes Matematika",
    tanggal: "Menunggu jadwal resmi",
    icon: "∑",
  },
  {
    nama: "Tes Bahasa Indonesia",
    tanggal: "Menunggu jadwal resmi",
    icon: "Aa",
  },
];

const pengumuman = [
  {
    kategori: "Informasi Sekolah",
    judul: "Selamat datang di portal siswa!",
    deskripsi:
      "Lengkapi biodata dan periksa informasi tes secara berkala melalui dashboard ini.",
    tanggal: "Informasi terbaru",
  },
];

function Ikon({ children }) {
  return <span className="siswa-card-icon">{children}</span>;
}

export default function DashboardSiswa() {
  return (
    <div className="siswa-app">
      <SidebarSiswa />

      <main className="siswa-main">
        <HeaderSiswa />

        <div className="siswa-content">
          <section className="siswa-welcome">
            <div className="siswa-welcome-copy">
              <span className="siswa-eyebrow">
                DASHBOARD SISWA
              </span>

              <h1>
                Selamat Datang, <span>Siswa!</span>
              </h1>

              <p>
                Langkah awal menuju masa depan yang lebih cerah
                dimulai dari sini.
              </p>
            </div>

            <div
              className="siswa-welcome-symbol"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M8 32 50 12l42 20-42 21L8 32Z"
                  fill="currentColor"
                />
                <path
                  d="M25 42v22c15 12 35 12 50 0V42L50 55 25 42Z"
                  fill="currentColor"
                  opacity=".75"
                />
                <path
                  d="M91 35v28"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="91" cy="68" r="5" fill="currentColor" />
              </svg>
            </div>

            <div className="siswa-welcome-decoration" />
          </section>

          <section className="siswa-quick-actions">
            <Link
              href="/siswa/isi-biodata"
              className="siswa-quick-card"
            >
              <Ikon>♙</Ikon>
              <span className="siswa-quick-copy">
                <strong>Lengkapi Biodata</strong>
                <small>Perbarui data diri kamu</small>
              </span>
              <span className="siswa-quick-arrow">↗</span>
            </Link>

            <Link
              href="/siswa/ikuti-tes"
              className="siswa-quick-card"
            >
              <Ikon>▤</Ikon>
              <span className="siswa-quick-copy">
                <strong>Ikuti Tes</strong>
                <small>Lihat jadwal dan informasi tes</small>
              </span>
              <span className="siswa-quick-arrow">↗</span>
            </Link>

            <Link
              href="/siswa/hasil-tes"
              className="siswa-quick-card"
            >
              <Ikon>▥</Ikon>
              <span className="siswa-quick-copy">
                <strong>Hasil Tes</strong>
                <small>Pantau hasil seleksi kamu</small>
              </span>
              <span className="siswa-quick-arrow">↗</span>
            </Link>

            <Link
              href="/siswa/pengumuman"
              className="siswa-quick-card"
            >
              <Ikon>♧</Ikon>
              <span className="siswa-quick-copy">
                <strong>Pengumuman</strong>
                <small>Informasi terbaru sekolah</small>
              </span>
              <span className="siswa-quick-arrow">↗</span>
            </Link>
          </section>

          <div className="siswa-dashboard-grid">
            <section className="siswa-panel siswa-result-panel">
              <div className="siswa-panel-heading">
                <div>
                  <span className="siswa-section-kicker">
                    PERKEMBANGAN SELEKSI
                  </span>
                  <h2>Hasil Tes Terbaru</h2>
                </div>

                <Link href="/siswa/hasil-tes">
                  Lihat semua <span>→</span>
                </Link>
              </div>

              <div className="siswa-result-body">
                <div className="siswa-result-illustration">
                  <div className="siswa-result-circle">
                    <span>✓</span>
                  </div>
                  <span className="siswa-result-spark">✦</span>
                </div>

                <div className="siswa-result-info">
                  <span className="siswa-status-pill">
                    {hasilTerbaru.nilai === null
                      ? "Menunggu hasil"
                      : "Hasil tersedia"}
                  </span>

                  <h3>{hasilTerbaru.mataPelajaran}</h3>
                  <p>{hasilTerbaru.tanggal}</p>

                  <p className="siswa-muted">
                    Hasil akan ditampilkan setelah tersedia.
                  </p>

                  <Link
                    className="siswa-primary-button"
                    href="/siswa/hasil-tes"
                  >
                    Lihat hasil tes <span>→</span>
                  </Link>
                </div>
              </div>
            </section>

            <section className="siswa-panel siswa-schedule-panel">
              <div className="siswa-panel-heading">
                <div>
                  <span className="siswa-section-kicker">
                    PERSIAPAN SELEKSI
                  </span>
                  <h2>Jadwal Tes</h2>
                </div>

                <Link href="/siswa/ikuti-tes">
                  Lihat semua <span>→</span>
                </Link>
              </div>

              <div className="siswa-schedule-list">
                {jadwal.map((item, index) => (
                  <div
                    className="siswa-schedule-item"
                    key={item.nama}
                  >
                    <div className="siswa-schedule-icon">
                      {item.icon}
                    </div>

                    <div className="siswa-schedule-info">
                      <strong>{item.nama}</strong>
                      <span>{item.tanggal}</span>
                    </div>

                    <span className="siswa-schedule-number">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                className="siswa-text-link"
                href="/siswa/ikuti-tes"
              >
                Periksa informasi tes <span>→</span>
              </Link>
            </section>

            <section className="siswa-panel siswa-announcement-panel">
              <div className="siswa-panel-heading">
                <div>
                  <span className="siswa-section-kicker">
                    INFORMASI TERKINI
                  </span>
                  <h2>Pengumuman Terbaru</h2>
                </div>

                <Link href="/siswa/pengumuman">
                  Lihat semua <span>→</span>
                </Link>
              </div>

              <div className="siswa-announcement-list">
                {pengumuman.map((item) => (
                  <article
                    className="siswa-announcement-item"
                    key={item.judul}
                  >
                    <div className="siswa-announcement-icon">
                      ✦
                    </div>

                    <div className="siswa-announcement-copy">
                      <span className="siswa-announcement-category">
                        {item.kategori}
                      </span>

                      <h3>{item.judul}</h3>
                      <p>{item.deskripsi}</p>

                      <span className="siswa-announcement-date">
                        {item.tanggal}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="siswa-motivation">
              <div className="siswa-motivation-icon">✦</div>

              <div>
                <span>LANGKAH KECIL, MASA DEPAN BESAR</span>
                <h2>Terus Belajar &amp; Berusaha!</h2>
                <p>
                  Persiapkan dirimu dan raih kesempatan terbaik
                  bersama Citra Negara.
                </p>
              </div>

              <div className="siswa-motivation-star">✧</div>
            </section>
          </div>

          <footer className="siswa-footer">
            <span>© {new Date().getFullYear()} Citra Negara</span>
            <span>Semangat meraih masa depan.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}