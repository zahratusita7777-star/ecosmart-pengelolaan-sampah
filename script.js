/* =========================================================
   ECOSMART — SMART WASTE MANAGEMENT
   Sistem rekomendasi pengelolaan sampah berbasis SAW
   ========================================================= */

const bobotDefault = {
    kemudahan: 0.25,
    lingkungan: 0.30,
    ekonomi: 0.20,
    kesesuaian: 0.25
};

const alternatif = [
    { nama: "Komposting", kemudahan: 4, lingkungan: 5, ekonomi: 3 },
    { nama: "Daur Ulang", kemudahan: 3, lingkungan: 5, ekonomi: 5 },
    { nama: "Bank Sampah", kemudahan: 4, lingkungan: 4, ekonomi: 5 },
    { nama: "Reuse / Upcycle", kemudahan: 3, lingkungan: 4, ekonomi: 4 },
    { nama: "Ecobrick", kemudahan: 2, lingkungan: 4, ekonomi: 3 }
];

const nilaiKesesuaian = {
    organik: { "Komposting": 5, "Daur Ulang": 1, "Bank Sampah": 2, "Reuse / Upcycle": 3, "Ecobrick": 1 },
    plastik: { "Komposting": 1, "Daur Ulang": 5, "Bank Sampah": 4, "Reuse / Upcycle": 5, "Ecobrick": 5 },
    kertas: { "Komposting": 2, "Daur Ulang": 5, "Bank Sampah": 4, "Reuse / Upcycle": 4, "Ecobrick": 1 },
    kaca: { "Komposting": 1, "Daur Ulang": 5, "Bank Sampah": 5, "Reuse / Upcycle": 4, "Ecobrick": 1 },
    logam: { "Komposting": 1, "Daur Ulang": 5, "Bank Sampah": 5, "Reuse / Upcycle": 4, "Ecobrick": 1 }
};

const langkahPengolahan = {
    "Komposting": {
        judul: "🌱 Cara Pengolahan",
        teks: "Sampah organik dapat diolah menjadi kompos melalui proses penguraian.",
        list: ["Pisahkan sampah organik.", "Potong sampah menjadi bagian kecil.", "Masukkan ke wadah kompos.", "Jaga kelembapan dan lakukan pengadukan.", "Tunggu hingga proses pengomposan selesai."]
    },
    "Daur Ulang": {
        judul: "♻️ Cara Pengolahan",
        teks: "Sampah yang dapat didaur ulang dipilah, dibersihkan, dikeringkan, lalu disalurkan ke fasilitas yang sesuai.",
        list: ["Pisahkan berdasarkan jenis material.", "Bersihkan dari sisa kotoran.", "Keringkan sebelum disimpan.", "Kumpulkan sesuai kategori.", "Salurkan ke fasilitas daur ulang yang sesuai."]
    },
    "Bank Sampah": {
        judul: "🏦 Cara Pengolahan",
        teks: "Sampah yang memiliki nilai ekonomi dapat dipilah dan disetorkan melalui bank sampah.",
        list: ["Pilah sampah berdasarkan jenis.", "Bersihkan dan keringkan.", "Kumpulkan sampah yang bernilai.", "Timbang jika diperlukan.", "Setorkan ke bank sampah."]
    },
    "Reuse / Upcycle": {
        judul: "🔄 Cara Pengolahan",
        teks: "Barang yang masih layak digunakan dapat dimanfaatkan kembali atau diubah menjadi produk baru.",
        list: ["Pilih barang yang masih layak.", "Bersihkan barang.", "Tentukan fungsi baru.", "Gunakan kembali atau modifikasi."]
    },
    "Ecobrick": {
        judul: "🧱 Cara Pengolahan",
        teks: "Ecobrick dibuat dengan memasukkan plastik bersih dan kering ke dalam botol hingga padat.",
        list: ["Pilah plastik yang sesuai.", "Bersihkan plastik.", "Pastikan plastik benar-benar kering.", "Masukkan plastik ke dalam botol.", "Padatkan hingga cukup rapat."]
    }
};

const edukasiData = [
    { key: "organik", nomor: "01", kelas: "edu-organic", icon: "🌱", nama: "Organik", teks: "Sisa makanan, daun, dan kulit buah yang relatif mudah terurai.", aksi: "→ Komposting / Reuse", detail: "Sampah organik berasal dari bahan hayati seperti sisa makanan dan daun. Pisahkan dari material anorganik agar mudah dikelola.", contoh: "Sisa nasi, sayur, buah, daun", tips: "Hindari mencampurkan plastik atau logam ke wadah organik." },
    { key: "plastik", nomor: "02", kelas: "edu-plastic", icon: "🧴", nama: "Plastik", teks: "Botol, kemasan, dan kantong plastik yang membutuhkan waktu lama untuk terurai.", aksi: "→ Daur Ulang / Ecobrick", detail: "Sampah plastik perlu dipilah berdasarkan jenis material dan kondisi sebelum disalurkan.", contoh: "Botol PET, kemasan, kantong plastik", tips: "Kosongkan, bersihkan bila perlu, lalu keringkan sebelum disimpan." },
    { key: "kertas", nomor: "03", kelas: "edu-paper", icon: "📄", nama: "Kertas", teks: "Kertas bekas yang masih dapat dimanfaatkan atau diproses kembali.", aksi: "→ Daur Ulang / Reuse", detail: "Kertas yang kering dan relatif bersih lebih mudah dipilah dan disalurkan untuk didaur ulang atau digunakan kembali.", contoh: "Koran, kardus, kertas kantor", tips: "Pisahkan kertas dari sisa makanan dan bahan yang basah." },
    { key: "kaca", nomor: "04", kelas: "edu-glass", icon: "🍾", nama: "Kaca", teks: "Botol dan wadah kaca yang dapat dikumpulkan untuk diproses kembali.", aksi: "→ Daur Ulang / Reuse", detail: "Kaca dapat digunakan kembali atau dikumpulkan untuk diproses. Tangani pecahan dengan hati-hati.", contoh: "Botol kaca, toples, wadah kaca", tips: "Gunakan wadah aman dan beri perhatian khusus pada pecahan tajam." },
    { key: "logam", nomor: "05", kelas: "edu-metal", icon: "🥫", nama: "Logam", teks: "Kaleng dan benda berbahan logam yang memiliki nilai ekonomi.", aksi: "→ Bank Sampah / Daur Ulang", detail: "Logam dapat memiliki nilai ekonomi dan umumnya dipilah sebelum disalurkan ke bank sampah atau fasilitas daur ulang.", contoh: "Kaleng minuman, kaleng makanan, besi", tips: "Bersihkan sisa isi dan pisahkan dari sampah lainnya." }
];

