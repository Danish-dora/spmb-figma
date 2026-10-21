"use client";

import { useMemo, useState } from "react";

const initialAnnouncements = [
  {
    id: 1,
    judul: "Jadwal Tes Seleksi",
    isi: "Silakan mempersiapkan diri untuk mengikuti tes seleksi sesuai jadwal yang telah ditentukan.",
    target: "Semua siswa",
    tanggal: "2026-10-21",
    status: "published",
  },
  {
    id: 2,
    judul: "Persiapan Berkas Pendaftaran",
    isi: "Pastikan seluruh berkas pendaftaran telah lengkap dan sesuai persyaratan.",
    target: "Semua siswa",
    tanggal: "2026-10-21",
    status: "pending",
  },
  {
    id: 3,
    judul: "Informasi Kegiatan Sekolah",
    isi: "Informasi kegiatan sekolah akan disampaikan setelah mendapatkan persetujuan.",
    target: "Semua siswa",
    tanggal: "2026-10-20",
    status: "draft",
  },
];

const statusConfig = {
  draft: { label: "Draft", className: "pg-status-draft" },
  pending: {
    label: "Menunggu persetujuan",
    className: "pg-status-pending",
  },
  published: { label: "Diterbitkan", className: "pg-status-published" },
  rejected: { label: "Perlu revisi", className: "pg-status-rejected" },
};

