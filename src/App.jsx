import { useState, useEffect, useRef, useMemo, memo } from "react";

// ─── 114 SURAHS ──────────────────────────────────────────────────────────────
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

// ─── PRAYER INFO ─────────────────────────────────────────────────────────────
const PI = {
  Fajr:    { ar: "الفجر",  icon: "🌅", color: "#818CF8" },
  Dhuhr:   { ar: "الظهر",  icon: "☀️", color: "#D4AF37" },
  Asr:     { ar: "العصر",  icon: "🌤", color: "#34D399" },
  Maghrib: { ar: "المغرب", icon: "🌇", color: "#FB923C" },
  Isha:    { ar: "العشاء", icon: "🌙", color: "#C084FC" },
};
const SALAH = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ─── CURATED AYAT PER PRAYER ─────────────────────────────────────────────────
const PRAYER_RECS = {
  Fajr: [
    { id: 36, from: 1, to: 83,  reason: "يس — قلب القرآن · Ya-Sin, heart of the Quran" },
    { id: 32, from: 1, to: 30,  reason: "السجدة — سنّة الفجر · As-Sajdah, Fajr Sunnah" },
    { id: 67, from: 1, to: 30,  reason: "الملك — حفظ يومي · Al-Mulk, daily protection" },
    { id: 50, from: 1, to: 45,  reason: "ق — كان النبي ﷺ يقرأها في الفجر" },
    { id: 73, from: 1, to: 20,  reason: "المزمل — صاحب القيام · Al-Muzzammil" },
    { id: 56, from: 1, to: 96,  reason: "الواقعة — بركة الرزق · Al-Waqi'ah" },
    { id: 55, from: 1, to: 78,  reason: "الرحمن — شكر نعم الله · Ar-Rahman" },
  ],
  Dhuhr: [
    { id: 87,  from: 1, to: 19, reason: "الأعلى — سنّة الظهر · Al-A'la, Dhuhr Sunnah" },
    { id: 88,  from: 1, to: 26, reason: "الغاشية — سنّة الظهر · Al-Ghashiyah" },
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
    { id: 88,  from: 1, to: 26, reason: "الغاشية — سنّة المغرب · Al-Ghashiyah" },
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
    { id: 76,  from: 1, to: 31, reason: "الإنسان — ثواب صلاة الليل · Al-Insan" },
    { id: 73,  from: 1, to: 20, reason: "المزمل — أهل القيام · Al-Muzzammil" },
    { id: 32,  from: 1, to: 30, reason: "السجدة — سنّة التهجد · As-Sajdah" },
    { id: 67,  from: 1, to: 30, reason: "الملك — أمان الليل · Al-Mulk" },
    { id: 55,  from: 1, to: 78, reason: "الرحمن — مناجاة الله · Ar-Rahman" },
    { id: 36,  from: 1, to: 83, reason: "يس — قلب القرآن · Ya-Sin" },
    { id: 56,  from: 1, to: 96, reason: "الواقعة — بركة الرزق · Al-Waqi'ah" },
  ],
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const D = {
  bg:      "#0B0F0C",
  card:    "#111916",
  card2:   "#172118",
  border:  "#1C2E22",
  border2: "#243D2A",
  green:   "#1F7A63",
  greenL:  "#27A882",
  gold:    "#D4AF37",
  goldD:   "#A88A20",
  text:    "#EEF4EE",
  sub:     "#7A9E89",
  dim:     "#3D5A47",
  red:     "#E05252",
  sidebar: "#0D1611",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
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

// ─── PRAYER COUNTDOWN (isolated — never re-renders parent) ───────────────────
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
  const r = 48, circ = 2 * Math.PI * r;

  return (
    <div style={{ background: D.card, borderRadius: 20, padding: "22px 24px", marginBottom: 12, border: `1px solid ${D.border}`, display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative", width: 108, height: 108, flexShrink: 0 }}>
        <svg width={108} height={108} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
          <circle cx={54} cy={54} r={r} fill="none" stroke={D.border2} strokeWidth={7} />
          <circle cx={54} cy={54} r={r} fill="none" stroke={D.gold} strokeWidth={7}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - Math.min(Math.max(pct,0),1))}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26 }}>{info.icon}</span>
          <span style={{ fontSize: 10, color: D.gold, fontWeight: 700, marginTop: 2, letterSpacing: 0.5 }}>
            {lang === "ar" ? info.ar : next.name}
          </span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: D.sub, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
          {lang === "ar" ? "الصلاة القادمة" : "NEXT PRAYER"}
        </div>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 3, color: D.text, fontVariantNumeric: "tabular-nums", lineHeight: 1.1, fontFamily: "'Inter', sans-serif" }}>{cd}</div>
        <div style={{ fontSize: 13, color: D.sub, marginTop: 8 }}>
          {lang === "ar" ? "الأذان في" : "Athan at"}{" "}
          <span style={{ color: D.gold, fontWeight: 700 }}>{fmt12(next.time)}</span>
        </div>
      </div>
    </div>
  );
});

