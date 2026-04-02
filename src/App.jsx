import { useState, useEffect, useRef } from "react";

// ─── 114 SURAHS ───────────────────────────────────────────────────────────────
const SURAHS = [
  { id: 1,   name: "الفاتحة",    nameEn: "Al-Fatiha",        verses: 7,   type: "short" },
  { id: 2,   name: "البقرة",     nameEn: "Al-Baqarah",       verses: 286, type: "long"  },
  { id: 3,   name: "آل عمران",   nameEn: "Ali 'Imran",       verses: 200, type: "long"  },
  { id: 4,   name: "النساء",     nameEn: "An-Nisa",          verses: 176, type: "long"  },
  { id: 5,   name: "المائدة",    nameEn: "Al-Ma'idah",       verses: 120, type: "long"  },
  { id: 6,   name: "الأنعام",    nameEn: "Al-An'am",         verses: 165, type: "long"  },
  { id: 7,   name: "الأعراف",    nameEn: "Al-A'raf",         verses: 206, type: "long"  },
  { id: 8,   name: "الأنفال",    nameEn: "Al-Anfal",         verses: 75,  type: "medium"},
  { id: 9,   name: "التوبة",     nameEn: "At-Tawbah",        verses: 129, type: "long"  },
  { id: 10,  name: "يونس",       nameEn: "Yunus",            verses: 109, type: "long"  },
  { id: 11,  name: "هود",        nameEn: "Hud",              verses: 123, type: "long"  },
  { id: 12,  name: "يوسف",       nameEn: "Yusuf",            verses: 111, type: "long"  },
  { id: 13,  name: "الرعد",      nameEn: "Ar-Ra'd",          verses: 43,  type: "medium"},
  { id: 14,  name: "إبراهيم",    nameEn: "Ibrahim",          verses: 52,  type: "medium"},
  { id: 15,  name: "الحجر",      nameEn: "Al-Hijr",          verses: 99,  type: "long"  },
  { id: 16,  name: "النحل",      nameEn: "An-Nahl",          verses: 128, type: "long"  },
  { id: 17,  name: "الإسراء",    nameEn: "Al-Isra",          verses: 111, type: "long"  },
  { id: 18,  name: "الكهف",      nameEn: "Al-Kahf",          verses: 110, type: "long"  },
  { id: 19,  name: "مريم",       nameEn: "Maryam",           verses: 98,  type: "long"  },
  { id: 20,  name: "طه",         nameEn: "Ta-Ha",            verses: 135, type: "long"  },
  { id: 21,  name: "الأنبياء",   nameEn: "Al-Anbya",         verses: 112, type: "long"  },
  { id: 22,  name: "الحج",       nameEn: "Al-Hajj",          verses: 78,  type: "medium"},
  { id: 23,  name: "المؤمنون",   nameEn: "Al-Mu'minun",      verses: 118, type: "long"  },
  { id: 24,  name: "النور",      nameEn: "An-Nur",           verses: 64,  type: "medium"},
  { id: 25,  name: "الفرقان",    nameEn: "Al-Furqan",        verses: 77,  type: "medium"},
  { id: 26,  name: "الشعراء",    nameEn: "Ash-Shu'ara",      verses: 227, type: "long"  },
  { id: 27,  name: "النمل",      nameEn: "An-Naml",          verses: 93,  type: "long"  },
  { id: 28,  name: "القصص",      nameEn: "Al-Qasas",         verses: 88,  type: "medium"},
  { id: 29,  name: "العنكبوت",   nameEn: "Al-Ankabut",       verses: 69,  type: "medium"},
  { id: 30,  name: "الروم",      nameEn: "Ar-Rum",           verses: 60,  type: "medium"},
  { id: 31,  name: "لقمان",      nameEn: "Luqman",           verses: 34,  type: "medium"},
  { id: 32,  name: "السجدة",     nameEn: "As-Sajdah",        verses: 30,  type: "medium"},
  { id: 33,  name: "الأحزاب",    nameEn: "Al-Ahzab",         verses: 73,  type: "medium"},
  { id: 34,  name: "سبأ",        nameEn: "Saba",             verses: 54,  type: "medium"},
  { id: 35,  name: "فاطر",       nameEn: "Fatir",            verses: 45,  type: "medium"},
  { id: 36,  name: "يس",         nameEn: "Ya-Sin",           verses: 83,  type: "medium"},
  { id: 37,  name: "الصافات",    nameEn: "As-Saffat",        verses: 182, type: "long"  },
  { id: 38,  name: "ص",          nameEn: "Sad",              verses: 88,  type: "medium"},
  { id: 39,  name: "الزمر",      nameEn: "Az-Zumar",         verses: 75,  type: "medium"},
  { id: 40,  name: "غافر",       nameEn: "Ghafir",           verses: 85,  type: "medium"},
  { id: 41,  name: "فصلت",       nameEn: "Fussilat",         verses: 54,  type: "medium"},
  { id: 42,  name: "الشورى",     nameEn: "Ash-Shuraa",       verses: 53,  type: "medium"},
  { id: 43,  name: "الزخرف",     nameEn: "Az-Zukhruf",       verses: 89,  type: "medium"},
  { id: 44,  name: "الدخان",     nameEn: "Ad-Dukhan",        verses: 59,  type: "medium"},
  { id: 45,  name: "الجاثية",    nameEn: "Al-Jathiyah",      verses: 37,  type: "medium"},
  { id: 46,  name: "الأحقاف",    nameEn: "Al-Ahqaf",         verses: 35,  type: "medium"},
  { id: 47,  name: "محمد",       nameEn: "Muhammad",         verses: 38,  type: "medium"},
  { id: 48,  name: "الفتح",      nameEn: "Al-Fath",          verses: 29,  type: "medium"},
  { id: 49,  name: "الحجرات",    nameEn: "Al-Hujurat",       verses: 18,  type: "short" },
  { id: 50,  name: "ق",          nameEn: "Qaf",              verses: 45,  type: "medium"},
  { id: 51,  name: "الذاريات",   nameEn: "Adh-Dhariyat",     verses: 60,  type: "medium"},
  { id: 52,  name: "الطور",      nameEn: "At-Tur",           verses: 49,  type: "medium"},
  { id: 53,  name: "النجم",      nameEn: "An-Najm",          verses: 62,  type: "medium"},
  { id: 54,  name: "القمر",      nameEn: "Al-Qamar",         verses: 55,  type: "medium"},
  { id: 55,  name: "الرحمن",     nameEn: "Ar-Rahman",        verses: 78,  type: "medium"},
  { id: 56,  name: "الواقعة",    nameEn: "Al-Waqi'ah",       verses: 96,  type: "long"  },
  { id: 57,  name: "الحديد",     nameEn: "Al-Hadid",         verses: 29,  type: "medium"},
  { id: 58,  name: "المجادلة",   nameEn: "Al-Mujadila",      verses: 22,  type: "medium"},
  { id: 59,  name: "الحشر",      nameEn: "Al-Hashr",         verses: 24,  type: "medium"},
  { id: 60,  name: "الممتحنة",   nameEn: "Al-Mumtahanah",    verses: 13,  type: "short" },
  { id: 61,  name: "الصف",       nameEn: "As-Saf",           verses: 14,  type: "short" },
  { id: 62,  name: "الجمعة",     nameEn: "Al-Jumu'ah",       verses: 11,  type: "short" },
  { id: 63,  name: "المنافقون",  nameEn: "Al-Munafiqun",     verses: 11,  type: "short" },
  { id: 64,  name: "التغابن",    nameEn: "At-Taghabun",      verses: 18,  type: "short" },
  { id: 65,  name: "الطلاق",     nameEn: "At-Talaq",         verses: 12,  type: "short" },
  { id: 66,  name: "التحريم",    nameEn: "At-Tahrim",        verses: 12,  type: "short" },
  { id: 67,  name: "الملك",      nameEn: "Al-Mulk",          verses: 30,  type: "medium"},
  { id: 68,  name: "القلم",      nameEn: "Al-Qalam",         verses: 52,  type: "medium"},
  { id: 69,  name: "الحاقة",     nameEn: "Al-Haqqah",        verses: 52,  type: "medium"},
  { id: 70,  name: "المعارج",    nameEn: "Al-Ma'arij",       verses: 44,  type: "medium"},
  { id: 71,  name: "نوح",        nameEn: "Nuh",              verses: 28,  type: "medium"},
  { id: 72,  name: "الجن",       nameEn: "Al-Jinn",          verses: 28,  type: "medium"},
  { id: 73,  name: "المزمل",     nameEn: "Al-Muzzammil",     verses: 20,  type: "short" },
  { id: 74,  name: "المدثر",     nameEn: "Al-Muddaththir",   verses: 56,  type: "medium"},
  { id: 75,  name: "القيامة",    nameEn: "Al-Qiyamah",       verses: 40,  type: "medium"},
  { id: 76,  name: "الإنسان",    nameEn: "Al-Insan",         verses: 31,  type: "medium"},
  { id: 77,  name: "المرسلات",   nameEn: "Al-Mursalat",      verses: 50,  type: "medium"},
  { id: 78,  name: "النبأ",      nameEn: "An-Naba",          verses: 40,  type: "medium"},
  { id: 79,  name: "النازعات",   nameEn: "An-Nazi'at",       verses: 46,  type: "medium"},
  { id: 80,  name: "عبس",        nameEn: "Abasa",            verses: 42,  type: "medium"},
  { id: 81,  name: "التكوير",    nameEn: "At-Takwir",        verses: 29,  type: "medium"},
  { id: 82,  name: "الانفطار",   nameEn: "Al-Infitar",       verses: 19,  type: "short" },
  { id: 83,  name: "المطففين",   nameEn: "Al-Mutaffifin",    verses: 36,  type: "medium"},
  { id: 84,  name: "الانشقاق",   nameEn: "Al-Inshiqaq",      verses: 25,  type: "medium"},
  { id: 85,  name: "البروج",     nameEn: "Al-Buruj",         verses: 22,  type: "medium"},
  { id: 86,  name: "الطارق",     nameEn: "At-Tariq",         verses: 17,  type: "short" },
  { id: 87,  name: "الأعلى",     nameEn: "Al-A'la",          verses: 19,  type: "short" },
  { id: 88,  name: "الغاشية",    nameEn: "Al-Ghashiyah",     verses: 26,  type: "medium"},
  { id: 89,  name: "الفجر",      nameEn: "Al-Fajr",          verses: 30,  type: "medium"},
  { id: 90,  name: "البلد",      nameEn: "Al-Balad",         verses: 20,  type: "short" },
  { id: 91,  name: "الشمس",      nameEn: "Ash-Shams",        verses: 15,  type: "short" },
  { id: 92,  name: "الليل",      nameEn: "Al-Layl",          verses: 21,  type: "medium"},
  { id: 93,  name: "الضحى",      nameEn: "Ad-Duha",          verses: 11,  type: "short" },
  { id: 94,  name: "الشرح",      nameEn: "Ash-Sharh",        verses: 8,   type: "short" },
  { id: 95,  name: "التين",      nameEn: "At-Tin",           verses: 8,   type: "short" },
  { id: 96,  name: "العلق",      nameEn: "Al-Alaq",          verses: 19,  type: "short" },
  { id: 97,  name: "القدر",      nameEn: "Al-Qadr",          verses: 5,   type: "short" },
  { id: 98,  name: "البينة",     nameEn: "Al-Bayyinah",      verses: 8,   type: "short" },
  { id: 99,  name: "الزلزلة",    nameEn: "Az-Zalzalah",      verses: 8,   type: "short" },
  { id: 100, name: "العاديات",   nameEn: "Al-Adiyat",        verses: 11,  type: "short" },
  { id: 101, name: "القارعة",    nameEn: "Al-Qari'ah",       verses: 11,  type: "short" },
  { id: 102, name: "التكاثر",    nameEn: "At-Takathur",      verses: 8,   type: "short" },
  { id: 103, name: "العصر",      nameEn: "Al-Asr",           verses: 3,   type: "short" },
  { id: 104, name: "الهمزة",     nameEn: "Al-Humazah",       verses: 9,   type: "short" },
  { id: 105, name: "الفيل",      nameEn: "Al-Fil",           verses: 5,   type: "short" },
  { id: 106, name: "قريش",       nameEn: "Quraysh",          verses: 4,   type: "short" },
  { id: 107, name: "الماعون",    nameEn: "Al-Ma'un",         verses: 7,   type: "short" },
  { id: 108, name: "الكوثر",     nameEn: "Al-Kawthar",       verses: 3,   type: "short" },
  { id: 109, name: "الكافرون",   nameEn: "Al-Kafirun",       verses: 6,   type: "short" },
  { id: 110, name: "النصر",      nameEn: "An-Nasr",          verses: 3,   type: "short" },
  { id: 111, name: "المسد",      nameEn: "Al-Masad",         verses: 5,   type: "short" },
  { id: 112, name: "الإخلاص",    nameEn: "Al-Ikhlas",        verses: 4,   type: "short" },
  { id: 113, name: "الفلق",      nameEn: "Al-Falaq",         verses: 5,   type: "short" },
  { id: 114, name: "الناس",      nameEn: "An-Nas",           verses: 6,   type: "short" },
];

