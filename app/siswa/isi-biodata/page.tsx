
"use client";

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import SidebarSiswa from "../../components/SidebarSiswa";
import HeaderSiswa from "../../components/HeaderSiswa";
import "../../components/siswa.css";

const DOKUMEN = [
  {
    id: "kk",
    judul: "Kartu Keluarga",
    deskripsi: "Unggah foto atau PDF kartu keluarga",
  },
  {
    id: "ijazah",
    judul: "Ijazah / SKL",
    deskripsi: "Unggah ijazah atau surat keterangan lulus",
  },
  {
    id: "akta",
    judul: "Akta Kelahiran",
    deskripsi: "Unggah akta kelahiran",
  },
] as const;

export default function IsiBiodataPage() {
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [berkas, setBerkas] = useState<Record<string, File | null>>({
    kk: null,
    ijazah: null,
    akta: null,
  });
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function pilihBerkas(id: string, file: File | null) {
    setBerkas((sebelumnya) => ({
      ...sebelumnya,
      [id]: file,
    }));
    setPesan("");
    setBerhasil(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPesan("");
    setBerhasil(false);

    const dokumenBelumAda = DOKUMEN.filter(
      (dokumen) => !berkas[dokumen.id]
    );

    if (dokumenBelumAda.length > 0) {
      setPesan(
        "Silakan unggah semua dokumen: " +
          dokumenBelumAda.map((dokumen) => dokumen.judul).join(", ")
      );
      return;
    }

    for (const dokumen of DOKUMEN) {
      const file = berkas[dokumen.id];

      if (!file) continue;

      const tipeValid = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];

      if (!tipeValid.includes(file.type)) {
        setPesan("Gunakan file JPG, PNG, WEBP, atau PDF.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setPesan("Ukuran setiap dokumen maksimal 5 MB.");
        return;
      }
    }

    setBerhasil(true);
    setPesan(
      "Biodata berhasil diperiksa. Form ini belum terhubung ke penyimpanan server."
    );
  }

  return (
    <div className="siswa-app biodata-app">
      <style jsx global>{`
        .biodata-app {
          min-height: 100vh;
          background: #f5f7f4;
          color: #193c29;
        }

        .biodata-app .biodata-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 32px 40px;
        }

        .biodata-app .biodata-heading {
          margin-bottom: 24px;
        }

        .biodata-app .biodata-eyebrow {
          display: inline-block;
          margin-bottom: 8px;
          color: #34804b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }

        .biodata-app .biodata-heading h1 {
          margin: 0;
          font-size: clamp(25px, 3vw, 34px);
          line-height: 1.25;
          font-weight: 800;
          letter-spacing: -0.8px;
        }

        .biodata-app .biodata-heading p {
          margin: 10px 0 0;
          color: #6b7b70;
          font-size: 14px;
          line-height: 1.7;
        }

        .biodata-app .biodata-card {
          overflow: hidden;
          background: #fff;
          border: 1px solid #e4ebe3;
          border-radius: 18px;
          box-shadow: 0 8px 28px rgba(24, 62, 38, 0.045);
        }

        .biodata-app .biodata-card-heading {
          padding: 24px 28px;
          border-bottom: 1px solid #edf1ec;
        }

        .biodata-app .biodata-card-heading h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 750;
        }

        .biodata-app .biodata-card-heading p {
          margin: 7px 0 0;
          color: #77847a;
          font-size: 13px;
          line-height: 1.6;
        }

        .biodata-app .biodata-form {
          padding: 28px;
        }

        .biodata-app .biodata-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-bottom: 32px;
        }

        .biodata-app .biodata-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 0;
        }

        .biodata-app .biodata-field label {
          font-size: 13px;
          font-weight: 700;
        }

        .biodata-app .biodata-field input,
        .biodata-app .biodata-field select,
        .biodata-app .biodata-field textarea {
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          border: 1px solid #dce5dc;
          border-radius: 9px;
          background: #fff;
          color: #193c29;
          font: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .biodata-app .biodata-field textarea {
          min-height: 108px;
          resize: vertical;
        }

        .biodata-app .biodata-field input:focus,
        .biodata-app .biodata-field select:focus,
        .biodata-app .biodata-field textarea:focus {
          border-color: #32804a;
          box-shadow: 0 0 0 3px rgba(50, 128, 74, 0.1);
        }

        .biodata-app .biodata-doc-heading {
          margin-bottom: 18px;
        }

        .biodata-app .biodata-doc-heading h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 750;
        }

        .biodata-app .biodata-doc-heading p {
          margin: 7px 0 0;
          color: #77847a;
          font-size: 13px;
          line-height: 1.6;
        }

        .biodata-app .biodata-documents {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .biodata-app .biodata-document {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 20px 16px;
          border: 1px solid #e1e9e0;
          border-radius: 13px;
          background: #fbfdfb;
          transition: border-color 0.2s, transform 0.2s;
        }

        .biodata-app .biodata-document:hover {
          border-color: #8cbd96;
          transform: translateY(-2px);
        }

        .biodata-app .biodata-document-icon {
          display: grid;
          width: 46px;
          height: 46px;
          margin-bottom: 16px;
          place-items: center;
          border-radius: 12px;
          background: #eaf5e9;
          color: #287443;
        }

        .biodata-app .biodata-document-icon svg {
          width: 25px;
          height: 25px;
        }

        .biodata-app .biodata-document h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 750;
        }

        .biodata-app .biodata-document p {
          min-height: 38px;
          margin: 7px 0 16px;
          color: #78857a;
          font-size: 12px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .biodata-app .biodata-file-label {
          display: flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 10px;
          border: 1px dashed #91b99a;
          border-radius: 8px;
          background: #f0f7ef;
          color: #286c40;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .biodata-app .biodata-file-label:hover {
          background: #e5f2e3;
        }

        .biodata-app .biodata-file-input {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        .biodata-app .biodata-file-input:focus-visible + .biodata-file-label {
          outline: 3px solid rgba(50, 128, 74, 0.3);
          outline-offset: 3px;
        }

        .biodata-app .biodata-file-name {
          margin-top: 10px;
          color: #397548;
          font-size: 11px;
          overflow-wrap: anywhere;
        }

        .biodata-app .biodata-notice {
          margin-top: 22px;
          padding: 14px 16px;
          border-radius: 9px;
          background: #f0f6ee;
          color: #496b50;
          font-size: 12px;
          line-height: 1.7;
        }

        .biodata-app .biodata-message {
          margin: 22px 0 0;
          padding: 13px 15px;
          border-radius: 9px;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .biodata-app .biodata-message.error {
          border: 1px solid #f3c5c1;
          background: #fff2f0;
          color: #a1261c;
        }

        .biodata-app .biodata-message.success {
          border: 1px solid #b8ddbd;
          background: #eff9ef;
          color: #246738;
        }

        .biodata-app .biodata-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .biodata-app .biodata-reset,
        .biodata-app .biodata-submit {
          display: inline-flex;
          min-height: 46px;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border-radius: 9px;
          font: inherit;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }

        .biodata-app .biodata-reset {
          border: 1px solid #dce5dc;
          background: #fff;
          color: #4f6254;
        }

        .biodata-app .biodata-submit {
          gap: 9px;
          border: 1px solid #286d40;
          background: #286d40;
          color: #fff;
        }

        .biodata-app .biodata-submit:hover {
          background: #205833;
        }

        .biodata-app .biodata-footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 24px;
          color: #8a968c;
          font-size: 11px;
        }

        @media (max-width: 760px) {
          .biodata-app .biodata-content {
            padding: 22px 16px 30px;
          }

          .biodata-app .biodata-card-heading,
          .biodata-app .biodata-form {
            padding: 20px 16px;
          }

          .biodata-app .biodata-fields {
            grid-template-columns: 1fr;
            gap: 17px;
            margin-bottom: 28px;
          }

          .biodata-app .biodata-documents {
            grid-template-columns: 1fr;
          }

          .biodata-app .biodata-document {
            padding: 16px;
          }

          .biodata-app .biodata-document p {
            min-height: 0;
          }

          .biodata-app .biodata-form-actions {
            flex-direction: column-reverse;
          }

          .biodata-app .biodata-reset,
          .biodata-app .biodata-submit {
            width: 100%;
          }

          .biodata-app .biodata-footer {
            flex-direction: column;
          }
        }
      `}</style>

      <SidebarSiswa />

      <main className="siswa-main">
        <HeaderSiswa />

        <div className="biodata-content">
          <header className="biodata-heading">
            <span className="biodata-eyebrow">DATA DIRI SISWA</span>
            <h1>Lengkapi Biodata</h1>
            <p>
              Lengkapi informasi diri dan unggah dokumen persyaratan
              untuk membantu proses pendaftaran sekolah.
            </p>
          </header>

          <section className="biodata-card">
            <div className="biodata-card-heading">
              <h2>Informasi Pribadi</h2>
              <p>
                Isi data dengan benar sesuai dokumen resmi yang kamu miliki.
              </p>
            </div>

            <form
              className="biodata-form"
              onSubmit={handleSubmit}
              onReset={() => {
                setTanggalLahir("");
                setJurusan("");
                setAlamat("");
                setBerkas({ kk: null, ijazah: null, akta: null });
                setPesan("");
                setBerhasil(false);
              }}
            >
              <div className="biodata-fields">
                <div className="biodata-field">
                  <label htmlFor="tanggalLahir">Tanggal lahir</label>
                  <input
                    id="tanggalLahir"
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </div>

                <div className="biodata-field">
                  <label htmlFor="jurusan">Jurusan yang dipilih</label>
                  <select
                    id="jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    required
                  >
                    <option value="">Pilih jurusan</option>
                    <option value="IPA">IPA</option>
                    <option value="IPS">IPS</option>
                  </select>
                </div>

                <div className="biodata-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="alamat">Alamat tempat tinggal</label>
                  <textarea
                    id="alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Masukkan alamat lengkap, termasuk RT/RW, kelurahan, dan kota"
                    required
                  />
                </div>
              </div>

              <div className="biodata-doc-heading">
                <h2>Dokumen Persyaratan</h2>
                <p>
                  Format yang diterima: JPG, PNG, WEBP, atau PDF.
                  Ukuran maksimal 5 MB per dokumen.
                </p>
              </div>

              <div className="biodata-documents">
                {DOKUMEN.map((dokumen) => (
                  <article className="biodata-document" key={dokumen.id}>
                    <div className="biodata-document-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6M8 13h8M8 17h8" />
                      </svg>
                    </div>

                    <h3>{dokumen.judul}</h3>
                    <p>{dokumen.deskripsi}</p>

                    <input
                      className="biodata-file-input"
                      id={`berkas-${dokumen.id}`}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      onChange={(e) =>
                        pilihBerkas(
                          dokumen.id,
                          e.target.files?.[0] ?? null
                        )
                      }
                    />

                    <label
                      className="biodata-file-label"
                      htmlFor={`berkas-${dokumen.id}`}
                    >
                      <span aria-hidden="true">↑</span>
                      {berkas[dokumen.id] ? "Ganti dokumen" : "Pilih dokumen"}
                    </label>

                    {berkas[dokumen.id] && (
                      <span className="biodata-file-name">
                        ✓ {berkas[dokumen.id]!.name}
                      </span>
                    )}
                  </article>
                ))}
              </div>

              <div className="biodata-notice">
                <strong>Perhatian:</strong> Pastikan semua dokumen terbaca
                dengan jelas dan data yang kamu isi sudah benar sebelum
                melanjutkan.
              </div>

              {pesan && (
                <p
                  className={`biodata-message ${
                    berhasil ? "success" : "error"
                  }`}
                  role="status"
                >
                  {pesan}
                </p>
              )}

              <div className="biodata-form-actions">
                <button type="reset" className="biodata-reset">
                  Reset formulir
                </button>

                <button type="submit" className="biodata-submit">
                  Periksa biodata <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </section>

          <footer className="biodata-footer">
            <span>© {new Date().getFullYear()} Citra Negara</span>
            <span>Data pendaftaran siswa</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