// ─── PRAYER STRIP (isolated) ─────────────────────────────────────────────────
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
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
      {SALAH.map(p => {
        const info = PI[p];
        const [h, m] = timings[p].split(":").map(Number);
        const pDate = new Date(); pDate.setHours(h, m, 0, 0);
        const passed = pDate < new Date() && p !== currentNext;
        const isNext = p === currentNext;
        return (
          <div key={p} className="prayer-pill" style={{
            flex: 1, minWidth: 54, textAlign: "center", padding: "10px 4px", borderRadius: 14,
            background: isNext ? `${info.color}1A` : D.card,
            border: `1px solid ${isNext ? info.color + "60" : D.border}`,
            opacity: passed ? 0.4 : 1,
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 16 }}>{info.icon}</div>
            <div style={{ fontSize: 9, color: isNext ? info.color : D.sub, fontWeight: 700, marginTop: 3, letterSpacing: 0.3 }}>
              {lang === "ar" ? info.ar : p}
            </div>
            <div style={{ fontSize: 11, color: D.text, fontWeight: 600, marginTop: 2 }}>{fmt12(timings[p])}</div>
            {passed && <div style={{ fontSize: 10, color: D.green }}>✓</div>}
          </div>
        );
      })}
    </div>
  );
});

// ─── SURAH ROW ────────────────────────────────────────────────────────────────
const SurahRow = memo(function SurahRow({ s, onClick, isFav }) {
  const typeColor = { long: D.red, medium: D.gold, short: D.green }[s.type] || D.sub;
  return (
    <div onClick={onClick} className="surah-row" style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 16px", borderRadius: 14, marginBottom: 6,
      background: D.card, border: `1px solid ${D.border}`,
      cursor: "pointer", transition: "all 0.15s",
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${D.green}1A`, color: D.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0, border: `1px solid ${D.green}30` }}>
        {s.id}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: D.text, fontWeight: 700 }}>{s.name}</div>
        <div style={{ fontSize: 11, color: D.sub, marginTop: 1 }}>{s.nameEn} · {s.verses} verses</div>
      </div>
      {isFav && <span style={{ fontSize: 14, color: D.gold }}>★</span>}
      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${typeColor}1A`, color: typeColor, letterSpacing: 0.5 }}>
        {s.type}
      </span>
    </div>
  );
});

