
"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeaderSiswa() {
  const [bukaProfil, setBukaProfil] = useState(false);

  return (
    <header className="siswa-header">
      <div className="siswa-breadcrumb">
        <Link href="/siswa" className="siswa-breadcrumb-home">
          ⌂
        </Link>
        <span>Dashboard Siswa</span>
      </div>

      <div className="siswa-header-actions">
        <button
          type="button"
          className="siswa-notification"
          aria-label="Notifikasi"
          onClick={() => {
            window.location.href = "/siswa/pengumuman";
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span className="siswa-notification-dot" />
        </button>

        <div className="siswa-profile-wrap">
          <button
            type="button"
            className="siswa-profile-button"
            onClick={() => setBukaProfil(!bukaProfil)}
            aria-expanded={bukaProfil}
          >
            <span className="siswa-avatar">
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </span>
            <span>Siswa</span>
            <span className="siswa-chevron">⌄</span>
          </button>

          {bukaProfil && (
            <div className="siswa-profile-menu">
              <div className="siswa-profile-menu-title">
                Akun Siswa
              </div>
              <Link
                href="/siswa/isi-biodata"
                onClick={() => setBukaProfil(false)}
              >
                Lengkapi biodata
              </Link>
              <Link href="/login/calon-siswa">
                Keluar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
