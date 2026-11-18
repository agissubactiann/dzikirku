let mem = {};
try {
  mem = JSON.parse(localStorage.getItem("dzikirku") || "{}");
} catch (e) {}
const save = () => {
  try {
    localStorage.setItem("dzikirku", JSON.stringify(mem));
  } catch (e) {}
};
const key = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const T = key(new Date()),
  N = new Date();
let S = { v: "home", tab: "home", mode: "full", pr: null, i: 0, c: 0, sel: T, cm: N.getMonth(), cy: N.getFullYear() },
  lastV = "";
const setF = (k, id, f, x) => {
  const d = mem[k] || (mem[k] = {});
  d[id] = d[id] || { p: 0, d: 0 };
  d[id][f] = x;
  save();
};
const get = (k, id) => (mem[k] && mem[k][id]) || { p: 0, d: 0 };
function stat(k) {
  let r = 0,
    p = 0,
    z = 0;
  P.forEach(([id, , n]) => {
    const e = get(k, id);
    if (e.p) {
      r += n;
      p++;
    }
    if (e.d) z++;
  });
  return { r, p, z };
}
const longD = (k) => {
  const [y, m, d] = k.split("-");
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const modeName = () => (S.mode == "full" ? "Sedang tidak buru-buru" : "Terburu-buru");

function dayCard(k) {
  const s = stat(k);
  return (
    `<div class="card"><h3>${longD(k)}</h3><p class="sum">${s.r} rakaat · ${s.p} dari 5 sholat · ${s.z} dzikir</p>` +
    P.map(([id, nm, n]) => {
      const e = get(k, id);
      return `<div class="row"><div class="n"><b>${nm}</b><small>${n} rakaat</small></div>
<button class="chip ${e.p ? "on" : ""}" onclick="tg('${k}','${id}','p')">Sholat</button>
<button class="chip z ${e.d ? "on" : ""}" onclick="tg('${k}','${id}','d')">Dzikir</button></div>`;
    }).join("") +
    `</div>`
  );
}
function cal() {
  const y = S.cy,
    m = S.cm,
    off = (new Date(y, m, 1).getDay() + 6) % 7,
    n = new Date(y, m + 1, 0).getDate();
  let c = "";
  for (let i = 0; i < off; i++) c += "<span></span>";
  for (let d = 1; d <= n; d++) {
    const k = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0"),
      s = stat(k);
    c += `<button class="d ${k == T ? "t" : ""} ${k == S.sel ? "s" : ""}" onclick="S.sel='${k}';render()">${d}<span class="dots">${s.p ? "<i></i>" : ""}${s.z ? '<i class="z"></i>' : ""}</span></button>`;
  }
  return `<div class="card"><div class="ch"><button onclick="mv(-1)" aria-label="Bulan sebelumnya">‹</button><h3>${MN[m]} ${y}</h3><button onclick="mv(1)" aria-label="Bulan berikutnya">›</button></div>
<div class="dow">${["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((x) => `<span>${x}</span>`).join("")}</div><div class="grid">${c}</div>
<p class="sum" style="margin-top:10px">Titik hijau: ada sholat. Titik emas: ada dzikir.</p></div>`;
}

const V = {
  home() {
    return `<div class="hero"><div class="sal">السلام عليكم</div><p>Sudah masuk waktu sholat?</p></div>
<div class="modes"><button class="mode a" onclick="S.v='pick';render()"><b>Sholat</b><small>Pilih waktu sholat, lalu lanjut dzikir</small></button></div>${cal()}${dayCard(S.sel)}`;
  },
  pick() {
    return (
      `<button class="back" onclick="S.v='home';render()">‹ Beranda</button><h2 style="margin:4px 0 4px">Sholat hari ini</h2>` +
      P.map(([id, nm, n]) => {
        const e = get(T, id);
        return `<button class="pr ${e.p ? "ok" : ""}" onclick="S.pr='${id}';S.v='pray';render()"><span class="r">${e.p ? "✓" : n}</span><span><b>${nm}</b><small>${n} rakaat${e.d ? " · dzikir selesai" : ""}</small></span></button>`;
      }).join("")
    );
  },
  mode() {
    return `<button class="back" onclick="S.v='ask';render()">‹ Kembali</button><h2 style="margin:4px 0 14px">Dzikir seperti apa?</h2><div class="modes"><button class="mode a" onclick="setM('full')"><b>Sedang tidak buru-buru</b><small>Dzikir lengkap setelah sholat</small></button><button class="mode b" onclick="setM('quick')"><b>Terburu-buru</b><small>Dzikir ringkas, tetap tenang</small></button></div>`;
  },
  pray() {
    const p = P.find((x) => x[0] == S.pr);
    return `<button class="back" onclick="S.v='pick';render()">‹ Kembali</button>
<div class="card center"><p class="sum">Sholat</p><h1>${p[1]}</h1><div class="num">${p[2]}</div><p class="sum">rakaat</p><p>Sholat dulu dengan tenang. Tekan Selesai setelah salam.</p></div>
<button class="big" onclick="doneP()">Selesai</button>`;
  },
  ask() {
    const p = P.find((x) => x[0] == S.pr);
    return `<div class="card center"><div class="num">✓</div><h2>Sholat ${p[1]} selesai</h2><p>Lanjut dzikir sekarang, atau lewati dulu.</p></div>
<button class="big g" onclick="S.v='mode';render()">Lanjut dzikir</button><button class="big o" onclick="S.v='pick';render()">Lewati</button>`;
  },
  dz() {
    const L = Z[S.mode],
      z = L[S.i],
      ok = S.c >= z.t;
    return `<div class="g1"><button class="back" onclick="S.v='pick';render()">‹ Berhenti</button><small class="sum">${S.i + 1} dari ${L.length}</small></div>
<div class="prog"><i style="width:${((S.i + 1) / L.length) * 100}%"></i></div>
<div class="card"><h3>${z.h}</h3>${z.a ? `<div class="ar">${z.a}</div><p class="lat">${z.l}</p>` : ""}<p class="art">${z.n}</p>
${z.t > 1 ? `<button class="cnt ${ok ? "full" : ""}" onclick="S.c++;render()">${S.c} / ${z.t}${ok ? " ✓" : "  · ketuk untuk menghitung"}</button>` : `${z.p ? "" : `<p class="art">Dibaca ${z.t} kali.</p>`}`}</div>
<div class="two"><button class="big o" onclick="nx(false)">Lewati</button><button class="big g" onclick="nx(true)">${S.i == L.length - 1 ? "Selesai" : "Lanjut"}</button></div>`;
  },
  fin() {
    return `<div class="card center"><div class="num">✓</div><h2>Dzikir selesai</h2><p>Semoga diterima. Barakallahu fiikum.</p></div><button class="big" onclick="S.v='pick';render()">Kembali ke daftar sholat</button><button class="big o" onclick="S.v='home';S.tab='home';render()">Beranda</button>`;
  },
  gal() {
    const ks = Object.keys(mem)
      .filter((k) => {
        const s = stat(k);
        return s.p || s.z;
      })
      .sort()
      .reverse();
    let R = 0,
      Zt = 0;
    ks.forEach((k) => {
      const s = stat(k);
      R += s.r;
      Zt += s.z;
    });
    return (
      `<h2 style="margin:6px 4px 12px">Riwayat</h2><div class="stats"><div><b>${ks.length}</b><small>hari</small></div><div><b>${R}</b><small>rakaat</small></div><div><b>${Zt}</b><small>dzikir</small></div></div>` +
      (ks.length
        ? ks
            .map((k) => {
              const s = stat(k);
              return `<div class="card"><div class="g1"><b>${longD(k)}</b><span class="chip on">${s.r} rakaat</span></div>
<p class="sum" style="margin:4px 0 0">${s.p} dari 5 sholat · ${s.z} dzikir</p><div class="pills">${P.map(([id, nm]) => {
                const e = get(k, id);
                return `<span class="${e.p ? "on" : ""}">${nm}${e.p ? " ✓" : ""}${e.d ? " + dzikir" : ""}</span>`;
              }).join("")}</div></div>`;
            })
            .join("")
        : `<div class="empty">Belum ada catatan. Selesaikan satu sholat dari Beranda, nanti muncul di sini.</div>`)
    );
  },
};

function tg(k, id, f) {
  setF(k, id, f, get(k, id)[f] ? 0 : 1);
  render();
}
function mv(d) {
  S.cm += d;
  if (S.cm < 0) {
    S.cm = 11;
    S.cy--;
  }
  if (S.cm > 11) {
    S.cm = 0;
    S.cy++;
  }
  render();
}
function setM(m) {
  S.mode = m;
  S.i = 0;
  S.c = 0;
  S.v = "dz";
  render();
}
function doneP() {
  setF(T, S.pr, "p", 1);
  S.v = "ask";
  render();
}
function nx(fin) {
  const L = Z[S.mode];
  if (S.i >= L.length - 1) {
    if (fin) setF(T, S.pr, "d", 1);
    S.v = fin ? "fin" : "pick";
  } else {
    S.i++;
    S.c = 0;
  }
  render();
}
function nav(t) {
  S.tab = t;
  S.v = t == "home" ? "home" : "gal";
  render();
}
function render() {
  document.getElementById("app").innerHTML = V[S.v]();
  document.getElementById("nav").innerHTML = `<button class="${S.tab == "home" ? "on" : ""}" onclick="nav('home')">Beranda</button><button class="${S.tab == "gal" ? "on" : ""}" onclick="nav('gal')">Riwayat</button>`;
  if (lastV != S.v) window.scrollTo(0, 0);
  lastV = S.v;
}
render();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
