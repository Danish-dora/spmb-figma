"use client";

import { useState } from "react";

const students = [
  { id: "CN001", name: "Putra Matius", major: "PPLG", status: "Terverifikasi" },
  { id: "CN002", name: "Adam Maulana", major: "TJKT", status: "Terverifikasi" },
  { id: "CN003", name: "Joseph James", major: "DKV", status: "Menunggu" },
  { id: "CN004", name: "Alya Putri", major: "PM", status: "Terverifikasi" },
  { id: "CN005", name: "Davin Pratama", major: "PPLG", status: "Menunggu" },
];

const chartValues = [18, 27, 22, 36, 31, 43, 39, 54, 48, 65, 59, 78];

const majors = [
  { name: "PPLG", percent: 35, color: "#21864b" },
  { name: "TJKT", percent: 25, color: "#72c98b" },
  { name: "DKV", percent: 20, color: "#f1c75b" },
  { name: "PM", percent: 20, color: "#9bb7a0" },
];

function Icon({ name, size = 20 }) {
  const paths = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    school: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function TrendChart() {
  const points = chartValues
    .map((value, index) => `${30 + index * 45},${180 - value * 1.7}`)
    .join(" ");

  const area = `30,180 ${points} 525,180`;

  return (
    <svg
      className="dash-chart"
      viewBox="0 0 560 205"
      role="img"
      aria-label="Grafik tren pendaftaran selama 12 periode"
    >
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="30" y1={y} x2="525" y2={y}
          stroke="#e9efe9" strokeDasharray="4 5" />
      ))}
      <polygon points={area} fill="url(#dashGradient)" />
      <polyline points={points} fill="none" stroke="#21864b"
        strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {chartValues.map((value, index) => (
        <circle
          key={index}
          cx={30 + index * 45}
          cy={180 - value * 1.7}
          r="3.5"
          fill="#21864b"
          stroke="#fff"
          strokeWidth="2"
        />
      ))}
      <defs>
        <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#21864b" stopOpacity=".2" />
          <stop offset="100%" stopColor="#21864b" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.id} ${student.major}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const verified = students.filter(
    (student) => student.status === "Terverifikasi"
  ).length;

  return (
    <main className="dashboard-page">
      <header className="dash-header">
        <div className="dash-heading">
          <span className="dash-eyebrow">ADMINISTRATOR / OVERVIEW</span>
          <h1>Dashboard</h1>
          <p>Selamat datang kembali! Berikut ringkasan penerimaan siswa.</p>
        </div>

        <div className="dash-header-actions">
          <div className="dash-notification-wrap">
            <button
              className="dash-icon-btn"
              aria-label="Lihat notifikasi"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Icon name="bell" />
              <span className="dash-notification-dot" />
            </button>

            {showNotifications && (
              <div className="dash-notification-panel">
                <strong>Notifikasi</strong>
                <p>2 calon siswa masih menunggu verifikasi.</p>
                <p>Data statistik menggunakan data contoh.</p>
              </div>
            )}
          </div>

          <div className="dash-profile">
            <div className="dash-profile-avatar">A</div>
            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <section className="dash-welcome">
        <div className="dash-welcome-content">
          <span className="dash-welcome-tag">
            <Icon name="school" size={15} /> PANEL AKADEMIK
          </span>
          <h2>Kelola masa depan calon juara.</h2>
          <p>
            Pantau pendaftaran, verifikasi berkas, dan pilihan jurusan
            siswa Citra Negara dari satu tempat.
          </p>
          <a href="/admin/verifikasi" className="dash-primary-btn">
            Periksa verifikasi <span>→</span>
          </a>
        </div>
        <div className="dash-welcome-decoration" aria-hidden="true">
          CN
        </div>
      </section>

      <section className="dash-stats" aria-label="Ringkasan pendaftaran">
        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon green"><Icon name="users" /></span>
            <span className="dash-stat-label">Total pendaftar</span>
          </div>
          <strong className="dash-stat-number">128</strong>
          <div className="dash-stat-foot">
            <span className="dash-trend"><Icon name="arrow" size={14} /> 12%</span>
            <span>dibanding periode lalu</span>
          </div>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon mint"><Icon name="check" /></span>
            <span className="dash-stat-label">Terverifikasi</span>
          </div>
          <strong className="dash-stat-number">{verified}</strong>
          <div className="dash-stat-foot">
            <span className="dash-stat-neutral">Data contoh</span>
            <span>dari {students.length} sampel</span>
          </div>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon yellow"><Icon name="clock" /></span>
            <span className="dash-stat-label">Menunggu verifikasi</span>
          </div>
          <strong className="dash-stat-number">
            {students.length - verified}
          </strong>
          <div className="dash-stat-foot">
            <span className="dash-stat-neutral">Perlu diperiksa</span>
          </div>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon blue"><Icon name="chart" /></span>
            <span className="dash-stat-label">Jurusan tersedia</span>
          </div>
          <strong className="dash-stat-number">{majors.length}</strong>
          <div className="dash-stat-foot">
            <span className="dash-stat-neutral">Program keahlian</span>
          </div>
        </article>
      </section>

      <section className="dash-main-grid">
        <article className="dash-panel dash-trend-panel">
          <div className="dash-panel-heading">
            <div>
              <h2>Tren pendaftaran</h2>
              <p>Visualisasi contoh jumlah pendaftar per periode</p>
            </div>
            <span className="dash-chart-badge">12 periode</span>
          </div>
          <div className="dash-chart-area">
            <div className="dash-chart-y-labels">
              <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
            </div>
            <TrendChart />
          </div>
          <div className="dash-chart-x-labels">
            {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </article>

        <article className="dash-panel dash-student-panel">
          <div className="dash-panel-heading">
            <div>
              <h2>Pendaftar terbaru</h2>
              <p>Calon siswa yang tercatat</p>
            </div>
            <span className="dash-count-pill">{students.length} siswa</span>
          </div>

          <label className="dash-search">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Cari nama atau ID siswa..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="dash-student-list">
            {filteredStudents.slice(0, 5).map((student, index) => (
              <button
                key={student.id}
                className="dash-student-row"
                onClick={() => setSelected(student)}
              >
                <span className={`dash-student-avatar avatar-${index % 4}`}>
                  {student.name.charAt(0)}
                </span>
                <span className="dash-student-info">
                  <strong>{student.name}</strong>
                  <small>{student.id} · {student.major}</small>
                </span>
                <span className={`dash-status ${student.status === "Terverifikasi" ? "verified" : "pending"}`}>
                  {student.status}
                </span>
              </button>
            ))}
            {filteredStudents.length === 0 && (
              <p className="dash-no-results">Tidak ada siswa yang cocok.</p>
            )}
          </div>

          <a className="dash-text-link" href="/admin/verifikasi">
            Lihat data verifikasi <span>→</span>
          </a>
        </article>
      </section>

      <section className="dash-panel dash-major-panel">
        <div className="dash-panel-heading">
          <div>
            <h2>Distribusi pilihan jurusan</h2>
            <p>Gambaran persentase peminatan calon siswa</p>
          </div>
          <span className="dash-count-pill">4 jurusan</span>
        </div>

        <div className="dash-major-content">
          <div className="dash-donut-wrap">
            <div className="dash-donut">
              <div className="dash-donut-center">
                <strong>100%</strong>
                <span>Distribusi</span>
              </div>
            </div>
          </div>

          <div className="dash-major-list">
            {majors.map((major) => (
              <div className="dash-major-item" key={major.name}>
                <div className="dash-major-label">
                  <span className="dash-major-dot" style={{ background: major.color }} />
                  <strong>{major.name}</strong>
                  <span>{major.percent}%</span>
                </div>
                <div className="dash-major-track">
                  <span
                    style={{
                      width: `${major.percent}%`,
                      background: major.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <aside className="dash-major-note">
            <span className="dash-major-note-icon"><Icon name="chart" size={22} /></span>
            <h3>Kenali minat siswa</h3>
            <p>Gunakan distribusi ini sebagai gambaran awal untuk perencanaan penerimaan siswa.</p>
          </aside>
        </div>
      </section>

      <footer className="dash-footer">
        <span>© {new Date().getFullYear()} Citra Negara</span>
        <span>Dashboard Administrasi Akademik</span>
      </footer>

      {selected && (
        <div className="dash-modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="dash-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dash-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="dash-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Tutup detail"
            >
              ×
            </button>
            <span className="dash-modal-avatar">
              {selected.name.charAt(0)}
            </span>
            <span className="dash-eyebrow">DETAIL CALON SISWA</span>
            <h2 id="dash-modal-title">{selected.name}</h2>
            <p className="dash-modal-id">{selected.id}</p>
            <div className="dash-modal-details">
              <div><span>Pilihan jurusan</span><strong>{selected.major}</strong></div>
              <div><span>Status verifikasi</span><strong>{selected.status}</strong></div>
            </div>
            <button
              className="dash-primary-btn dash-modal-button"
              onClick={() => setSelected(null)}
            >
              Tutup detail
            </button>
          </section>
        </div>
      )}
    </main>
  );
}