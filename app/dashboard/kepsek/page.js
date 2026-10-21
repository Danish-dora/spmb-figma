import { requireRole } from "@/lib/auth";

export default async function DashboardKepsek() {
  const session = await requireRole(["kepsek"]);

  return (
    <main>
      <h1>Dashboard Kepala Sekolah</h1>
      <p>Selamat datang, {session.nama}</p>
    </main>
  );
}