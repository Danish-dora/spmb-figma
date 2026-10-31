
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Home", href: "/siswa", icon: "⌂" },
  { label: "Isi Biodata", href: "/siswa/isi-biodata", icon: "♙" },
  { label: "Ikuti Tes", href: "/siswa/ikuti-tes", icon: "▤" },
  { label: "Hasil Tes", href: "/siswa/hasil-tes", icon: "▥" },
  { label: "Pengumuman", href: "/siswa/pengumuman", icon: "♧" },
];

export default function SidebarSiswa() {
  const pathname = usePathname();

  return (
    <aside className="siswa-sidebar">
      <Link href="/siswa" className="siswa-brand">
        <img src="/asset/logo.png" alt="Logo Citra Negara" />
        <span className="siswa-brand-name">Citra Negara</span>
        <span className="siswa-brand-tagline">Sekolahnya para juara</span>
      </Link>

      <div className="siswa-sidebar-divider" />

      <nav className="siswa-nav" aria-label="Navigasi siswa">
        {menu.map((item) => {
          const active =
            item.href === "/siswa"
              ? pathname === "/siswa"
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`siswa-nav-link ${active ? "active" : ""}`}
            >
              <span className="siswa-nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="siswa-sidebar-bottom">
        <span className="siswa-sidebar-bottom-icon">✦</span>
        <p>Raih prestasi terbaikmu bersama Citra Negara.</p>
      </div>
    </aside>
  );
}
