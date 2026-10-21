"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const DOCS = [
  { k: "ijazah", n: "Ijazah", f: [["Nama di ijazah", "nama"], ["No. ijazah", "no"], ["Tahun lulus", "th"], ["Asal sekolah", "sek"]] },
  { k: "kk", n: "Kartu keluarga", f: [["No. KK", "no"], ["Kepala keluarga", "kep"], ["Alamat", "alm"]] },
  { k: "akta", n: "Akta lahir", f: [["No. akta", "no"], ["Tempat lahir", "tmp"], ["Tanggal lahir", "tgl"]] },
];
const LABEL = { pending: "Menunggu", valid: "Valid", rejected: "Ditolak" };
const ICON = { pending: "◔", valid: "✓", rejected: "✕" };
const FILTERS = [["all", "Semua"], ["pending", "Menunggu"], ["valid", "Lengkap valid"], ["rejected", "Ada yang ditolak"]];

// TODO: ganti data contoh ini dengan fetch dari API / database kamu
const mk = (id, nama, tmp, tgl, sek, s) => ({
  id, nama, nisn: "00" + (10000000 + id * 1234567), wa: "0812-3456-78" + (10 + id), ortu: "Orang tua " + nama,
  d: {
    ijazah: { s: s[0], note: "", v: { nama, no: `DN-${id}/2026`, th: "2026", sek } },
    kk: { s: s[1], note: "", v: { no: `32760${id}0001`, kep: "Ayah " + nama, alm: "Depok, Jawa Barat" } },
    akta: { s: s[2], note: "", v: { no: `AL-${id}88`, tmp, tgl } },
  },
});
const INITIAL = [
  mk(1, "Dylan", "Depok", "2013-03-04", "SDN Pancoran Mas 1", ["pending", "pending", "pending"]),
  mk(2, "Caleb", "Bogor", "2013-07-21", "SD Kasih Bangsa", ["valid", "rejected", "valid"]),
  mk(3, "Carter", "Jakarta", "2013-01-15", "SDN Cinere 2", ["valid", "rejected", "valid"]),
  mk(4, "Damian", "Depok", "2013-11-09", "SD Islam Terpadu", ["rejected", "valid", "valid"]),
  mk(5, "Azril", "Bekasi", "2012-12-30", "SDN Sukmajaya 3", ["valid", "valid", "valid"]),
  mk(6, "Ladesh", "Depok", "2013-05-18", "SDN Beji 4", ["valid", "valid", "valid"]),
];

const overall = (s) => {
  const a = DOCS.map((d) => s.d[d.k].s);
  return a.includes("rejected") ? "rejected" : a.every((x) => x === "valid") ? "valid" : "pending";
};

