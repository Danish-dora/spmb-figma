export async function submitLogin(e, router, setPesan) {
  e.preventDefault();
  setPesan("");

  const form = e.currentTarget;
  const email = form.elements.email.value;
  const password = form.elements.password.value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setPesan(data.message || "Login gagal.");
      return;
    }

    const tujuan = {
      calon_siswa: "/dashboard/calon-siswa",
      admin: "/admin",
      kepsek: "/dashboard/kepsek",
    }[data.user.role];

    if (!tujuan) {
      setPesan("Role akun tidak dikenali.");
      return;
    }

    router.push(tujuan);
    router.refresh();
  } catch {
    setPesan("Tidak bisa terhubung ke server.");
  }
}