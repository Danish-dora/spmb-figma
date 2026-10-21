"use client";

import { useMemo, useState } from "react";

const initialPayments = [
  {
    id: 1,
    nama: "Davin",
    nisn: "NISN 0001",
    status: "Lunas",
    nominal: 500000,
    metode: "Transfer Bank",
    tanggal: "12 Jan 2025",
    bukti: "Contoh_001.pdf",
  },
  {
    id: 2,
    nama: "Damian",
    nisn: "NISN 0002",
    status: "Menunggu Verifikasi",
    nominal: 500000,
    metode: "Virtual Account",
    tanggal: "14 Jan 2025",
    bukti: "Contoh_002.pdf",
  },
  {
    id: 3,
    nama: "Timmy",
    nisn: "NISN 0003",
    status: "Belum Bayar",
    nominal: 500000,
    metode: "Transfer Bank",
    tanggal: "-",
    bukti: "-",
  },
  {
    id: 4,
    nama: "Lex",
    nisn: "NISN 0004",
    status: "Lunas",
    nominal: 500000,
    metode: "QRIS",
    tanggal: "15 Jan 2025",
    bukti: "Contoh_004.pdf",
  },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5z" />
        <path d="M4 8h14" />
        <path d="M16 13h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    alert: (
      <>
        <path d="M12 4 3 20h18L12 4z" />
        <path d="M12 10v4" />
        <path d="M12 17h.01" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
  };

  return <svg {...common}>{icons[name]}</svg>;
}

function StatusBadge({ status }) {
  const className = {
    Lunas: "payment-status payment-status-success",
    "Menunggu Verifikasi": "payment-status payment-status-warning",
    "Belum Bayar": "payment-status payment-status-danger",
  }[status];

  return <span className={className}>{status}</span>;
}