const helperData = {
    "styrofoam": { kategori: "Sampah kemasan foam", saran: "Jangan dibakar. Periksa fasilitas lokal; bila tidak tersedia, kurangi penggunaan dan pisahkan dari material yang bisa didaur ulang." },
    "botol": { kategori: "Plastik", saran: "Kosongkan, bilas bila perlu, keringkan, lalu pisahkan untuk daur ulang atau bank sampah." },
    "kaleng": { kategori: "Logam", saran: "Bersihkan, keringkan, lalu setorkan ke bank sampah atau fasilitas daur ulang." },
    "kertas": { kategori: "Kertas", saran: "Pisahkan dari sisa makanan, keringkan, lalu setorkan untuk daur ulang atau reuse." },
    "sisa makanan": { kategori: "Organik", saran: "Pisahkan dari material lain dan pertimbangkan komposting." },
    "kardus": { kategori: "Kertas", saran: "Lipat dan keringkan, lalu simpan untuk reuse atau daur ulang." },
    "toples": { kategori: "Kaca", saran: "Gunakan kembali bila layak atau pisahkan untuk penyaluran kaca." },
    "besi": { kategori: "Logam", saran: "Bersihkan dan pisahkan untuk bank sampah atau daur ulang." }
};

let state = {
    jenis: "",
    kondisi: "",
    jumlah: "",
    lastResult: null,
    actionSteps: [],
    quizIndex: 0,
    quizScore: 0,
    challengeCount: 0,
    challengeCompleted: false,
    visualFile: null,
    profileName: "",
    visualCategory: "",
    ecoPoints: 0,
    quizRewarded: false
};

const QUIZ = [
    {
        q: "Botol plastik paling dekat dengan kategori apa?",
        options: ["Organik", "Plastik", "Kaca", "Kertas"],
        answer: 1
    },
    {
        q: "Apa yang sebaiknya dilakukan pada sampah sebelum didaur ulang?",
        options: ["Dibakar", "Dicampur", "Dibersihkan dan dikeringkan", "Dibuang ke sungai"],
        answer: 2
    },
    {
        q: "Sampah organik rumah tangga paling sesuai diolah dengan cara...",
        options: ["Ecobrick", "Komposting", "Peleburan logam", "Pembakaran"],
        answer: 1
    },
    {
        q: "Kriteria SAW yang memiliki bobot terbesar di EcoSmart adalah...",
        options: ["Ekonomi", "Kemudahan", "Kesesuaian", "Lingkungan"],
        answer: 3
    },
    {
        q: "Mengapa sampah sebaiknya dipilah sebelum disalurkan?",
        options: ["Agar semua sampah tercampur", "Agar lebih mudah ditangani sesuai materialnya", "Agar menjadi lebih berat", "Agar cepat dibakar"],
        answer: 1
    }
];

const defaultHistory = [];

function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(window.__ecoToast);
    window.__ecoToast = setTimeout(() => el.classList.remove("show"), 2600);
}

function tampilkanHalaman(id) {
    closeMobileNav();
    document.querySelectorAll(".page").forEach((page) => page.classList.add("hidden"));
    const target = document.getElementById(id);
    if (target) {
        target.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    document.querySelectorAll(".nav-link").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.page === id || (id === "hasil" && btn.dataset.page === "analisis"));
    });

    if (id === "dashboard") renderDashboard();
    if (id === "progress") renderProgress();
    if (id === "riwayat") renderHistory();
    if (id === "sawlab") renderSAWLab();
    if (id === "edukasi") renderEdukasi("all");
}

