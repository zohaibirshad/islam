# Mera Deen Safar — Complete Details

> Doosre bots aur developers ke liye poori tafseel. App ki zabaan Roman Urdu hai. Duas, azkaar aur ayat ka asal matn Arabic mein hai.

## 1. Maqsad (Purpose)
Aam musalman ki roz ki zindagi mein deen ko **chhote, aasaan, roz ke amal** ke zariye laana: namaz ki aadat, ek sunnat roz, subah aur shaam ke azkaar, har kaam ki dua, neki, raat ka muhasaba aur buri aadat chhorna.
- Lehja hamesha **hausla dene wala** hai. Kahin bhi sharminda karna ya muqabla nahi hai.
- **Koi backend nahi:** saara data user ke browser (localStorage) mein rehta hai.
- GitHub Pages par muft host ho sakti hai, aur offline bhi chalti hai (service worker).
- UI par likha hai: *"kisi alim se tasdeeq karein"*.

## 2. Design ke usool
- Home par sirf 3 cheezein: **aaj ki 5 namaz**, **aaj ki sunnat**, aur **subah/shaam azkaar** (waqt ke hisaab se). Upar ek chhoti strip mein streak, namaz streak aur level hai.
- Jumma ka card Home par **sirf Jumma (Friday) ko** dikhta hai.
- Baaqi sab cheezein 5-tab bottom navigation mein hain: **Home · Ibadat · Duas · Safar · Ghar**. Settings upar gear icon mein hai.
- Khula space, kam text, mobile-first (max-width 560px), aur light/dark mode (`prefers-color-scheme`).
- Arabic font: Amiri (Google Fonts). Agar offline ho to system ka Naskh font istemal hota hai.

## 3. Sections aur features

### Home
| Card | Kaam |
|---|---|
| Strip | 🔥 Deen streak (wo din jin mein koi bhi amal hua), lagataar paanchon namaz wale din, aur Level progress bar (tap karne par Safar tab khulta hai) |
| Aaj ki namaz | 5 circle buttons (tap se toggle). Har namaz ke neeche uska waqt likha hai. Neeche "Agli namaz · waqt · kitna baaqi". Agar Benamazi se Namazi program chal raha ho to aaj ki goal wali namazon par sunehri nuqta lagta hai aur "🎯 Marhala · x/7 din" dikhta hai |
| Aaj ki sunnat | 34 sahih aur aasaan sunnaton mein se roz ek, `dayNo % 34` ke hisaab se. Har sunnat ke saath reference hai. "Ho gaya ✓" dabane se sunnat streak barhti hai |
| Azkaar (time-aware) | Zuhr se pehle **Subah** ke azkaar. Asr ke baad **Shaam** ke. Zuhr aur Asr ke darmiyan: agar subah ke mukammal na hon to Subah, warna Shaam. Progress ring aur "Shuru karein / Jaari rakhein" button |
| Jumma | Sirf Friday ko (neeche dekhein) |

