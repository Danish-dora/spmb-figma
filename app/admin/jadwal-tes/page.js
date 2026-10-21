"use client";

import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const NAMES = ["Dylan", "Caleb", "Carter", "Damian", "Azril", "Ladesh"];
const peserta = (arr) => NAMES.map((nama, i) => ({ nama, s: arr?.[i] ?? "belum" }));
const TEST_LABEL = { terjadwal: "Terjadwal", berlangsung: "Berlangsung", selesai: "Selesai" };
const PES_LABEL = { belum: "Belum mengerjakan", selesai: "Selesai", terkendala: "Terkendala teknis", dibuka: "Dibuka ulang" };

// TODO: ganti dengan data dari API / database
const INITIAL = [
  { id: 1, nama: "Komponen komputer", tanggal: "2026-02-12", jam: "08:00", durasi: 60, file: "komponen-komputer.pdf", log: [],
    peserta: peserta(["selesai", "selesai", "selesai", "selesai", "selesai", "selesai"]) },
  { id: 2, nama: "Software", tanggal: "2026-04-07", jam: "08:00", durasi: 90, file: "software.pdf", log: [],
    peserta: peserta(["selesai", "terkendala", "selesai", "selesai", "terkendala", "selesai"]) },
  { id: 3, nama: "Al jabar mtk", tanggal: "2026-07-23", jam: "09:00", durasi: 60, file: "aljabar-mtk.pdf", log: [],
    peserta: peserta(["selesai", "selesai", "selesai", "selesai", "selesai", "selesai"]) },
  { id: 4, nama: "Komunikasi", tanggal: "2026-11-05", jam: "09:00", durasi: 45, file: "komunikasi.docx", log: [],
    peserta: peserta() },
];

const pad = (n) => String(n).padStart(2, "0");
const startOf = (t) => new Date(`${t.tanggal}T${t.jam}`);
const fmtTanggal = (t) =>
  startOf(t).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" });
const statusOf = (t, now) => {
  if (!now) return null;
  const st = startOf(t);
  const en = new Date(st.getTime() + t.durasi * 60000);
  return now < st ? "terjadwal" : now <= en ? "berlangsung" : "selesai";
};
const stamp = () => new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
const doneCount = (t) => t.peserta.filter((p) => p.s === "selesai").length;

const EMPTY = { nama: "", tanggal: "", jam: "", durasi: 60, file: null };

