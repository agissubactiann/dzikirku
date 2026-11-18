// Data dzikir & daftar sholat. Edit di sini.

const P = [
  ["subuh", "Subuh", 2],
  ["dzuhur", "Dzuhur", 4],
  ["ashar", "Ashar", 4],
  ["maghrib", "Maghrib", 3],
  ["isya", "Isya", 4],
];
const MN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const I = {
  ist: { h: "Istighfar", a: "أَسْتَغْفِرُ اللّٰهَ", l: "Astaghfirullāh", n: "Aku memohon ampun kepada Allah.", t: 3 },
  sal: {
    h: "Allāhumma Antas Salām",
    a: "اللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    l: "Allāhumma antas salām, wa minkas salām, tabārakta yā dzal jalāli wal ikrām.",
    n: "Ya Allah, Engkau Maha Sejahtera, dari-Mu kesejahteraan, Maha Suci Engkau wahai Pemilik keagungan dan kemuliaan.",
    t: 1,
  },
  kur: {
    h: "Ayat Kursi",
    a: "اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    l: "Allāhu lā ilāha illā huwal ḥayyul qayyūm, lā ta’khudzuhū sinatuw wa lā nawm, lahū mā fis samāwāti wa mā fil arḍ, man dzal ladzī yasyfa‘u ‘indahū illā bi’idznih, ya‘lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai’im min ‘ilmihī illā bimā syā’, wasi‘a kursiyyuhus samāwāti wal arḍ, wa lā ya’ūduhū ḥifẓuhumā, wa huwal ‘aliyyul ‘aẓīm.",
    n: "QS. Al-Baqarah: 255.",
    t: 1,
  },
  ikh: {
    h: "Al-Ikhlas",
    a: "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    l: "Qul huwallāhu aḥad. Allāhuṣ ṣamad. Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan aḥad.",
    n: "QS. Al-Ikhlas.",
    t: 1,
  },
  fal: {
    h: "Al-Falaq",
    a: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    l: "Qul a‘ūdzu birabbil falaq. Min syarri mā khalaq. Wa min syarri ghāsiqin idzā waqab. Wa min syarrin naffāṡāti fil ‘uqad. Wa min syarri ḥāsidin idzā ḥasad.",
    n: "QS. Al-Falaq.",
    t: 1,
  },
  nas: {
    h: "An-Nas",
    a: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    l: "Qul a‘ūdzu birabbin nās. Malikin nās. Ilāhin nās. Min syarril waswāsil khannās. Alladzī yuwaswisu fī ṣudūrin nās. Minal jinnati wan nās.",
    n: "QS. An-Nas.",
    t: 1,
  },
  tas: { h: "Tasbih", a: "سُبْحَانَ اللّٰهِ", l: "Subḥānallāh", n: "Maha Suci Allah.", t: 33 },
  tah: { h: "Tahmid", a: "الْحَمْدُ لِلّٰهِ", l: "Alḥamdulillāh", n: "Segala puji bagi Allah.", t: 33 },
  tak: { h: "Takbir", a: "اللّٰهُ أَكْبَرُ", l: "Allāhu akbar", n: "Allah Maha Besar.", t: 34 },
  tahl: {
    h: "Tahlil",
    a: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    l: "Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul mulku wa lahul ḥamdu wa huwa ‘alā kulli syai’in qadīr.",
    n: "Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, Dia Maha Kuasa atas segala sesuatu.",
    t: 1,
  },
  yun: {
    h: "Doa Nabi Yunus",
    a: "لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    l: "Lā ilāha illā anta subḥānaka innī kuntu minaẓ ẓālimīn.",
    n: "Tiada tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang yang zalim.",
    t: 7,
  },
  din: {
    h: "Ayat 1000 Dinar",
    a: "وَمَنْ يَتَّقِ اللّٰهَ يَجْعَلْ لَهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَنْ يَتَوَكَّلْ عَلَى اللّٰهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللّٰهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللّٰهُ لِكُلِّ شَيْءٍ قَدْرًا",
    l: "Wa may yattaqillāha yaj‘al lahū makhrajā. Wa yarzuqhu min ḥaitsu lā yaḥtasib. Wa may yatawakkal ‘alallāhi fahuwa ḥasbuh. Innallāha bālighu amrih. Qad ja‘alallāhu likulli syai’in qadrā.",
    n: "QS. At-Talaq: 2–3.",
    t: 7,
  },
  sap: {
    h: "Doa Sapu Jagat",
    a: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    l: "Rabbanā ātinā fid dunyā ḥasanataw wa fil ākhirati ḥasanataw wa qinā ‘adzāban nār.",
    n: "Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat, dan lindungilah kami dari azab neraka.",
    t: 1,
  },
  pri: { h: "Doa pribadi", a: "", l: "", n: "Angkat tangan dan berdoalah dengan kata-katamu sendiri, untuk dirimu dan orang-orang yang kamu sayangi.", t: 1, p: 1 },
};
const Z = {
  quick: [I.ist, I.sal, I.kur, I.ikh, I.fal, I.nas, I.tas, I.tah, I.tak, I.sap],
  full: [I.ist, I.sal, I.kur, { ...I.ikh, t: 3 }, { ...I.fal, t: 3 }, { ...I.nas, t: 3 }, I.tas, I.tah, I.tak, I.tahl, I.yun, I.din, { ...I.sap, t: 3 }, I.pri],
};
