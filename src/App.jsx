import { useState, useEffect, useRef, useMemo, memo } from "react";

// ─── 114 SURAHS ───────────────────────────────────────────────────────────────
const SURAHS = [
  { id: 1,   name: "الفاتحة",    nameEn: "Al-Fatiha",        verses: 7,   type: "short"  },
  { id: 2,   name: "البقرة",     nameEn: "Al-Baqarah",       verses: 286, type: "long"   },
  { id: 3,   name: "آل عمران",   nameEn: "Ali 'Imran",       verses: 200, type: "long"   },
  { id: 4,   name: "النساء",     nameEn: "An-Nisa",          verses: 176, type: "long"   },
  { id: 5,   name: "المائدة",    nameEn: "Al-Ma'idah",       verses: 120, type: "long"   },
  { id: 6,   name: "الأنعام",    nameEn: "Al-An'am",         verses: 165, type: "long"   },
  { id: 7,   name: "الأعراف",    nameEn: "Al-A'raf",         verses: 206, type: "long"   },
  { id: 8,   name: "الأنفال",    nameEn: "Al-Anfal",         verses: 75,  type: "medium" },
  { id: 9,   name: "التوبة",     nameEn: "At-Tawbah",        verses: 129, type: "long"   },
  { id: 10,  name: "يونس",       nameEn: "Yunus",            verses: 109, type: "long"   },
  { id: 11,  name: "هود",        nameEn: "Hud",              verses: 123, type: "long"   },
  { id: 12,  name: "يوسف",       nameEn: "Yusuf",            verses: 111, type: "long"   },
  { id: 13,  name: "الرعد",      nameEn: "Ar-Ra'd",          verses: 43,  type: "medium" },
  { id: 14,  name: "إبراهيم",    nameEn: "Ibrahim",          verses: 52,  type: "medium" },
  { id: 15,  name: "الحجر",      nameEn: "Al-Hijr",          verses: 99,  type: "long"   },
  { id: 16,  name: "النحل",      nameEn: "An-Nahl",          verses: 128, type: "long"   },
  { id: 17,  name: "الإسراء",    nameEn: "Al-Isra",          verses: 111, type: "long"   },
  { id: 18,  name: "الكهف",      nameEn: "Al-Kahf",          verses: 110, type: "long"   },
  { id: 19,  name: "مريم",       nameEn: "Maryam",           verses: 98,  type: "long"   },
  { id: 20,  name: "طه",         nameEn: "Ta-Ha",            verses: 135, type: "long"   },
  { id: 21,  name: "الأنبياء",   nameEn: "Al-Anbya",         verses: 112, type: "long"   },
  { id: 22,  name: "الحج",       nameEn: "Al-Hajj",          verses: 78,  type: "medium" },
  { id: 23,  name: "المؤمنون",   nameEn: "Al-Mu'minun",      verses: 118, type: "long"   },
  { id: 24,  name: "النور",      nameEn: "An-Nur",           verses: 64,  type: "medium" },
  { id: 25,  name: "الفرقان",    nameEn: "Al-Furqan",        verses: 77,  type: "medium" },
  { id: 26,  name: "الشعراء",    nameEn: "Ash-Shu'ara",      verses: 227, type: "long"   },
  { id: 27,  name: "النمل",      nameEn: "An-Naml",          verses: 93,  type: "long"   },
  { id: 28,  name: "القصص",      nameEn: "Al-Qasas",         verses: 88,  type: "medium" },
  { id: 29,  name: "العنكبوت",   nameEn: "Al-Ankabut",       verses: 69,  type: "medium" },
  { id: 30,  name: "الروم",      nameEn: "Ar-Rum",           verses: 60,  type: "medium" },
  { id: 31,  name: "لقمان",      nameEn: "Luqman",           verses: 34,  type: "medium" },
  { id: 32,  name: "السجدة",     nameEn: "As-Sajdah",        verses: 30,  type: "medium" },
  { id: 33,  name: "الأحزاب",    nameEn: "Al-Ahzab",         verses: 73,  type: "medium" },
  { id: 34,  name: "سبأ",        nameEn: "Saba",             verses: 54,  type: "medium" },
  { id: 35,  name: "فاطر",       nameEn: "Fatir",            verses: 45,  type: "medium" },
  { id: 36,  name: "يس",         nameEn: "Ya-Sin",           verses: 83,  type: "medium" },
  { id: 37,  name: "الصافات",    nameEn: "As-Saffat",        verses: 182, type: "long"   },
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
  { id: 49,  name: "الحجرات",    nameEn: "Al-Hujurat",       verses: 18,  type: "short"  },
  { id: 50,  name: "ق",          nameEn: "Qaf",              verses: 45,  type: "medium" },
  { id: 51,  name: "الذاريات",   nameEn: "Adh-Dhariyat",     verses: 60,  type: "medium" },
  { id: 52,  name: "الطور",      nameEn: "At-Tur",           verses: 49,  type: "medium" },
  { id: 53,  name: "النجم",      nameEn: "An-Najm",          verses: 62,  type: "medium" },
  { id: 54,  name: "القمر",      nameEn: "Al-Qamar",         verses: 55,  type: "medium" },
  { id: 55,  name: "الرحمن",     nameEn: "Ar-Rahman",        verses: 78,  type: "medium" },
  { id: 56,  name: "الواقعة",    nameEn: "Al-Waqi'ah",       verses: 96,  type: "long"   },
  { id: 57,  name: "الحديد",     nameEn: "Al-Hadid",         verses: 29,  type: "medium" },
  { id: 58,  name: "المجادلة",   nameEn: "Al-Mujadila",      verses: 22,  type: "medium" },
  { id: 59,  name: "الحشر",      nameEn: "Al-Hashr",         verses: 24,  type: "medium" },
  { id: 60,  name: "الممتحنة",   nameEn: "Al-Mumtahanah",    verses: 13,  type: "short"  },
  { id: 61,  name: "الصف",       nameEn: "As-Saf",           verses: 14,  type: "short"  },
  { id: 62,  name: "الجمعة",     nameEn: "Al-Jumu'ah",       verses: 11,  type: "short"  },
  { id: 63,  name: "المنافقون",  nameEn: "Al-Munafiqun",     verses: 11,  type: "short"  },
  { id: 64,  name: "التغابن",    nameEn: "At-Taghabun",      verses: 18,  type: "short"  },
  { id: 65,  name: "الطلاق",     nameEn: "At-Talaq",         verses: 12,  type: "short"  },
  { id: 66,  name: "التحريم",    nameEn: "At-Tahrim",        verses: 12,  type: "short"  },
  { id: 67,  name: "الملك",      nameEn: "Al-Mulk",          verses: 30,  type: "medium" },
  { id: 68,  name: "القلم",      nameEn: "Al-Qalam",         verses: 52,  type: "medium" },
  { id: 69,  name: "الحاقة",     nameEn: "Al-Haqqah",        verses: 52,  type: "medium" },
  { id: 70,  name: "المعارج",    nameEn: "Al-Ma'arij",       verses: 44,  type: "medium" },
  { id: 71,  name: "نوح",        nameEn: "Nuh",              verses: 28,  type: "medium" },
  { id: 72,  name: "الجن",       nameEn: "Al-Jinn",          verses: 28,  type: "medium" },
  { id: 73,  name: "المزمل",     nameEn: "Al-Muzzammil",     verses: 20,  type: "short"  },
  { id: 74,  name: "المدثر",     nameEn: "Al-Muddaththir",   verses: 56,  type: "medium" },
  { id: 75,  name: "القيامة",    nameEn: "Al-Qiyamah",       verses: 40,  type: "medium" },
  { id: 76,  name: "الإنسان",    nameEn: "Al-Insan",         verses: 31,  type: "medium" },
  { id: 77,  name: "المرسلات",   nameEn: "Al-Mursalat",      verses: 50,  type: "medium" },
  { id: 78,  name: "النبأ",      nameEn: "An-Naba",          verses: 40,  type: "medium" },
  { id: 79,  name: "النازعات",   nameEn: "An-Nazi'at",       verses: 46,  type: "medium" },
  { id: 80,  name: "عبس",        nameEn: "Abasa",            verses: 42,  type: "medium" },
  { id: 81,  name: "التكوير",    nameEn: "At-Takwir",        verses: 29,  type: "medium" },
  { id: 82,  name: "الانفطار",   nameEn: "Al-Infitar",       verses: 19,  type: "short"  },
  { id: 83,  name: "المطففين",   nameEn: "Al-Mutaffifin",    verses: 36,  type: "medium" },
  { id: 84,  name: "الانشقاق",   nameEn: "Al-Inshiqaq",      verses: 25,  type: "medium" },
  { id: 85,  name: "البروج",     nameEn: "Al-Buruj",         verses: 22,  type: "medium" },
  { id: 86,  name: "الطارق",     nameEn: "At-Tariq",         verses: 17,  type: "short"  },
  { id: 87,  name: "الأعلى",     nameEn: "Al-A'la",          verses: 19,  type: "short"  },
  { id: 88,  name: "الغاشية",    nameEn: "Al-Ghashiyah",     verses: 26,  type: "medium" },
  { id: 89,  name: "الفجر",      nameEn: "Al-Fajr",          verses: 30,  type: "medium" },
  { id: 90,  name: "البلد",      nameEn: "Al-Balad",         verses: 20,  type: "short"  },
  { id: 91,  name: "الشمس",      nameEn: "Ash-Shams",        verses: 15,  type: "short"  },
  { id: 92,  name: "الليل",      nameEn: "Al-Layl",          verses: 21,  type: "medium" },
  { id: 93,  name: "الضحى",      nameEn: "Ad-Duha",          verses: 11,  type: "short"  },
  { id: 94,  name: "الشرح",      nameEn: "Ash-Sharh",        verses: 8,   type: "short"  },
  { id: 95,  name: "التين",      nameEn: "At-Tin",           verses: 8,   type: "short"  },
  { id: 96,  name: "العلق",      nameEn: "Al-Alaq",          verses: 19,  type: "short"  },
  { id: 97,  name: "القدر",      nameEn: "Al-Qadr",          verses: 5,   type: "short"  },
  { id: 98,  name: "البينة",     nameEn: "Al-Bayyinah",      verses: 8,   type: "short"  },
  { id: 99,  name: "الزلزلة",    nameEn: "Az-Zalzalah",      verses: 8,   type: "short"  },
  { id: 100, name: "العاديات",   nameEn: "Al-Adiyat",        verses: 11,  type: "short"  },
  { id: 101, name: "القارعة",    nameEn: "Al-Qari'ah",       verses: 11,  type: "short"  },
  { id: 102, name: "التكاثر",    nameEn: "At-Takathur",      verses: 8,   type: "short"  },
  { id: 103, name: "العصر",      nameEn: "Al-Asr",           verses: 3,   type: "short"  },
  { id: 104, name: "الهمزة",     nameEn: "Al-Humazah",       verses: 9,   type: "short"  },
  { id: 105, name: "الفيل",      nameEn: "Al-Fil",           verses: 5,   type: "short"  },
  { id: 106, name: "قريش",       nameEn: "Quraysh",          verses: 4,   type: "short"  },
  { id: 107, name: "الماعون",    nameEn: "Al-Ma'un",         verses: 7,   type: "short"  },
  { id: 108, name: "الكوثر",     nameEn: "Al-Kawthar",       verses: 3,   type: "short"  },
  { id: 109, name: "الكافرون",   nameEn: "Al-Kafirun",       verses: 6,   type: "short"  },
  { id: 110, name: "النصر",      nameEn: "An-Nasr",          verses: 3,   type: "short"  },
  { id: 111, name: "المسد",      nameEn: "Al-Masad",         verses: 5,   type: "short"  },
  { id: 112, name: "الإخلاص",    nameEn: "Al-Ikhlas",        verses: 4,   type: "short"  },
  { id: 113, name: "الفلق",      nameEn: "Al-Falaq",         verses: 5,   type: "short"  },
  { id: 114, name: "الناس",      nameEn: "An-Nas",           verses: 6,   type: "short"  },
];