// ─── SKELETON ────────────────────────────────────────────────────────────────
const Sk = ({ h = 18, w = "100%", r = 8 }) => (
  <div className="skeleton" style={{ height: h, width: w, borderRadius: r, background: D.card2, flexShrink: 0 }} />
);

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = memo(function Toast({ data }) {
  if (!data) return null;
  return (
    <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", background: D.card2, border: `1px solid ${D.border2}`, borderRadius: 16, padding: "13px 20px", color: D.text, fontSize: 13, zIndex: 9999, display: "flex", alignItems: "center", gap: 12, maxWidth: 340, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
      <span style={{ fontSize: 20 }}>{data.icon}</span>
      <div>
        <div style={{ fontWeight: 700 }}>{data.title}</div>
        {data.msg && <div style={{ opacity: 0.6, fontSize: 11, marginTop: 2 }}>{data.msg}</div>}
      </div>
    </div>
  );
});

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState("home");
  const [lang, setLang]           = useState(() => localStorage.getItem("qr_lang") || "ar");
  const [showTrans, setShowTrans] = useState(() => localStorage.getItem("qr_trans") !== "false");
  const [notifOn, setNotifOn]     = useState(() => localStorage.getItem("qr_notif") === "true");

  const [timings, setTimings]     = useState(null);
  const [locName, setLocName]     = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [cityBusy, setCityBusy]   = useState(false);
  const [loadingPT, setLoadingPT] = useState(true);
  const [curPrayer, setCurPrayer] = useState("Isha");

  const [suggestion, setSuggestion]     = useState(null);
  const [ayatCache, setAyatCache]       = useState({});
  const [loadingAyat, setLoadingAyat]   = useState(false);
  const [ayatErr, setAyatErr]           = useState(false);
  const [lastPicks, setLastPicks]       = useState([]);
  const [shuffleAnim, setShuffleAnim]   = useState(false);
  const [reading, setReading]           = useState(null);
  const [search, setSearch]             = useState("");
  const [immersive, setImmersive]       = useState(false);

  const [playingKey, setPlayingKey] = useState(null);
  const audioRef = useRef(null);

  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("qr_favs") || "[]"));
  const [history,   setHistory]   = useState(() => JSON.parse(localStorage.getItem("qr_hist") || "[]"));
  const [streak,    setStreak]    = useState(() => JSON.parse(localStorage.getItem("qr_streak") || '{"count":0,"last":""}'));

  const [toast, setToast]   = useState(null);
  const toastRef             = useRef(null);
  const timingsRef           = useRef(null);
  const notifiedRef          = useRef(new Set());

  const t = (ar, en) => lang === "ar" ? ar : en;
  const today = new Date().toDateString();
  const todayReads = useMemo(() => history.filter(h => h.date === today).length, [history, today]);
  const isTahajjud = new Date().getHours() >= 1 && new Date().getHours() < 5;

  useEffect(() => { localStorage.setItem("qr_lang",  lang);        }, [lang]);
  useEffect(() => { localStorage.setItem("qr_trans", showTrans);   }, [showTrans]);
  useEffect(() => { localStorage.setItem("qr_notif", notifOn);     }, [notifOn]);
  useEffect(() => { localStorage.setItem("qr_favs",  JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("qr_hist",  JSON.stringify(history));   }, [history]);

  const showToast = (d) => { clearTimeout(toastRef.current); setToast(d); toastRef.current = setTimeout(() => setToast(null), 3500); };

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) { setLoadingPT(false); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lon } }) => {
        fetchByCoords(lat, lon).then(tm => { setTimings(tm); timingsRef.current = tm; }).finally(() => setLoadingPT(false));
      },
      () => setLoadingPT(false)
    );
  }, []);

  // Current prayer (minute-level, doesn't cause per-second re-renders)
  useEffect(() => {
    if (!timings) return;
    const update = () => setCurPrayer(getNext(timings).name);
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [timings]);

  // Notification checker
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
            new Notification(`${info.icon} ${lang === "ar" ? info.ar : p}`, { body: fmt12(tms[p]) });
        }
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [notifOn, lang]);

  // Shuffle on load / when timings change
  useEffect(() => { setTimeout(doShuffle, 400); }, [timings]);

  // Fetch ayat when suggestion or reading changes
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
    setShuffleAnim(true); setTimeout(() => setShuffleAnim(false), 300);
    setSuggestion({ ...surahMeta, from: rec.from, to: rec.to, reason: rec.reason, prayerName: prayer });
    setLastPicks(prev => [...prev.slice(-6), rec.id]);
  }

  function toggleAudio(surahId, ayahNum) {
    const key = `${surahId}:${ayahNum}`;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (playingKey === key) { setPlayingKey(null); return; }
    const url = `https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/${String(surahId).padStart(3,"0")}${String(ayahNum).padStart(3,"0")}.mp3`;
    audioRef.current = new Audio(url);
    audioRef.current.play().catch(() => {});
    audioRef.current.onended = () => setPlayingKey(null);
    setPlayingKey(key);
  }

  const toggleFav = (s) => {
    const has = favorites.some(f => f.id === s.id);
    setFavorites(prev => has ? prev.filter(f => f.id !== s.id) : [...prev, { id: s.id, name: s.name, nameEn: s.nameEn, verses: s.verses, type: s.type }]);
    showToast({ icon: has ? "💔" : "★", title: has ? t("حُذف من المفضلة", "Removed from favorites") : t("أُضيف للمفضلة", "Added to favorites") });
  };
  const isFav = (s) => favorites.some(f => f.id === s.id);

  const markRead = (s) => {
    const prayer = curPrayer;
    setHistory(prev => [{ surah: { id: s.id, name: s.name, nameEn: s.nameEn, verses: s.verses, type: s.type }, prayer, date: today, timestamp: Date.now() }, ...prev.slice(0, 199)]);
    setStreak(prev => {
      const yest = new Date(); yest.setDate(yest.getDate() - 1);
      const n = prev.last === today ? prev : prev.last === yest.toDateString() ? { count: prev.count + 1, last: today } : { count: 1, last: today };
      localStorage.setItem("qr_streak", JSON.stringify(n)); return n;
    });
  };

  const loadCity = async () => {
    if (!cityInput.trim()) return; setCityBusy(true);
    try {
      const tms = await fetchByCity(cityInput.trim());
      setTimings(tms); timingsRef.current = tms; setLocName(cityInput.trim());
      showToast({ icon: "🕌", title: t("تم تحديث الأوقات", "Prayer times updated"), msg: cityInput.trim() });
    } catch { showToast({ icon: "❌", title: t("مدينة غير موجودة", "City not found") }); }
    setCityBusy(false);
  };

  const enableNotif = async () => {
    const perm = await Notification.requestPermission();
    if (perm === "granted") { setNotifOn(true); showToast({ icon: "🔔", title: t("تم تفعيل الإشعارات", "Notifications enabled") }); }
    else showToast({ icon: "🔕", title: t("لم يُسمح بالإشعارات", "Permission denied") });
  };

  const navTo = (id) => { setPage(id); if (id !== "quran") setReading(null); window.scrollTo(0, 0); };

  // ── Buttons ────────────────────────────────────────────────────────────────
  const B = {
    gold:    { padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, background: D.gold, color: "#0B0F0C", border: "none", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, transition: "opacity 0.15s, transform 0.1s" },
    green:   { padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, background: D.green, color: "#fff", border: "none", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, transition: "opacity 0.15s, transform 0.1s" },
    ghost:   { padding: "9px 16px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "transparent", color: D.sub, border: `1px solid ${D.border2}`, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, transition: "all 0.15s" },
    icon:    { padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 16, background: D.card2, color: D.sub, border: `1px solid ${D.border}`, fontFamily: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", minWidth: 38, minHeight: 38 },
    danger:  { padding: "9px 16px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "transparent", color: D.red, border: `1px solid ${D.red}30`, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, transition: "all 0.15s" },
  };

  // ── Filtered surah list ────────────────────────────────────────────────────
  const filtered = useMemo(() =>
    SURAHS.filter(s => s.name.includes(search) || s.nameEn.toLowerCase().includes(search.toLowerCase()) || String(s.id).includes(search)),
    [search]
  );

  // ════════════════════════════════ PAGES ════════════════════════════════════

  // ── HOME ──────────────────────────────────────────────────────────────────
  const HomePage = () => {
    const h = new Date().getHours();
    const greet = h < 5  ? t("🌙 وقت التهجد", "🌙 Tahajjud Time")
                : h < 12 ? t("صباح الخير", "Good Morning")
                : h < 18 ? t("مساء الخير", "Good Afternoon")
                :          t("مساء النور", "Good Evening");

    const sg = suggestion;
    const ayat = sg ? ayatCache[sg.id] : null;
    const pInfo = sg ? (PI[sg.prayerName] || PI.Isha) : null;
    const isShort = sg ? (sg.to - sg.from + 1) <= 15 : true;
    const MAX_SHOW = isShort ? 999 : 7;
    const sliced = ayat ? ayat.slice(sg.from - 1, sg.to) : null;
    const displayAyat = sliced ? sliced.slice(0, MAX_SHOW) : null;
    const hasMore = sliced && sliced.length > MAX_SHOW;

    return (
      <div className="fade-in">
        {/* Greeting */}
        <div style={{ marginBottom: 22 }}>
          {isTahajjud && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${D.gold}18`, border: `1px solid ${D.gold}40`, borderRadius: 20, padding: "5px 14px", fontSize: 12, color: D.gold, fontWeight: 700, marginBottom: 10 }}>
              🌙 {t("أنت في وقت التهجد — استغل هذا الوقت العظيم", "Tahajjud time — make the most of this blessed hour")}
            </div>
          )}
          <div style={{ fontSize: 12, color: D.sub, marginBottom: 4 }}>
            {new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: D.text, margin: 0, letterSpacing: -0.5 }}>{greet}</h1>
        </div>

        {/* Prayer countdown or city input */}
        {timings ? (
          <PrayerCountdown timings={timings} lang={lang} />
        ) : !loadingPT ? (
          <div style={{ background: D.card, borderRadius: 20, padding: "20px", marginBottom: 12, border: `1px solid ${D.border}` }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: D.text, fontSize: 14 }}>
              📍 {t("أدخل مدينتك لأوقات الصلاة", "Enter your city for prayer times")}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCity()}
                placeholder={t("مثال: القاهرة", "e.g. Cairo")}
                style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${D.border2}`, background: D.card2, color: D.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button onClick={loadCity} style={B.green}>{cityBusy ? "…" : t("بحث", "Search")}</button>
            </div>
          </div>
        ) : (
          <div style={{ background: D.card, borderRadius: 20, padding: "24px", marginBottom: 12, border: `1px solid ${D.border}` }}>
            <Sk h={12} w="40%" r={6} /><div style={{ height: 10 }} /><Sk h={40} r={8} />
          </div>
        )}

        {/* Prayer strip */}
        {timings && <PrayerStrip timings={timings} lang={lang} />}

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { icon: "🔥", v: streak.count,    l: t("أيام متواصلة", "Day Streak"),  c: "#FB923C" },
            { icon: "📖", v: todayReads,       l: t("قرأت اليوم", "Read Today"),   c: D.gold    },
            { icon: "✨", v: history.length,   l: t("إجمالي التلاوات", "Total"),   c: D.green   },
          ].map((s, i) => (
            <div key={i} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.c, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: D.sub, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Smart suggestion card */}
        {sg && (
          <div style={{ background: D.card, borderRadius: 20, border: `1px solid ${D.border}`, overflow: "hidden", opacity: shuffleAnim ? 0.5 : 1, transition: "opacity 0.25s", marginBottom: 12 }}>
            {/* Gold top bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${D.gold}, ${D.green})` }} />
            <div style={{ padding: "20px" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ background: `${pInfo.color}20`, color: pInfo.color, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>
                  {pInfo.icon} {lang === "ar" ? pInfo.ar : sg.prayerName || "Prayer"} {sg.prayerName === "Tahajjud" ? (lang === "ar" ? "— التهجد" : "— Tahajjud") : ""}
                </span>
                <span style={{ flex: 1, fontSize: 11, color: D.dim, textAlign: lang === "ar" ? "right" : "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {sg.reason}
                </span>
              </div>

              {/* Surah title */}
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 34, fontWeight: 700, color: D.text, lineHeight: 1.2 }}>{sg.name}</div>
                <div style={{ fontSize: 13, color: D.sub, marginTop: 4 }}>{sg.nameEn} · {t("الآيات", "Ayat")} {sg.from}–{sg.to}</div>
              </div>

              {/* Why block */}
              <div style={{ background: `${D.gold}0C`, border: `1px solid ${D.gold}25`, borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: D.gold, fontSize: 16, flexShrink: 0 }}>💡</span>
                <div style={{ fontSize: 12, color: D.sub, lineHeight: 1.6 }}>
                  <span style={{ color: D.gold, fontWeight: 700 }}>{t("لماذا هذه السورة؟  ", "Why this surah?  ")}</span>
                  {sg.reason}
                </div>
              </div>

              {/* Bismillah */}
              {sg.id !== 9 && (
                <div style={{ textAlign: "center", fontFamily: "'Amiri', serif", fontSize: 22, color: D.gold, marginBottom: 16, lineHeight: 1.8 }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              )}

              {/* Ayat */}
              <div style={{ background: D.bg, borderRadius: 14, padding: "16px", marginBottom: 16, border: `1px solid ${D.border}` }}>
                {!displayAyat ? (
                  loadingAyat ? (
                    <div style={{ padding: "12px 0" }}>
                      {[1,2,3].map(i => <div key={i} style={{ marginBottom: 12 }}><Sk h={28} r={6} /></div>)}
                    </div>
                  ) : ayatErr ? (
                    <div style={{ textAlign: "center", padding: "20px 0", color: D.sub, fontSize: 13 }}>
                      ⚠️ {t("فشل التحميل", "Failed to load")} · <span style={{ color: D.gold, cursor: "pointer" }} onClick={() => { setAyatErr(false); setLoadingAyat(true); fetchAyat(sg.id).then(a => setAyatCache(p => ({...p, [sg.id]: a}))).catch(() => setAyatErr(true)).finally(() => setLoadingAyat(false)); }}>
                        {t("حاول مجدداً", "Try again")}
                      </span>
                    </div>
                  ) : null
                ) : displayAyat.map((a, i) => {
                  const ayaNum = sg.from + i;
                  const pk = `${sg.id}:${ayaNum}`;
                  return (
                    <div key={i} className="ayah-item" style={{ paddingBottom: i < displayAyat.length - 1 ? 16 : 0, marginBottom: i < displayAyat.length - 1 ? 16 : 0, borderBottom: i < displayAyat.length - 1 ? `1px solid ${D.border}` : "none", transition: "background 0.15s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <button onClick={() => toggleAudio(sg.id, ayaNum)} style={{ ...B.icon, background: playingKey === pk ? `${D.gold}20` : D.card, color: playingKey === pk ? D.gold : D.dim, flexShrink: 0 }}>
                          {playingKey === pk ? "⏸" : "▶"}
                        </button>
                        <div style={{ flex: 1, fontFamily: "'Amiri', serif", fontSize: 26, textAlign: "right", direction: "rtl", color: D.text, lineHeight: 2.2 }}>
                          {a.ar} <span style={{ fontSize: 15, color: D.gold }}>﴿{ayaNum}﴾</span>
                        </div>
                      </div>
                      {showTrans && <div style={{ fontSize: 12, color: D.sub, lineHeight: 1.7, marginTop: 6, paddingLeft: 46, fontStyle: "italic" }}>{a.en}</div>}
                    </div>
                  );
                })}
                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${D.border}` }}>
                    <button style={B.ghost} onClick={() => { setReading(sg); navTo("quran"); }}>
                      + {sliced.length - MAX_SHOW} {t("آية أخرى — اقرأ كاملاً ←", "more ayat — Read full surah →")}
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={B.gold} onClick={() => { markRead(sg); showToast({ icon: "✅", title: t("أحسنت! ما شاء الله 🤲", "Well done! Masha Allah 🤲"), msg: sg.name }); }}>
                  ✅ {t("أتممت التلاوة", "Done Reading")}
                </button>
                <button style={B.ghost} onClick={() => doShuffle()}>🔄 {t("سورة أخرى", "Different")}</button>
                <button style={B.ghost} onClick={() => { setReading(sg); navTo("quran"); }}>📖 {t("كاملاً", "Full")}</button>
                <button style={{ ...B.icon, color: isFav(sg) ? D.gold : D.dim }} onClick={() => toggleFav(sg)}>
                  {isFav(sg) ? "★" : "☆"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification banner */}
        {!notifOn && timings && (
          <div style={{ background: D.card, borderRadius: 16, padding: "16px 20px", border: `1px solid ${D.gold}30`, display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: D.text, fontSize: 13 }}>{t("فعّل تنبيهات الصلاة", "Enable Prayer Alerts")}</div>
              <div style={{ fontSize: 11, color: D.sub }}>{t("15 دقيقة قبل كل صلاة", "15 min before each prayer")}</div>
            </div>
            <button style={B.green} onClick={enableNotif}>{t("تفعيل", "Enable")}</button>
          </div>
        )}
      </div>
    );
  };

  // ── QURAN (Browse + Reader) ───────────────────────────────────────────────
  const QuranPage = () => {
    if (reading) {
      const ayat = ayatCache[reading.id];
      return (
        <div className={immersive ? "" : "fade-in"} style={immersive ? { position: "fixed", inset: 0, background: "#000", zIndex: 200, overflowY: "auto", padding: "24px 20px" } : {}}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, position: "sticky", top: 0, background: immersive ? "#000" : D.bg, paddingBottom: 12, zIndex: 10, borderBottom: `1px solid ${D.border}` }}>
            <button style={B.ghost} onClick={() => { setReading(null); setImmersive(false); }}>← {t("رجوع", "Back")}</button>
            <div style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: D.text, fontWeight: 700 }}>{reading.name}</span>
              <span style={{ fontSize: 11, color: D.sub, display: "block" }}>{reading.nameEn} · {reading.verses} {t("آية", "verses")}</span>
            </div>
            <button style={{ ...B.icon, color: isFav(reading) ? D.gold : D.dim }} onClick={() => toggleFav(reading)}>{isFav(reading) ? "★" : "☆"}</button>
            <button style={B.gold} onClick={() => { markRead(reading); setReading(null); setImmersive(false); showToast({ icon: "✅", title: t("أحسنت! 🤲", "Well done! 🤲"), msg: reading.name }); }}>
              ✅ {t("أتممت", "Done")}
            </button>
            {!immersive && (
              <button style={B.ghost} onClick={() => setImmersive(true)} title="Immersive mode">⛶</button>
            )}
          </div>

          {/* Surah info */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: D.gold, fontWeight: 800, letterSpacing: 2, marginBottom: 6 }}>
              {t("سورة", "SURAH")} {reading.id}
            </div>
            <h1 style={{ fontFamily: "'Amiri', serif", fontSize: 42, color: D.text, margin: "0 0 6px" }}>{reading.name}</h1>
            <div style={{ color: D.sub, fontSize: 14 }}>{reading.nameEn} · {reading.verses} {t("آية", "verses")}</div>
            <button style={{ ...B.ghost, marginTop: 12, fontSize: 12 }} onClick={() => setShowTrans(!showTrans)}>
              {showTrans ? "🔽" : "🔼"} {t("الترجمة", "Translation")}
            </button>
          </div>

          {reading.id !== 9 && (
            <div style={{ textAlign: "center", marginBottom: 24, fontFamily: "'Amiri', serif", fontSize: 26, color: D.gold, lineHeight: 2 }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          )}

          <div style={{ background: D.card, borderRadius: 20, padding: "20px", border: `1px solid ${D.border}` }}>
            {!ayat ? (
              <div style={{ padding: "40px 0" }}>
                {ayatErr
                  ? <div style={{ textAlign: "center", color: D.sub }}>{t("⚠️ فشل التحميل", "⚠️ Load failed")}</div>
                  : [1,2,3,4].map(i => <div key={i} style={{ marginBottom: 20 }}><Sk h={32} r={8} /></div>)}
              </div>
            ) : ayat.map((a, i) => {
              const ayaNum = i + 1;
              const pk = `${reading.id}:${ayaNum}`;
              return (
                <div key={i} className="ayah-item" style={{ padding: "18px 0", borderBottom: i < ayat.length - 1 ? `1px solid ${D.border}` : "none", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${D.gold}1A`, color: D.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, border: `1px solid ${D.gold}30` }}>{ayaNum}</div>
                      <button onClick={() => toggleAudio(reading.id, ayaNum)} style={{ ...B.icon, width: 32, height: 32, padding: 0, background: playingKey === pk ? `${D.gold}20` : "transparent", color: playingKey === pk ? D.gold : D.dim, border: "none", fontSize: 13 }}>
                        {playingKey === pk ? "⏸" : "▶"}
                      </button>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Amiri', serif", fontSize: immersive ? 30 : 26, textAlign: "right", direction: "rtl", color: D.text, lineHeight: 2.4 }}>{a.ar}</div>
                      {showTrans && <div style={{ fontSize: 13, color: D.sub, marginTop: 8, lineHeight: 1.8, fontStyle: "italic" }}>{a.en}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Browse list
    return (
      <div className="fade-in">
        <h2 style={{ fontSize: 22, fontWeight: 800, color: D.text, marginBottom: 16 }}>📚 {t("القرآن الكريم", "Holy Quran")} <span style={{ fontSize: 13, color: D.sub, fontWeight: 400 }}>— 114 {t("سورة", "surahs")}</span></h2>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t("ابحث بالاسم أو الرقم…", "Search by name or number…")}
            style={{ width: "100%", padding: "11px 16px 11px 40px", borderRadius: 12, border: `1px solid ${D.border2}`, background: D.card, color: D.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: D.dim, fontSize: 14 }}>🔍</span>
        </div>
        {filtered.map(s => (
          <SurahRow key={s.id} s={s} isFav={isFav(s)} onClick={() => { setReading(s); window.scrollTo(0, 0); }} />
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: D.sub }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 600 }}>{t("لا نتائج", "No results found")}</div>
          </div>
        )}
      </div>
    );
  };

  // ── FAVORITES ─────────────────────────────────────────────────────────────
  const FavoritesPage = () => (
    <div className="fade-in">
      <h2 style={{ fontSize: 22, fontWeight: 800, color: D.text, marginBottom: 16 }}>★ {t("المفضلة", "Favorites")} <span style={{ fontSize: 13, color: D.sub, fontWeight: 400 }}>({favorites.length})</span></h2>
      {favorites.length === 0 ? (
        <div style={{ background: D.card, borderRadius: 20, padding: "60px 20px", textAlign: "center", border: `1px solid ${D.border}` }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>☆</div>
          <div style={{ fontWeight: 700, color: D.text, marginBottom: 6 }}>{t("لا توجد سور محفوظة بعد", "No favorites yet")}</div>
          <div style={{ fontSize: 12, color: D.sub }}>{t("اضغط ★ على أي سورة لحفظها هنا", "Tap ★ on any surah to save it here")}</div>
        </div>
      ) : favorites.map(s => (
        <div key={s.id} style={{ background: D.card, borderRadius: 16, padding: "16px 18px", marginBottom: 8, border: `1px solid ${D.border}`, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.15s" }}
          className="surah-row"
          onClick={() => { setReading(s); navTo("quran"); }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${D.gold}1A`, color: D.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, border: `1px solid ${D.gold}30`, flexShrink: 0 }}>{s.id}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: D.text, fontWeight: 700 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: D.sub }}>{s.nameEn} · {s.verses} {t("آية", "verses")}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); toggleFav(s); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: D.gold, padding: 4 }}>★</button>
        </div>
      ))}
    </div>
  );

  // ── HISTORY ───────────────────────────────────────────────────────────────
  const HistoryPage = () => {
    const grouped = useMemo(() => {
      const g = {};
      history.forEach(h => { if (!g[h.date]) g[h.date] = []; g[h.date].push(h); });
      return g;
    }, [history]);
    const uniqueSurahs = new Set(history.map(h => h.surah.id)).size;
    const consistency = history.length > 0 ? Math.min(100, Math.round((streak.count / 30) * 100)) : 0;

    return (
      <div className="fade-in">
        <h2 style={{ fontSize: 22, fontWeight: 800, color: D.text, marginBottom: 16 }}>📊 {t("سجل التلاوة", "Reading History")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { icon: "🔥", v: streak.count,  l: t("أيام",   "Streak"), c: "#FB923C" },
            { icon: "📖", v: history.length,l: t("تلاوات", "Total"),  c: D.gold    },
            { icon: "🕌", v: uniqueSurahs,  l: t("سور",    "Surahs"), c: D.green   },
          ].map((s, i) => (
            <div key={i} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 16, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.c, fontFamily: "'Inter', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 10, color: D.sub, fontWeight: 600, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Consistency bar */}
        {history.length > 0 && (
          <div style={{ background: D.card, borderRadius: 16, padding: "16px 18px", marginBottom: 14, border: `1px solid ${D.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: D.sub, marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: D.text }}>{t("الانتظام (30 يوم)", "Consistency (30 days)")}</span>
              <span style={{ color: D.gold, fontWeight: 700 }}>{consistency}%</span>
            </div>
            <div style={{ background: D.border, borderRadius: 20, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${consistency}%`, height: "100%", background: `linear-gradient(90deg, ${D.green}, ${D.gold})`, borderRadius: 20, transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}

        {Object.keys(grouped).length === 0 ? (
          <div style={{ background: D.card, borderRadius: 20, padding: "60px 20px", textAlign: "center", border: `1px solid ${D.border}` }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
            <div style={{ fontWeight: 700, color: D.text, marginBottom: 6 }}>{t("لا سجل بعد", "No history yet")}</div>
            <div style={{ fontSize: 12, color: D.sub }}>{t("ابدأ بقراءة سورة من الصفحة الرئيسية", "Start reading from the home page")}</div>
          </div>
        ) : Object.entries(grouped).map(([date, entries]) => (
          <div key={date} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: D.gold, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
              📅 {date}
            </div>
            {entries.map((e, i) => {
              const pInfo = PI[e.prayer] || PI.Isha;
              return (
                <div key={i} style={{ background: D.card, borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 6, border: `1px solid ${D.border}`, cursor: "pointer" }}
                  className="surah-row"
                  onClick={() => { setReading(e.surah); navTo("quran"); }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${pInfo.color}18`, color: pInfo.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    {pInfo.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Amiri', serif", fontWeight: 700, color: D.text, fontSize: 16 }}>{e.surah.name}</div>
                    <div style={{ fontSize: 11, color: D.sub }}>{e.surah.nameEn} · {lang === "ar" ? pInfo.ar : e.prayer}</div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: pInfo.color, flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        ))}
        {history.length > 0 && (
          <button style={B.danger} onClick={() => { setHistory([]); showToast({ icon: "🗑", title: t("تم مسح السجل", "History cleared") }); }}>
            🗑 {t("مسح الكل", "Clear All")}
          </button>
        )}
      </div>
    );
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  const SettingsPage = () => (
    <div className="fade-in">
      <h2 style={{ fontSize: 22, fontWeight: 800, color: D.text, marginBottom: 20 }}>⚙️ {t("الإعدادات", "Settings")}</h2>

      <div style={{ background: D.card, borderRadius: 20, overflow: "hidden", border: `1px solid ${D.border}`, marginBottom: 12 }}>
        {/* Notifications */}
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 22 }}>🔔</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: D.text, fontSize: 14 }}>{t("إشعارات الصلاة", "Prayer Notifications")}</div>
            <div style={{ fontSize: 11, color: D.sub }}>{t("تنبيه قبل 15 دقيقة من كل صلاة", "Alert 15 min before each prayer")}</div>
          </div>
          {notifOn
            ? <button style={B.danger} onClick={() => { setNotifOn(false); showToast({ icon: "🔕", title: t("تم الإيقاف", "Disabled") }); }}>{t("إيقاف", "Disable")}</button>
            : <button style={B.green} onClick={enableNotif}>{t("تفعيل", "Enable")}</button>}
        </div>

        {/* City */}
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${D.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>📍</span>
            <div>
              <div style={{ fontWeight: 700, color: D.text, fontSize: 14 }}>{t("مدينتك", "Your City")}</div>
              {locName && <div style={{ fontSize: 11, color: D.gold }}>📌 {locName}</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === "Enter" && loadCity()}
              placeholder={t("اسم المدينة…", "City name…")}
              style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${D.border2}`, background: D.card2, color: D.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            <button style={B.green} onClick={loadCity}>{cityBusy ? "…" : t("تحديث", "Update")}</button>
          </div>
        </div>

        {/* Toggles */}
        {[
          { icon: "🌍", label: lang === "ar" ? "Switch to English" : "التبديل للعربية", fn: () => setLang(l => l === "ar" ? "en" : "ar"), val: null },
          { icon: "📖", label: t("إظهار الترجمة الإنجليزية", "Show English Translation"), fn: () => setShowTrans(!showTrans), val: showTrans },
        ].map((item, i) => (
          <div key={i} style={{ padding: "16px 20px", borderBottom: i < 1 ? `1px solid ${D.border}` : "none", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={item.fn}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{ flex: 1, fontWeight: 600, color: D.text, fontSize: 14 }}>{item.label}</span>
            {item.val !== null && (
              <div style={{ width: 44, height: 24, borderRadius: 12, background: item.val ? D.green : D.border2, position: "relative", transition: "background 0.25s", flexShrink: 0 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.val ? 23 : 3, transition: "left 0.25s" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear data */}
      <div style={{ background: D.card, borderRadius: 16, padding: "16px 20px", border: `1px solid ${D.border}`, display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <button style={B.danger} onClick={() => { setFavorites([]); showToast({ icon: "💔", title: t("مُسحت المفضلة", "Favorites cleared") }); }}>💔 {t("مسح المفضلة", "Clear Favorites")}</button>
        <button style={B.danger} onClick={() => { setHistory([]); showToast({ icon: "🗑", title: t("مُسح السجل", "History cleared") }); }}>🗑 {t("مسح السجل", "Clear History")}</button>
      </div>

      {/* About */}
      <div style={{ background: D.card, borderRadius: 20, padding: "28px 20px", border: `1px solid ${D.border}`, textAlign: "center" }}>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 36, color: D.gold, marginBottom: 8 }}>﷽</div>
        <div style={{ fontWeight: 800, color: D.text, fontSize: 16, marginBottom: 4 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
        <div style={{ fontSize: 11, color: D.sub, marginBottom: 16 }}>AlQuran.cloud · Aladhan.com · Everyayah.com</div>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 16, color: D.dim, lineHeight: 2 }}>جَعَلَهُ اللَّهُ فِي مِيزَانِ حَسَنَاتِكُمْ 🤲</div>
      </div>
    </div>
  );

  const PAGES = { home: HomePage, quran: QuranPage, favorites: FavoritesPage, history: HistoryPage, settings: SettingsPage };
  const Page = PAGES[page] || HomePage;

  const NAV = [
    { id: "home",      icon: "🏠", labelAr: "الرئيسية", labelEn: "Home"     },
    { id: "quran",     icon: "📚", labelAr: "القرآن",   labelEn: "Quran"    },
    { id: "favorites", icon: "★",  labelAr: "المفضلة",  labelEn: "Saved"    },
    { id: "history",   icon: "📊", labelAr: "السجل",    labelEn: "History"  },
    { id: "settings",  icon: "⚙️", labelAr: "الإعدادات",labelEn: "Settings" },
  ];

  // ════════════════════════════ LAYOUT ═══════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: D.bg, color: D.text, fontFamily: "'Amiri', 'Inter', Georgia, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #0B0F0C; }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        .skeleton {
          background: linear-gradient(90deg, #172118 25%, #1C2E22 50%, #172118 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
        }
        .surah-row:hover { background: #172118 !important; border-color: #243D2A !important; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .ayah-item:hover { background: rgba(212,175,55,0.03); border-radius: 10px; }
        button:hover { opacity: 0.85 !important; }
        input::placeholder { color: #3D5A47; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B0F0C; }
        ::-webkit-scrollbar-thumb { background: #1C2E22; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #243D2A; }
        @media (max-width: 768px) { .desk-only { display: none !important; } }
        @media (min-width: 769px) { .mob-only  { display: none !important; } }
      `}</style>

      <Toast data={toast} />

      {/* Immersive overlay handled inside QuranPage */}

      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", minHeight: "100vh" }}>

        {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
        <nav className="desk-only" style={{ width: 230, background: D.sidebar, borderRight: `1px solid ${D.border}`, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
          {/* Logo */}
          <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${D.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${D.green}, ${D.greenL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🕌</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: D.text, lineHeight: 1 }}>القارئ</div>
                <div style={{ fontSize: 10, color: D.gold, fontWeight: 600, letterSpacing: 1 }}>SMART RECITATION</div>
              </div>
            </div>
          </div>

          {/* Prayer quick stat */}
          {timings && (
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${D.border}` }}>
              <div style={{ fontSize: 10, color: D.dim, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                {t("الصلاة القادمة", "NEXT PRAYER")}
              </div>
              <div style={{ fontSize: 13, color: D.gold, fontWeight: 700 }}>
                {PI[curPrayer]?.icon} {lang === "ar" ? PI[curPrayer]?.ar : curPrayer} · {timings[curPrayer] ? fmt12(timings[curPrayer]) : "--"}
              </div>
            </div>
          )}

          {/* Nav items */}
          <div style={{ flex: 1, padding: "10px 10px" }}>
            {NAV.map(n => {
              const active = page === n.id;
              return (
                <div key={n.id} onClick={() => navTo(n.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, cursor: "pointer", marginBottom: 3, background: active ? `${D.gold}15` : "transparent", color: active ? D.gold : D.sub, fontWeight: active ? 700 : 500, transition: "all 0.15s", borderLeft: active ? `3px solid ${D.gold}` : "3px solid transparent" }}>
                  <span style={{ fontSize: 18 }}>{n.icon}</span>
                  <span style={{ fontSize: 14 }}>{lang === "ar" ? n.labelAr : n.labelEn}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom */}
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${D.border}` }}>
            <div style={{ fontSize: 10, color: D.dim, textAlign: "center" }}>
              {streak.count > 0 && <span style={{ color: D.gold }}>🔥 {streak.count} {t("أيام متواصلة", "day streak")}</span>}
            </div>
          </div>
        </nav>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <main style={{ flex: 1, padding: "28px 20px 100px", maxWidth: 760, width: "100%" }}>
          <Page />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ───────────────────────────────────────────────── */}
      <nav className="mob-only" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: D.sidebar, borderTop: `1px solid ${D.border}`, display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        {NAV.map(n => {
          const active = page === n.id;
          return (
            <div key={n.id} onClick={() => navTo(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px", cursor: "pointer", color: active ? D.gold : D.dim, transition: "color 0.15s" }}>
              <span style={{ fontSize: 20 }}>{n.icon}</span>
              <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, marginTop: 3 }}>{lang === "ar" ? n.labelAr : n.labelEn}</span>
              {active && <div style={{ width: 18, height: 2, background: D.gold, borderRadius: 2, marginTop: 3 }} />}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