function toggleMobileNav(){
    const menu=document.querySelector(".nav-menu");
    const toggle=document.querySelector(".mobile-menu-toggle");
    if(!menu || !toggle) return;
    const open=menu.classList.toggle("mobile-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent=open?"✕":"☰";
}

function closeMobileNav(){
    const menu=document.querySelector(".nav-menu");
    const toggle=document.querySelector(".mobile-menu-toggle");
    if(menu) menu.classList.remove("mobile-open");
    if(toggle){
        toggle.setAttribute("aria-expanded","false");
        toggle.textContent="☰";
    }
}

function mulaiAnalisis() {
    state.jenis = "";
    state.kondisi = "";
    state.jumlah = "";
    document.querySelectorAll(".choice-card").forEach((card) => card.classList.remove("selected"));
    document.getElementById("conditionPanel")?.classList.add("hidden");
    document.getElementById("quantityPanel")?.classList.add("hidden");
    const btn = document.getElementById("analyzeButton");
    if (btn) btn.disabled = true;
    tampilkanHalaman("analisis");
}

function kembaliBeranda() { tampilkanHalaman("beranda"); }
function kembaliAnalisis() { tampilkanHalaman("analisis"); }
function bukaEdukasi() { tampilkanHalaman("edukasi"); }
function bukaDashboard() { tampilkanHalaman("dashboard"); }
function bukaRiwayat() { tampilkanHalaman("riwayat"); }
function bukaProgress() { tampilkanHalaman("progress"); }
function bukaChallenge() { tampilkanHalaman("challenge"); renderChallenge(); }
function bukaSimulasi() { if (!state.lastResult) { toast("Lakukan analisis dulu untuk memakai simulator."); return; } tampilkanHalaman("simulasi"); hitungSimulator(); }
function bukaAksi() { if (!state.lastResult) { toast("Belum ada rekomendasi untuk dijalankan."); return; } tampilkanHalaman("aksi"); renderAksi(); }
function bukaManfaat() { tampilkanHalaman("manfaat"); }
function bukaQuiz() { state.quizIndex = 0; state.quizScore = 0; state.quizRewarded = false; tampilkanHalaman("quiz"); renderQuiz(); }
function bukaHelper() { tampilkanHalaman("helper"); }
function bukaVisual() { tampilkanHalaman("visual"); }
function bukaSAWLab() { tampilkanHalaman("sawlab"); renderSAWLab(); }
function bukaTentang() { tampilkanHalaman("tentang"); }
function bukaEcoMap() { tampilkanHalaman("map"); }

function bukaProfil(){
    const modal=document.getElementById("profileModal");
    const input=document.getElementById("profileNameInput");
    if(!modal)return;
    if(input)input.value=state.profileName||localStorage.getItem("ecosmartProfileName")||"";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
    setTimeout(()=>input?.focus(),50);
}

function tutupProfil(){
    const modal=document.getElementById("profileModal");
    if(!modal)return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden","true");
}

function simpanProfil(){
    const input=document.getElementById("profileNameInput");
    const name=(input?.value||"").trim();
    if(!name){ toast("Ketik nama terlebih dahulu."); return; }
    state.profileName=name;
    localStorage.setItem("ecosmartProfileName",name);
    saveData();
    tutupProfil();
    renderDashboard();
    updateProfileButton();
    toast(`👋 Halo, ${name}! Profil tersimpan.`);
}

function updateProfileButton(){
    const btn=document.getElementById("profileButton");
    if(!btn)return;
    const name=state.profileName||localStorage.getItem("ecosmartProfileName")||"";
    btn.textContent=name?"Profil":"Masuk";
}

function updateDashboardGreeting(){
    const h=document.querySelector("#dashboard .banner-inner h1");
    if(!h)return;
    const name=state.profileName||localStorage.getItem("ecosmartProfileName")||"";
    h.textContent=name?`Halo, ${name}! 👋`:"Halo, Eco Hero! 👋";
}

function setHiddenValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

function pilihJenis(value) {
    state.jenis = value;
    setHiddenValue("jenisSampah", value);
    document.querySelectorAll('[data-choice-group="jenis"]').forEach((card) => card.classList.toggle("selected", card.dataset.value === value));
    document.getElementById("conditionPanel")?.classList.remove("hidden");
    updateStep(2);
}

function pilihKondisi(value, button) {
    state.kondisi = value;
    setHiddenValue("kondisiSampah", value);
    document.querySelectorAll("#conditionPanel .choice-card").forEach((card) => card.classList.remove("selected"));
    button?.classList.add("selected");
    document.getElementById("quantityPanel")?.classList.remove("hidden");
    updateStep(3);
}

function pilihJumlah(value, button) {
    state.jumlah = value;
    setHiddenValue("jumlahSampah", value);
    document.querySelectorAll("#quantityPanel .choice-card").forEach((card) => card.classList.remove("selected"));
    button?.classList.add("selected");
    const btn = document.getElementById("analyzeButton");
    if (btn) btn.disabled = !(state.jenis && state.kondisi && state.jumlah);
}

function updateStep(step) {
    document.querySelectorAll(".stepper .step").forEach((el, index) => el.classList.toggle("active", index < step));
}

function clamp(value, min = 1, max = 5) { return Math.max(min, Math.min(max, value)); }

function hitungKemudahan(nilaiDasar, kondisi, jumlah) {
    let nilai = nilaiDasar;
    if (kondisi === "bersih") nilai += .5;
    if (kondisi === "kotor") nilai -= .5;
    if (jumlah === "banyak") nilai -= .3;
    if (jumlah === "sedikit") nilai += .2;
    return clamp(nilai);
}

function hitungKesesuaian(jenis, kondisi, jumlah, namaAlternatif) {
    let nilai = nilaiKesesuaian?.[jenis]?.[namaAlternatif] ?? 1;
    if (kondisi === "kotor" && ["Daur Ulang", "Reuse / Upcycle", "Ecobrick"].includes(namaAlternatif)) nilai -= 1;
    if (kondisi === "bersih" && ["Daur Ulang", "Reuse / Upcycle", "Ecobrick"].includes(namaAlternatif)) nilai += .5;
    if (jumlah === "banyak" && ["Bank Sampah", "Daur Ulang"].includes(namaAlternatif)) nilai += .5;
    if (jumlah === "sedikit" && namaAlternatif === "Reuse / Upcycle") nilai += .5;
    return clamp(nilai);
}

function hitungSemuaAlternatif(jenis, kondisi, jumlah, weights = bobotDefault) {
    return alternatif.map((item) => {
        const kemudahan = hitungKemudahan(item.kemudahan, kondisi, jumlah);
        const lingkungan = item.lingkungan;
        const ekonomi = item.ekonomi;
        const kesesuaian = hitungKesesuaian(jenis, kondisi, jumlah, item.nama);
        const nKemudahan = kemudahan / 5;
        const nLingkungan = lingkungan / 5;
        const nEkonomi = ekonomi / 5;
        const nKesesuaian = kesesuaian / 5;
        const skor = (weights.kemudahan * nKemudahan) + (weights.lingkungan * nLingkungan) + (weights.ekonomi * nEkonomi) + (weights.kesesuaian * nKesesuaian);
        return { nama:item.nama, kemudahan, lingkungan, ekonomi, kesesuaian, nKemudahan, nLingkungan, nEkonomi, nKesesuaian, skor:skor*100 };
    }).sort((a,b)=>b.skor-a.skor);
}

function formatJenis(v){return ({organik:"Sampah Organik",plastik:"Sampah Plastik",kertas:"Sampah Kertas",kaca:"Sampah Kaca",logam:"Sampah Logam"}[v]||v)}
function formatKondisi(v){return ({bersih:"Bersih",sedang:"Cukup Bersih",kotor:"Kotor"}[v]||v)}
function formatJumlah(v){return ({sedikit:"Sedikit",sedang:"Sedang",banyak:"Banyak"}[v]||v)}

function prosesAnalisis() {
    if (!(state.jenis && state.kondisi && state.jumlah)) {
        toast("⚠️ Lengkapi jenis, kondisi, dan jumlah sampah dulu.");
        return;
    }

    tampilkanHalaman("proses");
    setTimeout(() => {
        const hasil = hitungSemuaAlternatif(state.jenis, state.kondisi, state.jumlah);
        state.lastResult = { jenis:state.jenis, kondisi:state.kondisi, jumlah:state.jumlah, hasil };
        saveData();
        simpanRiwayat({jenis:state.jenis,kondisi:state.kondisi,jumlah:state.jumlah,rekomendasi:hasil[0].nama,skor:Number(hasil[0].skor.toFixed(2))});
        addEcoPoints(8);
        renderHasil();
        tampilkanHalaman("hasil");
    }, 950);
}

function renderHasil() {
    const target = document.getElementById("hasilRekomendasi");
    if (!target || !state.lastResult) return;
    const {jenis,kondisi,jumlah,hasil} = state.lastResult;
    const utama = hasil[0];
    const action = langkahPengolahan[utama.nama];
    target.innerHTML = `
        <div class="result-layout">
            <div class="result-hero-card">
                <div><span class="eyebrow">REKOMENDASI UTAMA</span><h2>♻️ ${utama.nama}</h2><p>Alternatif dengan nilai preferensi SAW tertinggi berdasarkan data yang kamu masukkan.</p></div>
                <div class="score-box"><small>Skor SAW</small><strong>${utama.skor.toFixed(2)}</strong><small>/ 100</small></div>
            </div>
            <div class="result-summary"><div class="summary-item"><span>Jenis</span><strong>${formatJenis(jenis)}</strong></div><div class="summary-item"><span>Kondisi</span><strong>${formatKondisi(kondisi)}</strong></div><div class="summary-item"><span>Jumlah</span><strong>${formatJumlah(jumlah)}</strong></div></div>
            <div class="ranking-card"><div class="panel-title"><div><span class="eyebrow green">PERBANDINGAN</span><h2>Ranking Alternatif</h2></div></div><div class="ranking-list">${hasil.map((item,i)=>`<div class="rank-row"><div class="rank-number">${i+1}</div><div><strong>${item.nama}</strong><div class="rank-track"><span style="width:${item.skor}%"></span></div></div><div class="rank-score">${item.skor.toFixed(2)}</div></div>`).join("")}</div></div>
            <div class="ranking-card"><div class="panel-title"><div><span class="eyebrow blue">NEXT STEP</span><h2>Lanjutkan aksi</h2></div></div><div class="result-buttons"><button class="btn btn-secondary" onclick="bukaDetail()">🔎 Lihat Alasan</button><button class="btn btn-pink" onclick="bukaSimulasi()">🔮 What-if Simulator</button><button class="btn btn-primary" onclick="bukaAksi()">✅ Mulai Aksi</button><button class="btn btn-secondary" onclick="bukaManfaat()">🌱 Lihat Manfaat</button></div><div class="result-utility"><button class="mini-action" onclick="bagikanHasil()">📤 Bagikan</button><button class="mini-action" onclick="cetakHasil()">🖨️ Cetak</button><button class="mini-action" onclick="unduhHasil()">💾 Simpan JSON</button></div></div>
            <div class="ranking-card"><h2>${action.judul}</h2><p class="muted">${action.teks}</p><ol style="padding-left:22px;margin-top:12px">${action.list.map(x=>`<li>${x}</li>`).join("")}</ol></div>
        </div>`;
}

function bukaDetail(){
    if(!state.lastResult){toast("Belum ada hasil analisis.");return;}
    tampilkanHalaman("detail");
    renderDetail();
}

function renderDetail(){
    const target=document.getElementById("detailContent"); if(!target||!state.lastResult)return;
    const {hasil}=state.lastResult, utama=hasil[0];
    target.innerHTML=`
        <div class="panel-card"><span class="eyebrow green">KENAPA REKOMENDASI INI?</span><h2>${utama.nama} unggul berdasarkan empat kriteria.</h2><div class="criteria-grid">${[["Kesesuaian",utama.nKesesuaian,"#36a061"],["Lingkungan",utama.nLingkungan,"#4f8edb"],["Ekonomi",utama.nEkonomi,"#f09a4a"],["Kemudahan",utama.nKemudahan,"#d46cae"]].map(([n,v,c])=>`<div class="criteria-item"><div class="criteria-head"><strong>${n}</strong><span>${(v*100).toFixed(0)}%</span></div><div class="bar"><span style="width:${v*100}%;background:${c}"></span></div></div>`).join("")}</div></div>
        <div class="ranking-card"><div class="method-tabs" role="tablist" aria-label="Detail perhitungan SAW"><button class="method-tab active" role="tab" aria-selected="true" onclick="showDetailTab('bobot',this)">Bobot</button><button class="method-tab" role="tab" aria-selected="false" onclick="showDetailTab('matriks',this)">Matriks</button><button class="method-tab" role="tab" aria-selected="false" onclick="showDetailTab('normalisasi',this)">Normalisasi</button><button class="method-tab" role="tab" aria-selected="false" onclick="showDetailTab('preferensi',this)">Nilai Preferensi</button><button class="method-tab" role="tab" aria-selected="false" onclick="showDetailTab('validasi',this)">Validasi</button></div><div id="detailTabContent" role="tabpanel"></div></div>
    `;
    showDetailTab("bobot");
}

function showDetailTab(tab,button){
    if(!button){
        button=[...document.querySelectorAll(".method-tab")].find(b=>b.getAttribute("onclick")?.includes(`'${tab}'`));
    }
    document.querySelectorAll(".method-tab").forEach(b=>{b.classList.remove("active");b.setAttribute("aria-selected","false")}); if(button){button.classList.add("active");button.setAttribute("aria-selected","true")}
    const box=document.getElementById("detailTabContent"); if(!box||!state.lastResult)return;
    const hasil=state.lastResult.hasil;
    if(tab==="bobot"){
        box.innerHTML=`<div class="weight-grid"><div class="weight-item green"><strong>25%</strong><span>Kemudahan</span></div><div class="weight-item blue"><strong>30%</strong><span>Lingkungan</span></div><div class="weight-item pink"><strong>20%</strong><span>Ekonomi</span></div><div class="weight-item orange"><strong>25%</strong><span>Kesesuaian</span></div></div><div class="formula">Vᵢ = Σ (Wⱼ × Rᵢⱼ)</div>`;
    } else if(tab==="matriks"){
        box.innerHTML=tableHTML(hasil,false);
    } else if(tab==="normalisasi"){
        box.innerHTML=tableHTML(hasil,true);
    } else if(tab==="validasi"){
        box.innerHTML=`<div class="validation-grid"><div class="validation-item"><strong>✅ Bobot</strong><span>25% + 30% + 20% + 25% = 100%</span></div><div class="validation-item"><strong>✅ Normalisasi</strong><span>Setiap nilai berada pada rentang 0–1 karena dibagi nilai maksimum 5.</span></div><div class="validation-item"><strong>✅ Kriteria</strong><span>Kemudahan, Lingkungan, Ekonomi, dan Kesesuaian digunakan sebagai benefit.</span></div></div><div class="helper-result-card" style="margin-top:14px"><strong>Interpretasi</strong><p style="margin-top:6px;color:#63736a">Nilai preferensi akhir merupakan penjumlahan kontribusi bobot × nilai normalisasi. Ranking diurutkan dari skor tertinggi ke terendah.</p></div>`;
    } else {
        box.innerHTML=`<div class="history-list">${hasil.map((x,i)=>`<div class="history-item"><div class="history-icon">${i===0?"🏆":"♻️"}</div><div><strong>${x.nama}</strong><small>V = ${x.skor.toFixed(4)} / 100</small></div><b>${x.skor.toFixed(2)}</b></div>`).join("")}</div><p class="muted" style="margin-top:14px">Nilai terbesar menjadi rekomendasi utama.</p>`;
    }
}

function tableHTML(hasil,normalized){
    return `<div class="table-wrap"><table class="saw-table"><thead><tr><th>Alternatif</th><th>${normalized?"R1":"C1"}</th><th>${normalized?"R2":"C2"}</th><th>${normalized?"R3":"C3"}</th><th>${normalized?"R4":"C4"}</th></tr></thead><tbody>${hasil.map(x=>`<tr><td>${x.nama}</td><td>${(normalized?x.nKemudahan:x.kemudahan).toFixed(normalized?3:1)}</td><td>${(normalized?x.nLingkungan:x.lingkungan).toFixed(normalized?3:1)}</td><td>${(normalized?x.nEkonomi:x.ekonomi).toFixed(normalized?3:1)}</td><td>${(normalized?x.nKesesuaian:x.kesesuaian).toFixed(normalized?3:1)}</td></tr>`).join("")}</tbody></table></div>`;
}

function simpanRiwayat(data){
    try{
        const history=JSON.parse(localStorage.getItem("ecosmartHistory")||"[]");
        history.unshift({...data,waktu:new Date().toLocaleString("id-ID")});
        localStorage.setItem("ecosmartHistory",JSON.stringify(history.slice(0,30)));
    }catch(e){}
}
function getHistory(){try{return JSON.parse(localStorage.getItem("ecosmartHistory")||"[]")}catch(e){return []}}
function saveData(){localStorage.setItem("ecosmartState",JSON.stringify({lastResult:state.lastResult,challengeCount:state.challengeCount,challengeCompleted:state.challengeCompleted,quizScore:state.quizScore,actionSteps:state.actionSteps||[],profileName:state.profileName||"",ecoPoints:Number(state.ecoPoints||0)}))}
function loadData(){try{const saved=JSON.parse(localStorage.getItem("ecosmartState")||"{}");state={...state,...saved};if(!Number.isFinite(Number(state.ecoPoints)))state.ecoPoints=0;}catch(e){}}
function getEcoPoints(){const stored=Number(localStorage.getItem("ecoPoints"));if(Number.isFinite(stored)&&stored>0)return stored;const h=getHistory();const actions=Number(localStorage.getItem("ecoActionCompleted")||0);const challenges=Number(localStorage.getItem("ecoChallengeCompleted")||0);const quizzes=Number(localStorage.getItem("ecoQuizCompleted")||0);return h.length*8+actions*15+challenges*20+quizzes*Number(state.quizScore||0)*5}
function addEcoPoints(amount){const next=Math.max(0,getEcoPoints()+Number(amount||0));state.ecoPoints=next;localStorage.setItem("ecoPoints",String(next));saveData();updateEcoScore();return next}
function updateEcoScore(){const sc=document.getElementById("dashEcoScore");if(sc)sc.textContent=780+getEcoPoints();}
function getProgress(){const h=getHistory();const actions=Number(localStorage.getItem("ecoActionCompleted")||0);const challenges=Number(localStorage.getItem("ecoChallengeCompleted")||0);const quizzes=Number(localStorage.getItem("ecoQuizCompleted")||0);return Math.min(100,h.length*8+actions*10+challenges*10+quizzes*8)}
function badgeCount(){let n=1;const h=getHistory();const actions=Number(localStorage.getItem("ecoActionCompleted")||0);const challenges=Number(localStorage.getItem("ecoChallengeCompleted")||0);if(h.length>=3)n++;if(actions>=1)n++;if(challenges>=1)n++;if(h.length>=10)n++;return n}

function renderDashboard(){
    updateDashboardGreeting();
    updateProfileButton();
    const h=getHistory();const progress=getProgress();
    const ana=document.getElementById("dashAnalisis"); if(ana)ana.textContent=h.length;
    const ch=document.getElementById("dashChallenge"); if(ch)ch.textContent=Number(localStorage.getItem("ecoChallengeCompleted")||0);
    const bc=document.getElementById("dashBadge"); if(bc)bc.textContent=badgeCount();
    const sc=document.getElementById("dashEcoScore"); if(sc)sc.textContent=780+getEcoPoints();
    const pt=document.getElementById("dashProgressText");if(pt)pt.textContent=progress+"%";
    const pf=document.getElementById("dashProgressFill");if(pf)pf.style.width=progress+"%";
    const list=document.getElementById("dashboardHistory");if(list)list.innerHTML=historyHTML(h.slice(0,4));
}
function historyHTML(h){return h.length?h.map((x,i)=>`<div class="history-item"><div class="history-icon">♻️</div><div><strong>${formatJenis(x.jenis)} → ${x.rekomendasi}</strong><small>${x.waktu} • ${formatKondisi(x.kondisi)} • ${formatJumlah(x.jumlah)}</small></div><div class="history-actions"><b>${Number(x.skor).toFixed(2)}</b><button class="mini-action" onclick="bukaRiwayatItem(${i})">Lihat</button></div></div>`).join(""):"<p class='muted'>Belum ada analisis. Mulai dari halaman Analisis.</p>"}
function bukaRiwayatItem(index){const h=getHistory();const item=h[index];if(!item){toast("Riwayat tidak ditemukan.");return}const hasil=hitungSemuaAlternatif(item.jenis,item.kondisi,item.jumlah);state.lastResult={jenis:item.jenis,kondisi:item.kondisi,jumlah:item.jumlah,hasil};saveData();renderHasil();tampilkanHalaman("hasil");toast("📖 Hasil riwayat dibuka kembali.")}
function renderHistory(){const el=document.getElementById("historyFull");if(el)el.innerHTML=historyHTML(getHistory())}
function hapusRiwayat(){localStorage.removeItem("ecosmartHistory");renderHistory();renderDashboard();toast("Riwayat dihapus.")}

function hitungSimulator(){
    if(!state.lastResult)return;
    const kondisiEl=document.getElementById("simKondisi");
    const jumlahEl=document.getElementById("simJumlah");
    if(!kondisiEl||!jumlahEl)return;
    const kondisiBaru=kondisiEl.value;
    const jumlahBaru=jumlahEl.value;
    const base=state.lastResult;
    const hasilBaru=hitungSemuaAlternatif(base.jenis,kondisiBaru,jumlahBaru);
    const sebelum=base.hasil[0];
    const sesudah=hasilBaru[0];
    const delta=sesudah.skor-sebelum.skor;
    const box=document.getElementById("simResult");
    if(box){box.innerHTML=`<div class="compare-box"><small>Sebelum</small><strong>${sebelum.nama}</strong><span>${sebelum.skor.toFixed(2)}</span></div><div class="diff">→</div><div class="compare-box after"><small>Sesudah</small><strong>${sesudah.nama}</strong><span>${sesudah.skor.toFixed(2)}</span></div><div style="grid-column:1/-1;text-align:center;margin-top:8px"><b>Perubahan skor: ${delta>=0?"+":""}${delta.toFixed(2)} poin</b></div><div style="grid-column:1/-1;text-align:center;color:#63736a;font-size:13px">${formatKondisi(base.kondisi)} → ${formatKondisi(kondisiBaru)} • ${formatJumlah(base.jumlah)} → ${formatJumlah(jumlahBaru)}</div>`}
    const insight=document.getElementById("simInsight");
    if(insight){
        if(sesudah.nama!==sebelum.nama){
            insight.innerHTML=`Perubahan parameter membuat rekomendasi utama bergeser dari <b>${sebelum.nama}</b> menjadi <b>${sesudah.nama}</b>.`;
        }else{
            insight.innerHTML=`Rekomendasi utama tetap <b>${sesudah.nama}</b>. Perubahan parameter menghasilkan ${delta>=0?"kenaikan":"penurunan"} skor sebesar <b>${Math.abs(delta).toFixed(2)} poin</b>.`;
        }
    }
}

function renderAksi(){
    const utama=state.lastResult?.hasil?.[0];if(!utama)return;
    const steps=(langkahPengolahan[utama.nama]?.list||[]).map((x)=>({text:x,done:false}));
    if(!Array.isArray(state.actionSteps)||state.actionSteps.length!==steps.length)state.actionSteps=steps;
    const title=document.getElementById("aksiTitle");if(title)title.textContent=`${utama.nama} → Aksimu`;
    const sub=document.getElementById("aksiSubtitle");if(sub)sub.textContent=langkahPengolahan[utama.nama]?.teks||"Ikuti langkah pengolahan.";
    const box=document.getElementById("actionSteps");if(box)box.innerHTML=state.actionSteps.map((s,i)=>`<div class="action-step ${s.done?"done":""}"><span>${i+1}</span><div><strong>${s.text}</strong></div><button onclick="toggleActionStep(${i})">${s.done?"✓":"○"}</button></div>`).join("");
    updateActionProgress();
}
function toggleActionStep(i){state.actionSteps[i].done=!state.actionSteps[i].done;saveData();renderAksi()}
function updateActionProgress(){const done=(state.actionSteps||[]).filter(x=>x.done).length;const total=(state.actionSteps||[]).length;const p=total?Math.round(done/total*100):0;const f=document.getElementById("actionProgressFill");const t=document.getElementById("actionProgressText");if(f)f.style.width=p+"%";if(t)t.textContent=p+"%"}
function selesaiAksi(){const done=(state.actionSteps||[]).filter(x=>x.done).length;const total=(state.actionSteps||[]).length;if(!total||done<total){toast("Selesaikan semua langkah dulu.");return}const old=Number(localStorage.getItem("ecoActionCompleted")||0);localStorage.setItem("ecoActionCompleted",String(old+1));state.actionSteps=[];addEcoPoints(15);toast("🎉 Aksi selesai! +15 Eco Point");renderDashboard()}

function renderEdukasi(filter="all"){
    const grid=document.getElementById("educationGrid");if(!grid)return;
    const list=edukasiData.filter(x=>filter==="all"||x.key===filter);
    grid.innerHTML=list.map(x=>`<article class="edu-card ${x.kelas}"><div class="edu-visual"></div><div class="edu-content"><span>${x.nomor}</span><h2>${x.icon} ${x.nama}</h2><p>${x.teks}</p><strong>${x.aksi}</strong><div class="edu-action"><small>Pelajari lebih lanjut</small><button onclick="lihatEdukasiDetail('${x.key}')">Lihat →</button></div></div></article>`).join("");
}
function filterEdukasi(filter,button){document.querySelectorAll(".pill").forEach(x=>x.classList.remove("active"));button?.classList.add("active");renderEdukasi(filter)}
function lihatEdukasiDetail(key){
    const x=edukasiData.find(y=>y.key===key);
    const modal=document.getElementById("eduDetailModal");
    const content=document.getElementById("eduDetailContent");
    if(!x||!modal||!content)return;
    content.innerHTML=`<span class="eyebrow green">${x.nomor} • ${x.nama.toUpperCase()}</span><h2 id="eduDetailTitle">${x.icon} ${x.nama}</h2><p class="muted" style="margin-top:8px">${x.detail}</p><div class="helper-result-card" style="margin-top:16px"><strong>Contoh</strong><p style="margin-top:6px">${x.contoh}</p></div><div class="helper-result-card" style="margin-top:10px;background:#fff7fb;border-color:#f0dce9"><strong>Tips</strong><p style="margin-top:6px">${x.tips}</p></div><p style="margin-top:16px"><strong>Alternatif:</strong> ${x.aksi.replace("→ ","")}</p>`;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
} 
function tutupEduDetail(){const modal=document.getElementById("eduDetailModal");if(!modal)return;modal.classList.add("hidden");modal.setAttribute("aria-hidden","true")}

function renderQuiz(){
    const box=document.getElementById("quizContent");
    if(!box)return;

    if(state.quizIndex>=QUIZ.length){
        const gained=state.quizScore*5;
        localStorage.setItem("ecoQuizCompleted","1");
        if(!state.quizRewarded){
            addEcoPoints(gained);
            state.quizRewarded=true;
            saveData();
        }
        box.innerHTML=`
            <div class="quiz-result">
                <div class="quiz-score">${state.quizScore}/${QUIZ.length}</div>
                <h2>✨ Quiz selesai</h2>
                <p>Kamu mendapatkan <b>+${gained} Eco Point</b>.</p>
                <p class="quiz-summary-text">
                    Jawaban benar: ${state.quizScore} dari ${QUIZ.length} soal.
                </p>
                <button class="btn btn-primary" onclick="bukaDashboard()">
                    Kembali ke Dashboard
                </button>
            </div>`;
        return;
    }

    const q=QUIZ[state.quizIndex];
    const progress=Math.round((state.quizIndex/QUIZ.length)*100);

    box.innerHTML=`
        <div class="quiz-progress-head">
            <span class="eyebrow pink">PERTANYAAN ${state.quizIndex+1}/${QUIZ.length}</span>
            <strong>${progress}%</strong>
        </div>
        <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width:${progress}%"></div>
        </div>
        <h2>${q.q}</h2>
        <div class="quiz-options">
            ${q.options.map((o,i)=>`
                <button class="quiz-option" onclick="jawabQuiz(${i})">
                    ${String.fromCharCode(65+i)}. ${o}
                </button>`).join("")}
        </div>`;
}
function jawabQuiz(i){const q=QUIZ[state.quizIndex];if(i===q.answer){state.quizScore++;toast("✅ Benar!")}else toast("🌱 Belum tepat, coba lagi di soal berikutnya.");state.quizIndex++;saveData();setTimeout(renderQuiz,250)}

function cariSampah(){const raw=(document.getElementById("helperInput")?.value||"").trim().toLowerCase();const out=document.getElementById("helperResult");if(!out)return;if(!raw){out.innerHTML="<div class='helper-result-card'>Ketik nama barang terlebih dahulu.</div>";return}const key=Object.keys(helperData).find(k=>raw.includes(k))||null;if(!key){out.innerHTML=`<div class='helper-result-card'><strong>Belum ada data khusus untuk “${raw}”.</strong><p style="margin-top:6px;color:#63736a">Coba kata seperti botol, kaleng, kertas, styrofoam, atau sisa makanan.</p></div>`;return}const d=helperData[key];out.innerHTML=`<div class='helper-result-card'><h3>📦 ${raw}</h3><p><b>Kategori:</b> ${d.kategori}</p><p style='margin-top:6px'><b>Panduan:</b> ${d.saran}</p></div>`}

function previewFoto(event){
    const file=event.target.files?.[0];
    if(!file)return;
    if(file.size>5*1024*1024){toast("Ukuran foto maksimal 5 MB.");event.target.value="";return;}
    const ext=(file.name||"").toLowerCase();
    const allowed=[".jpg",".jpeg",".png",".webp"];
    if(!allowed.some(x=>ext.endsWith(x))){toast("Gunakan JPG, PNG, atau WEBP.");event.target.value="";return;}
    state.visualFile=file;
    const out=document.getElementById("visualPreview");
    if(out){const url=URL.createObjectURL(file);out.innerHTML=`<img src="${url}" alt="Preview foto sampah"><p class="muted">${file.name}</p>`;}
    renderVisualActions();
}
function renderVisualActions(){
    const box=document.getElementById("visualActions");
    if(!box)return;
    box.innerHTML=`<p style="margin:16px 0 10px"><strong>Konfirmasi kategori dari foto:</strong></p><div class="visual-category-grid">${edukasiData.map(x=>`<button class="btn btn-secondary" onclick="konfirmasiKategoriVisual('${x.key}')">${x.icon} ${x.nama}</button>`).join("")}</div>`;
}
function konfirmasiKategoriVisual(key){
    if(!state.visualFile){toast("Pilih foto dulu.");return;}
    state.visualCategory=key;
    const kondisi=state.lastResult?.kondisi||"bersih";
    const jumlah=state.lastResult?.jumlah||"sedang";
    const hasil=hitungSemuaAlternatif(key,kondisi,jumlah);
    const top=hasil[0];
    const out=document.getElementById("visualResult");
    if(out){out.innerHTML=`<div class="helper-result-card"><span class="eyebrow blue">HASIL REFERENSI</span><h3 style="margin-top:8px">${edukasiData.find(x=>x.key===key)?.icon||"📦"} ${formatJenis(key)}</h3><p style="margin-top:8px">Dengan kondisi <b>${formatKondisi(kondisi)}</b> dan jumlah <b>${formatJumlah(jumlah)}</b>, rekomendasi awal yang dihitung EcoSmart adalah:</p><div style="margin-top:12px;padding:14px;border-radius:14px;background:#eff8f0"><strong>${top.nama}</strong><span style="float:right">${top.skor.toFixed(2)}</span></div><small style="display:block;margin-top:10px;color:#63736a">Identifikasi visual pada versi ini bersifat berbantuan: foto dipreview lalu kategori dikonfirmasi oleh pengguna sebelum dihitung.</small></div>`;}
    toast(`✅ Kategori ${formatJenis(key)} dikonfirmasi.`);
}
function gunakanFoto(){
    if(!state.visualFile){toast("Pilih foto dulu.");return;}
    renderVisualActions();
    document.getElementById("visualActions")?.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function renderChallenge(){const row=document.getElementById("bottleRow");if(row)row.innerHTML=Array.from({length:5},(_,i)=>`<span class="bottle ${i<state.challengeCount?"done":""}">🧴</span>`).join("");const st=document.getElementById("challengeStatus");if(st)st.textContent=`${state.challengeCount} / 5`}
function tambahChallenge(){if(state.challengeCompleted){toast("🏆 Challenge hari ini sudah selesai.");return}state.challengeCount=Math.min(5,state.challengeCount+1);if(state.challengeCount===5){state.challengeCompleted=true;const old=Number(localStorage.getItem("ecoChallengeCompleted")||0);localStorage.setItem("ecoChallengeCompleted",String(old+1));addEcoPoints(20);toast("🏆 Challenge selesai! +20 Eco Point")}saveData();renderChallenge()}

function renderProgress(){const p=getProgress();const ring=document.getElementById("progressRingText");const ringBox=document.querySelector(".progress-ring");if(ring)ring.textContent=p+"%";if(ringBox)ringBox.style.setProperty("--ring",`${p*3.6}deg`);const list=document.getElementById("badgeList");if(!list)return;const h=getHistory(),a=Number(localStorage.getItem("ecoActionCompleted")||0),c=Number(localStorage.getItem("ecoChallengeCompleted")||0);const badges=[{i:"🌱",n:"Eco Beginner",ok:true},{i:"🔎",n:"Eco Analyst",ok:h.length>=3},{i:"✅",n:"Eco Action",ok:a>=1},{i:"🏆",n:"Eco Champion",ok:c>=1},{i:"🌍",n:"Eco Master",ok:h.length>=10}];list.innerHTML=badges.map(b=>`<div class="badge ${b.ok?"":"locked"}"><span>${b.i}</span><strong>${b.n}</strong></div>`).join("")}

function pilihFasilitas(button,nama,jarak,jenis){document.querySelectorAll(".facility").forEach(b=>b.classList.remove("active"));button?.classList.add("active");const label=document.querySelector(".map-label");if(label)label.innerHTML=`${nama}<br><small>${jarak} • ${jenis}</small>`;toast(`${nama} dipilih.`)}

function renderSAWLab(){const box=document.getElementById("weightControls"),result=document.getElementById("sawLabResult");if(!box||!result)return;box.innerHTML=`<span class="eyebrow green">BOBOT KRITERIA</span>${[["kemudahan","Kemudahan",25],["lingkungan","Lingkungan",30],["ekonomi","Ekonomi",20],["kesesuaian","Kesesuaian",25]].map(([k,n,v])=>`<div class="weight-control"><label>${n}</label><input id="w_${k}" type="range" min="0" max="60" value="${v}" oninput="document.getElementById('v_${k}').textContent=this.value+'%'"><b id="v_${k}">${v}%</b></div>`).join("")}<p class="muted">Bobot akan dinormalisasi agar totalnya kembali menjadi 100% saat dihitung.</p>`;hitungUlangSAWLab()}
function hitungUlangSAWLab(){const get=(k)=>Number(document.getElementById("w_"+k)?.value||0);const raw={kemudahan:get("kemudahan"),lingkungan:get("lingkungan"),ekonomi:get("ekonomi"),kesesuaian:get("kesesuaian")};const total=Object.values(raw).reduce((a,b)=>a+b,0)||100;const weights={kemudahan:raw.kemudahan/total,lingkungan:raw.lingkungan/total,ekonomi:raw.ekonomi/total,kesesuaian:raw.kesesuaian/total};const base=state.lastResult||{jenis:"plastik",kondisi:"bersih",jumlah:"sedang"};const hasil=hitungSemuaAlternatif(base.jenis,base.kondisi,base.jumlah,weights);const result=document.getElementById("sawLabResult");if(result)result.innerHTML=`<p class='muted'>Input simulasi: ${formatJenis(base.jenis)} • ${formatKondisi(base.kondisi)} • ${formatJumlah(base.jumlah)}</p><div class='history-list'>${hasil.map((x,i)=>`<div class='history-item'><div class='history-icon'>${i===0?"🏆":"♻️"}</div><div><strong>${i+1}. ${x.nama}</strong><small>Nilai preferensi simulasi</small></div><b>${x.skor.toFixed(2)}</b></div>`).join("")}</div>`}

function getShareText(){
    const r=state.lastResult;
    if(!r||!r.hasil?.length)return "EcoSmart — belum ada hasil analisis.";
    const top=r.hasil[0];
    return `EcoSmart — ${formatJenis(r.jenis)} (${formatKondisi(r.kondisi)}, ${formatJumlah(r.jumlah)}): rekomendasi ${top.nama} dengan skor SAW ${top.skor.toFixed(2)}/100.`;
}
async function bagikanHasil(){
    if(!state.lastResult){toast("Belum ada hasil untuk dibagikan.");return;}
    const text=getShareText();
    try{
        if(navigator.share){await navigator.share({title:"Hasil EcoSmart",text});toast("📤 Ringkasan siap dibagikan.");return;}
        if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);toast("📋 Ringkasan disalin ke clipboard.");return;}
        const ta=document.createElement("textarea");
        ta.value=text;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";
        document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
        toast("📋 Ringkasan disalin ke clipboard.");
    }catch(e){toast("Bagikan dibatalkan atau clipboard tidak tersedia.");}
}
function cetakHasil(){
    if(!state.lastResult){toast("Belum ada hasil untuk dicetak.");return;}
    document.body.classList.add("print-result");
    setTimeout(()=>window.print(),80);
    setTimeout(()=>document.body.classList.remove("print-result"),1200);
}
function unduhHasil(){
    const r=state.lastResult;
    if(!r||!r.hasil?.length){toast("Belum ada hasil untuk disimpan.");return;}
    const payload={
        aplikasi:"EcoSmart",
        metode:"Simple Additive Weighting (SAW)",
        input:{jenis:formatJenis(r.jenis),kondisi:formatKondisi(r.kondisi),jumlah:formatJumlah(r.jumlah)},
        rekomendasi:r.hasil[0].nama,
        skor:Number(r.hasil[0].skor.toFixed(2)),
        ranking:r.hasil.map((x,i)=>({peringkat:i+1,alternatif:x.nama,skor:Number(x.skor.toFixed(2)),kemudahan:x.kemudahan,lingkungan:x.lingkungan,ekonomi:x.ekonomi,kesesuaian:x.kesesuaian}))
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    const stamp=new Date().toISOString().slice(0,10);
    a.href=url;a.download=`ecosmart-hasil-${stamp}.json`;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),500);
    toast("💾 Hasil analisis disimpan sebagai JSON.");
}