const PI = {
  Fajr:    { ar: "الفجر",  icon: "🌅", color: "#818CF8", rec: "long"   },
  Dhuhr:   { ar: "الظهر",  icon: "☀️", color: "#F59E0B", rec: "medium" },
  Asr:     { ar: "العصر",  icon: "🌤", color: "#10B981", rec: "short"  },
  Maghrib: { ar: "المغرب", icon: "🌇", color: "#F97316", rec: "short"  },
  Isha:    { ar: "العشاء", icon: "🌙", color: "#A78BFA", rec: "medium" },
};
const SALAH = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ─── CURATED AYAT PER PRAYER ──────────────────────────────────────────────────
// Each entry: { id: surahId, from: startAya, to: endAya, reason }
const PRAYER_RECS = {
  Fajr: [
    { id: 36, from: 1, to: 83,  reason: "يس — قلب القرآن · Ya-Sin, heart of the Quran" },
    { id: 32, from: 1, to: 30,  reason: "السجدة — سنّة الفجر · As-Sajdah, Fajr Sunnah" },
    { id: 67, from: 1, to: 30,  reason: "الملك — حفظ يومي · Al-Mulk, daily protection" },
    { id: 50, from: 1, to: 45,  reason: "ق — كان النبي ﷺ يقرأها في الفجر · Sunnah of Fajr" },
    { id: 73, from: 1, to: 20,  reason: "المزمل — صاحب القيام · Al-Muzzammil" },
    { id: 56, from: 1, to: 96,  reason: "الواقعة — بركة الرزق · Al-Waqi'ah" },
    { id: 55, from: 1, to: 78,  reason: "الرحمن — شكر نعم الله · Ar-Rahman" },
  ],
  Dhuhr: [
    { id: 87,  from: 1, to: 19, reason: "الأعلى — سنّة الظهر · Al-A'la, Dhuhr Sunnah" },
    { id: 88,  from: 1, to: 26, reason: "الغاشية — سنّة الظهر · Al-Ghashiyah, Dhuhr Sunnah" },
    { id: 112, from: 1, to: 4,  reason: "الإخلاص — تعدل ثلث القرآن · Al-Ikhlas" },
    { id: 109, from: 1, to: 6,  reason: "الكافرون — براءة من الشرك · Al-Kafirun" },
    { id: 94,  from: 1, to: 8,  reason: "الشرح — مع العسر يسر · Ash-Sharh" },
    { id: 95,  from: 1, to: 8,  reason: "التين — خلق الإنسان · At-Tin" },
    { id: 97,  from: 1, to: 5,  reason: "القدر — ليلة خير من ألف شهر · Al-Qadr" },
  ],
  Asr: [
    { id: 103, from: 1, to: 3,  reason: "العصر — مفتاح الفلاح · Al-Asr, key to success" },
    { id: 112, from: 1, to: 4,  reason: "الإخلاص — التوحيد الخالص · Al-Ikhlas" },
    { id: 114, from: 1, to: 6,  reason: "الناس — حصن من الوسواس · An-Nas" },
    { id: 113, from: 1, to: 5,  reason: "الفلق — حصن من الأذى · Al-Falaq" },
    { id: 108, from: 1, to: 3,  reason: "الكوثر — نعمة الله العظيمة · Al-Kawthar" },
    { id: 99,  from: 1, to: 8,  reason: "الزلزلة — الحساب الدقيق · Az-Zalzalah" },
    { id: 107, from: 1, to: 7,  reason: "الماعون — الصلاة والناس · Al-Ma'un" },
  ],
  Maghrib: [
    { id: 87,  from: 1, to: 19, reason: "الأعلى — سنّة المغرب · Al-A'la, Maghrib Sunnah" },
    { id: 88,  from: 1, to: 26, reason: "الغاشية — سنّة المغرب · Al-Ghashiyah, Maghrib Sunnah" },
    { id: 112, from: 1, to: 4,  reason: "الإخلاص — تُقرأ ثلاث مرات · Al-Ikhlas ×3" },
    { id: 113, from: 1, to: 5,  reason: "الفلق — حصن المساء · Al-Falaq" },
    { id: 114, from: 1, to: 6,  reason: "الناس — حصن المساء · An-Nas" },
    { id: 106, from: 1, to: 4,  reason: "قريش — شكر النعمة · Quraysh" },
    { id: 110, from: 1, to: 3,  reason: "النصر — الشكر عند الفتح · An-Nasr" },
  ],
  Isha: [
    { id: 109, from: 1, to: 6,  reason: "الكافرون — سنّة قبل النوم · Al-Kafirun" },
    { id: 112, from: 1, to: 4,  reason: "الإخلاص — ورد المساء · Al-Ikhlas" },
    { id: 113, from: 1, to: 5,  reason: "الفلق — حماية النوم · Al-Falaq" },
    { id: 114, from: 1, to: 6,  reason: "الناس — حماية النوم · An-Nas" },
    { id: 67,  from: 1, to: 30, reason: "الملك — حفظ من عذاب القبر · Al-Mulk" },
    { id: 110, from: 1, to: 3,  reason: "النصر — ختام اليوم · An-Nasr" },
    { id: 97,  from: 1, to: 5,  reason: "القدر — ليلة القدر · Al-Qadr" },
  ],
  Tahajjud: [
    { id: 76,  from: 1, to: 31, reason: "الإنسان — ثواب صلاة الليل · Al-Insan, reward of night prayer" },
    { id: 73,  from: 1, to: 20, reason: "المزمل — أهل القيام · Al-Muzzammil, the night vigil" },
    { id: 32,  from: 1, to: 30, reason: "السجدة — سنّة التهجد · As-Sajdah" },
    { id: 67,  from: 1, to: 30, reason: "الملك — أمان الليل · Al-Mulk" },
    { id: 55,  from: 1, to: 78, reason: "الرحمن — مناجاة الله · Ar-Rahman" },
    { id: 36,  from: 1, to: 83, reason: "يس — قلب القرآن · Ya-Sin" },
    { id: 56,  from: 1, to: 96, reason: "الواقعة — بركة الرزق · Al-Waqi'ah" },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
async function fetchByCoords(lat, lon) {
  const d = new Date();
  const r = await fetch(`https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}?latitude=${lat}&longitude=${lon}&method=4`);
  return (await r.json()).data.timings;
}
async function fetchByCity(city) {
  const r = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=&method=4`);
  const j = await r.json();
  if (j.code !== 200) throw new Error("Not found");
  return j.data.timings;
}
async function fetchAyat(id) {
  const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.asad`);
  if (!r.ok) throw new Error();
  const j = await r.json();
  return j.data[0].ayahs.map((a, i) => ({ ar: a.text, en: j.data[1].ayahs[i].text }));
}
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
  const now = new Date(); let prev = null;
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
function fmtCD(ms) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  return [Math.floor(s/3600), Math.floor((s%3600)/60), s%60].map(n => String(n).padStart(2,"0")).join(":");
}
function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  return `${h%12||12}:${String(m).padStart(2,"0")} ${h>=12?"PM":"AM"}`;
}
function getActivePrayer(timings) {
  const h = new Date().getHours();
  if (h >= 1 && h < 5) return "Tahajjud";
  if (!timings) return "Isha";
  return getNext(timings).name;
}