const emptyForm = {
  judul: "",
  isi: "",
  target: "Semua siswa",
};

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PengumumanPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [activeFilter, setActiveFilter] = useState("semua");
  const [keyword, setKeyword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesFilter =
        activeFilter === "semua" || item.status === activeFilter;
      const matchesKeyword =
        `${item.judul} ${item.isi}`
          .toLowerCase()
          .includes(keyword.toLowerCase().trim());

      return matchesFilter && matchesKeyword;
    });
  }, [announcements, activeFilter, keyword]);

  const counts = {
    semua: announcements.length,
    draft: announcements.filter((item) => item.status === "draft").length,
    pending: announcements.filter((item) => item.status === "pending").length,
    published: announcements.filter((item) => item.status === "published")
      .length,
  };

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
    setNotice("");
  }

  function openEdit(item) {
    setForm({
      judul: item.judul,
      isi: item.isi,
      target: item.target,
    });
    setEditingId(item.id);
    setModalOpen(true);
    setNotice("");
  }

  function saveAnnouncement(event) {
    event.preventDefault();

    const today = new Date().toISOString().slice(0, 10);

    if (editingId) {
      setAnnouncements((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                status: "draft",
                tanggal: today,
              }
            : item
        )
      );
      setNotice("Perubahan disimpan sebagai draft.");
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
        tanggal: today,
        status: "draft",
      };

      setAnnouncements((previous) => [newItem, ...previous]);
      setNotice("Pengumuman berhasil dibuat sebagai draft.");
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function submitForApproval(id) {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "pending" } : item
      )
    );
    setDetail(null);
    setNotice("Pengumuman masuk ke status Menunggu Persetujuan.");
  }

  function publishAnnouncement(id) {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "published" } : item
      )
    );
    setDetail(null);
    setNotice("Pengumuman ditandai sebagai diterbitkan.");
  }

  function rejectAnnouncement(id) {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
    setDetail(null);
    setNotice("Pengumuman dikembalikan untuk direvisi.");
  }

  function deleteAnnouncement(id) {
    if (!window.confirm("Yakin ingin menghapus pengumuman ini?")) return;

    setAnnouncements((previous) =>
      previous.filter((item) => item.id !== id)
    );
    setDetail(null);
    setNotice("Pengumuman berhasil dihapus.");
  }

  return (
    <div className="pg-page">
      <header className="pg-header">
        <div>
          <div className="pg-eyebrow">ADMINISTRATOR / INFORMASI</div>
          <h1>Pengumuman</h1>
          <p>Kelola informasi sekolah dan ajukan pengumuman untuk persetujuan kepala sekolah.</p>
        </div>

        <button className="pg-primary-btn" onClick={openCreate}>
          <span>＋</span> Buat pengumuman
        </button>
      </header>

      {notice && (
        <div className="pg-notice" role="status">
          <span>✓</span>
          {notice}
          <button aria-label="Tutup notifikasi" onClick={() => setNotice("")}>
            ×
          </button>
        </div>
      )}

      <section className="pg-stats">
        <article className="pg-stat-card">
          <div className="pg-stat-icon pg-green-icon">▤</div>
          <p>Total pengumuman</p>
          <strong>{counts.semua}</strong>
          <span>Seluruh informasi</span>
        </article>

        <article className="pg-stat-card">
          <div className="pg-stat-icon pg-yellow-icon">◷</div>
          <p>Menunggu persetujuan</p>
          <strong>{counts.pending}</strong>
          <span>Menunggu kepala sekolah</span>
        </article>

        <article className="pg-stat-card">
          <div className="pg-stat-icon pg-blue-icon">✓</div>
          <p>Sudah diterbitkan</p>
          <strong>{counts.published}</strong>
          <span>Pengumuman aktif</span>
        </article>
      </section>

      <section className="pg-content">
        <div className="pg-content-heading">
          <div>
            <h2>Daftar pengumuman</h2>
            <p>Lihat status dan kelola pengumuman sekolah.</p>
          </div>
          <span className="pg-total-pill">
            {filteredAnnouncements.length} pengumuman
          </span>
        </div>

        <div className="pg-toolbar">
          <div className="pg-filters" aria-label="Filter pengumuman">
            {[
              ["semua", "Semua"],
              ["draft", "Draft"],
              ["pending", "Menunggu persetujuan"],
              ["published", "Diterbitkan"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`pg-filter ${activeFilter === value ? "active" : ""}`}
                onClick={() => setActiveFilter(value)}
              >
                {label}
                <span>{counts[value]}</span>
              </button>
            ))}
          </div>

          <label className="pg-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              placeholder="Cari pengumuman..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </label>
        </div>

        <div className="pg-list">
          {filteredAnnouncements.length === 0 ? (
            <div className="pg-empty">
              <div>▤</div>
              <h3>Pengumuman tidak ditemukan</h3>
              <p>Coba ubah pencarian atau pilih kategori lainnya.</p>
              <button className="pg-secondary-btn" onClick={openCreate}>
                Buat pengumuman baru
              </button>
            </div>
          ) : (
            filteredAnnouncements.map((item) => {
              const status = statusConfig[item.status];

              return (
                <article className="pg-announcement-card" key={item.id}>
                  <div className="pg-document-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                      <path d="M14 3v6h5M9 13h6M9 17h6" />
                    </svg>
                  </div>

                  <div className="pg-announcement-info">
                    <div className="pg-card-meta">
                      <span>{formatDate(item.tanggal)}</span>
                      <span className={`pg-status ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <h3>{item.judul}</h3>
                    <p className="pg-description">{item.isi}</p>
                    <p className="pg-target">
                      <span>◎</span> Penerima: {item.target}
                    </p>
                  </div>

                  <div className="pg-card-actions">
                    <button
                      className="pg-detail-btn"
                      onClick={() => setDetail(item)}
                    >
                      Lihat detail
                    </button>

                    {item.status === "draft" ||
                    item.status === "rejected" ? (
                      <>
                        <button
                          className="pg-edit-btn"
                          onClick={() => openEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="pg-submit-btn"
                          onClick={() => submitForApproval(item.id)}
                        >
                          Ajukan persetujuan
                        </button>
                      </>
                    ) : item.status === "pending" ? (
                      <span className="pg-waiting-note">
                        <span>◷</span> Menunggu kepala sekolah
                      </span>
                    ) : (
                      <span className="pg-live-note">
                        <span>✓</span> Aktif
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {modalOpen && (
        <div
          className="pg-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section
            className="pg-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pg-modal-title"
          >
            <div className="pg-modal-heading">
              <div>
                <span className="pg-modal-icon">✎</span>
                <h2 id="pg-modal-title">
                  {editingId ? "Edit pengumuman" : "Buat pengumuman"}
                </h2>
                <p>Tulis informasi yang akan disampaikan kepada siswa.</p>
              </div>
              <button
                className="pg-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveAnnouncement} className="pg-form">
              <label>
                Judul pengumuman
                <input
                  required
                  maxLength={120}
                  placeholder="Contoh: Jadwal tes seleksi"
                  value={form.judul}
                  onChange={(event) =>
                    setForm({ ...form, judul: event.target.value })
                  }
                />
              </label>

              <label>
                Isi pengumuman
                <textarea
                  required
                  rows={5}
                  maxLength={3000}
                  placeholder="Tuliskan informasi pengumuman secara jelas..."
                  value={form.isi}
                  onChange={(event) =>
                    setForm({ ...form, isi: event.target.value })
                  }
                />
              </label>

              <label>
                Penerima pengumuman
                <select
                  value={form.target}
                  onChange={(event) =>
                    setForm({ ...form, target: event.target.value })
                  }
                >
                  <option>Semua siswa</option>
                  <option>Casis tes awal</option>
                  <option>Casis tes lanjutan</option>
                  <option>Siswa diterima</option>
                  <option>Orang tua siswa</option>
                </select>
              </label>

              <div className="pg-approval-info">
                <div className="pg-approval-symbol">✓</div>
                <div>
                  <strong>Alur persetujuan</strong>
                  <p>
                    Setelah disimpan, ajukan pengumuman kepada kepala sekolah
                    untuk diperiksa sebelum diterbitkan.
                  </p>
                </div>
              </div>

              <div className="pg-modal-actions">
                <button
                  type="button"
                  className="pg-cancel-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="pg-primary-btn">
                  Simpan draft
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {detail && (
        <div
          className="pg-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetail(null);
          }}
        >
          <section
            className="pg-modal pg-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pg-detail-title"
          >
            <div className="pg-modal-heading">
              <div>
                <span className="pg-eyebrow">DETAIL PENGUMUMAN</span>
                <h2 id="pg-detail-title">{detail.judul}</h2>
                <p>Dibuat pada {formatDate(detail.tanggal)}</p>
              </div>
              <button
                className="pg-close-btn"
                onClick={() => setDetail(null)}
                aria-label="Tutup detail"
              >
                ×
              </button>
            </div>

            <div className="pg-detail-body">
              <span
                className={`pg-status ${statusConfig[detail.status].className}`}
              >
                {statusConfig[detail.status].label}
              </span>
              <p>{detail.isi}</p>
              <div className="pg-detail-target">
                <strong>Penerima</strong>
                <span>{detail.target}</span>
              </div>

              {detail.status === "pending" && (
                <div className="pg-approval-info">
                  <div className="pg-approval-symbol">◷</div>
                  <div>
                    <strong>Menunggu persetujuan kepala sekolah</strong>
                    <p>
                      Pengumuman belum diterbitkan dan belum otomatis
                      dikirimkan kepada siswa.
                    </p>
                  </div>
                </div>
              )}

              {detail.status === "draft" ||
              detail.status === "rejected" ? (
                <div className="pg-modal-actions">
                  <button
                    className="pg-delete-btn"
                    onClick={() => deleteAnnouncement(detail.id)}
                  >
                    Hapus
                  </button>
                  <button
                    className="pg-edit-btn"
                    onClick={() => {
                      const item = detail;
                      setDetail(null);
                      openEdit(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="pg-primary-btn"
                    onClick={() => submitForApproval(detail.id)}
                  >
                    Ajukan persetujuan
                  </button>
                </div>
              ) : detail.status === "pending" ? (
                <p className="pg-footnote">
                  Persetujuan harus dilakukan melalui akun kepala sekolah.
                </p>
              ) : (
                <div className="pg-modal-actions">
                  <button
                    className="pg-cancel-btn"
                    onClick={() => setDetail(null)}
                  >
                    Tutup
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}