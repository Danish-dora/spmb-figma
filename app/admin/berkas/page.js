"use client";

import { useState } from "react";

// Data dummy. Nanti diganti dengan data dari database/API.
const students = [
  { id: 1, name: "Ladesh" },
  { id: 2, name: "Azril" },
  { id: 3, name: "Damian" },
];

const documents = [
  { key: "ijazah", label: "Ijazah :" },
  { key: "kartuKeluarga", label: "Kartu keluarga :" },
  { key: "aktaLahir", label: "Akta kelahiran :" },
];

function FolderDownloadIcon() {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <path
        d="M3 7a2 2 0 0 1 2-2h7l3 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
        fill="#000"
      />
      <path
        d="M16 11v9M12 16.5l4 4 4-4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BerkasPage() {
  const [selected, setSelected] = useState(null);

  const handleOpen = (student, doc) => {
    // Placeholder: nanti dipakai untuk menampilkan / mengunduh berkas siswa.
    setSelected(`${student.name} - ${doc.label.replace(" :", "")}`);
  };

  return (
    <section className="berkas-wrapper">
      <div className="berkas-title-bar">Berkas</div>

      <div className="berkas-grid berkas-columns">
        <span />
        {documents.map((doc) => (
          <span key={doc.key}>{doc.label}</span>
        ))}
      </div>

      <div className="berkas-list">
        {students.map((student) => (
          <div key={student.id} className="berkas-card">
            <span className="berkas-badge">{student.id}</span>
            <div className="berkas-grid">
              <span />
              {documents.map((doc) => (
                <button
                  key={doc.key}
                  type="button"
                  className="berkas-file"
                  onClick={() => handleOpen(student, doc)}
                  aria-label={`${doc.label} ${student.name}`}
                >
                  <FolderDownloadIcon />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <p className="berkas-selected">Dipilih: {selected} (belum ada berkas)</p>
      )}
    </section>
  );
}