export default function VerifikasiPage() {
  const [students, setStudents] = useState(INITIAL);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState(new Set());
  const [openId, setOpenId] = useState(null);
  const [tab, setTab] = useState("ijazah");
  const [toast, setToast] = useState("");

  const say = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 1800);
  };

  const counts = { all: students.length, pending: 0, valid: 0, rejected: 0 };
  students.forEach((s) => counts[overall(s)]++);

  const rows = students.filter(
    (s) => (filter === "all" || overall(s) === filter) && s.nama.toLowerCase().includes(q.toLowerCase())
  );

  // Simpan ke state. Di sini tempat memanggil API kamu, mis. await fetch(`/api/siswa/${s.id}`, { method: "PATCH", ... })
  const save = (next) => setStudents((prev) => prev.map((s) => (s.id === next.id ? next : s)));

  const openDrawer = (id, t) => {
    setOpenId(id);
    setTab(t);
  };
  const togglePick = (id) =>
    setPicked((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const approveAll = () => {
    setStudents((prev) =>
      prev.map((s) => {
        if (!picked.has(s.id)) return s;
        const c = structuredClone(s);
        DOCS.forEach((d) => (c.d[d.k].s = "valid"));
        return c;
      })
    );
    say(`${picked.size} calon siswa disetujui`);
    setPicked(new Set());
  };

  const current = students.find((s) => s.id === openId);

  return (
    <div className={`vf-app ${font.className}`}>
      <div className="vf-main">
        <div className="vf-top">
          <h1>Verifikasi data siswa</h1>
        </div>

        <div className="vf-stats">
          {FILTERS.map(([k, l]) => (
            <button key={k} className="vf-chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {l}<b>{counts[k]}</b>
            </button>
          ))}
        </div>

        <div className="vf-tools">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama calon siswa…" aria-label="Cari nama" />
          <button className="vf-btn" onClick={() => setPicked(picked.size === students.length ? new Set() : new Set(students.map((s) => s.id)))}>
            Pilih semua
          </button>
        </div>

        {picked.size > 0 && (
          <div className="vf-bulk vf-on">
            <span>{picked.size} calon siswa dipilih</span>
            <button className="vf-btn vf-pri" onClick={approveAll}>Setujui semua dokumen terpilih</button>
          </div>
        )}

        <div className="vf-wrap">
          <div className="vf-grid">
            <div className="vf-head">
              <span /><span>Nama</span>
              {DOCS.map((d) => <span key={d.k}>{d.n}</span>)}
              <span />
            </div>
            {rows.map((s) => (
              <div key={s.id} className={`vf-row ${openId === s.id ? "vf-sel" : ""}`}>
                <input type="checkbox" checked={picked.has(s.id)} onChange={() => togglePick(s.id)} aria-label={`Pilih ${s.nama}`} />
                <div className="vf-nm">
                  <b>{s.nama}</b>
                  <small>No. {s.id} · NISN {s.nisn}</small>
                </div>
                {DOCS.map((d) => (
                  <button key={d.k} className={`vf-st vf-${s.d[d.k].s}`} onClick={() => openDrawer(s.id, d.k)} title={`Lihat ${d.n}`}>
                    {ICON[s.d[d.k].s]} {LABEL[s.d[d.k].s]}
                  </button>
                ))}
                <button className="vf-btn" onClick={() => openDrawer(s.id, "ijazah")}>Periksa</button>
              </div>
            ))}
            {rows.length === 0 && <p className="vf-empty">Tidak ada calon siswa yang cocok.</p>}
          </div>
        </div>
      </div>

      <div className={`vf-shade ${current ? "vf-on" : ""}`} onClick={() => setOpenId(null)} />
      <section className={`vf-drawer ${current ? "vf-on" : ""}`} aria-hidden={!current} aria-label="Detail calon siswa">
        {current && (
          <Detail
            key={current.id}
            student={current}
            tab={tab}
            setTab={setTab}
            onSave={save}
            onClose={() => setOpenId(null)}
            say={say}
          />
        )}
      </section>

      <div className={`vf-toast ${toast ? "vf-on" : ""}`} role="status">{toast}</div>
    </div>
  );
}

function Detail({ student, tab, setTab, onSave, onClose, say }) {
  // draft: perubahan lokal, baru masuk ke state utama saat disimpan
  const [draft, setDraft] = useState(() => structuredClone(student));

  const edit = (fn) =>
    setDraft((p) => {
      const c = structuredClone(p);
      fn(c);
      return c;
    });
  const commit = (fn, msg) => {
    const c = structuredClone(draft);
    fn?.(c);
    setDraft(c);
    onSave(c);
    say(msg);
  };

  const doc = DOCS.find((d) => d.k === tab);
  const x = doc && draft.d[tab];

  const reject = () => {
    if (!x.note.trim()) return say("Isi catatan dulu sebelum menolak");
    commit((c) => (c.d[tab].s = "rejected"), "Dokumen ditolak, catatan terkirim");
  };

  return (
    <>
      <div className="vf-dh">
        <div>
          <h2>{draft.nama}</h2>
          <small>NISN {draft.nisn} · dikirim 12 Okt 2026</small>
        </div>
        <button className="vf-btn" onClick={onClose}>Tutup</button>
      </div>

      <div className="vf-tabs" role="tablist">
        {[...DOCS, { k: "data", n: "Data siswa" }].map((d) => (
          <button key={d.k} role="tab" className="vf-tab" aria-selected={tab === d.k} onClick={() => setTab(d.k)}>
            {d.n} {d.k !== "data" && ICON[draft.d[d.k].s]}
          </button>
        ))}
      </div>

      <div className="vf-db">
        {tab === "data" ? (
          <>
            <Field label="Nama lengkap" value={draft.nama} onChange={(v) => edit((c) => (c.nama = v))} />
            <div className="vf-two">
              <Field label="NISN" value={draft.nisn} onChange={(v) => edit((c) => (c.nisn = v))} />
              <Field label="No. WhatsApp" value={draft.wa} onChange={(v) => edit((c) => (c.wa = v))} />
            </div>
            <Field label="Nama orang tua / wali" value={draft.ortu} onChange={(v) => edit((c) => (c.ortu = v))} />
          </>
        ) : (
          <>
            {/* Ganti blok ini dengan <img>/<iframe> ke file asli yang diunggah calon siswa */}
            <div className="vf-paper">
              <div className="vf-ttl">{doc.n}_{draft.nama.toLowerCase()}.pdf</div>
              <small>Berkas yang dikirim calon siswa</small>
              {[100, 100, 100, 60, 80].map((w, i) => <div key={i} className="vf-ln" style={{ width: w + "%" }} />)}
            </div>
            <p><span className={`vf-st vf-${x.s}`}>{ICON[x.s]} {LABEL[x.s]}</span></p>
            {doc.f.map(([label, k]) => (
              <Field key={k} label={label} value={x.v[k]} onChange={(v) => edit((c) => (c.d[tab].v[k] = v))} />
            ))}
            <div className="vf-fld">
              <label>Catatan untuk calon siswa (wajib bila ditolak)</label>
              <textarea rows={3} value={x.note} placeholder="Contoh: Foto buram, mohon unggah ulang." onChange={(e) => edit((c) => (c.d[tab].note = e.target.value))} />
            </div>
          </>
        )}
      </div>

      <div className="vf-df">
        {tab === "data" ? (
          <>
            <span className="vf-sp" />
            <button className="vf-btn vf-pri" onClick={() => commit(null, "Data siswa disimpan")}>Simpan perubahan</button>
          </>
        ) : (
          <>
            <button className="vf-btn vf-bad" onClick={reject}>Tolak</button>
            <button className="vf-btn" onClick={() => commit(null, "Data dokumen disimpan")}>Simpan data</button>
            <span className="vf-sp" />
            <button className="vf-btn vf-pri" onClick={() => commit((c) => (c.d[tab].s = "valid"), `${doc.n} disetujui`)}>Setujui ✓</button>
          </>
        )}
      </div>
    </>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="vf-fld">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}