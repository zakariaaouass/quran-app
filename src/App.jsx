import { useState, useEffect, useCallback } from "react";

// ─── QURAN DATA ───────────────────────────────────────────────────────────────
const SURAHS = [
  { id: 1, name: "الفاتحة", nameEn: "Al-Fatiha", verses: 7, type: "short",
    ayat: [
      { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", en: "In the name of Allah, the Most Gracious, the Most Merciful" },
      { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", en: "All praise is due to Allah, Lord of the worlds" },
      { ar: "الرَّحْمَٰنِ الرَّحِيمِ", en: "The Most Gracious, the Most Merciful" },
      { ar: "مَالِكِ يَوْمِ الدِّينِ", en: "Master of the Day of Judgment" },
      { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", en: "You alone we worship, and You alone we ask for help" },
      { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", en: "Guide us to the straight path" },
      { ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", en: "The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray" }
    ]
  },
  { id: 36, name: "يس", nameEn: "Ya-Sin", verses: 83, type: "long",
    ayat: [
      { ar: "يس", en: "Ya, Sin." },
      { ar: "وَالْقُرْآنِ الْحَكِيمِ", en: "By the wise Quran" },
      { ar: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", en: "Indeed you are among the messengers" },
      { ar: "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", en: "On a straight path" },
      { ar: "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ", en: "A revelation of the Exalted in Might, the Merciful" },
      { ar: "لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ", en: "That you may warn a people whose forefathers were not warned, so they are unaware" }
    ]
  },
  { id: 55, name: "الرحمن", nameEn: "Ar-Rahman", verses: 78, type: "long",
    ayat: [
      { ar: "الرَّحْمَٰنُ", en: "The Most Merciful" },
      { ar: "عَلَّمَ الْقُرْآنَ", en: "Taught the Quran" },
      { ar: "خَلَقَ الْإِنسَانَ", en: "Created man" },
      { ar: "عَلَّمَهُ الْبَيَانَ", en: "Taught him eloquence" },
      { ar: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ", en: "The sun and the moon move by precise calculation" },
      { ar: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ", en: "And the stars and trees prostrate" },
      { ar: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", en: "So which of the favors of your Lord would you deny?" }
    ]
  },
  { id: 56, name: "الواقعة", nameEn: "Al-Waqi'ah", verses: 96, type: "long",
    ayat: [
      { ar: "إِذَا وَقَعَتِ الْوَاقِعَةُ", en: "When the Occurrence occurs" },
      { ar: "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ", en: "There is no denying its occurrence" },
      { ar: "خَافِضَةٌ رَّافِعَةٌ", en: "It will bring down some and raise up others" },
      { ar: "إِذَا رُجَّتِ الْأَرْضُ رَجًّا", en: "When the earth is shaken with convulsion" },
      { ar: "وَبُسَّتِ الْجِبَالُ بَسًّا", en: "And the mountains are broken down, crumbling" },
      { ar: "فَكَانَتْ هَبَاءً مُّنبَثًّا", en: "And become dust dispersing" }
    ]
  },
  { id: 67, name: "الملك", nameEn: "Al-Mulk", verses: 30, type: "medium",
    ayat: [
      { ar: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", en: "Blessed is He in whose hand is dominion, and He is over all things competent" },
      { ar: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ", en: "He who created death and life to test you as to which of you is best in deed" },
      { ar: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ", en: "He who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency" },
      { ar: "فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", en: "So return your vision — do you see any breaks?" },
      { ar: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", en: "Then return your vision twice again. Your vision will return humbled while it is fatigued" }
    ]
  },
  { id: 73, name: "المزمل", nameEn: "Al-Muzzammil", verses: 20, type: "medium",
    ayat: [
      { ar: "يَا أَيُّهَا الْمُزَّمِّلُ", en: "O you who wraps himself in clothing" },
      { ar: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا", en: "Arise to pray the night, except for a little" },
      { ar: "نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا", en: "Half of it — or subtract from it a little" },
      { ar: "أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", en: "Or add to it, and recite the Quran with measured recitation" },
      { ar: "إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا", en: "Indeed, We will cast upon you a heavy word" }
    ]
  },
  { id: 78, name: "النبأ", nameEn: "An-Naba", verses: 40, type: "medium",
    ayat: [
      { ar: "عَمَّ يَتَسَاءَلُونَ", en: "About what are they asking one another?" },
      { ar: "عَنِ النَّبَإِ الْعَظِيمِ", en: "About the great news" },
      { ar: "الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ", en: "That over which they are in disagreement" },
      { ar: "كَلَّا سَيَعْلَمُونَ", en: "No! They are going to know" },
      { ar: "ثُمَّ كَلَّا سَيَعْلَمُونَ", en: "Then, no! They are going to know" },
      { ar: "أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا", en: "Have We not made the earth a resting place?" }
    ]
  },
  { id: 87, name: "الأعلى", nameEn: "Al-A'la", verses: 19, type: "medium",
    ayat: [
      { ar: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", en: "Exalt the name of your Lord, the Most High" },
      { ar: "الَّذِي خَلَقَ فَسَوَّىٰ", en: "Who created and proportioned" },
      { ar: "وَالَّذِي قَدَّرَ فَهَدَىٰ", en: "And who destined and then guided" },
      { ar: "وَالَّذِي أَخْرَجَ الْمَرْعَىٰ", en: "And who brings out the pasture" },
      { ar: "فَجَعَلَهُ غُثَاءً أَحْوَىٰ", en: "And then makes it black stubble" },
      { ar: "سَنُقْرِئُكَ فَلَا تَنسَىٰ", en: "We will make you recite, and you will not forget" }
    ]
  },
  { id: 88, name: "الغاشية", nameEn: "Al-Ghashiyah", verses: 26, type: "medium",
    ayat: [
      { ar: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ", en: "Has there reached you the report of the Overwhelming?" },
      { ar: "وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ", en: "Some faces, that Day, will be humbled" },
      { ar: "عَامِلَةٌ نَّاصِبَةٌ", en: "Working hard and exhausted" },
      { ar: "تَصْلَىٰ نَارًا حَامِيَةً", en: "They will enter to burn in an intensely hot Fire" },
      { ar: "تُسْقَىٰ مِنْ عَيْنٍ آنِيَةٍ", en: "They will be given drink from a boiling spring" }
    ]
  },
  { id: 91, name: "الشمس", nameEn: "Ash-Shams", verses: 15, type: "short",
    ayat: [
      { ar: "وَالشَّمْسِ وَضُحَاهَا", en: "By the sun and its brightness" },
      { ar: "وَالْقَمَرِ إِذَا تَلَاهَا", en: "And by the moon as it follows it" },
      { ar: "وَالنَّهَارِ إِذَا جَلَّاهَا", en: "And by the day as it displays it" },
      { ar: "وَاللَّيْلِ إِذَا يَغْشَاهَا", en: "And by the night as it covers it" },
      { ar: "وَالسَّمَاءِ وَمَا بَنَاهَا", en: "And by the sky and He who constructed it" },
      { ar: "وَالْأَرْضِ وَمَا طَحَاهَا", en: "And by the earth and He who spread it" }
    ]
  },
  { id: 93, name: "الضحى", nameEn: "Ad-Duha", verses: 11, type: "short",
    ayat: [
      { ar: "وَالضُّحَىٰ", en: "By the morning brightness" },
      { ar: "وَاللَّيْلِ إِذَا سَجَىٰ", en: "And by the night when it covers with darkness" },
      { ar: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", en: "Your Lord has not taken leave of you, nor has He detested you" },
      { ar: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", en: "And the Hereafter is better for you than the first life" },
      { ar: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", en: "And your Lord is going to give you, and you will be satisfied" }
    ]
  },
  { id: 94, name: "الشرح", nameEn: "Ash-Sharh", verses: 8, type: "short",
    ayat: [
      { ar: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", en: "Did We not expand for you your breast?" },
      { ar: "وَوَضَعْنَا عَنكَ وِزْرَكَ", en: "And We removed from you your burden" },
      { ar: "الَّذِي أَنقَضَ ظَهْرَكَ", en: "Which had weighed upon your back" },
      { ar: "وَرَفَعْنَا لَكَ ذِكْرَكَ", en: "And raised high for you your repute" },
      { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "For indeed, with hardship will be ease" },
      { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship will be ease" }
    ]
  },
  { id: 97, name: "القدر", nameEn: "Al-Qadr", verses: 5, type: "short",
    ayat: [
      { ar: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", en: "Indeed, We sent it down during the Night of Decree" },
      { ar: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", en: "And what can make you know what the Night of Decree is?" },
      { ar: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", en: "The Night of Decree is better than a thousand months" },
      { ar: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", en: "The angels and the Spirit descend therein by permission of their Lord for every matter" },
      { ar: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", en: "Peace it is until the emergence of dawn" }
    ]
  },
  { id: 99, name: "الزلزلة", nameEn: "Az-Zalzalah", verses: 8, type: "short",
    ayat: [
      { ar: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", en: "When the earth is shaken with its final earthquake" },
      { ar: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", en: "And the earth discharges its burdens" },
      { ar: "وَقَالَ الْإِنسَانُ مَا لَهَا", en: "And man says, 'What is wrong with it?'" },
      { ar: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", en: "That Day, it will report its news" },
      { ar: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", en: "Because your Lord has commanded it" },
      { ar: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ", en: "That Day, the people will depart separated to be shown the result of their deeds" }
    ]
  },
  { id: 102, name: "التكاثر", nameEn: "At-Takathur", verses: 8, type: "short",
    ayat: [
      { ar: "أَلْهَاكُمُ التَّكَاثُرُ", en: "Competition in worldly increase diverts you" },
      { ar: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", en: "Until you visit the graveyards" },
      { ar: "كَلَّا سَوْفَ تَعْلَمُونَ", en: "No! You are going to know" },
      { ar: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", en: "Then no! You are going to know" },
      { ar: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", en: "No! If you only knew with knowledge of certainty" }
    ]
  },
  { id: 103, name: "العصر", nameEn: "Al-Asr", verses: 3, type: "short",
    ayat: [
      { ar: "وَالْعَصْرِ", en: "By time" },
      { ar: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", en: "Indeed, mankind is in loss" },
      { ar: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", en: "Except for those who have believed and done righteous deeds and advised each other to truth and patience" }
    ]
  },
  { id: 105, name: "الفيل", nameEn: "Al-Fil", verses: 5, type: "short",
    ayat: [
      { ar: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", en: "Have you not considered how your Lord dealt with the companions of the elephant?" },
      { ar: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", en: "Did He not make their plan into misguidance?" },
      { ar: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", en: "And He sent against them birds in flocks" },
      { ar: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", en: "Striking them with stones of hard clay" },
      { ar: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", en: "And He made them like eaten straw" }
    ]
  },
  { id: 108, name: "الكوثر", nameEn: "Al-Kawthar", verses: 3, type: "short",
    ayat: [
      { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", en: "Indeed, We have granted you Al-Kawthar" },
      { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", en: "So pray to your Lord and sacrifice" },
      { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", en: "Indeed, your enemy is the one cut off" }
    ]
  },
  { id: 109, name: "الكافرون", nameEn: "Al-Kafirun", verses: 6, type: "short",
    ayat: [
      { ar: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", en: "Say, 'O disbelievers'" },
      { ar: "لَا أَعْبُدُ مَا تَعْبُدُونَ", en: "I do not worship what you worship" },
      { ar: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", en: "Nor are you worshippers of what I worship" },
      { ar: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", en: "Nor will I be a worshipper of what you worship" },
      { ar: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", en: "Nor will you be worshippers of what I worship" },
      { ar: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", en: "For you is your religion, and for me is my religion" }
    ]
  },
  { id: 110, name: "النصر", nameEn: "An-Nasr", verses: 3, type: "short",
    ayat: [
      { ar: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", en: "When the victory of Allah has come and the conquest" },
      { ar: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", en: "And you see the people entering into the religion of Allah in multitudes" },
      { ar: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا", en: "Then exalt Him with praise of your Lord and ask forgiveness of Him" }
    ]
  },
  { id: 112, name: "الإخلاص", nameEn: "Al-Ikhlas", verses: 4, type: "short",
    ayat: [
      { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", en: "Say, 'He is Allah, the One'" },
      { ar: "اللَّهُ الصَّمَدُ", en: "Allah, the Eternal Refuge" },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", en: "He neither begets nor is born" },
      { ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", en: "Nor is there to Him any equivalent" }
    ]
  },
  { id: 113, name: "الفلق", nameEn: "Al-Falaq", verses: 5, type: "short",
    ayat: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", en: "Say, 'I seek refuge in the Lord of daybreak'" },
      { ar: "مِن شَرِّ مَا خَلَقَ", en: "From the evil of that which He created" },
      { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", en: "And from the evil of darkness when it settles" },
      { ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", en: "And from the evil of the blowers in knots" },
      { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", en: "And from the evil of an envier when he envies" }
    ]
  },
  { id: 114, name: "الناس", nameEn: "An-Nas", verses: 6, type: "short",
    ayat: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", en: "Say, 'I seek refuge in the Lord of mankind'" },
      { ar: "مَلِكِ النَّاسِ", en: "The Sovereign of mankind" },
      { ar: "إِلَٰهِ النَّاسِ", en: "The God of mankind" },
      { ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", en: "From the evil of the retreating whisperer" },
      { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", en: "Who whispers in the breasts of mankind" },
      { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", en: "Among jinn and among mankind" }
    ]
  },
  { id: 2, name: "البقرة", nameEn: "Al-Baqarah", verses: 286, type: "long",
    ayat: [
      { ar: "الم", en: "Alif, Lam, Meem" },
      { ar: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ", en: "This is the Book about which there is no doubt, a guidance for those conscious of Allah" },
      { ar: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", en: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them" },
      { ar: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", en: "And who believe in what has been revealed to you and what was revealed before you" },
      { ar: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", en: "Those are upon right guidance from their Lord, and it is those who are the successful" }
    ]
  },
  { id: 18, name: "الكهف", nameEn: "Al-Kahf", verses: 110, type: "long",
    ayat: [
      { ar: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا", en: "Praise be to Allah, who has sent down upon His Servant the Book and has not made therein any deviance" },
      { ar: "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ", en: "He has made it straight, to warn of severe punishment from Him and to give good tidings to the believers" },
      { ar: "الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا", en: "Who do righteous deeds that they will have a good reward" },
      { ar: "مَّاكِثِينَ فِيهِ أَبَدًا", en: "In which they will remain forever" }
    ]
  }
];

const PRAYERS = [
  { id: "fajr", name: "الفجر", nameEn: "Fajr", icon: "🌅", recLength: "long", tip: "النبي ﷺ كان يطيل القراءة في الفجر — يُسنّ قراءة السور الطوال", tipEn: "The Prophet ﷺ used to lengthen recitation in Fajr — long surahs are recommended" },
  { id: "dhuhr", name: "الظهر", nameEn: "Dhuhr", icon: "☀️", recLength: "medium", tip: "القراءة في الظهر متوسطة — مثل سورة الأعلى أو الغاشية", tipEn: "Medium-length recitation is Sunnah for Dhuhr — like Al-A'la or Al-Ghashiyah" },
  { id: "asr", name: "العصر", nameEn: "Asr", icon: "🌤", recLength: "short", tip: "صلاة العصر أقصر من الظهر — يُسنّ القراءة بقصار السور", tipEn: "Asr is shorter than Dhuhr — short surahs are recommended" },
  { id: "maghrib", name: "المغرب", nameEn: "Maghrib", icon: "🌇", recLength: "short", tip: "المغرب وقتها ضيق — القراءة بقصار السور أفضل", tipEn: "Maghrib time is short — short surahs are preferred" },
  { id: "isha", name: "العشاء", nameEn: "Isha", icon: "🌙", recLength: "medium", tip: "العشاء مثل الظهر — القراءة متوسطة", tipEn: "Isha is like Dhuhr — medium-length recitation is Sunnah" },
  { id: "tahajjud", name: "التهجد", nameEn: "Tahajjud", icon: "✨", recLength: "long", tip: "قيام الليل — أطل القراءة ما استطعت وتدبّر الآيات", tipEn: "Night prayer — recite at length and reflect deeply on the verses" }
];

function getCurrentPrayer() {
  const h = new Date().getHours();
  if (h >= 4 && h < 6) return PRAYERS[0];
  if (h >= 12 && h < 15) return PRAYERS[1];
  if (h >= 15 && h < 17) return PRAYERS[2];
  if (h >= 17 && h < 19) return PRAYERS[3];
  if (h >= 19 && h < 22) return PRAYERS[4];
  return PRAYERS[5];
}

function getSurahsForPrayer(prayer) {
  if (prayer.recLength === "long") return SURAHS.filter(s => s.type === "long" || s.type === "medium");
  if (prayer.recLength === "medium") return SURAHS.filter(s => s.type === "medium" || s.type === "short");
  return SURAHS.filter(s => s.type === "short");
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

  const t = useCallback((ar, en) => language === "ar" ? ar : en, [language]);

  useEffect(() => { shuffle(); }, []);

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

  const toggleFav = (surah) => {
    setFavorites(prev => prev.find(f => f.id === surah.id) ? prev.filter(f => f.id !== surah.id) : [...prev, surah]);
  };
  const isFav = (surah) => favorites.some(f => f.id === surah.id);
  const markRead = (surah, prayer) => {
    setHistory(prev => [{ surah, prayer: prayer || currentPrayer, date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }), timestamp: Date.now() }, ...prev]);
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
      fontFamily: "'Amiri', 'Noto Naskh Arabic', serif", fontSize: big ? (isTahajjud ? 34 : 26) : 21,
      lineHeight: 2.1, textAlign: "right", direction: "rtl", color: c.text
    }),
    tag: { display: "inline-block", padding: "3px 10px", borderRadius: 16, fontSize: 11, fontWeight: 700, background: c.accentDim, color: c.accent }
  };

  const NAV = [
    { id: "home", icon: "🏠", label: t("الرئيسية", "Home") },
    { id: "favorites", icon: "❤️", label: t("المفضلة", "Favorites") },
    { id: "history", icon: "📊", label: t("السجل", "History") },
    { id: "tahajjud", icon: "🌙", label: t("التهجد", "Tahajjud") },
    { id: "settings", icon: "⚙️", label: t("الإعدادات", "Settings") }
  ];

  // ── PAGES ──────────────────────────────────────────────────────────────

  const HomePage = () => (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: c.dim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, fontFamily: "'Amiri', serif" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1>
      </div>

      {/* Prayer Selector */}
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

      {/* Sunnah Tip */}
      <div style={{ ...base.card, background: c.accentDim, borderColor: `${c.accent}20`, display: "flex", gap: 12 }}>
        <span style={{ fontSize: 18, marginTop: 2 }}>🧠</span>
        <div>
          <div style={{ fontSize: 10, color: c.accent, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>{t("نصيحة من السنة", "Sunnah Tip")}</div>
          <div style={{ fontSize: 13, color: c.text, lineHeight: 1.7, direction: language === "ar" ? "rtl" : "ltr", fontFamily: "'Amiri', serif" }}>
            {t(activePrayer.tip, activePrayer.tipEn)}
          </div>
        </div>
      </div>

      {/* Suggestion Card */}
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
              {suggestion.ayat.slice(0, 3).map((a, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={base.ar(false)}>{a.ar} <span style={{ color: c.accent, fontSize: 13 }}>﴿{i + 1}﴾</span></div>
                  {showTranslation && <div style={{ fontSize: 12, color: c.dim, lineHeight: 1.6, marginTop: 3, textAlign: "left" }}>{a.en}</div>}
                </div>
              ))}
              {suggestion.ayat.length > 3 && (
                <div style={{ textAlign: "center", color: c.dim, fontSize: 12, paddingTop: 6 }}>··· {t(`و ${suggestion.ayat.length - 3} آيات أخرى`, `${suggestion.ayat.length - 3} more`)} ···</div>
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
        <div style={{ fontSize: 11, color: c.dim, marginTop: 3 }}>{t("اكتشف آيات جديدة", "Discover new verses")}</div>
      </div>
    </div>
  );

  const DetailPage = () => {
    if (!suggestion) return null;
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
          {suggestion.ayat.map((a, i) => (
            <div key={i} style={{ padding: "18px 0", borderBottom: i < suggestion.ayat.length - 1 ? `1px solid ${c.border}` : "none" }}>
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
            { l: t("القراءات", "Reads"), v: history.length, i: "📖" },
            { l: t("الأيام", "Days"), v: dates.length, i: "📅" },
            { l: t("سور مختلفة", "Surahs"), v: new Set(history.map(h => h.surah.id)).size, i: "✨" }
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
    const s = suggestion || SURAHS.filter(s => s.type === "long")[0];
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 36, paddingTop: 16 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Amiri', serif", marginBottom: 6 }}>{t("وضع التهجد", "Tahajjud Mode")}</h1>
          <p style={{ color: c.dim, fontSize: 14, maxWidth: 380, margin: "0 auto" }}>{t("قيام الليل — تدبّر وخشوع", "Night prayer — reflection & devotion")}</p>
        </div>
        <div style={{ ...base.card, borderColor: `${c.accent}30` }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Amiri', serif" }}>{s.name}</div>
            <div style={{ color: c.dim, fontSize: 13 }}>{s.nameEn}</div>
          </div>
          {s.id !== 1 && s.id !== 9 && (
            <div style={{ textAlign: "center", marginBottom: 20, fontSize: 20, fontFamily: "'Amiri', serif", color: c.accent }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          )}
          {s.ayat.map((a, i) => (
            <div key={i} style={{ marginBottom: 22, textAlign: "center" }}>
              <div style={{ ...base.ar(true), textAlign: "center" }}>{a.ar} <span style={{ color: c.accent, fontSize: 16 }}>﴿{i + 1}﴾</span></div>
              {showTranslation && <div style={{ fontSize: 15, color: c.dim, textAlign: "center", lineHeight: 1.7, marginTop: 6, fontStyle: "italic", maxWidth: 460, margin: "6px auto 0" }}>{a.en}</div>}
            </div>
          ))}
        </div>
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
        { icon: "🌙", label: t("الوضع الداكن", "Dark Mode"), desc: t("تبديل المظهر", "Toggle theme"), action: () => setDarkMode(!darkMode), active: darkMode },
        { icon: "🌍", label: t("اللغة", "Language"), desc: language === "ar" ? "العربية" : "English", action: () => setLanguage(l => l === "ar" ? "en" : "ar"), active: language === "ar" },
        { icon: "📖", label: t("الترجمة", "Translation"), desc: t("إظهار الترجمة", "Show translation"), action: () => setShowTranslation(!showTranslation), active: showTranslation },
        { icon: "✨", label: t("وضع التهجد", "Tahajjud Mode"), desc: t("خط كبير — إضاءة خافتة", "Big text, ultra-dark"), action: () => setTahajjudMode(!tahajjudMode), active: tahajjudMode }
      ].map((item, i) => (
        <div key={i} style={{ ...base.card, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: 18 }} onClick={item.action}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: c.dim }}>{item.desc}</div>
            </div>
          </div>
          <div style={{ width: 44, height: 26, borderRadius: 13, background: item.active ? c.accent : c.border, position: "relative", transition: "all 0.3s", cursor: "pointer" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.active ? 21 : 3, transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 28, fontSize: 11, color: c.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{t("البيانات", "Data")}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setHistory([])} style={base.btn(false)}>🗑 {t("مسح السجل", "Clear History")}</button>
        <button onClick={() => setFavorites([])} style={base.btn(false)}>💔 {t("مسح المفضلة", "Clear Favorites")}</button>
      </div>
      <div style={{ ...base.card, marginTop: 22, textAlign: "center" }}>
        <div style={{ fontSize: 18, marginBottom: 6 }}>🕌</div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{t("مساعد التلاوة الذكي", "Smart Recitation Assistant")}</div>
        <div style={{ fontSize: 11, color: c.dim, marginTop: 3 }}>{t("نسخة 1.0 — جعله الله في ميزان حسناتكم", "v1.0 — May Allah accept it from us all")}</div>
      </div>
    </div>
  );

  const pages = { home: HomePage, detail: DetailPage, favorites: FavoritesPage, history: HistoryPage, tahajjud: TahajjudPage, settings: SettingsPage };
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
        {/* Sidebar */}
        <div className="desk" style={{ width: 220, borderRight: `1px solid ${c.border}`, padding: "20px 0", display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 0, height: "100vh", background: c.surface }}>
          <div style={{ padding: "6px 22px 22px", borderBottom: `1px solid ${c.border}`, marginBottom: 6 }}>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Amiri', serif" }}>🕌 القارئ</div>
            <div style={{ fontSize: 10, color: c.dim, marginTop: 1 }}>Smart Recitation</div>
          </div>
          {NAV.map(n => (
            <div key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 22px",
                cursor: "pointer", fontSize: 13, fontWeight: (page === n.id || (page === "detail" && n.id === "home")) ? 700 : 400,
                color: (page === n.id || (page === "detail" && n.id === "home")) ? c.accent : c.dim,
                background: (page === n.id || (page === "detail" && n.id === "home")) ? c.accentDim : "transparent",
                borderLeft: `3px solid ${(page === n.id || (page === "detail" && n.id === "home")) ? c.accent : "transparent"}`,
                transition: "all 0.2s"
              }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "22px 28px", maxWidth: 740, margin: "0 auto", width: "100%", paddingBottom: 90 }}>
          <Page />
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="mob" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: c.surface, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-around", padding: "7px 0 10px", zIndex: 100 }}>
        {NAV.map(n => (
          <div key={n.id} onClick={() => setPage(n.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              cursor: "pointer", padding: "3px 10px",
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