export default function SoalJadwalPage() {
  const [tests, setTests] = useState(INITIAL);
  const [form, setForm] = useState(EMPTY);
  const [now, setNow] = useState(null); // diisi setelah mount supaya tidak hydration mismatch
  const [openId, setOpenId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(i);
  }, []);

  const say = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };
  const save = (next) => setTests((p) => p.map((t) => (t.id === next.id ? next : t))); // TODO: panggil API di sini

  // TODO: panggil API hapus di sini, mis. await fetch(`/api/tes/${id}`, { method: "DELETE" })
  const remove = (id) => {
    setTests((p) => p.filter((t) => t.id !== id));
    setOpenId(null);
    setConfirmId(null);
    say("Tes dihapus");
  };

  const add = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.tanggal || !form.jam) return say("Lengkapi nama tes, tanggal, dan jam mulai");
    if (!form.file) return say("Pilih file soal dulu");
    // TODO: upload form.file ke storage (S3 / Supabase / uploadthing), simpan URL-nya
    setTests((p) => [
      ...p,
      { id: Date.now(), nama: form.nama.trim(), tanggal: form.tanggal, jam: form.jam, durasi: +form.durasi || 60,
        file: form.file.name, peserta: peserta(), log: [{ t: stamp(), msg: "Tes dibuat" }] },
    ]);
    setForm(EMPTY);
    if (fileRef.current) fileRef.current.value = "";
    say("Tes dijadwalkan");
  };

  const sorted = [...tests].sort((a, b) => startOf(a) - startOf(b));
  const current = tests.find((t) => t.id === openId);

  return (
    <div className={`sj-app ${font.className}`}>
      <div className="sj-main">
        <div className="sj-top">
          <h1>Soal dan jadwal tes</h1>
        </div>

        <form className="sj-form" onSubmit={add}>
          <h2>Buat tes baru</h2>
          <div className="sj-fields">
            <Field label="Nama tes">
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Contoh: Komponen komputer" />
            </Field>
            <Field label="Tanggal">
              <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
            </Field>
            <Field label="Jam mulai">
              <input type="time" value={form.jam} onChange={(e) => setForm({ ...form, jam: e.target.value })} />
            </Field>
            <Field label="Durasi (menit)">
              <input type="number" min={5} value={form.durasi} onChange={(e) => setForm({ ...form, durasi: e.target.value })} />
            </Field>
            <Field label="File soal">
              <label className="sj-file">
                <span>{form.file ? form.file.name : "Pilih file (PDF, DOCX, ZIP)"}</span>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.zip" hidden onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} />
                <b>Upload ↑</b>
              </label>
            </Field>
          </div>
          <div className="sj-formEnd"><button className="sj-btn sj-pri" type="submit">Simpan dan jadwalkan</button></div>
        </form>

        {sorted.length === 0 && <p className="sj-hint">Belum ada tes. Buat tes baru di atas.</p>}

        {sorted.map((t) => {
          const st = statusOf(t, now);
          const done = doneCount(t);
          const bad = t.peserta.filter((p) => p.s === "terkendala").length;
          const reopened = t.peserta.filter((p) => p.s === "dibuka").length;
          return (
            <div key={t.id} className="sj-card">
              <div className="sj-when">
                <b>{fmtTanggal(t)}</b>
                <small>{t.jam} · {t.durasi} menit</small>
              </div>
              <div className="sj-what">
                <b>{t.nama}</b>
                <div className="sj-tags">
                  {st && <span className={`sj-tag sj-${st}`}>{TEST_LABEL[st]}</span>}
                  <span className="sj-meta">{done}/{t.peserta.length} selesai</span>
                  {bad > 0 && <span className="sj-tag sj-terkendala">{bad} terkendala</span>}
                  {reopened > 0 && <span className="sj-tag sj-dibuka">{reopened} dibuka ulang</span>}
                </div>
              </div>

              {confirmId === t.id ? (
                <div className="sj-actions">
                  <span className="sj-confirm">
                    {done > 0 ? "Hapus tes ini? Hasil peserta ikut terhapus." : "Hapus tes ini?"}
                  </span>
                  <button className="sj-btn sj-bad sj-solid" onClick={() => remove(t.id)}>Ya, hapus</button>
                  <button className="sj-btn" onClick={() => setConfirmId(null)}>Batal</button>
                </div>
              ) : (
                <div className="sj-actions">
                  <button className="sj-btn" onClick={() => setOpenId(t.id)}>Lihat tes</button>
                  <button className="sj-btn sj-bad" onClick={() => setConfirmId(t.id)}>Hapus</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`sj-shade ${current ? "sj-on" : ""}`} onClick={() => setOpenId(null)} />
      <section className={`sj-drawer ${current ? "sj-on" : ""}`} aria-hidden={!current} aria-label="Detail tes">
        {current && (
          <Detail
            key={current.id}
            test={current}
            now={now}
            onSave={save}
            onDelete={() => remove(current.id)}
            onClose={() => setOpenId(null)}
            say={say}
          />
        )}
      </section>
      <div className={`sj-toast ${toast ? "sj-on" : ""}`} role="status">{toast}</div>
    </div>
  );
}

function Detail({ test, now, onSave, onDelete, onClose, say }) {
  const [tab, setTab] = useState("jadwal");
  const [draft, setDraft] = useState({ nama: test.nama, tanggal: test.tanggal, jam: test.jam, durasi: test.durasi, file: test.file });
  const [alasan, setAlasan] = useState("");
  const [durasiUlang, setDurasiUlang] = useState(test.durasi);
  const [confirming, setConfirming] = useState(false);
  const st = statusOf(test, now);
  const stuck = test.peserta.filter((p) => p.s === "terkendala").map((p) => p.nama);
  const done = doneCount(test);

  const withLog = (t, msg) => ({ ...t, log: [{ t: stamp(), msg }, ...t.log] });

  const saveJadwal = () => {
    if (!draft.nama.trim() || !draft.tanggal || !draft.jam) return say("Lengkapi nama, tanggal, dan jam mulai");
    onSave(withLog({ ...test, ...draft, durasi: +draft.durasi || 60 }, `Jadwal diubah ke ${draft.tanggal} ${draft.jam}, ${draft.durasi} menit`));
    say("Jadwal disimpan");
  };
  const startNow = () => {
    const d = new Date();
    const next = { ...draft, tanggal: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, jam: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
    setDraft(next);
    onSave(withLog({ ...test, ...next, durasi: +next.durasi || 60 }, "Tes dimulai sekarang"));
    say("Tes dimulai sekarang");
  };
  const reopen = (names) => {
    if (!names.length) return say("Belum ada peserta yang dipilih");
    if (!alasan.trim()) return say("Isi alasan dulu, ini dicatat di riwayat");
    onSave(
      withLog(
        { ...test, peserta: test.peserta.map((p) => (names.includes(p.nama) ? { ...p, s: "dibuka" } : p)) },
        `Dibuka ulang untuk ${names.join(", ")} (${durasiUlang} menit). Alasan: ${alasan.trim()}`
      )
    );
    say("Soal dibuka ulang");
  };

  return (
    <>
      <div className="sj-dh">
        <div>
          <h2>{test.nama}</h2>
          <small>{fmtTanggal(test)} · {test.jam} {st && <>· {TEST_LABEL[st]}</>}</small>
        </div>
        <button className="sj-btn" onClick={onClose}>Tutup</button>
      </div>

      <div className="sj-tabs" role="tablist">
        {[["jadwal", "Soal dan jadwal"], ["peserta", "Peserta dan buka ulang"]].map(([k, l]) => (
          <button key={k} role="tab" className="sj-tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div className="sj-db">
        {tab === "jadwal" ? (
          <>
            {/* Ganti dengan preview / link ke file asli di storage */}
            <div className="sj-paper">
              <b>{draft.file}</b>
              <small>File soal yang sekarang dipakai</small>
              {[100, 100, 70].map((w, i) => <div key={i} className="sj-ln" style={{ width: w + "%" }} />)}
            </div>
            <label className="sj-file sj-mb">
              <span>Ganti file soal</span>
              <input type="file" accept=".pdf,.doc,.docx,.zip" hidden onChange={(e) => e.target.files?.[0] && setDraft({ ...draft, file: e.target.files[0].name })} />
              <b>Upload ↑</b>
            </label>
            <Field label="Nama tes"><input value={draft.nama} onChange={(e) => setDraft({ ...draft, nama: e.target.value })} /></Field>
            <div className="sj-two">
              <Field label="Tanggal"><input type="date" value={draft.tanggal} onChange={(e) => setDraft({ ...draft, tanggal: e.target.value })} /></Field>
              <Field label="Jam mulai"><input type="time" value={draft.jam} onChange={(e) => setDraft({ ...draft, jam: e.target.value })} /></Field>
            </div>
            <Field label="Durasi (menit)"><input type="number" min={5} value={draft.durasi} onChange={(e) => setDraft({ ...draft, durasi: e.target.value })} /></Field>
          </>
        ) : (
          <>
            <div className="sj-panel">
              <p className="sj-hint">Dipakai kalau ada kesalahan teknis dan peserta perlu mengerjakan lagi.</p>
              <Field label="Alasan (wajib, masuk riwayat)">
                <textarea rows={2} value={alasan} onChange={(e) => setAlasan(e.target.value)} placeholder="Contoh: Server error saat pengerjaan, jawaban tidak tersimpan." />
              </Field>
              <Field label="Waktu pengerjaan ulang (menit)">
                <input type="number" min={5} value={durasiUlang} onChange={(e) => setDurasiUlang(e.target.value)} />
              </Field>
              <button className="sj-btn sj-pri" disabled={!stuck.length} onClick={() => reopen(stuck)}>
                Buka ulang semua yang terkendala ({stuck.length})
              </button>
            </div>

            {test.peserta.map((p) => (
              <div key={p.nama} className="sj-prow">
                <b>{p.nama}</b>
                <span className={`sj-tag sj-${p.s}`}>{PES_LABEL[p.s]}</span>
                {p.s !== "dibuka" ? <button className="sj-btn" onClick={() => reopen([p.nama])}>Buka ulang</button> : <span />}
              </div>
            ))}

            <h3 className="sj-h3">Riwayat</h3>
            {test.log.length === 0 && <p className="sj-hint">Belum ada perubahan.</p>}
            {test.log.map((l, i) => (
              <p key={i} className="sj-log"><small>{l.t}</small><br />{l.msg}</p>
            ))}
          </>
        )}
      </div>

      {tab === "jadwal" && (
        <div className="sj-df">
          {confirming ? (
            <>
              <span className="sj-confirm">
                {done > 0 ? "Hapus tes ini? Hasil peserta ikut terhapus." : "Hapus tes ini?"}
              </span>
              <button className="sj-btn sj-bad sj-solid" onClick={onDelete}>Ya, hapus</button>
              <button className="sj-btn" onClick={() => setConfirming(false)}>Batal</button>
            </>
          ) : (
            <>
              <button className="sj-btn" onClick={startNow}>Mulai sekarang</button>
              <button className="sj-btn sj-bad" onClick={() => setConfirming(true)}>Hapus tes</button>
              <span className="sj-sp" />
              <button className="sj-btn sj-pri" onClick={saveJadwal}>Simpan jadwal</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function Field({ label, children }) {
  return (
    <div className="sj-fld">
      <label>{label}</label>
      {children}
    </div>
  );
}