// ─── PRAYER CONFIG ────────────────────────────────────────────────────────────
const PI = {
  Fajr:    { ar: "الفجر",  icon: "🌅", color: "#818CF8", rec: "long"   },
  Dhuhr:   { ar: "الظهر",  icon: "☀️", color: "#FBBF24", rec: "medium" },
  Asr:     { ar: "العصر",  icon: "🌤", color: "#34D399", rec: "short"  },
  Maghrib: { ar: "المغرب", icon: "🌇", color: "#FB923C", rec: "short"  },
  Isha:    { ar: "العشاء", icon: "🌙", color: "#A78BFA", rec: "medium" },
};
const SALAH = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ─── API HELPERS ──────────────────────────────────────────────────────────────
async function fetchPrayerByCoords(lat, lon) {
  const d = new Date();
  const r = await fetch(`https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}?latitude=${lat}&longitude=${lon}&method=4`);
  return (await r.json()).data.timings;
}
async function fetchPrayerByCity(city) {
  const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=&method=4`);
  const j = await r.json();
  if (j.code !== 200) throw new Error("Not found");
  return j.data.timings;
}
async function fetchAyat(id) {
  const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.asad`);
  if (!r.ok) throw new Error("Failed");
  const j = await r.json();
  return j.data[0].ayahs.map((a, i) => ({ ar: a.text, en: j.data[1].ayahs[i].text }));
}

