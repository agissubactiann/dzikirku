# Dzikirku

Web app statis, tanpa build. Buka `index.html` lewat server lokal (service worker butuh http, bukan file://).

- `data.js` : isi dzikir dan daftar sholat (edit di sini)
- `app.js`  : logika aplikasi
- `style.css` : tema (warna ada di `:root` paling atas)

Jalankan lokal: `npx serve .` lalu buka alamat yang muncul.
Deploy: `vercel` dari folder ini, atau push ke GitHub lalu import di Vercel (Framework: Other, tanpa build command).