### Azkaar runner (full-screen sheet)
- Ek waqt mein ek zikr dikhta hai: Arabic, Roman transliteration, Roman Urdu mein matlab, aur reference.
- Bada **tap counter** hai jismein ring progress aur vibration hai. Ginti poori hone par 350ms baad khud agla zikr aa jaata hai. "Pichla" aur "Agla" buttons bhi hain.
- Saare azkaar mukammal hone par: "MashaAllah… +15 points".
- Subah mein 13 azkaar hain. Shaam mein 14 hain (shaam mein *A'oozu bi kalimatillah* ×3 izafi hai).
- Shaam ke liye alag Arabic aur transliteration bhi hai (amsayna wagaira).
- Azkaar ki list: Ayat-ul-Kursi, teen Qul ×3, Asbahna/Amsayna (Muslim 2723), Allahumma bika asbahna, Sayyid-ul-Istighfar (Bukhari 6306), Allahumma 'afini ×3, Hasbiyallah ×7, Bismillahilladhi la yadurru ×3, Raditu billahi ×3, Ya Hayyu ya Qayyum, SubhanAllahi wa bihamdihi ×100, Astaghfirullah wa atubu ilayh ×100, aur Durood ×10.
- Arabic matn Hisn-ul-Muslim ke data (`/workspace/islamic-apps/_data/azkar.json`) se liya gaya hai aur saaf kiya gaya hai.

### Ibadat tab
1. **Benamazi se Namazi program** (section 4 dekhein).
2. **Pichle 7 din ka grid:** har namaz ke liye 7 khaane (Itw, Pir, Man, Bud, Jmt, Jum, Haf) aur namaz streak.
3. **Azkaar:** Subah aur Shaam ke runner ke links, progress ke saath.
4. **Jumma checklist:** baaqi dinon mein disabled rehti hai aur likha hota hai ke Jumma ko khulegi.
5. **Auqaat-e-Namaz:** Fajr, Tulu, Zuhr, Asr, Maghrib aur Isha ke auqaat, shehar ka naam, hisaab ka tareeqa, aur "Location / tareeqa badlein".

### Jumma checklist (sirf Friday ko active)
Ghusl (Bukhari 877), saaf kapray aur khushboo (Bukhari 883), Surah Kahf (Hakim, Bayhaqi), kasrat se durood (Abu Dawud 1047) jiska alag counter hai aur 100 par khud tick ho jaata hai, jaldi masjid aur khutba (Bukhari 881, 934), aur Asr se Maghrib ke darmiyan dua (Abu Dawud 1048). Har item ke 5 points hain.

### Duas tab
- **"Abhi ke liye"** card: ghante ke hisaab se 1–2 duaein dikhti hain. Har dua mein `hrs` array hota hai. Misaal: subah 4–10 baje uthne ki dua, raat 9 baje ke baad sone ki dua, khane ke auqaat mein khane ki dua.
- **Search:** title, matlab ya transliteration mein dhoondta hai.
- **27 duaein**, accordion list mein:
  - neend se uthna, sona
  - khane se pehle aur baad
  - ghar se nikalna aur ghar mein daakhil hona
  - bathroom jaana aur nikalna
  - wudu ke baad
  - masjid mein daakhil hona aur nikalna
  - kapray pehenna
  - sawari aur safar
  - azaan ke baad
  - chheenk
  - gussa
  - pareshani aur gham
  - musibat
  - Dua-e-Yunus
  - kaffara-e-majlis
  - barish
  - iftar
  - Jazakallah
  - walidain ke liye
  - ilm ke liye
  - Rabbana atina
  - Ya muqallibal quloob
- Har dua mein Arabic, Roman transliteration, Roman Urdu matlab aur reference (Bukhari, Muslim, Abu Dawud, Tirmidhi ya Quran) hai.

### Safar tab
- **Level card:** level number, level ka naam aur points.
- 4 tiles hain jo sheets mein khulti hain:
  1. **Ek Ayat, Ek Amal:** 35 ayat ki list se roz ek ayat. Arabic matn (Uthmani) alquran.cloud API se pehle hi download kar ke app mein daal diya gaya hai. Saath mein Roman Urdu mein mukhtasar matlab, aaj ka ek amal, aur "Amal kar liya ✓" (10 points).
  2. **Neki Jar:** roz ka ek idea (30 ideas ki list se). "Kar li" dabane se idea jar mein chala jaata hai. Apni neki bhi likh sakte hain aur delete bhi kar sakte hain. **Hafte ka summary** 7 din ke bar chart aur kul ginti ke saath hai. Neki 5 points ki hai, din mein zyada se zyada 5 nekiyan count hoti hain.
  3. **Raat ka Muhasaba:** 3 sawal, jinke jawab sirf user ke phone mein mehfooz hote hain:
     - Aaj kya achha kiya? (shukr)
     - Kya ghalti hui? (tauba)
     - Kal kya behtar karunga? (niyyat)

     Saath mein **istighfar counter** (target 100) aur pichle 5 muhasabay (collapsible). Muhasaba 10 points ka hai. Har 33 istighfar ke 3 points hain, din mein zyada se zyada 30.
  4. **Buri Aadat Chhoro:** kai trackers bana sakte hain. Har tracker mein: kitne din saaf, agle milestone ki ring (1, 3, 7, 14, 21, 30, 40, 60, 90, 180, 365 din), best record, aur "Phisal gaya — dobara shuru". Dobara shuru karne par shame nahi hota; tauba ka narm paigham aata hai (2:222, 39:53). Saath mein dua (Tirmidhi 3591).
- Card mein likha hai ke aaj ke points kaise bane.

### Ghar tab (Family circle)
- **Ek hi device par kai afraad:** "+ Naya fard" mein naam aur emoji chunein. "Kholein" dabane se active profile badalti hai. Har profile ka data bilkul alag hai.
- Har fard ke card mein: aaj ki namaz ki ring (x/5), deen streak, level, aur hausla dene wala jumla. Kabhi ye nahi likha jaata ke "fail" hua.
- **Share code** (doosre phone walon ke liye):
  - Format `DS1-<base64(JSON)>` hai. JSON mein `{v,n,e,s,ds,w[7],l,u}` hota hai: naam, emoji, namaz streak, deen streak, 7 din ki namaz ginti, level aur date.
  - **Muhasaba, aadatein ya nekiyan kabhi share nahi hoti.**
  - Code navigator.share se bheja jaata hai. Woh na ho to clipboard mein copy hota hai, aur woh bhi na ho to text box mein dikhta hai.
- **Door ke ahbaab:** kisi ka code paste karein to uska card ban jaata hai (hafte ki namaz x/35 aur streak). Naya code dalne se card update ho jaata hai. ✕ dabane se card hat jaata hai.
- **Hausla bhejein:** namaz ki narm yaad-dihani ka paigham share karta hai.

### Settings (gear icon)
- Location: shehar, lat aur lng, ya "📍 Meri location lein" (Geolocation).
- Hisaab ka tareeqa aur Asr ka mazhab.
- Yaad-dihani: azkaar ke liye subah aur shaam ka waqt, aur har namaz ke waqt ka toggle.
- Backup: JSON file download karein ya restore karein.
- Profile ka naam badalna.
- Is profile ka data mitana.

### Onboarding
Pehli dafa app khulne par naam poocha jaata hai. "Bismillah, shuru karein".

## 4. Benamazi se Namazi program (7 marhalay)
| # | Marhala | Goal namazein | Lagataar din |
|---|---|---|---|
| 1 | Pehla qadam | Maghrib | 7 |
| 2 | Doosra qadam | Maghrib + Isha | 7 |
| 3 | Teesra qadam | Fajr + Maghrib + Isha | 7 |
| 4 | Chautha qadam | Fajr + Asr + Maghrib + Isha | 7 |
| 5 | Paanchon namazein | Paanchon | 7 |
| 6 | Pakki aadat | Paanchon | 40 |
| 7 | Sunnat aur jamaat | Paanchon + "sunnat-e-muakkadah bhi padhi" ka tick | 30 |

- **Lagataar din kaise gine jaate hain:** marhala shuru hone ki date ke baad wo din jin mein goal ki saari namazein tick hon. Agar aaj abhi poora nahi hua to ginti kal se peeche ki taraf hoti hai.
- **Agle marhale par jaana:** ginti poori hote hi app khud agle marhale par le jaati hai. Celebration modal aata hai aur **+50 bonus points** milte hain.
- **Din chhoot jaaye:** ginti zero ho jaati hai, lekin paigham narm hota hai: "Koi baat nahi, aaj se phir shuru — Allah koshish dekhta hai 💚".
- Wazeh tanbeeh UI mein likhi hai: **paanchon namazein farz hain.** Ye program sirf aadat daalne ki tarteeb hai. Jo namaz reh jaaye uski qaza karein aur baaqi namazein bhi padhne ki koshish jaari rakhein.
- Program Ibadat tab se shuru ya band hota hai. Program band karne se namaz ka record nahi mitta.

## 5. Namaz ke auqaat ka hisaab
- Device par hi **astronomical calculation** hoti hai (PrayTimes.org jaisa algorithm). Koi API nahi lagti.
- Julian date se suraj ki declination aur equation of time nikali jaati hai. Har waqt 2 iterations se behtar kiya jaata hai.
- **Fajr / Isha:** suraj ufaq se kitne degree neeche ho:
  - Karachi (default): 18° / 18°
  - MWL: 18° / 17°
  - ISNA: 15° / 15°
  - Egypt: 19.5° / 17.5°
  - Umm al-Qura: 18.5° / Isha Maghrib ke 90 minute baad
- **Tulu aur Maghrib:** suraj ka angle 0.833° (refraction ki wajah se). Maghrib ka waqt ghuroob hi hai.
- **Zuhr:** zawal + 1 minute.
- **Asr:** Hanafi (default) mein saaya cheez ka 2 guna, Shafi/Jamhoor mein 1 guna. Angle = `-arccot(f + tan|lat − dec|)`.
- **Default location:** Karachi (24.8607, 67.0011). Device ka timezone istemal hota hai.
- **Test nateeja (Karachi, 18-Oct-2026):** Fajr 5:15, Tulu 6:31, Zuhr 12:18, Asr (Hanafi) 4:25, Maghrib 6:03, Isha 7:19 PKT. Ye aam taur par chhape hue auqaat ke 1–3 minute ke andar hona chahiye.
- UI mein likha hai: *apni masjid ke auqaat ko tarjeeh dein*.

## 6. Points aur Level
- **Points:** namaz 10 har ek, sunnat 10, subah azkaar 15, shaam azkaar 15, neki 5 (din mein max 5), muhasaba 10, istighfar 3 har 33 par (din mein max 30), amal 10, Jumma ka har item 5, aur marhala poora hone par +50.
- Points har dafa days data se dobara compute hote hain. Is liye ye hamesha data ke mutabiq rehte hain.
- **Levels** (points ki hadd par): Naya Musafir 0 · Talib 100 · Saabit Qadam 300 · Zakir 600 · Shakir 1000 · Saabir 1600 · Mohsin 2400 · Mukhlis 3400 · Saalik 4600 · Raah-e-Noor 6000.
- **Streaks:**
  - **Deen streak:** lagataar din jin mein koi bhi amal hua ho.
  - **Namaz streak:** lagataar din jin mein paanchon namazein hon.
  - **Sunnat streak:** lagataar din jin mein sunnat ki ho.
  - Agar aaj abhi khaali hai to streak nahi tootti; ginti kal se hoti hai.

## 7. Data storage (localStorage)
**`deenSafar.v1`** mein ek JSON object hai:
```js
{
  v:1, active:"<profileId>", onb:true,
  profiles:{ "<id>":{ name, emo, bonus, prog:{s:<stageIndex>, since:<ms>}|null,
     habits:[{id,name,start:<ms>,best,slips}],
     days:{ "YYYY-MM-DD":{
        n:{f,z,a,m,i},          // 1/0 namaz
        su:1,                   // sunnat done
        sm:1,                   // stage-7 sunnat-e-muakkadah
        az:{S:{<zikrKey>:count}, E:{...}, Sd:1, Ed:1},
        deeds:["…"], mu:{a,b,c}, ist:<n>, amal:1,
        jm:{ghusl,kapre,kahf,durood,jaldi,dua,dc:<durood count>} } } } },
  remote:{ "<lowercased name>":{v,n,e,s,ds,w:[7],l,u} },   // imported share codes
  set:{ lat,lng,city, method:"karachi|mwl|isna|egypt|makkah", asr:"hanafi|shafi",
        rem:{on, s:"HH:MM", e:"HH:MM", nz} } }
```
**`deenSafar.fired`** mein `{d:"YYYY-MM-DD", S:1, E:1, nf:1…}` hota hai. Is se pata chalta hai ke aaj kaunsi notification ja chuki hai, taake wohi notification dobara na jaaye.

## 8. Yaad-dihani (Notifications)
- Ijazat Settings mein toggle on karte waqt maangi jaati hai.
- Har 30 second baad check hota hai:
  - Subah ke azkaar: set kiye gaye waqt se dopahar 12 baje tak, agar mukammal na hon.
  - Shaam ke azkaar: set kiye gaye waqt ke baad, agar mukammal na hon.
  - Har namaz: waqt shuru hone ke 15 minute ke andar, agar tick na ho.
- Notification service worker ke `showNotification` se jaati hai, jo Android Chrome par zaroori hai. Woh na ho to `new Notification` istemal hota hai.
- **Hadd:** server ya push nahi hai, is liye notification sirf tab aati hai jab app ya tab khula ho ya background mein zinda ho.

## 9. File structure
```
deen-safar/
├── index.html              # poori app (HTML + CSS + JS + data inline). Akeli bhi chal jaati hai
├── sw.js                   # offline cache (app shell cache-first + fonts runtime cache), notification click
├── manifest.webmanifest    # PWA install (naam, rang, icons)
├── icon-192.png, icon-512.png
├── shot.png                # test screenshot (home)
├── DEEN_SAFAR_DETAILS.md   # ye file
└── _build/                 # sirf development ke liye; deploy karna zaroori nahi
    ├── data.py             # duas, azkaar, sunnat, ayat, neki ka content → data.json
    ├── fetch.py / ayat.json  # alquran.cloud se Uthmani matn (35 ayat)
    ├── template.html       # app ka source (/*DATA*/ placeholder)
    ├── build.py            # template + data.json → ../index.html
    ├── test.py             # Playwright headless test suite
    └── shots/              # mukhtalif screens ke screenshots
```
**Content badalna ho to:** `_build/data.py` edit karein, phir `python3 data.py && python3 build.py` chalayein.

## 10. GitHub Pages par deploy
1. GitHub par repo banayein, misaal `deen-safar`, ya `islamic-apps` folder ko kisi repo mein rakhein.
2. `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png` aur `icon-512.png` root mein ya kisi folder mein upload karein. (`_build/` upload karna zaroori nahi.)
3. Repo mein jaayein: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
4. 1–2 minute baad app `https://<username>.github.io/<repo>/` par khul jaayegi.
5. Phone par Chrome mein "Add to Home screen" karein. App install ho jaayegi aur offline bhi chalegi.

Note: service worker aur notifications ke liye HTTPS chahiye, jo GitHub Pages deta hai. `file://` se kholne par app chalti hai, magar service worker register nahi hota.

## 11. Testing (18-Oct-2026)
Playwright 1.64 aur Google Chrome headless mein test kiya. Viewport 400×860, timezone Asia/Karachi, aur clock mock kiya gaya. **JS errors ya console errors: koi nahi.** Ye sab cheezein pass hui:
- **Shuru aur namaz:**
  - Onboarding aur naam
  - Namaz toggle (2/5)
  - Sunnat done
- **Azkaar:**
  - Time-aware azkaar: subah 08:30 par "Subah" aur 19:00 par "Shaam"
  - Subah ke 13 azkaar runner mein poore tap kiye (234 taps). Completion screen aayi aur points jud gaye.
- **Ibadat aur duas:**
  - Program shuru (Marhala 1/7)
  - Dua search aur expand
- **Safar:**
  - Ayat-amal
  - Neki Jar (idea + apni neki, hafte ki ginti 2)
  - Muhasaba save. Istighfar ginte waqt likha hua text mehfooz raha.
  - Aadat tracker, aur phisalne par dobara shuru
  - Points ka hisaab sahi nikla: 75
- **Ghar:**
  - Naya fard
  - Share code export aur doosre naam se import. Ghalat code par "Code sahi nahi".
  - Profile switch. Har profile ka data alag mila.
- **Settings aur data:**
  - Settings save (Asr Shafi)
  - Reload ke baad data mehfooz raha
- **Jumma aur display:**
  - Friday (23-Oct) ko Home par Jumma card aaya aur checklist chali
  - Dark mode
  - Service worker HTTP server par register hua

## 12. Maloom hudood (Known limitations)
- Reminders sirf tab aate hain jab app khuli ho ya background mein ho. Asli push ke liye server chahiye.
- Family circle ek device par hai. Door walon ke saath data **khud se sync nahi hota**: share code dobara bhej kar card update karna padta hai.
- Namaz ke auqaat calculate kiye hue hain, is liye 1–3 minute ka farq ho sakta hai. Device ka timezone istemal hota hai, is liye kisi aur mulk ki location dein to waqt device ke timezone mein dikhega. Bohat oonche latitudes (>48°) ke liye koi khaas adjustment nahi hai.
- Hijri date browser ke `islamic-umalqura` calendar se aati hai. Ye Pakistan ki ru'yat se 1 din aage ya peeche ho sakti hai.
- Ayat ka Roman Urdu matlab mukhtasar mafhoom hai, lafzi tarjuma nahi. Duaon ke references mashhoor kutub se hain. **Kisi alim se tasdeeq zaroori hai.**
- Browser ka data mitaane ya private mode mein data chala jaata hai. Is liye Settings se backup lete rahein.
- Audio tilawat ya azkaar ki audio nahi hai, taake app offline aur halki rahe.

## 13. Aage ke ideas
- Azkaar ki audio, Hisn-ul-Muslim ke offline MP3 ke saath (optional download).
- Firebase ya Supabase se asli family sync aur push notifications.
- Qaza namaz ka hisaab aur tracker.
- Ramadan mode: roza, taraweeh aur Quran khatam tracker.
- Quran tilawat ka roz ka hadaf (safhe ya juz).
- Haftawar "Safar report" image jo share ki ja sake.
- Urdu Nastaliq UI ka option.
- Bachon ka mode: aasaan sunnatein, stickers aur kahaniyan.
- Widget ya home-screen shortcut (Android TWA wrapper).