// ─── TIME UTILS ───────────────────────────────────────────────────────────────
function getNext(timings) {
  const now = new Date();
  for (const p of SALAH) {
    const [h, m] = timings[p].split(":").map(Number);
    const d = new Date(); d.setHours(h, m, 0, 0);
    if (d > now) return { name: p, time: timings[p], date: d };
  }
  const [h, m] = timings.Fajr.split(":").map(Number);
  const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(h, m, 0, 0);
  return { name: "Fajr", time: timings.Fajr, date: d };
}
function getPrev(timings) {
  const now = new Date();
  let prev = null;
  for (const p of SALAH) {
    const [h, m] = timings[p].split(":").map(Number);
    const d = new Date(); d.setHours(h, m, 0, 0);
    if (d <= now) prev = { name: p, date: d };
  }
  if (!prev) {
    const [h, m] = timings.Isha.split(":").map(Number);
    const d = new Date(); d.setDate(d.getDate() - 1); d.setHours(h, m, 0, 0);
    return { name: "Isha", date: d };
  }
  return prev;
}
function fmtCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map(n => String(n).padStart(2, "0")).join(":");
}
function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}
function getSurahPool(pName) {
  const rec = PI[pName]?.rec || "medium";
  if (rec === "long")   return SURAHS.filter(s => s.type === "long" || s.type === "medium");
  if (rec === "medium") return SURAHS.filter(s => s.type === "medium" || s.type === "short");
  return SURAHS.filter(s => s.type === "short");
}

// ─── CIRCULAR RING ────────────────────────────────────────────────────────────
function Ring({ pct, size = 150, sw = 10, color, children }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - Math.min(Math.max(pct, 0), 1))}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ data }) {
  if (!data) return null;
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
      background: "rgba(10,14,26,0.96)", backdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14,
      padding: "13px 20px", color: "#F1F5F9", fontSize: 13, zIndex: 9999,
      display: "flex", alignItems: "center", gap: 12, maxWidth: 340,
      boxShadow: "0 12px 40px rgba(0,0,0,0.6)", animation: "toastIn 0.3s ease",
    }}>
      <span style={{ fontSize: 22 }}>{data.icon}</span>
      <div>
        <div style={{ fontWeight: 700 }}>{data.title}</div>
        {data.msg && <div style={{ opacity: 0.65, fontSize: 12, marginTop: 2 }}>{data.msg}</div>}
      </div>
    </div>
  );
}