// ─── ISOLATED COUNTDOWN — has its own state, never re-renders parent ──────────
const PrayerCountdown = memo(function PrayerCountdown({ timings, lang }) {
  const [cd, setCd] = useState("--:--:--");
  const [next, setNext] = useState(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!timings) return;
    const tick = () => {
      const nx = getNext(timings), pv = getPrev(timings);
      const msLeft = nx.date - new Date(), total = nx.date - pv.date;
      setNext(nx); setCd(fmtCD(msLeft)); setPct((total - msLeft) / total);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timings]);

  if (!next) return null;
  const info = PI[next.name];
  const r = 52, circ = 2 * Math.PI * r;

  return (
    <div style={{ background: "#1E293B", borderRadius: 16, padding: "20px", marginBottom: 14, border: "1px solid #334155" }}>
      <div style={{ fontSize: 10, color: "#64748B", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
        {lang === "ar" ? "الصلاة القادمة" : "NEXT PRAYER"}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
          <svg width={120} height={120} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
            <circle cx={60} cy={60} r={r} fill="none" stroke="#334155" strokeWidth={8} />
            <circle cx={60} cy={60} r={r} fill="none" stroke={info.color} strokeWidth={8}
              strokeDasharray={circ} strokeDashoffset={circ * (1 - Math.min(Math.max(pct,0),1))}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28 }}>{info.icon}</span>
            <span style={{ fontSize: 10, color: "#94A3B8", marginTop: 2, fontWeight: 600 }}>{lang === "ar" ? info.ar : next.name}</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 3, color: "#F1F5F9", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{cd}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>
            {lang === "ar" ? "وقت الأذان" : "Athan at"} <b style={{ color: info.color }}>{fmt12(next.time)}</b>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── PRAYER SCHEDULE STRIP ────────────────────────────────────────────────────
const PrayerStrip = memo(function PrayerStrip({ timings, lang }) {
  const [currentNext, setCurrentNext] = useState(null);
  useEffect(() => {
    if (!timings) return;
    const update = () => setCurrentNext(getNext(timings).name);
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [timings]);

  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      {SALAH.map(p => {
        const info = PI[p];
        const [h, m] = timings[p].split(":").map(Number);
        const pDate = new Date(); pDate.setHours(h, m, 0, 0);
        const passed = pDate < new Date() && p !== currentNext;
        const isNext = p === currentNext;
        return (
          <div key={p} style={{
            flex: 1, minWidth: 58, textAlign: "center", padding: "10px 4px", borderRadius: 12,
            background: isNext ? `${info.color}22` : "#1E293B",
            border: `1px solid ${isNext ? info.color+"55" : "#334155"}`,
            opacity: passed ? 0.45 : 1,
          }}>
            <div style={{ fontSize: 18 }}>{info.icon}</div>
            <div style={{ fontSize: 9, color: isNext ? info.color : "#64748B", fontWeight: 700, marginTop: 4 }}>
              {lang === "ar" ? info.ar : p}
            </div>
            <div style={{ fontSize: 11, color: "#F1F5F9", fontWeight: 700, marginTop: 2 }}>{fmt12(timings[p])}</div>
            {passed && <div style={{ fontSize: 10, color: "#10B981" }}>✓</div>}
          </div>
        );
      })}
    </div>
  );
});

// ─── SURAH ROW — memoized so the list doesn't re-render on search ─────────────
const SurahRow = memo(function SurahRow({ s, onClick, accent }) {
  const typeColor = s.type === "long" ? "#F87171" : s.type === "medium" ? "#F59E0B" : "#10B981";
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 13, marginBottom: 7, background: "#1E293B", border: "1px solid #334155", cursor: "pointer" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${accent}18`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.id}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontFamily: "'Amiri', serif", fontSize: 17, color: "#F1F5F9" }}>{s.name}</div>
        <div style={{ fontSize: 11, color: "#64748B" }}>{s.nameEn} · {s.verses} v</div>
      </div>
      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${typeColor}20`, color: typeColor }}>{s.type}</span>
    </div>
  );
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = memo(function Toast({ data }) {
  if (!data) return null;
  return (
    <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", background: "#0F172A", border: "1px solid #334155", borderRadius: 14, padding: "12px 20px", color: "#F1F5F9", fontSize: 13, zIndex: 9999, display: "flex", alignItems: "center", gap: 12, maxWidth: 320, boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}>
      <span style={{ fontSize: 20 }}>{data.icon}</span>
      <div><div style={{ fontWeight: 700 }}>{data.title}</div>{data.msg && <div style={{ opacity: 0.6, fontSize: 11, marginTop: 2 }}>{data.msg}</div>}</div>
    </div>
  );
});

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("home");
  const [lang, setLang]         = useState(() => localStorage.getItem("qr_lang") || "ar");
  const [dark, setDark]         = useState(() => localStorage.getItem("qr_dark") !== "false");
  const [showTrans, setShowTrans] = useState(() => localStorage.getItem("qr_trans") !== "false");
  const [notifOn, setNotifOn]   = useState(() => localStorage.getItem("qr_notif") === "true");

  const [timings, setTimings]       = useState(null);
  const [locName, setLocName]       = useState(null);
  const [cityInput, setCityInput]   = useState("");
  const [cityBusy, setCityBusy]     = useState(false);
  const [loadingPT, setLoadingPT]   = useState(true);

  // current prayer name — updated once per minute (not per second!)
  const [curPrayer, setCurPrayer]   = useState("Isha");

  const [suggestion, setSuggestion] = useState(null);
  const [ayatCache, setAyatCache]   = useState({});
  const [loadingAyat, setLoadingAyat] = useState(false);
  const [ayatErr, setAyatErr]       = useState(false);
  const [lastPicks, setLastPicks]   = useState([]);
  const [shuffleAnim, setShuffleAnim] = useState(false);
  const [reading, setReading]       = useState(null); // surah in detail view
  const [search, setSearch]         = useState("");

  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("qr_favs") || "[]"));
  const [history,   setHistory]   = useState(() => JSON.parse(localStorage.getItem("qr_hist") || "[]"));
  const [streak,    setStreak]    = useState(() => JSON.parse(localStorage.getItem("qr_streak") || '{"count":0,"last":""}'));

  const [toast, setToast] = useState(null);
  const toastRef   = useRef(null);
  const timingsRef = useRef(null);
  const notifiedRef = useRef(new Set());

  const t = (ar, en) => lang === "ar" ? ar : en;
  const today = new Date().toDateString();
  const todayReads = useMemo(() => history.filter(h => h.date === today).length, [history]);
  const accent = "#6366F1";

  // Persist
  useEffect(() => { localStorage.setItem("qr_lang",   lang);   }, [lang]);
  useEffect(() => { localStorage.setItem("qr_dark",   dark);   }, [dark]);
  useEffect(() => { localStorage.setItem("qr_trans",  showTrans); }, [showTrans]);
  useEffect(() => { localStorage.setItem("qr_notif",  notifOn); }, [notifOn]);
  useEffect(() => { localStorage.setItem("qr_favs",   JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("qr_hist",   JSON.stringify(history));   }, [history]);

  // Toast
  const showToast = (d) => { clearTimeout(toastRef.current); setToast(d); toastRef.current = setTimeout(() => setToast(null), 3500); };

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) { setLoadingPT(false); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lon } }) => {
        fetchByCoords(lat, lon).then(t => { setTimings(t); timingsRef.current = t; }).finally(() => setLoadingPT(false));
      },
      () => setLoadingPT(false)
    );
  }, []);

  // Current prayer — updates every minute only
  useEffect(() => {
    if (!timings) return;
    const update = () => setCurPrayer(getNext(timings).name);
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [timings]);

  // Notification checker — runs every 30s using ref (no re-render)
  useEffect(() => {
    if (!notifOn) return;
    const check = () => {
      const tms = timingsRef.current; if (!tms) return;
      const now = new Date();
      for (const p of SALAH) {
        const [h, m] = tms[p].split(":").map(Number);
        const pt = new Date(); pt.setHours(h, m, 0, 0);
        const diff = (pt - now) / 60000;
        const key = `${p}-${pt.toDateString()}`;
        if (diff > 0 && diff <= 15 && !notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          const info = PI[p];
          showToast({ icon: info.icon, title: `${lang === "ar" ? info.ar : p} ${lang === "ar" ? "بعد 15 دقيقة" : "in 15 min"}`, msg: fmt12(tms[p]) });
          if (Notification.permission === "granted")
            new Notification(`${info.icon} ${lang === "ar" ? info.ar : p}`, { body: fmt12(tms[p]), icon: "/quran.svg" });
        }
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [notifOn, lang]);

  // Initial shuffle — re-run when timings load so prayer detection is accurate
  useEffect(() => { setTimeout(doShuffle, 400); }, [timings]);

  // Fetch ayat
  useEffect(() => {
    const s = reading || suggestion; if (!s || ayatCache[s.id]) return;
    setLoadingAyat(true); setAyatErr(false);
    fetchAyat(s.id)
      .then(a => setAyatCache(prev => ({ ...prev, [s.id]: a })))
      .catch(() => setAyatErr(true))
      .finally(() => setLoadingAyat(false));
  }, [reading?.id, suggestion?.id]);

  function doShuffle(pName) {
    const prayer = pName || getActivePrayer(timings);
    const recs = PRAYER_RECS[prayer] || PRAYER_RECS.Isha;
    const available = recs.filter(r => !lastPicks.includes(r.id));
    const src = available.length > 0 ? available : recs;
    const rec = src[Math.floor(Math.random() * src.length)];
    const surahMeta = SURAHS.find(s => s.id === rec.id);
    setShuffleAnim(true); setTimeout(() => setShuffleAnim(false), 350);
    setSuggestion({ ...surahMeta, from: rec.from, to: rec.to, reason: rec.reason, prayerName: prayer });
    setLastPicks(prev => [...prev.slice(-6), rec.id]);
  }

  const toggleFav = (s) => {
    const has = favorites.some(f => f.id === s.id);
    setFavorites(prev => has ? prev.filter(f => f.id !== s.id) : [...prev, s]);
    showToast({ icon: has ? "💔" : "💛", title: has ? t("حُذف من المفضلة", "Removed") : t("حُفظ", "Saved") });
  };
  const isFav = (s) => favorites.some(f => f.id === s.id);

  const markRead = (s) => {
    setHistory(prev => [{ surah: s, prayer: curPrayer, date: today, timestamp: Date.now() }, ...prev.slice(0, 199)]);
    setStreak(prev => {
      const yest = new Date(); yest.setDate(yest.getDate() - 1);
      const n = prev.last === today ? prev : prev.last === yest.toDateString() ? { count: prev.count + 1, last: today } : { count: 1, last: today };
      localStorage.setItem("qr_streak", JSON.stringify(n)); return n;
    });
    showToast({ icon: "✅", title: t("ما شاء الله!", "Masha Allah!"), msg: s.name });
  };

  const loadCity = async () => {
    if (!cityInput.trim()) return; setCityBusy(true);
    try {
      const tms = await fetchByCity(cityInput.trim());
      setTimings(tms); timingsRef.current = tms; setLocName(cityInput.trim());
      showToast({ icon: "🕌", title: t("تم تحديث أوقات الصلاة", "Prayer times updated"), msg: cityInput.trim() });
    } catch { showToast({ icon: "❌", title: t("مدينة غير موجودة", "City not found") }); }
    setCityBusy(false);
  };

  const enableNotif = async () => {
    const perm = await Notification.requestPermission();
    if (perm === "granted") { setNotifOn(true); showToast({ icon: "🔔", title: t("تم تفعيل الإشعارات", "Notifications on"), msg: t("15 دقيقة قبل كل صلاة", "15 min before each prayer") }); }
    else showToast({ icon: "🔕", title: t("لم يُسمح بالإشعارات", "Permission denied") });
  };

  // Colors
  const C = dark
    ? { bg: "#0F172A", card: "#1E293B", border: "#334155", text: "#F1F5F9", sub: "#94A3B8", dim: "#475569", input: "#0F172A" }
    : { bg: "#F8FAFC", card: "#FFFFFF",  border: "#E2E8F0", text: "#1E293B", sub: "#64748B", dim: "#CBD5E1", input: "#F8FAFC" };

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 };
  const btn = (v = "primary") => {
    const base = { padding: "9px 18px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "inherit", border: "none", transition: "opacity 0.15s" };
    if (v === "primary") return { ...base, background: accent,   color: "#fff" };
    if (v === "ghost")   return { ...base, background: "transparent", color: accent, border: `1px solid ${C.border}` };
    if (v === "green")   return { ...base, background: "#10B981", color: "#fff" };
    if (v === "red")     return { ...base, background: "transparent", color: "#F87171", border: "1px solid #F8717140" };
  };

  // ── Filtered surah list (memoized — only recomputes when search changes) ────
  const filtered = useMemo(() =>
    SURAHS.filter(s => s.name.includes(search) || s.nameEn.toLowerCase().includes(search.toLowerCase()) || String(s.id).includes(search)),
    [search]
  );

  const NAV = [
    { id: "home",      icon: "🏠", label: t("الرئيسية", "Home")     },
    { id: "quran",     icon: "📚", label: t("القرآن",   "Quran")    },
    { id: "favorites", icon: "❤️", label: t("المفضلة",  "Saved")    },
    { id: "history",   icon: "📊", label: t("السجل",    "History")  },
    { id: "settings",  icon: "⚙️", label: t("الإعدادات","Settings") },
  ];

  // ════════ PAGES ═══════════════════════════════════════════════════════════

  // ── Home ──────────────────────────────────────────────────────────────────
  const HomePage = () => {
    const h = new Date().getHours();
    const greet = h < 12 ? t("صباح الخير ☀️", "Good Morning ☀️") : h < 18 ? t("مساء الخير 🌤", "Good Afternoon 🌤") : t("مساء النور 🌙", "Good Evening 🌙");
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.sub }}>{new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "long", day: "numeric", month: "long" })}</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: C.text, margin: "3px 0 0" }}>{greet}</h1>
        </div>

        {/* Prayer countdown — ISOLATED, doesn't re-render this page */}
        {timings ? <PrayerCountdown timings={timings} lang={lang} /> : !loadingPT ? (
          <div style={card}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: C.text }}>📍 {t("أدخل مدينتك", "Enter your city")}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCity()}
                placeholder={t("مثال: القاهرة", "e.g. Cairo")}
                style={{ flex: 1, padding: "9px 13px", borderRadius: 9, border: `1px solid ${C.border}`, background: C.input, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button onClick={loadCity} style={btn("primary")}>{cityBusy ? "…" : t("بحث", "Go")}</button>
            </div>
          </div>
        ) : <div style={{ ...card, textAlign: "center", color: C.sub, padding: 30 }}>🕌 {t("جارٍ التحميل…", "Loading…")}</div>}

        {/* Prayer strip — updates every minute, isolated */}
        {timings && <PrayerStrip timings={timings} lang={lang} />}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { icon: "🔥", v: streak.count, l: t("أيام", "Streak"),   c: "#F59E0B" },
            { icon: "📖", v: todayReads,   l: t("اليوم", "Today"),   c: "#10B981" },
            { icon: "✨", v: history.length,l: t("إجمالي", "Total"), c: accent    },
          ].map((s, i) => (
            <div key={i} style={{ ...card, textAlign: "center", padding: "14px 8px", marginBottom: 0 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: C.sub, fontWeight: 600, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── Today's Recitation Card ───────────────────────────────────── */}
        {suggestion && (() => {
          const ayat = ayatCache[suggestion.id];
          const pInfo = PI[suggestion.prayerName] || PI.Isha;
          const pLabel = suggestion.prayerName === "Tahajjud"
            ? (lang === "ar" ? "🌙 التهجد" : "🌙 Tahajjud")
            : `${pInfo.icon} ${lang === "ar" ? pInfo.ar : suggestion.prayerName}`;
          const isShort = (suggestion.to - suggestion.from + 1) <= 15;
          const MAX_SHOW = isShort ? 999 : 8;
          const sliced = ayat ? ayat.slice(suggestion.from - 1, suggestion.to) : null;
          const displayAyat = sliced ? sliced.slice(0, MAX_SHOW) : null;
          const hasMore = sliced && sliced.length > MAX_SHOW;
          return (
            <div style={{ ...card, opacity: shuffleAnim ? 0.55 : 1, transition: "opacity 0.3s", borderColor: `${pInfo.color}40` }}>

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ background: `${pInfo.color}22`, color: pInfo.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>{pLabel}</span>
                <span style={{ flex: 1, fontSize: 11, color: C.sub, direction: "rtl", textAlign: "right" }}>{suggestion.reason}</span>
              </div>

              {/* Surah title */}
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 30, fontFamily: "'Amiri', serif", fontWeight: 700, color: C.text }}>{suggestion.name}</div>
                <div style={{ fontSize: 13, color: C.sub }}>{suggestion.nameEn} · {t("الآيات", "Ayat")} {suggestion.from}–{suggestion.to}</div>
              </div>

              {/* Bismillah */}
              {suggestion.id !== 9 && (
                <div style={{ textAlign: "center", fontFamily: "'Amiri', serif", fontSize: 20, color: "#F59E0B", marginBottom: 14 }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              )}

              {/* Ayat */}
              <div style={{ background: dark ? "#0F172A" : "#F0F4FF", borderRadius: 12, padding: "16px", marginBottom: 14, border: `1px solid ${C.border}` }}>
                {!displayAyat ? (
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.sub, fontSize: 13 }}>
                    {loadingAyat ? (lang === "ar" ? "⏳ جارٍ التحميل…" : "⏳ Loading ayat…") : ayatErr ? "⚠️ " + t("فشل التحميل، اضغط تحديث", "Failed to load — try again") : "…"}
                  </div>
                ) : displayAyat.map((a, i) => {
                  const ayaNum = suggestion.from + i;
                  return (
                    <div key={i} style={{ paddingBottom: i < displayAyat.length - 1 ? 14 : 0, marginBottom: i < displayAyat.length - 1 ? 14 : 0, borderBottom: i < displayAyat.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ fontFamily: "'Amiri', serif", fontSize: 24, textAlign: "right", direction: "rtl", color: C.text, lineHeight: 2.2 }}>
                        {a.ar} <span style={{ fontSize: 14, color: pInfo.color }}>﴿{ayaNum}﴾</span>
                      </div>
                      {showTrans && <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.7, marginTop: 4, fontStyle: "italic" }}>{a.en}</div>}
                    </div>
                  );
                })}
                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <button style={btn("ghost")} onClick={() => { setReading(suggestion); setPage("quran"); window.scrollTo(0,0); }}>
                      {t(`+ ${sliced.length - MAX_SHOW} آية أخرى — اقرأ كاملاً`, `+ ${sliced.length - MAX_SHOW} more — Read full surah`)}
                    </button>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={btn("green")} onClick={() => { markRead(suggestion); showToast({ icon: "✅", title: t("أحسنت! ما شاء الله", "Well done! Masha Allah"), msg: suggestion.name }); }}>
                  ✅ {t("أتممت التلاوة", "Done Reading")}
                </button>
                <button style={btn("ghost")} onClick={() => doShuffle()}>🔄 {t("سورة أخرى", "Different Surah")}</button>
                <button style={btn("ghost")} onClick={() => { setReading(suggestion); setPage("quran"); window.scrollTo(0,0); }}>📖 {t("اقرأ كاملاً", "Full Surah")}</button>
                <button style={{ ...btn("ghost"), minWidth: 44 }} onClick={() => toggleFav(suggestion)}>{isFav(suggestion) ? "💛" : "🤍"}</button>
              </div>
            </div>
          );
        })()}

        {/* Notification banner */}
        {!notifOn && timings && (
          <div style={{ ...card, display: "flex", alignItems: "center", gap: 14, borderColor: "#F59E0B50" }}>
            <span style={{ fontSize: 26 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t("فعّل إشعارات الصلاة", "Enable Prayer Alerts")}</div>
              <div style={{ fontSize: 12, color: C.sub }}>{t("15 دقيقة قبل كل صلاة", "15 min before each prayer")}</div>
            </div>
            <button style={btn("green")} onClick={enableNotif}>{t("تفعيل", "Enable")}</button>
          </div>
        )}
      </div>
    );
  };

  // ── Quran (Browse + Reader) ───────────────────────────────────────────────
  const QuranPage = () => {
    if (reading) {
      const ayat = ayatCache[reading.id];
      return (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <button style={btn("ghost")} onClick={() => setReading(null)}>← {t("رجوع", "Back")}</button>
            <div style={{ flex: 1 }} />
            <button style={btn("ghost")} onClick={() => toggleFav(reading)}>{isFav(reading) ? "💛" : "🤍"}</button>
            <button style={btn("green")} onClick={() => { markRead(reading); setReading(null); }}>✅ {t("أتممت", "Done")}</button>
          </div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: accent, fontWeight: 800, letterSpacing: 2 }}>{t("سورة", "SURAH")} {reading.id}</div>
            <h1 style={{ fontSize: 32, fontFamily: "'Amiri', serif", color: C.text, margin: "6px 0 4px" }}>{reading.name}</h1>
            <div style={{ color: C.sub }}>{reading.nameEn} · {reading.verses} {t("آية", "verses")}</div>
            <button style={{ ...btn("ghost"), marginTop: 12, fontSize: 12 }} onClick={() => setShowTrans(!showTrans)}>
              {showTrans ? "🔽" : "🔼"} {t("الترجمة", "Translation")}
            </button>
          </div>
          {reading.id !== 1 && reading.id !== 9 && (
            <div style={{ textAlign: "center", marginBottom: 20, fontFamily: "'Amiri', serif", fontSize: 22, color: "#F59E0B" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          )}
          <div style={card}>
            {!ayat
              ? <div style={{ textAlign: "center", padding: 40, color: ayatErr ? "#F87171" : C.sub }}>{ayatErr ? t("⚠️ فشل التحميل", "⚠️ Load failed") : t("جارٍ التحميل…", "Loading ayat…")}</div>
              : ayat.map((a, i) => (
                <div key={i} style={{ padding: "16px 0", borderBottom: i < ayat.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${accent}18`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i+1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, textAlign: "right", direction: "rtl", color: C.text, lineHeight: 2 }}>{a.ar}</div>
                      {showTrans && <div style={{ fontSize: 13, color: C.sub, marginTop: 5, lineHeight: 1.7, fontStyle: "italic" }}>{a.en}</div>}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
            <button style={btn("ghost")} onClick={() => { doShuffle(); setSuggestion(s => { setReading(s); return s; }); window.scrollTo(0,0); }}>🔁 {t("التالي", "Next")}</button>
            <button style={btn("primary")} onClick={() => setReading(null)}>📚 {t("القائمة", "List")}</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 14 }}>📚 {t("القرآن الكريم — ١١٤ سورة", "Quran — 114 Surahs")}</h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("ابحث بالاسم أو الرقم…", "Search by name or number…")}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.input, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: 12, boxSizing: "border-box" }} />
        {filtered.map(s => (
          <SurahRow key={s.id} s={s} accent={accent} onClick={() => { setReading(s); window.scrollTo(0,0); }} />
        ))}
      </div>
    );
  };

  // ── Favorites ─────────────────────────────────────────────────────────────
  const FavoritesPage = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 14 }}>❤️ {t("المفضلة", "Favorites")} ({favorites.length})</h2>
      {favorites.length === 0
        ? <div style={{ ...card, textAlign: "center", padding: 50 }}><div style={{ fontSize: 48 }}>🤍</div><div style={{ color: C.sub, marginTop: 12 }}>{t("لا توجد سور محفوظة بعد", "No favorites yet")}</div></div>
        : favorites.map(s => (
          <div key={s.id} style={{ ...card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
            onClick={() => { setReading(s); setPage("quran"); }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${accent}18`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.id}</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontFamily: "'Amiri', serif", fontSize: 16, color: C.text }}>{s.name}</div><div style={{ fontSize: 11, color: C.sub }}>{s.nameEn}</div></div>
            <button onClick={e => { e.stopPropagation(); toggleFav(s); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>💛</button>
          </div>
        ))}
    </div>
  );

  // ── History ───────────────────────────────────────────────────────────────
  const HistoryPage = () => {
    const grouped = useMemo(() => {
      const g = {};
      history.forEach(h => { if (!g[h.date]) g[h.date] = []; g[h.date].push(h); });
      return g;
    }, [history]);

    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 14 }}>📊 {t("سجل التلاوة", "Reading History")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { icon: "🔥", v: streak.count,  l: t("أيام", "Streak"),  c: "#F59E0B" },
            { icon: "📖", v: history.length, l: t("إجمالي", "Total"), c: accent    },
            { icon: "✨", v: new Set(history.map(h => h.surah.id)).size, l: t("سور", "Surahs"), c: "#10B981" },
          ].map((s, i) => (
            <div key={i} style={{ ...card, textAlign: "center", padding: "14px 8px", marginBottom: 0 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: C.sub, fontWeight: 600, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {Object.keys(grouped).length === 0
          ? <div style={{ ...card, textAlign: "center", padding: 50 }}><div style={{ fontSize: 48 }}>📖</div><div style={{ color: C.sub, marginTop: 12 }}>{t("لا سجل بعد", "No history yet")}</div></div>
          : Object.entries(grouped).map(([date, entries]) => (
            <div key={date} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: accent, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>📅 {date}</div>
              {entries.map((e, i) => (
                <div key={i} style={{ ...card, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 7 }}
                  onClick={() => { setReading(e.surah); setPage("quran"); }}>
                  <span style={{ fontSize: 18 }}>{PI[e.prayer]?.icon || "🕌"}</span>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontFamily: "'Amiri', serif", color: C.text }}>{e.surah.name}</div><div style={{ fontSize: 11, color: C.sub }}>{e.surah.nameEn}</div></div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: PI[e.prayer]?.color || accent }} />
                </div>
              ))}
            </div>
          ))}
        {history.length > 0 && <button style={btn("red")} onClick={() => { setHistory([]); showToast({ icon: "🗑", title: t("تم المسح", "Cleared") }); }}>🗑 {t("مسح الكل", "Clear All")}</button>}
      </div>
    );
  };

  // ── Settings ──────────────────────────────────────────────────────────────
  const SettingsPage = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 16 }}>⚙️ {t("الإعدادات", "Settings")}</h2>

      {/* Notifications */}
      <div style={{ ...card, borderColor: notifOn ? "#10B98150" : C.border }}>
        <div style={{ fontWeight: 700, color: C.text, marginBottom: 4 }}>🔔 {t("إشعارات الصلاة", "Prayer Notifications")}</div>
        <div style={{ fontSize: 12, color: C.sub, marginBottom: 12 }}>{t("تنبيه 15 دقيقة قبل كل صلاة", "Alert 15 min before each prayer")}</div>
        {notifOn
          ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#10B981", fontWeight: 700, fontSize: 13 }}>✓ {t("مفعّل", "Active")}</span>
              <button style={btn("red")} onClick={() => { setNotifOn(false); showToast({ icon: "🔕", title: t("تم الإيقاف", "Disabled") }); }}>{t("إيقاف", "Disable")}</button>
            </div>
          : <button style={btn("green")} onClick={enableNotif}>🔔 {t("تفعيل", "Enable")}</button>}
      </div>

      {/* City */}
      <div style={card}>
        <div style={{ fontWeight: 700, color: C.text, marginBottom: 10 }}>📍 {t("المدينة", "City")}</div>
        {locName && <div style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}>📌 {locName}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCity()}
            placeholder={t("اسم المدينة…", "City name…")}
            style={{ flex: 1, padding: "9px 13px", borderRadius: 9, border: `1px solid ${C.border}`, background: C.input, color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
          <button style={btn("primary")} onClick={loadCity}>{cityBusy ? "…" : t("تحديث", "Update")}</button>
        </div>
      </div>

      {/* Toggles */}
      {[
        { icon: "🌙", label: t("الوضع الداكن",  "Dark Mode"),    val: dark,     fn: () => setDark(!dark) },
        { icon: "🌍", label: lang === "ar" ? "English" : "العربية",               val: false,    fn: () => setLang(l => l === "ar" ? "en" : "ar") },
        { icon: "📖", label: t("إظهار الترجمة", "Show Translation"), val: showTrans, fn: () => setShowTrans(!showTrans) },
      ].map((item, i) => (
        <div key={i} style={{ ...card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={item.fn}>
          <span style={{ fontSize: 22 }}>{item.icon}</span>
          <span style={{ flex: 1, fontWeight: 600, color: C.text }}>{item.label}</span>
          <div style={{ width: 44, height: 24, borderRadius: 12, background: item.val ? accent : C.dim, position: "relative", transition: "background 0.25s" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.val ? 23 : 3, transition: "left 0.25s" }} />
          </div>
        </div>
      ))}

      {/* Clear data */}
      <div style={{ ...card, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button style={btn("red")} onClick={() => { setFavorites([]); showToast({ icon: "💔", title: t("مُسح", "Cleared") }); }}>💔 {t("مسح المفضلة", "Clear Favorites")}</button>
        <button style={btn("red")} onClick={() => { setHistory([]);   showToast({ icon: "🗑",  title: t("مُسح", "Cleared") }); }}>🗑  {t("مسح السجل",    "Clear History")}</button>
      </div>

      <div style={{ ...card, textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 32 }}>🕌</div>
        <div style={{ fontWeight: 800, color: C.text, marginTop: 8 }}>{t("مساعد التلاوة", "Quran Assistant")} v2</div>
        <div style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>AlQuran.cloud · Aladhan.com</div>
        <div style={{ fontSize: 12, color: C.dim, marginTop: 8, fontFamily: "'Amiri', serif" }}>جَعَلَهُ اللَّهُ فِي مِيزَانِ حَسَنَاتِكُمْ 🤲</div>
      </div>
    </div>
  );

  const PAGES = { home: HomePage, quran: QuranPage, favorites: FavoritesPage, history: HistoryPage, settings: SettingsPage };
  const Page  = PAGES[page] || HomePage;

  // ════════ LAYOUT ══════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Amiri', 'Noto Naskh Arabic', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        button:hover { opacity: 0.82; }
        input::placeholder { opacity: 0.4; }
        @media (max-width: 768px) { .desk { display: none !important; } }
        @media (min-width: 769px) { .mob  { display: none !important; } }
      `}</style>

      <Toast data={toast} />

      <div style={{ display: "flex", maxWidth: 1080, margin: "0 auto", minHeight: "100vh" }}>
        {/* Desktop sidebar */}
        <nav className="desk" style={{ width: 220, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", background: C.card }}>
          <div style={{ padding: "24px 20px 18px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontWeight: 900, fontSize: 18, color: C.text }}>🕌 القارئ</div>
            <div style={{ fontSize: 11, color: C.sub }}>Smart Recitation</div>
          </div>
          <div style={{ flex: 1, padding: "10px 8px" }}>
            {NAV.map(n => (
              <div key={n.id} onClick={() => { setPage(n.id); if (n.id !== "quran") setReading(null); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 11, cursor: "pointer", marginBottom: 3, background: page === n.id ? `${accent}18` : "transparent", color: page === n.id ? accent : C.sub, fontWeight: page === n.id ? 700 : 400, transition: "all 0.15s" }}>
                <span style={{ fontSize: 18 }}>{n.icon}</span><span style={{ fontSize: 14 }}>{n.label}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main style={{ flex: 1, padding: "24px 20px", maxWidth: 760, width: "100%", paddingBottom: 100 }}>
          <Page />
        </main>
      </div>

      {/* Mobile nav */}
      <nav className="mob" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.card, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 16px", zIndex: 100 }}>
        {NAV.map(n => (
          <div key={n.id} onClick={() => { setPage(n.id); if (n.id !== "quran") setReading(null); }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "2px 8px" }}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: page === n.id ? accent : C.sub }}>{n.label}</span>
            {page === n.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent }} />}
          </div>
        ))}
      </nav>
    </div>
  );
}
