import { useState, useEffect, useCallback } from "react";

// ─── FULL 114 SURAHS — metadata only, ayat fetched from API ───────────────────
const SURAHS = [
  { id: 1,   name: "الفاتحة",    nameEn: "Al-Fatiha",        verses: 7,   type: "short" },
  { id: 2,   name: "البقرة",     nameEn: "Al-Baqarah",       verses: 286, type: "long" },
  { id: 3,   name: "آل عمران",   nameEn: "Ali 'Imran",       verses: 200, type: "long" },
  { id: 4,   name: "النساء",     nameEn: "An-Nisa",          verses: 176, type: "long" },
  { id: 5,   name: "المائدة",    nameEn: "Al-Ma'idah",       verses: 120, type: "long" },
  { id: 6,   name: "الأنعام",    nameEn: "Al-An'am",         verses: 165, type: "long" },
  { id: 7,   name: "الأعراف",    nameEn: "Al-A'raf",         verses: 206, type: "long" },
  { id: 8,   name: "الأنفال",    nameEn: "Al-Anfal",         verses: 75,  type: "medium" },
  { id: 9,   name: "التوبة",     nameEn: "At-Tawbah",        verses: 129, type: "long" },
  { id: 10,  name: "يونس",       nameEn: "Yunus",            verses: 109, type: "long" },
  { id: 11,  name: "هود",        nameEn: "Hud",              verses: 123, type: "long" },
  { id: 12,  name: "يوسف",       nameEn: "Yusuf",            verses: 111, type: "long" },
  { id: 13,  name: "الرعد",      nameEn: "Ar-Ra'd",          verses: 43,  type: "medium" },
  { id: 14,  name: "إبراهيم",    nameEn: "Ibrahim",          verses: 52,  type: "medium" },
  { id: 15,  name: "الحجر",      nameEn: "Al-Hijr",          verses: 99,  type: "long" },
  { id: 16,  name: "النحل",      nameEn: "An-Nahl",          verses: 128, type: "long" },
  { id: 17,  name: "الإسراء",    nameEn: "Al-Isra",          verses: 111, type: "long" },
  { id: 18,  name: "الكهف",      nameEn: "Al-Kahf",          verses: 110, type: "long" },
  { id: 19,  name: "مريم",       nameEn: "Maryam",           verses: 98,  type: "long" },
  { id: 20,  name: "طه",         nameEn: "Ta-Ha",            verses: 135, type: "long" },
  { id: 21,  name: "الأنبياء",   nameEn: "Al-Anbya",         verses: 112, type: "long" },
  { id: 22,  name: "الحج",       nameEn: "Al-Hajj",          verses: 78,  type: "medium" },
  { id: 23,  name: "المؤمنون",   nameEn: "Al-Mu'minun",      verses: 118, type: "long" },
  { id: 24,  name: "النور",      nameEn: "An-Nur",           verses: 64,  type: "medium" },
  { id: 25,  name: "الفرقان",    nameEn: "Al-Furqan",        verses: 77,  type: "medium" },
  { id: 26,  name: "الشعراء",    nameEn: "Ash-Shu'ara",      verses: 227, type: "long" },
  { id: 27,  name: "النمل",      nameEn: "An-Naml",          verses: 93,  type: "long" },
  { id: 28,  name: "القصص",      nameEn: "Al-Qasas",         verses: 88,  type: "medium" },
  { id: 29,  name: "العنكبوت",   nameEn: "Al-Ankabut",       verses: 69,  type: "medium" },
  { id: 30,  name: "الروم",      nameEn: "Ar-Rum",           verses: 60,  type: "medium" },
  { id: 31,  name: "لقمان",      nameEn: "Luqman",           verses: 34,  type: "medium" },
  { id: 32,  name: "السجدة",     nameEn: "As-Sajdah",        verses: 30,  type: "medium" },
  { id: 33,  name: "الأحزاب",    nameEn: "Al-Ahzab",         verses: 73,  type: "medium" },
  { id: 34,  name: "سبأ",        nameEn: "Saba",             verses: 54,  type: "medium" },
  { id: 35,  name: "فاطر",       nameEn: "Fatir",            verses: 45,  type: "medium" },
  { id: 36,  name: "يس",         nameEn: "Ya-Sin",           verses: 83,  type: "medium" },
  { id: 37,  name: "الصافات",    nameEn: "As-Saffat",        verses: 182, type: "long" },
  { id: 38,  name: "ص",          nameEn: "Sad",              verses: 88,  type: "medium" },
  { id: 39,  name: "الزمر",      nameEn: "Az-Zumar",         verses: 75,  type: "medium" },
  { id: 40,  name: "غافر",       nameEn: "Ghafir",           verses: 85,  type: "medium" },
  { id: 41,  name: "فصلت",       nameEn: "Fussilat",         verses: 54,  type: "medium" },
  { id: 42,  name: "الشورى",     nameEn: "Ash-Shuraa",       verses: 53,  type: "medium" },
  { id: 43,  name: "الزخرف",     nameEn: "Az-Zukhruf",       verses: 89,  type: "medium" },
  { id: 44,  name: "الدخان",     nameEn: "Ad-Dukhan",        verses: 59,  type: "medium" },
  { id: 45,  name: "الجاثية",    nameEn: "Al-Jathiyah",      verses: 37,  type: "medium" },
  { id: 46,  name: "الأحقاف",    nameEn: "Al-Ahqaf",         verses: 35,  type: "medium" },
  { id: 47,  name: "محمد",       nameEn: "Muhammad",         verses: 38,  type: "medium" },
  { id: 48,  name: "الفتح",      nameEn: "Al-Fath",          verses: 29,  type: "medium" },
  { id: 49,  name: "الحجرات",    nameEn: "Al-Hujurat",       verses: 18,  type: "short" },
  { id: 50,  name: "ق",          nameEn: "Qaf",              verses: 45,  type: "medium" },
  { id: 51,  name: "الذاريات",   nameEn: "Adh-Dhariyat",     verses: 60,  type: "medium" },
  { id: 52,  name: "الطور",      nameEn: "At-Tur",           verses: 49,  type: "medium" },
  { id: 53,  name: "النجم",      nameEn: "An-Najm",          verses: 62,  type: "medium" },
  { id: 54,  name: "القمر",      nameEn: "Al-Qamar",         verses: 55,  type: "medium" },
  { id: 55,  name: "الرحمن",     nameEn: "Ar-Rahman",        verses: 78,  type: "medium" },
  { id: 56,  name: "الواقعة",    nameEn: "Al-Waqi'ah",       verses: 96,  type: "long" },
  { id: 57,  name: "الحديد",     nameEn: "Al-Hadid",         verses: 29,  type: "medium" },
  { id: 58,  name: "المجادلة",   nameEn: "Al-Mujadila",      verses: 22,  type: "medium" },
  { id: 59,  name: "الحشر",      nameEn: "Al-Hashr",         verses: 24,  type: "medium" },
  { id: 60,  name: "الممتحنة",   nameEn: "Al-Mumtahanah",    verses: 13,  type: "short" },
  { id: 61,  name: "الصف",       nameEn: "As-Saf",           verses: 14,  type: "short" },
  { id: 62,  name: "الجمعة",     nameEn: "Al-Jumu'ah",       verses: 11,  type: "short" },
  { id: 63,  name: "المنافقون",  nameEn: "Al-Munafiqun",     verses: 11,  type: "short" },
  { id: 64,  name: "التغابن",    nameEn: "At-Taghabun",      verses: 18,  type: "short" },
  { id: 65,  name: "الطلاق",     nameEn: "At-Talaq",         verses: 12,  type: "short" },
  { id: 66,  name: "التحريم",    nameEn: "At-Tahrim",        verses: 12,  type: "short" },
  { id: 67,  name: "الملك",      nameEn: "Al-Mulk",          verses: 30,  type: "medium" },
  { id: 68,  name: "القلم",      nameEn: "Al-Qalam",         verses: 52,  type: "medium" },
  { id: 69,  name: "الحاقة",     nameEn: "Al-Haqqah",        verses: 52,  type: "medium" },
  { id: 70,  name: "المعارج",    nameEn: "Al-Ma'arij",       verses: 44,  type: "medium" },
  { id: 71,  name: "نوح",        nameEn: "Nuh",              verses: 28,  type: "medium" },
  { id: 72,  name: "الجن",       nameEn: "Al-Jinn",          verses: 28,  type: "medium" },
  { id: 73,  name: "المزمل",     nameEn: "Al-Muzzammil",     verses: 20,  type: "short" },
  { id: 74,  name: "المدثر",     nameEn: "Al-Muddaththir",   verses: 56,  type: "medium" },
  { id: 75,  name: "القيامة",    nameEn: "Al-Qiyamah",       verses: 40,  type: "medium" },
  { id: 76,  name: "الإنسان",    nameEn: "Al-Insan",         verses: 31,  type: "medium" },
  { id: 77,  name: "المرسلات",   nameEn: "Al-Mursalat",      verses: 50,  type: "medium" },
  { id: 78,  name: "النبأ",      nameEn: "An-Naba",          verses: 40,  type: "medium" },
  { id: 79,  name: "النازعات",   nameEn: "An-Nazi'at",       verses: 46,  type: "medium" },
  { id: 80,  name: "عبس",        nameEn: "Abasa",            verses: 42,  type: "medium" },
  { id: 81,  name: "التكوير",    nameEn: "At-Takwir",        verses: 29,  type: "medium" },
  { id: 82,  name: "الانفطار",   nameEn: "Al-Infitar",       verses: 19,  type: "short" },
  { id: 83,  name: "المطففين",   nameEn: "Al-Mutaffifin",    verses: 36,  type: "medium" },
  { id: 84,  name: "الانشقاق",   nameEn: "Al-Inshiqaq",      verses: 25,  type: "medium" },
  { id: 85,  name: "البروج",     nameEn: "Al-Buruj",         verses: 22,  type: "medium" },
  { id: 86,  name: "الطارق",     nameEn: "At-Tariq",         verses: 17,  type: "short" },
  { id: 87,  name: "الأعلى",     nameEn: "Al-A'la",          verses: 19,  type: "short" },
  { id: 88,  name: "الغاشية",    nameEn: "Al-Ghashiyah",     verses: 26,  type: "medium" },
  { id: 89,  name: "الفجر",      nameEn: "Al-Fajr",          verses: 30,  type: "medium" },
  { id: 90,  name: "البلد",      nameEn: "Al-Balad",         verses: 20,  type: "short" },
  { id: 91,  name: "الشمس",      nameEn: "Ash-Shams",        verses: 15,  type: "short" },
  { id: 92,  name: "الليل",      nameEn: "Al-Layl",          verses: 21,  type: "medium" },
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

const PRAYERS = [
  { id: "fajr",     name: "الفجر",  nameEn: "Fajr",     icon: "🌅", recLength: "long",   tip: "النبي ﷺ كان يطيل القراءة في الفجر — يُسنّ قراءة السور الطوال",   tipEn: "The Prophet ﷺ used to lengthen recitation in Fajr — long surahs are recommended" },
  { id: "dhuhr",    name: "الظهر",  nameEn: "Dhuhr",    icon: "☀️", recLength: "medium", tip: "القراءة في الظهر متوسطة — مثل سورة الأعلى أو الغاشية",           tipEn: "Medium-length recitation is Sunnah for Dhuhr — like Al-A'la or Al-Ghashiyah" },
  { id: "asr",      name: "العصر",  nameEn: "Asr",      icon: "🌤", recLength: "short",  tip: "صلاة العصر أقصر من الظهر — يُسنّ القراءة بقصار السور",           tipEn: "Asr is shorter than Dhuhr — short surahs are recommended" },
  { id: "maghrib",  name: "المغرب", nameEn: "Maghrib",  icon: "🌇", recLength: "short",  tip: "المغرب وقتها ضيق — القراءة بقصار السور أفضل",                    tipEn: "Maghrib time is short — short surahs are preferred" },
  { id: "isha",     name: "العشاء", nameEn: "Isha",     icon: "🌙", recLength: "medium", tip: "العشاء مثل الظهر — القراءة متوسطة",                              tipEn: "Isha is like Dhuhr — medium-length recitation is Sunnah" },
  { id: "tahajjud", name: "التهجد", nameEn: "Tahajjud", icon: "✨", recLength: "long",   tip: "قيام الليل — أطل القراءة ما استطعت وتدبّر الآيات",               tipEn: "Night prayer — recite at length and reflect deeply on the verses" }
];

function getCurrentPrayer() {
  const h = new Date().getHours();
  if (h >= 4  && h < 6)  return PRAYERS[0];
  if (h >= 12 && h < 15) return PRAYERS[1];
  if (h >= 15 && h < 17) return PRAYERS[2];
  if (h >= 17 && h < 19) return PRAYERS[3];
  if (h >= 19 && h < 22) return PRAYERS[4];
  return PRAYERS[5];
}

function getSurahsForPrayer(prayer) {
  if (prayer.recLength === "long")   return SURAHS.filter(s => s.type === "long" || s.type === "medium");
  if (prayer.recLength === "medium") return SURAHS.filter(s => s.type === "medium" || s.type === "short");
  return SURAHS.filter(s => s.type === "short");
}

async function fetchSurahAyat(surahId) {
  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.asad`
  );
  if (!res.ok) throw new Error("Network error");
  const json = await res.json();
  const arAyat = json.data[0].ayahs;
  const enAyat = json.data[1].ayahs;
  return arAyat.map((a, i) => ({ ar: a.text, en: enAyat[i].text }));
}

export default function QuranAssistant() {
  const [page, setPage] = useState("home");
  const [currentPrayer] = useState(getCurrentPrayer);
  const [suggestion, setSuggestion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [showTranslation, setShowTranslation] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [tahajjudMode, setTahajjudMode] = useState(false);
  const [lastSuggestions, setLastSuggestions] = useState([]);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [language, setLanguage] = useState("ar");
  const [shuffleAnim, setShuffleAnim] = useState(false);
  const [ayatCache, setAyatCache] = useState({});
  const [loadingAyat, setLoadingAyat] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const t = useCallback((ar, en) => language === "ar" ? ar : en, [language]);

  useEffect(() => {
    if (!suggestion) return;
    if (ayatCache[suggestion.id]) return;
    setLoadingAyat(true);
    setFetchError(null);
    fetchSurahAyat(suggestion.id)
      .then(ayat => {
        setAyatCache(prev => ({ ...prev, [suggestion.id]: ayat }));
        setLoadingAyat(false);
      })
      .catch(() => {
        setFetchError(t("فشل تحميل الآيات. تحقق من الاتصال.", "Failed to load. Check your connection."));
        setLoadingAyat(false);
      });
  }, [suggestion]);

  const shuffle = useCallback(() => {
    setShuffleAnim(true);
    setTimeout(() => setShuffleAnim(false), 400);
    const prayer = selectedPrayer || currentPrayer;
    const pool = getSurahsForPrayer(prayer).filter(s => !lastSuggestions.includes(s.id));
    const finalPool = pool.length > 0 ? pool : getSurahsForPrayer(prayer);
    const pick = finalPool[Math.floor(Math.random() * finalPool.length)];
    setSuggestion(pick);
    setLastSuggestions(prev => [...prev.slice(-5), pick.id]);
  }, [currentPrayer, lastSuggestions, selectedPrayer]);

  useEffect(() => { shuffle(); }, []);

  const toggleFav = (surah) => {
    setFavorites(prev =>
      prev.find(f => f.id === surah.id) ? prev.filter(f => f.id !== surah.id) : [...prev, surah]
    );
  };
  const isFav = (surah) => favorites.some(f => f.id === surah.id);
  const markRead = (surah, prayer) => {
    setHistory(prev => [{
      surah, prayer: prayer || currentPrayer,
      date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      timestamp: Date.now()
    }, ...prev]);
  };

  const activePrayer = selectedPrayer || currentPrayer;
  const isTahajjud = tahajjudMode || page === "tahajjud";

  const c = isTahajjud ? {
    bg: "#06060c", card: "#0c0c14", cardAlt: "#0f0f18", accent: "#d4a84b", accentDim: "#d4a84b18",
    text: "#e8e2d4", dim: "#5a5448", border: "#1a1a24", surface: "#090910"
  } : darkMode ? {
    bg: "#0c1117", card: "#131b24", cardAlt: "#172029", accent: "#30a882", accentDim: "#30a88214",
    text: "#dce4ea", dim: "#5d7080", border: "#1c2834", surface: "#101820"
  } : {
    bg: "#f7f2e9", card: "#ffffff", cardAlt: "#fdfbf6", accent: "#1b7a5c", accentDim: "#1b7a5c0c",
    text: "#1a2520", dim: "#6b7e72", border: "#ddd5c4", surface: "#f0ead8"
  };

  const base = {
    card: { background: c.card, borderRadius: 14, padding: "22px 24px", border: `1px solid ${c.border}`, marginBottom: 16, transition: "all 0.3s" },
    btn: (primary) => ({
      padding: "9px 18px", borderRadius: 9, border: primary ? "none" : `1px solid ${c.border}`,
      cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.25s ease",
      background: primary ? c.accent : "transparent", color: primary ? "#fff" : c.accent,
      display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "inherit"
    }),
    ar: (big) => ({
      fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
      fontSize: big ? (isTahajjud ? 34 : 26) : 21,
      lineHeight: 2.1, textAlign: "right", direction: "rtl", color: c.text
    }),
    tag: { display: "inline-block", padding: "3px 10px", borderRadius: 16, fontSize: 11, fontWeight: 700, background: c.accentDim, color: c.accent }
  };

  const NAV = [
    { id: "home",      icon: "🏠", label: t("الرئيسية", "Home") },
    { id: "browse",    icon: "📚", label: t("تصفح",     "Browse") },
    { id: "favorites", icon: "❤️", label: t("المفضلة",  "Favorites") },
    { id: "history",   icon: "📊", label: t("السجل",    "History") },
    { id: "tahajjud",  icon: "🌙", label: t("التهجد",   "Tahajjud") },
    { id: "settings",  icon: "⚙️", label: t("الإعدادات","Settings") }
  ];

  const AyatLoader = () => (
    <div style={{ padding: "24px 0", textAlign: "center" }}>
      {fetchError ? (
        <div style={{ color: "#e05252", fontSize: 13 }}>{fetchError}</div>
      ) : (
        <>
          <div style={{ marginBottom: 10, color: c.dim, fontSize: 13 }}>{t("جارٍ تحميل الآيات…", "Loading ayat…")}</div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 18, background: c.border, borderRadius: 8, marginBottom: 14, opacity: 1 - i * 0.2 }} />
          ))}
        </>
      )}
    </div>
  );

  // ── PAGES ──────────────────────────────────────────────────────────────────

  const HomePage = () => {
    const cachedAyat = suggestion ? ayatCache[suggestion.id] : null;
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: c.dim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, fontFamily: "'Amiri', serif" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1>
        </div>

        <div style={{ ...base.card, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>{activePrayer.icon}</span>
            <div>
              <div style={{ fontSize: 10, color: c.dim, letterSpacing: 1.2, textTransform: "uppercase" }}>{t("الصلاة الحالية", "Current Prayer")}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{t(activePrayer.name, activePrayer.nameEn)}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {PRAYERS.filter(p => p.id !== "tahajjud").map(p => (
              <button key={p.id}
                onClick={() => { setSelectedPrayer(p.id === activePrayer.id && selectedPrayer ? null : p); setTimeout(shuffle, 50); }}
                style={{
                  padding: "5px 12px", borderRadius: 18, border: `1px solid ${p.id === activePrayer.id ? c.accent : c.border}`,
                  background: p.id === activePrayer.id ? c.accent : "transparent",
                  color: p.id === activePrayer.id ? "#fff" : c.dim,
                  fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "all 0.2s", fontFamily: "'Amiri', serif"
                }}>
                {p.icon} {t(p.name, p.nameEn)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ ...base.card, background: c.accentDim, borderColor: `${c.accent}20`, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 18, marginTop: 2 }}>🧠</span>
          <div>
            <div style={{ fontSize: 10, color: c.accent, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>{t("نصيحة من السنة", "Sunnah Tip")}</div>
            <div style={{ fontSize: 13, color: c.text, lineHeight: 1.7, direction: language === "ar" ? "rtl" : "ltr", fontFamily: "'Amiri', serif" }}>
              {t(activePrayer.tip, activePrayer.tipEn)}
            </div>
          </div>
        </div>

        {suggestion && (
          <div style={{ ...base.card, position: "relative", overflow: "hidden", opacity: shuffleAnim ? 0.6 : 1, transform: shuffleAnim ? "scale(0.98)" : "scale(1)", transition: "all 0.3s ease" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 130, height: 130, background: c.accentDim, borderRadius: "50%" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: c.dim, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 3 }}>{t("اقتراح التلاوة", "Suggested Recitation")}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{suggestion.name}</div>
                  <div style={{ fontSize: 13, color: c.dim }}>{suggestion.nameEn} · {suggestion.verses} {t("آية", "verses")}</div>
                </div>
                <span style={base.tag}>{t(suggestion.type === "long" ? "طويلة" : suggestion.type === "medium" ? "متوسطة" : "قصيرة", suggestion.type)}</span>
              </div>

              <div style={{ background: c.surface, borderRadius: 10, padding: 20, marginBottom: 18, border: `1px solid ${c.border}` }}>
                {!cachedAyat ? <AyatLoader /> : (
                  <>
                    {cachedAyat.slice(0, 3).map((a, i) => (
                      <div key={i} style={{ marginBottom: 14 }}>
                        <div style={base.ar(false)}>{a.ar} <span style={{ color: c.accent, fontSize: 13 }}>﴿{i + 1}﴾</span></div>
                        {showTranslation && <div style={{ fontSize: 12, color: c.dim, lineHeight: 1.6, marginTop: 3, textAlign: "left" }}>{a.en}</div>}
                      </div>
                    ))}
                    {cachedAyat.length > 3 && (
                      <div style={{ textAlign: "center", color: c.dim, fontSize: 12, paddingTop: 6 }}>
                        ··· {t(`و ${cachedAyat.length - 3} آيات أخرى`, `${cachedAyat.length - 3} more verses`)} ···
                      </div>
                    )}
                  </>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setPage("detail")} style={base.btn(true)}>📖 {t("اقرأ", "Read")}</button>
                <button onClick={shuffle} style={base.btn(false)}>🔄 {t("آخر", "Shuffle")}</button>
                <button onClick={() => toggleFav(suggestion)} style={base.btn(false)}>{isFav(suggestion) ? "💛" : "🤍"} {t("حفظ", "Save")}</button>
                <button onClick={() => markRead(suggestion, activePrayer)} style={base.btn(false)}>✅ {t("قرأت", "Read")}</button>
              </div>
            </div>
          </div>
        )}

        <div onClick={shuffle} style={{ ...base.card, textAlign: "center", cursor: "pointer", background: `linear-gradient(135deg, ${c.accent}12, ${c.accent}06)`, borderColor: `${c.accent}25` }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>🎲</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.accent }}>{t("اقتراح جديد", "New Suggestion")}</div>
          <div style={{ fontSize: 11, color: c.dim, marginTop: 3 }}>{t("اكتشف سورة جديدة", "Discover a new surah")}</div>
        </div>
      </div>
    );
  };

  const DetailPage = () => {
    if (!suggestion) return null;
    const ayat = ayatCache[suggestion.id];
    return (
      <div>
        <button onClick={() => setPage("home")} style={{ ...base.btn(false), marginBottom: 18 }}>← {t("رجوع", "Back")}</button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: c.accent, fontWeight: 700, letterSpacing: 1 }}>{t("سورة", "Surah")} {suggestion.id}</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: "6px 0 4px", fontFamily: "'Amiri', serif" }}>{suggestion.name}</h1>
          <div style={{ color: c.dim, fontSize: 14 }}>{suggestion.nameEn} · {suggestion.verses} {t("آية", "verses")}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }}>
            <button onClick={() => setShowTranslation(!showTranslation)} style={base.btn(false)}>{showTranslation ? "🔽" : "🔼"} {t("الترجمة", "Translation")}</button>
            <button onClick={() => toggleFav(suggestion)} style={base.btn(false)}>{isFav(suggestion) ? "💛" : "🤍"}</button>
            <button onClick={() => markRead(suggestion, activePrayer)} style={base.btn(true)}>✅ {t("تمت", "Done")}</button>
          </div>
        </div>
        {suggestion.id !== 1 && suggestion.id !== 9 && (
          <div style={{ textAlign: "center", marginBottom: 24, fontSize: 22, fontFamily: "'Amiri', serif", color: c.accent }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        )}
        <div style={base.card}>
          {!ayat ? <AyatLoader /> : ayat.map((a, i) => (
            <div key={i} style={{ padding: "18px 0", borderBottom: i < ayat.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: c.accentDim, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={base.ar(isTahajjud)}>{a.ar}</div>
                  {showTranslation && <div style={{ fontSize: isTahajjud ? 15 : 13, color: c.dim, lineHeight: 1.7, marginTop: 6, textAlign: "left", fontStyle: "italic" }}>{a.en}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
          <button onClick={() => { shuffle(); window.scrollTo(0, 0); }} style={base.btn(false)}>🔁 {t("التالي", "Next")}</button>
          <button onClick={() => setPage("home")} style={base.btn(true)}>🏠 {t("الرئيسية", "Home")}</button>
        </div>
      </div>
    );
  };

  const BrowsePage = () => {
    const [search, setSearch] = useState("");
    const filtered = SURAHS.filter(s =>
      s.name.includes(search) ||
      s.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      String(s.id).includes(search)
    );
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>📚 {t("تصفح القرآن الكريم", "Browse the Quran")}</h2>
        <p style={{ color: c.dim, fontSize: 13, marginBottom: 16 }}>{t("١١٤ سورة كاملة", "All 114 surahs")}</p>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("ابحث عن سورة…", "Search a surah…")}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 9, border: `1px solid ${c.border}`,
            background: c.card, color: c.text, fontSize: 13, marginBottom: 16, outline: "none",
            fontFamily: "inherit", boxSizing: "border-box"
          }}
        />
        {filtered.map(s => (
          <div key={s.id}
            onClick={() => { setSuggestion(s); setPage("detail"); }}
            style={{ ...base.card, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: c.accentDim, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.id}</span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: c.dim }}>{s.nameEn} · {s.verses} {t("آية", "v")}</div>
              </div>
            </div>
            <span style={base.tag}>{t(s.type === "long" ? "طويلة" : s.type === "medium" ? "متوسطة" : "قصيرة", s.type)}</span>
          </div>
        ))}
      </div>
    );
  };

  const FavoritesPage = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>❤️ {t("المفضلة", "Favorites")}</h2>
      <p style={{ color: c.dim, fontSize: 13, marginBottom: 20 }}>{t("السور المحفوظة", "Your saved surahs")}</p>
      {favorites.length === 0 ? (
        <div style={{ ...base.card, textAlign: "center", padding: 44 }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🤍</div>
          <div style={{ color: c.dim }}>{t("لم تحفظ شيئاً بعد", "No favorites yet")}</div>
          <div style={{ color: c.dim, fontSize: 12, marginTop: 6 }}>{t("اضغط 🤍 لحفظ السور", "Tap 🤍 to save surahs")}</div>
        </div>
      ) : favorites.map(s => (
        <div key={s.id} style={{ ...base.card, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
          onClick={() => { setSuggestion(s); setPage("detail"); }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{s.name}</div>
            <div style={{ fontSize: 12, color: c.dim }}>{s.nameEn} · {s.verses} {t("آية", "v")}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={base.tag}>{s.type}</span>
            <button onClick={e => { e.stopPropagation(); toggleFav(s); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>💛</button>
          </div>
        </div>
      ))}
    </div>
  );

  const HistoryPage = () => {
    const grouped = {};
    history.forEach(h => { if (!grouped[h.date]) grouped[h.date] = []; grouped[h.date].push(h); });
    const dates = Object.keys(grouped);
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>📊 {t("سجل التلاوة", "History")}</h2>
        <p style={{ color: c.dim, fontSize: 13, marginBottom: 20 }}>{t("تتبع تلاواتك", "Track your recitations")}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
          {[
            { l: t("القراءات", "Reads"),       v: history.length,                               i: "📖" },
            { l: t("الأيام", "Days"),           v: dates.length,                                i: "📅" },
            { l: t("سور مختلفة", "Surahs"),     v: new Set(history.map(h => h.surah.id)).size,  i: "✨" }
          ].map((s, i) => (
            <div key={i} style={{ ...base.card, textAlign: "center", padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.i}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: c.accent }}>{s.v}</div>
              <div style={{ fontSize: 10, color: c.dim, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {dates.length === 0 ? (
          <div style={{ ...base.card, textAlign: "center", padding: 44 }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>📊</div>
            <div style={{ color: c.dim }}>{t("لا سجل بعد", "No history yet")}</div>
          </div>
        ) : dates.map(date => (
          <div key={date} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>📅 {date}</div>
            {grouped[date].map((entry, i) => (
              <div key={i} style={{ ...base.card, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => { setSuggestion(entry.surah); setPage("detail"); }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{entry.prayer.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontFamily: "'Amiri', serif", fontSize: 15 }}>{entry.surah.name}</div>
                    <div style={{ fontSize: 11, color: c.dim }}>{entry.surah.nameEn}</div>
                  </div>
                </div>
                <span style={base.tag}>{t(entry.prayer.name, entry.prayer.nameEn)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const TahajjudPage = () => {
    const s = suggestion || SURAHS.find(s => s.type === "long");
    const ayat = s ? ayatCache[s.id] : null;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 36, paddingTop: 16 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Amiri', serif", marginBottom: 6 }}>{t("وضع التهجد", "Tahajjud Mode")}</h1>
          <p style={{ color: c.dim, fontSize: 14, maxWidth: 380, margin: "0 auto" }}>{t("قيام الليل — تدبّر وخشوع", "Night prayer — reflection & devotion")}</p>
        </div>
        {s && (
          <div style={{ ...base.card, borderColor: `${c.accent}30` }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{s.name}</div>
              <div style={{ color: c.dim, fontSize: 13 }}>{s.nameEn}</div>
            </div>
            {s.id !== 1 && s.id !== 9 && (
              <div style={{ textAlign: "center", marginBottom: 20, fontSize: 20, fontFamily: "'Amiri', serif", color: c.accent }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            )}
            {!ayat ? <AyatLoader /> : ayat.map((a, i) => (
              <div key={i} style={{ marginBottom: 22, textAlign: "center" }}>
                <div style={{ ...base.ar(true), textAlign: "center" }}>{a.ar} <span style={{ color: c.accent, fontSize: 16 }}>﴿{i + 1}﴾</span></div>
                {showTranslation && <div style={{ fontSize: 15, color: c.dim, textAlign: "center", lineHeight: 1.7, marginTop: 6, fontStyle: "italic", maxWidth: 460, margin: "6px auto 0" }}>{a.en}</div>}
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18 }}>
          <button onClick={() => { setSelectedPrayer(PRAYERS[5]); shuffle(); }} style={base.btn(true)}>🔄 {t("سورة أخرى", "Another")}</button>
          <button onClick={() => setShowTranslation(!showTranslation)} style={base.btn(false)}>{showTranslation ? "🔽" : "🔼"} {t("الترجمة", "Translation")}</button>
        </div>
      </div>
    );
  };

  const SettingsPage = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>⚙️ {t("الإعدادات", "Settings")}</h2>
      {[
        { icon: "🌙", label: t("الوضع الداكن",  "Dark Mode"),     desc: t("تبديل المظهر",          "Toggle theme"),        action: () => setDarkMode(!darkMode),                active: darkMode },
        { icon: "🌍", label: t("اللغة",          "Language"),      desc: language === "ar" ? "العربية" : "English",          action: () => setLanguage(l => l === "ar" ? "en" : "ar"), active: language === "ar" },
        { icon: "📖", label: t("الترجمة",        "Translation"),   desc: t("إظهار الترجمة",         "Show translation"),     action: () => setShowTranslation(!showTranslation),   active: showTranslation },
        { icon: "✨", label: t("وضع التهجد",     "Tahajjud Mode"), desc: t("خط كبير — إضاءة خافتة","Big text, ultra-dark"), action: () => setTahajjudMode(!tahajjudMode),         active: tahajjudMode }
      ].map((item, i) => (
        <div key={i} style={{ ...base.card, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: 18 }} onClick={item.action}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: c.dim }}>{item.desc}</div>
            </div>
          </div>
          <div style={{ width: 44, height: 26, borderRadius: 13, background: item.active ? c.accent : c.border, position: "relative", transition: "all 0.3s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.active ? 21 : 3, transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 28, fontSize: 11, color: c.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{t("البيانات", "Data")}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setHistory([])}   style={base.btn(false)}>🗑 {t("مسح السجل",    "Clear History")}</button>
        <button onClick={() => setFavorites([])} style={base.btn(false)}>💔 {t("مسح المفضلة", "Clear Favorites")}</button>
      </div>
      <div style={{ ...base.card, marginTop: 22, textAlign: "center" }}>
        <div style={{ fontSize: 18, marginBottom: 6 }}>🕌</div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
        <div style={{ fontSize: 11, color: c.dim, marginTop: 3 }}>{t("نسخة 2.0 — جعله الله في ميزان حسناتكم", "v2.0 — May Allah accept it from us all")}</div>
        <div style={{ fontSize: 11, color: c.dim, marginTop: 4 }}>{t("مصدر الآيات: AlQuran.cloud", "Ayat source: AlQuran.cloud")}</div>
      </div>
    </div>
  );

  const pages = { home: HomePage, browse: BrowsePage, detail: DetailPage, favorites: FavoritesPage, history: HistoryPage, tahajjud: TahajjudPage, settings: SettingsPage };
  const Page = pages[page] || HomePage;

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "'Amiri', 'Noto Naskh Arabic', Georgia, serif", transition: "all 0.35s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
        button:hover { opacity: 0.85; }
        button:active { transform: scale(0.97); }
        @media (max-width: 768px) { .desk { display: none !important; } }
        @media (min-width: 769px) { .mob { display: none !important; } }
      `}</style>

      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", minHeight: "100vh" }}>
        <div className="desk" style={{ width: 220, borderRight: `1px solid ${c.border}`, padding: "20px 0", display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 0, height: "100vh", background: c.surface }}>
          <div style={{ padding: "6px 22px 22px", borderBottom: `1px solid ${c.border}`, marginBottom: 6 }}>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Amiri', serif" }}>🕌 القارئ</div>
            <div style={{ fontSize: 10, color: c.dim, marginTop: 1 }}>Smart Recitation</div>
          </div>
          {NAV.map(n => (
            <div key={n.id} onClick={() => setPage(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 22px",
                cursor: "pointer", fontSize: 13,
                fontWeight: (page === n.id || (page === "detail" && n.id === "home")) ? 700 : 400,
                color:      (page === n.id || (page === "detail" && n.id === "home")) ? c.accent : c.dim,
                background: (page === n.id || (page === "detail" && n.id === "home")) ? c.accentDim : "transparent",
                borderLeft: `3px solid ${(page === n.id || (page === "detail" && n.id === "home")) ? c.accent : "transparent"}`,
                transition: "all 0.2s"
              }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, padding: "22px 28px", maxWidth: 740, margin: "0 auto", width: "100%", paddingBottom: 90 }}>
          <Page />
        </div>
      </div>

      <div className="mob" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: c.surface, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-around", padding: "7px 0 10px", zIndex: 100 }}>
        {NAV.map(n => (
          <div key={n.id} onClick={() => setPage(n.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              cursor: "pointer", padding: "3px 6px",
              color: (page === n.id || (page === "detail" && n.id === "home")) ? c.accent : c.dim,
              fontSize: 9, fontWeight: 600, transition: "all 0.2s"
            }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
