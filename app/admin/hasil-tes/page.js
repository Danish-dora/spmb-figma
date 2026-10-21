"use client";

import { useMemo, useState } from "react";

const PASSING_GRADE = 80;

const dataTes = {
  awal: [],
  lanjutan: [
    { id: 1, nama: "Davin", tes: "Tes lanjutan", mapel: "Aljabar Matematika", nilai: 89 },
    { id: 2, nama: "Alya", tes: "Tes lanjutan", mapel: "Aljabar Matematika", nilai: 92 },
    { id: 3, nama: "Raka", tes: "Tes lanjutan", mapel: "Aljabar Matematika", nilai: 76 },
  ],
};

export default function HasilTesPage() {
  const [activeTab, setActiveTab] = useState("lanjutan");
  const [keyword, setKeyword] = useState("");

  const hasil = useMemo(() => {
    return dataTes[activeTab].filter((item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase().trim())
    );
  }, [activeTab, keyword]);

  const rataRata = hasil.length
    ? hasil.reduce((total, item) => total + item.nilai, 0) / hasil.length
    : 0;

  const nilaiTertinggi = hasil.length
    ? Math.max(...hasil.map((item) => item.nilai))
    : 0;

  return (
    <div className="ht-page">
      <header className="ht-header">
        <div>
          <p className="ht-eyebrow">ADMINISTRATOR / AKADEMIK</p>
          <h1>Hasil Tes</h1>
          <p className="ht-subtitle">
            Pantau hasil seleksi dan pencapaian calon siswa.
          </p>
        </div>

        <div className="ht-user">
          <div className="ht-user-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
          <div className="ht-avatar-dark">A</div>
        </div>
      </header>

      <section className="ht-stats">
        <article className="ht-stat-card">
          <div className="ht-stat-top">
            <span>Jumlah casis</span>
            <span className="ht-stat-icon ht-icon-green">▤</span>
          </div>
          <div className="ht-stat-bottom">
            <strong>{hasil.length}</strong>
            <span>Data ditemukan</span>
          </div>
        </article>

        <article className="ht-stat-card">
          <div className="ht-stat-top">
            <span>Rata-rata nilai</span>
            <span className="ht-stat-icon ht-icon-yellow">▥</span>
          </div>
          <div className="ht-stat-bottom">
            <strong>
              {rataRata.toLocaleString("id-ID", {
                maximumFractionDigits: 1,
              })}
            </strong>
          </div>
          <p className="ht-stat-note">Dari hasil pencarian</p>
        </article>

        <article className="ht-stat-card">
          <div className="ht-stat-top">
            <span>Nilai tertinggi</span>
            <span className="ht-stat-icon ht-icon-orange">⌁</span>
          </div>
          <div className="ht-stat-bottom">
            <strong>{nilaiTertinggi}</strong>
            <span>Nilai maksimal</span>
          </div>
        </article>
      </section>

      <section className="ht-list-section">
        <div className="ht-section-heading">
          <div>
            <h2>Daftar peserta tes</h2>
            <p>Pilih jenis tes untuk melihat hasil peserta.</p>
          </div>
          <span className="ht-count">{hasil.length} peserta</span>
        </div>

        <div className="ht-toolbar">
          <div className="ht-tabs" role="tablist" aria-label="Jenis tes">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "awal"}
              className={`ht-tab ${activeTab === "awal" ? "active" : ""}`}
              onClick={() => setActiveTab("awal")}
            >
              Tes awal
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "lanjutan"}
              className={`ht-tab ${activeTab === "lanjutan" ? "active" : ""}`}
              onClick={() => setActiveTab("lanjutan")}
            >
              Tes lanjutan
            </button>
          </div>

          <label className="ht-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              placeholder="Cari nama casis..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </label>
        </div>

        <div className="ht-results" aria-live="polite">
          {hasil.length === 0 ? (
            <div className="ht-empty">
              <div className="ht-empty-icon">⌕</div>
              <h3>Belum ada hasil tes</h3>
              <p>
                {keyword
                  ? "Nama peserta tidak ditemukan. Coba kata kunci lain."
                  : "Belum ada peserta pada kategori tes ini."}
              </p>
            </div>
          ) : (
            hasil.map((item) => {
              const lulus = item.nilai >= PASSING_GRADE;

              return (
                <article className="ht-result-card" key={item.id}>
                  <div className="ht-avatar-soft">
                    {item.nama.charAt(0).toUpperCase()}
                  </div>

                  <div className="ht-person">
                    <h3>{item.nama}</h3>
                    <p>{item.tes}</p>
                  </div>

                  <div className="ht-subject">
                    <span>Mata pelajaran</span>
                    <strong>{item.mapel}</strong>
                  </div>

                  <div className="ht-score">
                    <div className="ht-score-heading">
                      <span>Nilai</span>
                      <strong>{item.nilai}</strong>
                    </div>
                    <div
                      className="ht-progress"
                      role="progressbar"
                      aria-label={`Nilai ${item.nama}`}
                      aria-valuenow={item.nilai}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span
                        className={lulus ? "passed" : "review"}
                        style={{ width: `${item.nilai}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`ht-status ${
                      lulus ? "ht-status-passed" : "ht-status-review"
                    }`}
                  >
                    {lulus ? "Lulus" : "Perlu ditinjau"}
                  </span>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}