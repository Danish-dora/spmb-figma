"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./admin.css";

const menuItems = [
  { name: "Home", icon: "⌂", href: "/admin" },
  { name: "Verifikasi data", icon: "✓", href: "/admin/verifikasi" },
  { name: "Soal dan jadwal tes", icon: "▤", href: "/admin/jadwal-tes" },
  { name: "Hasil tes", icon: "▥", href: "/admin/hasil-tes" },
  { name: "Pengumuman", icon: "♧", href: "/admin/pengumuman" },
  { name: "Data pembayaran", icon: "♙", href: "/admin/pembayaran" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const current = menuItems.find((item) => isActive(item.href));

  return (
    <main className="spmb-admin">
      <aside className="spmb-admin-sidebar">
        <div className="spmb-admin-school-small">
          <div className="spmb-admin-logo">✺</div>
          <div>
            <strong>Citra Negara</strong>
            <span>Sekolah para juara</span>
          </div>
        </div>

        <nav className="spmb-admin-nav">
          {menuItems.map((item) => (
            <button
              key={item.href}
              type="button"
              className={
                isActive(item.href)
                  ? "spmb-admin-nav-item active"
                  : "spmb-admin-nav-item"
              }
              onClick={() => router.push(item.href)}
            >
              <span className="spmb-admin-nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="spmb-admin-sidebar-decoration">
          <div className="spmb-admin-building">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </aside>

      <section className="spmb-admin-content">
        <header className="spmb-admin-header">
          <div className="spmb-admin-school">
            <div className="spmb-admin-logo">✺</div>
            <div>
              <strong>Citra Negara</strong>
              <p>berprestasi, Berkarakter, dan siap kerja</p>
            </div>
          </div>

          <div className="spmb-admin-account">
            <span className="spmb-admin-bell">♧</span>
            <div className="spmb-admin-profile-wrap">
              <button
                type="button"
                className="spmb-admin-profile-button"
                onClick={() => setShowProfile(!showProfile)}
              >
                <span className="spmb-admin-user-icon">♙</span>
                Admin <span>⌄</span>
              </button>

              {showProfile && (
                <div className="spmb-admin-profile-menu">
                  <strong>Administrator</strong>
                  <span>Pengelola SPMB</span>
                  <button type="button" onClick={() => setShowProfile(false)}>
                    Tutup menu
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="spmb-admin-breadcrumb">
          Home / {current ? current.name : ""}
        </div>

        {children}

        <footer className="spmb-admin-footer">
          SPMB SMA Citra Negara · Dashboard Administrator
        </footer>
      </section>
    </main>
  );
}