function resetSemuaData(){
    const yakin=window.confirm("Hapus profil, riwayat, progress, challenge, dan data EcoSmart di browser ini?");
    if(!yakin)return;
    ["ecosmartState","ecosmartHistory","ecosmartProfileName","ecoActionCompleted","ecoChallengeCompleted","ecoQuizCompleted","ecoPoints"].forEach(k=>localStorage.removeItem(k));
    state={jenis:"",kondisi:"",jumlah:"",lastResult:null,actionSteps:[],quizIndex:0,quizScore:0,challengeCount:0,challengeCompleted:false,visualFile:null,profileName:"",visualCategory:"",ecoPoints:0,quizRewarded:false};
    tutupProfil();
    renderDashboard();renderProgress();renderChallenge();renderHistory();
    toast("🧹 Data EcoSmart di browser ini sudah direset.");
}


let deferredInstallPrompt = null;
function bagikanEcoSmart(){
    const data={title:"EcoSmart — Kelola Sampah Lebih Cerdas",text:"Coba EcoSmart untuk menganalisis dan memilih alternatif pengelolaan sampah dengan metode SAW.",url:location.href};
    if(navigator.share){navigator.share(data).then(()=>toast("📤 Link EcoSmart siap dibagikan.")).catch(()=>{});return;}
    if(navigator.clipboard?.writeText){navigator.clipboard.writeText(location.href).then(()=>toast("🔗 Link EcoSmart disalin.")).catch(()=>toast("🔗 Salin alamat halaman dari browser untuk membagikannya."));return;}
    toast("🔗 Salin alamat halaman dari browser untuk membagikannya.");
}
function tutupInstallBanner(){document.getElementById("installBanner")?.classList.add("hidden");localStorage.setItem("ecoInstallDismissed","1");}
async function pasangAplikasi(){
    if(!deferredInstallPrompt){toast("📲 Browser ini belum menyediakan pemasangan otomatis.");return;}
    deferredInstallPrompt.prompt();
    const result=await deferredInstallPrompt.userChoice;
    if(result?.outcome==="accepted") toast("✅ EcoSmart ditambahkan ke perangkat.");
    deferredInstallPrompt=null;
    document.getElementById("installAppButton")?.classList.add("hidden");
    document.getElementById("installBanner")?.classList.add("hidden");
}