export default function PembayaranPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.nama.toLowerCase().includes(search.toLowerCase()) ||
        payment.nisn.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "Semua" || payment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const totalPeserta = payments.length;

  const totalLunas = payments.filter(
    (item) => item.status === "Lunas"
  ).length;

  const totalMenunggu = payments.filter(
    (item) => item.status === "Menunggu Verifikasi"
  ).length;

  const totalBelumBayar = payments.filter(
    (item) => item.status === "Belum Bayar"
  ).length;

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const verifyPayment = (id) => {
    const payment = payments.find((item) => item.id === id);

    setPayments((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Lunas",
            }
          : item
      )
    );

    setSelected(null);

    if (payment) {
      showToast(
        `Pembayaran ${payment.nama} berhasil diverifikasi.`
      );
    }
  };

  const rejectPayment = (id) => {
    const payment = payments.find((item) => item.id === id);

    setPayments((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Belum Bayar",
            }
          : item
      )
    );

    setSelected(null);

    if (payment) {
      showToast(
        `Pembayaran ${payment.nama} ditolak.`
      );
    }
  };

  return (
    <main className="admin-page payment-page">

      {/* HEADER */}
      <section className="payment-header">
        <div>
          <p className="page-eyebrow">ADMINISTRATOR / KEUANGAN</p>

          <h1>Data Pembayaran</h1>

          <p className="page-description">
            Pantau status pembayaran peserta dan lakukan verifikasi
            pembayaran dengan mudah.
          </p>
        </div>

        <div className="payment-header-user">
          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

          <div className="admin-avatar">A</div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="payment-stats">

        <div className="payment-stat-card">
          <div className="payment-stat-top">
            <span>Total peserta</span>

            <div className="payment-stat-icon icon-green">
              <Icon name="wallet" />
            </div>
          </div>

          <strong>{totalPeserta}</strong>

          <p>Peserta terdaftar</p>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-top">
            <span>Sudah lunas</span>

            <div className="payment-stat-icon icon-green">
              <Icon name="check" />
            </div>
          </div>

          <strong>{totalLunas}</strong>

          <p>Pembayaran terverifikasi</p>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-top">
            <span>Menunggu verifikasi</span>

            <div className="payment-stat-icon icon-yellow">
              <Icon name="clock" />
            </div>
          </div>

          <strong>{totalMenunggu}</strong>

          <p>Perlu diperiksa admin</p>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-top">
            <span>Belum bayar</span>

            <div className="payment-stat-icon icon-orange">
              <Icon name="alert" />
            </div>
          </div>

          <strong>{totalBelumBayar}</strong>

          <p>Belum melakukan pembayaran</p>
        </div>

      </section>

      {/* TITLE */}
      <section className="payment-section-heading">
        <div>
          <h2>Daftar pembayaran</h2>

          <p>
            Kelola dan verifikasi pembayaran seluruh peserta.
          </p>
        </div>

        <span className="payment-count">
          {filteredPayments.length} peserta
        </span>
      </section>

      {/* TOOLBAR */}
      <section className="payment-toolbar">

        <label className="payment-search">
          <Icon name="search" />

          <input
            type="search"
            placeholder="Cari nama atau NISN..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </label>

        <div className="payment-filter">
          <Icon name="filter" />

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="Semua">Semua status</option>
            <option value="Lunas">Lunas</option>
            <option value="Menunggu Verifikasi">
              Menunggu verifikasi
            </option>
            <option value="Belum Bayar">
              Belum bayar
            </option>
          </select>
        </div>

      </section>

      {/* PAYMENT LIST */}
      <section className="payment-list">

        {filteredPayments.length === 0 ? (
          <div className="payment-empty">
            <div className="payment-empty-icon">
              <Icon name="search" size={28} />
            </div>

            <h3>Data tidak ditemukan</h3>

            <p>
              Coba gunakan nama, NISN, atau filter status
              yang berbeda.
            </p>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <article
              className="payment-card"
              key={payment.id}
            >

              <div className="payment-person">
                <div className="payment-person-avatar">
                  {payment.nama.charAt(0)}
                </div>

                <div>
                  <h3>{payment.nama}</h3>

                  <p>{payment.nisn}</p>
                </div>
              </div>

              <div className="payment-info">
                <span>Status pembayaran</span>

                <StatusBadge status={payment.status} />
              </div>

              <div className="payment-info">
                <span>Nominal</span>

                <strong>
                  {formatRupiah(payment.nominal)}
                </strong>
              </div>

              <div className="payment-info payment-method">
                <span>Metode</span>

                <strong>
                  {payment.metode}
                </strong>

                <small>
                  {payment.tanggal}
                </small>
              </div>

              <button
                type="button"
                className="payment-detail-button"
                onClick={() => setSelected(payment)}
              >
                Lihat detail

                <Icon name="arrow" size={17} />
              </button>

            </article>
          ))
        )}

      </section>

      {/* DETAIL MODAL */}
      {selected && (
        <div
          className="payment-modal-overlay"
          onMouseDown={() => setSelected(null)}
        >

          <div
            className="payment-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="payment-modal-header">
              <div>
                <p className="page-eyebrow">
                  DETAIL PEMBAYARAN
                </p>

                <h2>{selected.nama}</h2>

                <p>{selected.nisn}</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Tutup"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="payment-modal-status">
              <StatusBadge status={selected.status} />

              <strong>
                {formatRupiah(selected.nominal)}
              </strong>
            </div>

            <div className="payment-detail-grid">

              <div>
                <span>Metode pembayaran</span>
                <strong>{selected.metode}</strong>
              </div>

              <div>
                <span>Tanggal pembayaran</span>
                <strong>{selected.tanggal}</strong>
              </div>

              <div>
                <span>Nomor peserta</span>
                <strong>{selected.nisn}</strong>
              </div>

              <div>
                <span>Bukti pembayaran</span>

                {selected.bukti === "-" ? (
                  <strong>-</strong>
                ) : (
                  <button
                    type="button"
                    className="payment-proof"
                  >
                    <Icon name="file" size={17} />
                    {selected.bukti}
                  </button>
                )}
              </div>

            </div>

            {selected.status === "Menunggu Verifikasi" && (
              <div className="payment-warning">
                <Icon name="clock" />

                <div>
                  <strong>
                    Pembayaran membutuhkan verifikasi
                  </strong>

                  <p>
                    Periksa bukti pembayaran sebelum
                    menyetujui transaksi.
                  </p>
                </div>
              </div>
            )}

            <div className="payment-modal-actions">

              <button
                type="button"
                className="payment-secondary-button"
                onClick={() => setSelected(null)}
              >
                Tutup
              </button>

              {selected.status === "Menunggu Verifikasi" && (
                <>
                  <button
                    type="button"
                    className="payment-reject-button"
                    onClick={() =>
                      rejectPayment(selected.id)
                    }
                  >
                    Tolak
                  </button>

                  <button
                    type="button"
                    className="payment-verify-button"
                    onClick={() =>
                      verifyPayment(selected.id)
                    }
                  >
                    <Icon name="check" size={17} />
                    Verifikasi pembayaran
                  </button>
                </>
              )}

            </div>

          </div>

        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="payment-toast">
          <div className="payment-toast-icon">
            <Icon name="check" size={17} />
          </div>

          <span>{toast}</span>
        </div>
      )}

    </main>
  );
}