// ─── TOGGLE SWITCH ────────────────────────────────────────────────────────────
function Toggle({ on, color = "#6366F1" }) {
  return (
    <div style={{ width: 46, height: 26, borderRadius: 13, background: on ? color : "rgba(255,255,255,0.15)", position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.25s", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // Navigation
  const [page, setPage]           = useState("dashboard");
  const [showDetail, setShowDetail] = useState(false);

  // Preferences (persisted)
  const [lang, setLang]           = useState(() => localStorage.getItem("qr_lang") || "ar");
  const [dark, setDark]           = useState(() => localStorage.getItem("qr_dark") !== "false");
  const [showTrans, setShowTrans] = useState(() => localStorage.getItem("qr_trans") !== "false");
  const [notifOn, setNotifOn]     = useState(() => localStorage.getItem("qr_notif") === "true");

  // Prayer times
  const [timings, setTimings]         = useState(null);
  const [locName, setLocName]         = useState(null);
  const [cityInput, setCityInput]     = useState("");
  const [cityLoading, setCityLoading] = useState(false);
  const [loadingPT, setLoadingPT]     = useState(true);
  const [nextPrayer, setNextPrayer]   = useState(null);
  const [countdown, setCountdown]     = useState("--:--:--");
  const [ringPct, setRingPct]         = useState(0);

  // Quran
  const [suggestion, setSuggestion]   = useState(null);
  const [ayatCache, setAyatCache]     = useState({});
  const [loadingAyat, setLoadingAyat] = useState(false);
  const [ayatError, setAyatError]     = useState(false);
  const [lastPicks, setLastPicks]     = useState([]);
  const [shuffleAnim, setShuffleAnim] = useState(false);

  // User data (persisted)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("qr_favs") || "[]"));
  const [history, setHistory]     = useState(() => JSON.parse(localStorage.getItem("qr_hist") || "[]"));
  const [streak, setStreak]       = useState(() => JSON.parse(localStorage.getItem("qr_streak") || '{"count":0,"last":""}'));

  // UI
  const [toast, setToast]     = useState(null);
  const toastTimer            = useRef(null);
  const notifiedRef           = useRef(new Set());
  const timingsRef            = useRef(null);

  // ─── Translate helper ──────────────────────────────────────────────────────
  const t = (ar, en) => lang === "ar" ? ar : en;

  // ─── Persist preferences ──────────────────────────────────────────────────
  useEffect(() => { localStorage.setItem("qr_lang",  lang);  }, [lang]);
  useEffect(() => { localStorage.setItem("qr_dark",  dark);  }, [dark]);
  useEffect(() => { localStorage.setItem("qr_trans", showTrans); }, [showTrans]);
  useEffect(() => { localStorage.setItem("qr_notif", notifOn); }, [notifOn]);
  useEffect(() => { localStorage.setItem("qr_favs",  JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("qr_hist",  JSON.stringify(history)); },  [history]);

  // ─── Toast helper ─────────────────────────────────────────────────────────
  const showToast = (data) => {
    clearTimeout(toastTimer.current);
    setToast(data);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  // ─── Shuffle ──────────────────────────────────────────────────────────────
  const doShuffle = (pName) => {
    const prayer = pName || nextPrayer?.name || "Isha";
    const pool   = getSurahPool(prayer);
    const avail  = pool.filter(s => !lastPicks.includes(s.id));
    const final  = avail.length > 0 ? avail : pool;
    const pick   = final[Math.floor(Math.random() * final.length)];
    setShuffleAnim(true);
    setTimeout(() => setShuffleAnim(false), 400);
    setSuggestion(pick);
    setLastPicks(prev => [...prev.slice(-6), pick.id]);
  };

  // ─── Geolocation → prayer times ───────────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) { setLoadingPT(false); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lon } }) => {
        fetchPrayerByCoords(lat, lon)
          .then(t => { setTimings(t); timingsRef.current = t; })
          .catch(() => {})
          .finally(() => setLoadingPT(false));
      },
      () => setLoadingPT(false)
    );
  }, []);

  // ─── Initial shuffle ──────────────────────────────────────────────────────
  useEffect(() => { setTimeout(() => doShuffle(), 600); }, []);

  // ─── Countdown timer (every second) ──────────────────────────────────────
  useEffect(() => {
    if (!timings) return;
    const tick = () => {
      const next = getNext(timings);
      const prev = getPrev(timings);
      setNextPrayer(next);
      const msLeft = next.date - new Date();
      const total  = next.date - prev.date;
      setCountdown(fmtCountdown(msLeft));
      setRingPct((total - msLeft) / total);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timings]);

  // ─── Prayer notification checker (every 30 sec) ───────────────────────────
  useEffect(() => {
    if (!notifOn || !timings) return;
    const check = () => {
      const now = new Date();
      for (const p of SALAH) {
        const [h, m] = timings[p].split(":").map(Number);
        const pt = new Date(); pt.setHours(h, m, 0, 0);
        const diff = (pt - now) / 60000;
        const key  = `${p}-${pt.toDateString()}`;
        if (diff > 0 && diff <= 15 && !notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          const info = PI[p];
          showToast({ icon: info.icon, title: `${lang === "ar" ? info.ar : p} ${lang === "ar" ? "بعد 15 دقيقة" : "in 15 minutes"}`, msg: `${lang === "ar" ? "وقت الصلاة:" : "Athan at"} ${fmt12(timings[p])}` });
          if (Notification.permission === "granted") {
            new Notification(`${info.icon} ${p} ${lang === "ar" ? "بعد 15 دقيقة" : "in 15 minutes"}`, { body: `${lang === "ar" ? "وقت الأذان:" : "Prayer at"} ${fmt12(timings[p])}`, icon: "/quran.svg" });
          }
        }
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [notifOn, timings, lang]);

  // ─── Fetch ayat on suggestion change ─────────────────────────────────────
  useEffect(() => {
    if (!suggestion || ayatCache[suggestion.id]) return;
    setLoadingAyat(true); setAyatError(false);
    fetchAyat(suggestion.id)
      .then(ayat => setAyatCache(prev => ({ ...prev, [suggestion.id]: ayat })))
      .catch(() => setAyatError(true))
      .finally(() => setLoadingAyat(false));
  }, [suggestion?.id]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const toggleFav = (s) => {
    setFavorites(prev => prev.find(f => f.id === s.id) ? prev.filter(f => f.id !== s.id) : [...prev, s]);
    showToast({ icon: isFav(s) ? "💔" : "💛", title: isFav(s) ? t("حُذف من المفضلة", "Removed") : t("حُفظ في المفضلة", "Saved to favorites"), msg: s.name });
  };
  const isFav = (s) => favorites.some(f => f.id === s.id);

  const markRead = (s) => {
    const prayer = nextPrayer?.name || "Isha";
    const today  = new Date().toDateString();
    setHistory(prev => [{ surah: s, prayer, date: today, timestamp: Date.now() }, ...prev.slice(0, 199)]);
    setStreak(prev => {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      let n;
      if (prev.last === today)                           n = prev;
      else if (prev.last === yesterday.toDateString())   n = { count: prev.count + 1, last: today };
      else                                               n = { count: 1, last: today };
      localStorage.setItem("qr_streak", JSON.stringify(n));
      return n;
    });
    showToast({ icon: "✅", title: t("ما شاء الله!", "Masha Allah!"), msg: t(`أتممت سورة ${s.name}`, `Completed ${s.nameEn}`) });
  };

  const loadCityPrayer = async () => {
    if (!cityInput.trim()) return;
    setCityLoading(true);
    try {
      const t2 = await fetchPrayerByCity(cityInput.trim());
      setTimings(t2); timingsRef.current = t2;
      setLocName(cityInput.trim());
      showToast({ icon: "🕌", title: t("تم تحديث أوقات الصلاة", "Prayer times updated"), msg: cityInput.trim() });
    } catch {
      showToast({ icon: "❌", title: t("لم يتم العثور على المدينة", "City not found") });
    }
    setCityLoading(false);
  };

  const enableNotifications = async () => {
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setNotifOn(true);
      showToast({ icon: "🔔", title: t("تم تفعيل الإشعارات", "Notifications enabled"), msg: t("ستصلك تنبيهات قبل كل صلاة بـ 15 دقيقة", "You'll be alerted 15 min before each prayer") });
    } else {
      showToast({ icon: "🔕", title: t("لم يُسمح بالإشعارات", "Permission denied"), msg: t("يرجى السماح من إعدادات المتصفح", "Allow from browser settings") });
    }
  };

  // ─── Derived ──────────────────────────────────────────────────────────────
  const today       = new Date().toDateString();
  const todayReads  = history.filter(h => h.date === today).length;
  const nextInfo    = nextPrayer ? PI[nextPrayer.name] : null;

  // ─── COLORS ───────────────────────────────────────────────────────────────
  const C = dark ? {
    bg:     "linear-gradient(160deg, #070B18 0%, #0C1526 50%, #08101E 100%)",
    solid:  "#070B18",
    glass:  "rgba(255,255,255,0.04)",
    glassB: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.08)",
    text:   "#F0F4FF",
    sub:    "#8899BB",
    dim:    "#445566",
    accent: "#6366F1",
    gold:   "#F59E0B",
    green:  "#10B981",
    red:    "#F87171",
  } : {
    bg:     "linear-gradient(160deg, #EEF2FF 0%, #F5F3FF 50%, #EFF6FF 100%)",
    solid:  "#EEF2FF",
    glass:  "#FFFFFF",
    glassB: "#F8FAFF",
    border: "#DDE3F0",
    text:   "#1E2A4A",
    sub:    "#5E6E94",
    dim:    "#A0AABF",
    accent: "#4F46E5",
    gold:   "#D97706",
    green:  "#059669",
    red:    "#DC2626",
  };

  // ─── STYLE HELPERS ────────────────────────────────────────────────────────
  const card = (extra = {}) => ({
    background: C.glass, border: `1px solid ${C.border}`, borderRadius: 18,
    padding: "20px", marginBottom: 14, backdropFilter: "blur(16px)",
    transition: "all 0.25s", ...extra,
  });
  const btn = (v = "primary", extra = {}) => {
    const base = { padding: "10px 20px", borderRadius: 11, cursor: "pointer", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit", transition: "all 0.2s", border: "none" };
    const vs = {
      primary: { background: C.accent,  color: "#fff" },
      ghost:   { background: "transparent", color: C.accent, border: `1px solid ${C.border}` },
      gold:    { background: C.gold,    color: "#fff" },
      green:   { background: C.green,   color: "#fff" },
      danger:  { background: "transparent", color: C.red, border: `1px solid ${C.red}30` },
    };
    return { ...base, ...vs[v], ...extra };
  };
  const arStyle = (size = 22) => ({
    fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
    fontSize: size, lineHeight: 2.0, textAlign: "right", direction: "rtl", color: C.text,
  });
  const tag = (color) => ({
    display: "inline-block", padding: "3px 12px", borderRadius: 20, fontSize: 11,
    fontWeight: 700, background: `${color}22`, color: color,
  });

  const NAV = [
    { id: "dashboard", icon: "🏠", label: t("الرئيسية", "Home")    },
    { id: "quran",     icon: "📚", label: t("القرآن",   "Quran")   },
    { id: "favorites", icon: "❤️", label: t("المفضلة",  "Saved")   },
    { id: "history",   icon: "📊", label: t("السجل",    "History") },
    { id: "settings",  icon: "⚙️", label: t("الإعدادات","Settings")},
  ];

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE: DASHBOARD
  // ════════════════════════════════════════════════════════════════════════════
  const DashboardPage = () => {
    const h    = new Date().getHours();
    const greet = h < 5 ? t("الليل دعاء 🌙", "Late Night 🌙") : h < 12 ? t("صباح الخير ☀️", "Good Morning ☀️") : h < 17 ? t("مساء الخير 🌤", "Good Afternoon 🌤") : h < 20 ? t("مساء النور 🌇", "Good Evening 🌇") : t("تهجد مبارك ✨", "Blessed Night ✨");
    const ayat = suggestion ? ayatCache[suggestion.id] : null;

    return (
      <div>
        {/* Greeting */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, color: C.sub }}>
            {new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: C.text, margin: "4px 0 0", letterSpacing: -0.5 }}>{greet}</h1>
        </div>

        {/* ── Prayer Countdown ── */}
        {timings && nextPrayer ? (
          <div style={{ ...card(), background: `linear-gradient(135deg, ${nextInfo.color}16 0%, ${nextInfo.color}06 100%)`, borderColor: `${nextInfo.color}35` }}>
            <div style={{ fontSize: 10, color: nextInfo.color, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>
              {t("الصلاة القادمة", "NEXT PRAYER")}
              {locName && <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7, marginRight: 8 }}>📍 {locName}</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <Ring pct={ringPct} size={140} sw={10} color={nextInfo.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 30 }}>{nextInfo.icon}</div>
                  <div style={{ fontSize: 11, color: C.sub, marginTop: 2, fontWeight: 600 }}>{t(nextInfo.ar, nextPrayer.name)}</div>
                </div>
              </Ring>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: 3, fontVariantNumeric: "tabular-nums", color: C.text, lineHeight: 1 }}>{countdown}</div>
                <div style={{ fontSize: 13, color: C.sub, marginTop: 8 }}>
                  {t("وقت الأذان", "Athan at")} <b style={{ color: nextInfo.color, fontSize: 15 }}>{fmt12(nextPrayer.time)}</b>
                </div>
              </div>
            </div>

            {/* Prayer schedule strip */}
            <div style={{ display: "flex", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
              {SALAH.map(p => {
                const info = PI[p];
                const [ph, pm] = timings[p].split(":").map(Number);
                const pDate = new Date(); pDate.setHours(ph, pm, 0, 0);
                const passed = pDate < new Date() && p !== nextPrayer.name;
                const isNext = p === nextPrayer.name;
                return (
                  <div key={p} style={{
                    flex: 1, minWidth: 58, textAlign: "center", padding: "10px 4px",
                    borderRadius: 12, border: `1px solid ${isNext ? info.color+"55" : C.border}`,
                    background: isNext ? `${info.color}22` : passed ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                    opacity: passed ? 0.5 : 1, transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 18 }}>{info.icon}</div>
                    <div style={{ fontSize: 9, color: isNext ? info.color : C.sub, fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>{t(info.ar, p)}</div>
                    <div style={{ fontSize: 11, color: C.text, fontWeight: 700, marginTop: 3 }}>{fmt12(timings[p])}</div>
                    {passed && <div style={{ fontSize: 11, color: C.green }}>✓</div>}
                    {isNext && <div style={{ fontSize: 9, color: info.color, fontWeight: 800 }}>●</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : !loadingPT ? (
          <div style={card()}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>📍 {t("أدخل مدينتك لأوقات الصلاة", "Enter your city for prayer times")}</div>
            <div style={{ fontSize: 12, color: C.sub, marginBottom: 14 }}>{t("لم يتم الوصول إلى موقعك تلقائياً", "Location access was not granted")}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCityPrayer()}
                placeholder={t("مثال: القاهرة أو Riyadh", "e.g. Cairo or London")}
                style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.glass, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button onClick={loadCityPrayer} disabled={cityLoading} style={btn("primary")}>{cityLoading ? "…" : t("بحث", "Search")}</button>
            </div>
          </div>
        ) : (
          <div style={{ ...card(), textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🕌</div>
            <div style={{ color: C.sub }}>{t("جارٍ تحميل أوقات الصلاة…", "Loading prayer times…")}</div>
          </div>
        )}

        {/* ── Stats Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { icon: "🔥", val: streak.count, label: t("أيام متواصلة", "Day Streak"), color: "#F59E0B" },
            { icon: "📖", val: todayReads,   label: t("تلاوات اليوم",  "Today"),      color: "#10B981" },
            { icon: "✨", val: history.length,label: t("إجمالي",       "Total"),      color: "#6366F1" },
          ].map((s, i) => (
            <div key={i} style={{ ...card({ padding: "18px 12px", textAlign: "center", marginBottom: 0 }) }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: C.sub, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Suggested Surah ── */}
        {suggestion && (
          <div style={{ ...card(), opacity: shuffleAnim ? 0.5 : 1, transform: shuffleAnim ? "translateY(6px) scale(0.99)" : "none", transition: "all 0.35s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: C.sub, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {t("مقترح لـ", "Suggested for")} {nextPrayer ? t(nextInfo.ar, nextPrayer.name) : t("الإشاء", "Isha")}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Amiri', serif", marginTop: 3, color: C.text }}>{suggestion.name}</div>
                <div style={{ fontSize: 12, color: C.sub }}>{suggestion.nameEn} · {suggestion.verses} {t("آية", "verses")}</div>
              </div>
              <span style={tag(C.accent)}>{t(suggestion.type === "long" ? "طويلة" : suggestion.type === "medium" ? "متوسطة" : "قصيرة", suggestion.type)}</span>
            </div>

            {/* Ayat preview */}
            <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: 12, padding: "16px 18px", marginBottom: 16, border: `1px solid ${C.border}`, minHeight: 90 }}>
              {!ayat ? (
                <div style={{ textAlign: "center", padding: "20px 0", color: C.sub }}>
                  {loadingAyat ? t("جارٍ تحميل الآيات…", "Loading ayat…") : ayatError ? t("⚠️ فشل التحميل", "⚠️ Load failed") : "…"}
                </div>
              ) : ayat.slice(0, 2).map((a, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={arStyle(20)}>{a.ar} <span style={{ color: C.accent, fontSize: 12 }}>﴿{i + 1}﴾</span></div>
                  {showTrans && <div style={{ fontSize: 11, color: C.sub, marginTop: 3, lineHeight: 1.65 }}>{a.en}</div>}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => { setPage("quran"); setShowDetail(true); }} style={btn("primary")}>📖 {t("اقرأ", "Read")}</button>
              <button onClick={() => doShuffle()} style={btn("ghost")}>🔄 {t("سورة أخرى", "Shuffle")}</button>
              <button onClick={() => toggleFav(suggestion)} style={btn("ghost")}>{isFav(suggestion) ? "💛" : "🤍"}</button>
              <button onClick={() => markRead(suggestion)} style={btn("ghost")}>✅ {t("أتممت", "Done")}</button>
            </div>
          </div>
        )}

        {/* ── Notification CTA ── */}
        {!notifOn && timings && (
          <div style={{ ...card(), borderColor: `${C.gold}40`, background: `${C.gold}10`, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 30 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{t("فعّل إشعارات الصلاة", "Enable Prayer Alerts")}</div>
              <div style={{ fontSize: 12, color: C.sub }}>{t("تذكير 15 دقيقة قبل كل صلاة", "Get notified 15 min before each prayer")}</div>
            </div>
            <button onClick={enableNotifications} style={btn("gold")}>تفعيل</button>
          </div>
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE: QURAN (Browse + Detail)
  // ════════════════════════════════════════════════════════════════════════════
  const QuranPage = () => {
    const [search, setSearch] = useState("");
    const filtered = SURAHS.filter(s =>
      s.name.includes(search) ||
      s.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      String(s.id).includes(search)
    );
    if (showDetail && suggestion) return <DetailView />;
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>📚 {t("القرآن الكريم", "The Holy Quran")}</h2>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t("ابحث بالاسم أو الرقم…", "Search by name or number…")}
          style={{ width: "100%", padding: "11px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.glass, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: 14, boxSizing: "border-box" }} />
        {filtered.map(s => (
          <div key={s.id}
            onClick={() => { setSuggestion(s); setShowDetail(true); }}
            style={{ ...card({ padding: "14px 18px", cursor: "pointer", marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }) }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${C.accent}18`, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontFamily: "'Amiri', serif", fontSize: 17 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.sub }}>{s.nameEn} · {s.verses} {t("آية", "v")}</div>
            </div>
            <span style={tag(s.type === "long" ? C.red : s.type === "medium" ? C.gold : C.green)}>
              {t(s.type === "long" ? "طويلة" : s.type === "medium" ? "متوسطة" : "قصيرة", s.type)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // ── Detail / Reader ────────────────────────────────────────────────────────
  const DetailView = () => {
    if (!suggestion) return null;
    const ayat = ayatCache[suggestion.id];
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <button onClick={() => setShowDetail(false)} style={btn("ghost")}>← {t("رجوع", "Back")}</button>
          <div style={{ flex: 1 }} />
          <button onClick={() => toggleFav(suggestion)} style={btn("ghost", { padding: "10px 14px" })}>{isFav(suggestion) ? "💛" : "🤍"}</button>
          <button onClick={() => markRead(suggestion)} style={btn("green")}>✅ {t("أتممت", "Done")}</button>
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 800, letterSpacing: 2 }}>{t("سورة", "SURAH")} {suggestion.id}</div>
          <h1 style={{ fontSize: 34, fontFamily: "'Amiri', serif", margin: "6px 0 4px", color: C.text }}>{suggestion.name}</h1>
          <div style={{ color: C.sub }}>{suggestion.nameEn} · {suggestion.verses} {t("آية", "verses")}</div>
          <button onClick={() => setShowTrans(!showTrans)} style={{ ...btn("ghost", { marginTop: 12, fontSize: 12 }) }}>
            {showTrans ? "🔽" : "🔼"} {t("الترجمة الإنجليزية", "English Translation")}
          </button>
        </div>

        {suggestion.id !== 1 && suggestion.id !== 9 && (
          <div style={{ textAlign: "center", marginBottom: 22, fontFamily: "'Amiri', serif", fontSize: 24, color: C.gold }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}

        <div style={card()}>
          {!ayat ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: ayatError ? C.red : C.sub }}>
              {ayatError ? t("⚠️ فشل تحميل الآيات — تحقق من الاتصال", "⚠️ Failed to load — check connection") : t("جارٍ تحميل الآيات…", "Loading ayat…")}
            </div>
          ) : ayat.map((a, i) => (
            <div key={i} style={{ padding: "18px 0", borderBottom: i < ayat.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: `${C.accent}18`, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={arStyle(22)}>{a.ar}</div>
                  {showTrans && <div style={{ fontSize: 13, color: C.sub, marginTop: 6, lineHeight: 1.75, fontStyle: "italic" }}>{a.en}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <button onClick={() => { doShuffle(); window.scrollTo(0, 0); }} style={btn("ghost")}>🔁 {t("سورة أخرى", "Next Surah")}</button>
          <button onClick={() => setShowDetail(false)} style={btn("primary")}>📚 {t("القائمة", "Back to List")}</button>
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE: FAVORITES
  // ════════════════════════════════════════════════════════════════════════════
  const FavoritesPage = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>❤️ {t("المفضلة", "Favorites")} <span style={{ fontSize: 14, color: C.sub }}>({favorites.length})</span></h2>
      {favorites.length === 0 ? (
        <div style={{ ...card({ textAlign: "center", padding: 60 }) }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>🤍</div>
          <div style={{ color: C.sub, fontSize: 15, fontWeight: 600 }}>{t("لا توجد سور محفوظة بعد", "No favorites yet")}</div>
          <div style={{ color: C.dim, fontSize: 12, marginTop: 6 }}>{t("اضغط 🤍 أثناء القراءة لحفظ سورة", "Tap 🤍 while reading to save a surah")}</div>
        </div>
      ) : favorites.map(s => (
        <div key={s.id} style={{ ...card({ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }) }}
          onClick={() => { setSuggestion(s); setShowDetail(true); setPage("quran"); }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${C.accent}18`, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.id}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontFamily: "'Amiri', serif", fontSize: 17 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.sub }}>{s.nameEn} · {s.verses} {t("آية", "v")}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); toggleFav(s); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22 }}>💛</button>
        </div>
      ))}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE: HISTORY
  // ════════════════════════════════════════════════════════════════════════════
  const HistoryPage = () => {
    const grouped = {};
    history.forEach(h => { if (!grouped[h.date]) grouped[h.date] = []; grouped[h.date].push(h); });
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>📊 {t("سجل التلاوة", "Reading History")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { icon: "🔥", v: streak.count, l: t("أيام متواصلة", "Streak"),    c: "#F59E0B" },
            { icon: "📖", v: history.length, l: t("إجمالي التلاوات", "Total"), c: "#6366F1" },
            { icon: "✨", v: new Set(history.map(h => h.surah.id)).size, l: t("سور مختلفة", "Unique"), c: "#10B981" },
          ].map((s, i) => (
            <div key={i} style={{ ...card({ textAlign: "center", padding: "16px 8px", marginBottom: 0 }) }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: C.sub, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ ...card({ textAlign: "center", padding: 60 }) }}>
            <div style={{ fontSize: 50, marginBottom: 12 }}>📖</div>
            <div style={{ color: C.sub }}>{t("لا سجل بعد — ابدأ بالقراءة!", "No history yet — start reading!")}</div>
          </div>
        ) : Object.entries(grouped).map(([date, entries]) => (
          <div key={date} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.accent, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>📅 {date}</div>
            {entries.map((e, i) => (
              <div key={i} style={{ ...card({ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }) }}
                onClick={() => { setSuggestion(e.surah); setShowDetail(true); setPage("quran"); }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: PI[e.prayer]?.color || C.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 18 }}>{PI[e.prayer]?.icon || "🕌"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontFamily: "'Amiri', serif" }}>{e.surah.name}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>{e.surah.nameEn} · {t(PI[e.prayer]?.ar || "", e.prayer)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {history.length > 0 && (
          <button onClick={() => { setHistory([]); showToast({ icon: "🗑", title: t("تم مسح السجل", "History cleared") }); }} style={btn("danger")}>
            🗑 {t("مسح كل السجل", "Clear All History")}
          </button>
        )}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════════
  // PAGE: SETTINGS
  // ════════════════════════════════════════════════════════════════════════════
  const SettingsPage = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>⚙️ {t("الإعدادات", "Settings")}</h2>

      {/* Notifications */}
      <div style={{ ...card(), borderColor: notifOn ? `${C.green}50` : C.border }}>
        <div style={{ fontWeight: 800, marginBottom: 4 }}>🔔 {t("إشعارات الصلاة", "Prayer Notifications")}</div>
        <div style={{ fontSize: 12, color: C.sub, marginBottom: 14 }}>{t("تنبيه 15 دقيقة قبل كل صلاة — يعمل حتى عند إغلاق التطبيق", "Alert 15 min before each prayer — works even when tab is open")}</div>
        {notifOn ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>✓ {t("مفعّل", "Enabled")}</span>
            <div style={{ cursor: "pointer" }} onClick={() => { setNotifOn(false); showToast({ icon: "🔕", title: t("تم إيقاف الإشعارات", "Notifications off") }); }}>
              <Toggle on={true} color={C.green} />
            </div>
          </div>
        ) : (
          <button onClick={enableNotifications} style={btn("green")}>🔔 {t("تفعيل الإشعارات", "Enable Notifications")}</button>
        )}
      </div>

      {/* Location */}
      <div style={card()}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>📍 {t("موقعك الحالي", "Your Location")}</div>
        {locName && <div style={{ fontSize: 12, color: C.sub, marginBottom: 10 }}>📌 {locName}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCityPrayer()}
            placeholder={t("غيّر المدينة…", "Change city…")}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.glass, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
          <button onClick={loadCityPrayer} style={btn("primary")}>{cityLoading ? "…" : t("تحديث", "Update")}</button>
        </div>
      </div>

      {/* Toggles */}
      {[
        { icon: "🌙", label: t("الوضع الداكن",  "Dark Mode"),      desc: t("خلفية داكنة مريحة للعين",    "Easy on the eyes"),      val: dark,     fn: () => setDark(!dark) },
        { icon: "🌍", label: t("اللغة",          "Language"),       desc: lang === "ar" ? "العربية" : "English",                   val: lang==="ar", fn: () => setLang(l => l === "ar" ? "en" : "ar") },
        { icon: "📖", label: t("الترجمة",        "Translation"),    desc: t("إظهار الترجمة الإنجليزية",  "Show English translation"),val: showTrans, fn: () => setShowTrans(!showTrans) },
      ].map((item, i) => (
        <div key={i} style={{ ...card({ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }) }} onClick={item.fn}>
          <span style={{ fontSize: 24 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: C.sub }}>{item.desc}</div>
          </div>
          <Toggle on={item.val} color={C.accent} />
        </div>
      ))}

      {/* Data */}
      <div style={{ ...card(), display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button style={btn("danger")} onClick={() => { setFavorites([]); showToast({ icon: "💔", title: t("تم مسح المفضلة", "Favorites cleared") }); }}>💔 {t("مسح المفضلة", "Clear Favorites")}</button>
        <button style={btn("danger")} onClick={() => { setHistory([]);   showToast({ icon: "🗑",  title: t("تم مسح السجل",   "History cleared")   }); }}>🗑  {t("مسح السجل",    "Clear History")}</button>
      </div>

      {/* About */}
      <div style={{ ...card({ textAlign: "center", padding: 28 }) }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🕌</div>
        <div style={{ fontWeight: 900, fontSize: 18 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
        <div style={{ fontSize: 11, color: C.sub, marginTop: 6, lineHeight: 1.8 }}>
          v2.0 · {t("آيات:", "Ayat:")} AlQuran.cloud · {t("أوقات الصلاة:", "Prayer times:")} Aladhan.com
        </div>
        <div style={{ fontSize: 13, color: C.dim, marginTop: 10, fontFamily: "'Amiri', serif" }}>
          جَعَلَهُ اللَّهُ فِي مِيزَانِ حَسَنَاتِكُمْ 🤲
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════════
  // LAYOUT
  // ════════════════════════════════════════════════════════════════════════════
  const PAGES = { dashboard: DashboardPage, quran: QuranPage, favorites: FavoritesPage, history: HistoryPage, settings: SettingsPage };
  const Page  = PAGES[page] || DashboardPage;

  const navClick = (id) => { setPage(id); if (id !== "quran") setShowDetail(false); };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Amiri', 'Noto Naskh Arabic', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(100,120,180,0.2); border-radius: 4px; }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
        button:active { transform: scale(0.97) translateY(0); }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @media (max-width: 768px) { .desk { display: none !important; } }
        @media (min-width: 769px) { .mob  { display: none !important; } }
        input::placeholder { opacity: 0.5; }
      `}</style>

      <Toast data={toast} />

      <div style={{ display: "flex", maxWidth: 1120, margin: "0 auto", minHeight: "100vh" }}>

        {/* ── Desktop Sidebar ── */}
        <nav className="desk" style={{
          width: 250, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column",
          position: "sticky", top: 0, height: "100vh", overflowY: "auto",
          background: dark ? "rgba(7,11,24,0.92)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)",
        }}>
          <div style={{ padding: "28px 22px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: `${C.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🕌</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: C.text }}>القارئ</div>
                <div style={{ fontSize: 10, color: C.sub }}>Smart Recitation v2</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(n => (
              <div key={n.id} onClick={() => navClick(n.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "13px 16px",
                  borderRadius: 13, cursor: "pointer",
                  background: page === n.id ? `${C.accent}18` : "transparent",
                  color: page === n.id ? C.accent : C.sub,
                  fontWeight: page === n.id ? 700 : 400,
                  transition: "all 0.2s",
                }}>
                <span style={{ fontSize: 19 }}>{n.icon}</span>
                <span style={{ fontSize: 14 }}>{n.label}</span>
              </div>
            ))}
          </div>

          {/* Sidebar prayer mini widget */}
          {timings && nextPrayer && (
            <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, background: `${nextInfo.color}08` }}>
              <div style={{ fontSize: 10, color: C.sub, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{t("القادمة", "UPCOMING")}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{nextInfo.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: C.text }}>{t(nextInfo.ar, nextPrayer.name)}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: nextInfo.color, fontVariantNumeric: "tabular-nums" }}>{countdown}</div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: "28px 24px", maxWidth: 780, width: "100%", paddingBottom: 110 }}>
          <Page />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="mob" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: dark ? "rgba(7,11,24,0.96)" : "rgba(255,255,255,0.96)",
        backdropFilter: "blur(24px)", borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-around", padding: "8px 0 18px", zIndex: 100,
      }}>
        {NAV.map(n => (
          <div key={n.id} onClick={() => navClick(n.id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 8px" }}>
            <span style={{ fontSize: 21, filter: page === n.id ? "none" : "grayscale(0.3)" }}>{n.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: page === n.id ? C.accent : C.dim }}>{n.label}</span>
            {page === n.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent }} />}
          </div>
        ))}
      </nav>
    </div>
  );
}