function updateNavForPage(id){document.querySelectorAll(".nav-link").forEach((b)=>b.classList.toggle("active",b.dataset.page===id||(id==="hasil"&&b.dataset.page==="analisis")))}

window.addEventListener("beforeinstallprompt", (e)=>{
    e.preventDefault();
    deferredInstallPrompt=e;
    document.getElementById("installAppButton")?.classList.remove("hidden");
    if(!localStorage.getItem("ecoInstallDismissed")) document.getElementById("installBanner")?.classList.remove("hidden");
});
window.addEventListener("appinstalled",()=>{
    deferredInstallPrompt=null;
    document.getElementById("installAppButton")?.classList.add("hidden");
    document.getElementById("installBanner")?.classList.add("hidden");
    toast("📲 EcoSmart sudah terpasang.");
});
window.addEventListener("DOMContentLoaded",()=>{
    loadData();
    state.profileName=state.profileName||localStorage.getItem("ecosmartProfileName")||"";
    tampilkanHalaman("beranda");
    renderDashboard();
    renderChallenge();
    renderEdukasi("all");
    renderProgress();
    updateProfileButton();
    updateEcoScore();
    if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{});}
    document.addEventListener("keydown",(e)=>{if(e.key==="Escape"){tutupProfil();tutupEduDetail();closeMobileNav();}});
});

Object.assign(window, {
    tampilkanHalaman, mulaiAnalisis, kembaliBeranda, kembaliAnalisis, bukaEdukasi, bukaDashboard, bukaRiwayat, bukaProgress, bukaChallenge, bukaSimulasi, bukaAksi, bukaManfaat, bukaQuiz, bukaHelper, bukaVisual, bukaSAWLab, bukaTentang,
    pilihJenis, pilihKondisi, pilihJumlah, prosesAnalisis, toggleMobileNav, closeMobileNav, bukaDetail, showDetailTab, hitungSimulator, toggleActionStep, selesaiAksi, filterEdukasi, lihatEdukasiDetail, jawabQuiz, cariSampah, previewFoto, gunakanFoto, tambahChallenge, hapusRiwayat, pilihFasilitas, hitungUlangSAWLab, bukaEcoMap, bukaProfil, tutupProfil, simpanProfil, bukaRiwayatItem, konfirmasiKategoriVisual, renderVisualActions, tutupEduDetail, lihatEdukasiDetail, bagikanHasil, cetakHasil, unduhHasil, resetSemuaData
});
