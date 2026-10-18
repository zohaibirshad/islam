# Mera Deen Safar — Complete Details

> Doosre bots aur developers ke liye poori tafseel. App ki default zabaan Roman Urdu hai; English, اردو (Nastaliq, RTL), हिन्दी, العربية (RTL), বাংলা aur Bahasa Indonesia bhi dastiyab hain (dekhein §4b). Duas, azkaar aur ayat ka asal matn Arabic mein hai.

## 1. Maqsad (Purpose)
Aam musalman ki roz ki zindagi mein deen ko **chhote, aasaan, roz ke amal** ke zariye laana: namaz ki aadat, ek sunnat roz, subah aur shaam ke azkaar, har kaam ki dua, neki, raat ka muhasaba aur buri aadat chhorna.
- Lehja hamesha **hausla dene wala** hai. Kahin bhi sharminda karna ya muqabla nahi hai.
- **Koi backend nahi:** saara data user ke browser (localStorage) mein rehta hai.
- GitHub Pages par muft host ho sakti hai, aur offline bhi chalti hai (service worker).
- UI par likha hai: *"kisi alim se tasdeeq karein"*.

## 2. Design ke usool
- Home par sirf 3 cheezein: **aaj ki 5 namaz**, **aaj ki sunnat**, aur **subah/shaam azkaar** (waqt ke hisaab se). Upar ek chhoti strip mein streak, namaz streak aur level hai.
- Qaza tracker shuru kiya ho to sirf tab Home par ek patli si line "🕰️ Qaza namaz · Aaj x/hadaf · N baaqi" aati hai.
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
| Qaza (optional) | Sirf jab qaza tracker on ho: ek line, tap karne par Qaza sheet khulti hai |

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
1a. **Qaza namaz** card (section 4a dekhein): shuru na ho to "Hisaab lagayein", warna ring, baaqi ginti, andaazan muddat, aur pichle dinon ki chhooti namazon ka prompt.
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
- **Zabaan / Language:** 7 zabaanon ke chips. Tap karte hi poori app (khula sheet bhi) foran badal jaati hai, reload nahi hota.
- Location: shehar, lat aur lng, ya "📍 Meri location lein" (Geolocation).
- Hisaab ka tareeqa aur Asr ka mazhab.
- Yaad-dihani: azkaar ke liye subah aur shaam ka waqt, aur har namaz ke waqt ka toggle.
- Backup: JSON file download karein ya restore karein.
- Profile ka naam badalna.
- Is profile ka data mitana.

### Onboarding
Pehli dafa app khulne par zabaan ke chips aur naam poocha jaata hai. "Bismillah, shuru karein". Zabaan badalne se likha hua naam nahi mitta.

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

## 4a. Qaza namaz ka hisaab aur tracker
Ibadat tab ke card ya Home ki line se **"Qaza namaz"** sheet khulti hai. Is mein 3 hisse hain: **Tracker · Hisaab · Khud likhein**.

**Hisaab (andaaza):**
- *Muddat:* saal / mahine / din (saal = 365, mahina = 30 din, andaazan).
- *Tareekhein:* baligh hone ki tareekh se baqaida namaz shuru karne ki tareekh tak ke din. Hint: nishaniyan yaad na hon to aksar ulama 15 saal ki umr maante hain (alim se tasdeeq).
- *Ghatayein (din):* wo din jin mein namaz padhi thi, ya khawateen ke haiz/nifas ke din.
- *Witr* toggle (Hanafi mein wajib). Default on agar Settings mein Asr Hanafi ho.
- Nateeja: har namaz ki ginti (Fajr, Zuhr, Asr, Maghrib, Isha, Witr), kul namazein, aur "roz 1 din ki qaza se ~X mein". Pehli dafa **"Tracker shuru karein"**; baad mein **"Mojooda mein jor dein"** ya **"Naya hisaab set karein"** (baaqi = naya hisaab, ada ki hui mehfooz).

**Khud likhein:** har namaz ki *baaqi* ginti khud likh dein (`total = ada + baaqi`). Yahin "Qaza tracker band karein" bhi hai (record nahi mitta).

**Tracker:**
- Progress ring (ada / kul), baaqi, aaj, is hafte, roz ki ausat.
- Har namaz ki row: baaqi, ada, aur **"+1 Padh li"** (baaqi 0 ho to "✓ Mukammal"). **↶ Undo** aakhri 30 entries tak wapas le sakta hai (reload ke baad bhi).
- Andaazan muddat: "Is raftar se ~X mein mukammal, InshaAllah". Raftar = pichle din (tracking shuru hone se, zyada se zyada 14 din) ki ausat. Raftar 0 ho to hadaf (ya 1 din = 5/6) ke hisaab se. Hadaf zyada ho to doosri line "Roz ke hadaf se ~Y".
- **Roz ka hadaf:** Koi nahi / 1 / 3 / 1 din (5 ya 6) / 2 din. Bar aur "Aaj ka hadaf x/y"; poora hone par narm toast.
- Saari qaza poori hone par celebration modal.
- Hadith: "Allah ko sab se pyara amal wo hai jo hamesha kiya jaaye, chahe thoda ho" (Bukhari 6464, Muslim 783).

**Chhooti namazon ka link (khud se kabhi add nahi hota):** pichle 14 din mein jin dinon app khuli thi (days record hai) aur koi namaz tick nahi hui, un ki ginti card mein dikhti hai: **"Chhooti namazein qaza mein daalein"**. Modal mein har din ki namazein chips mein hain; jo padh li thi us par tap kar ke hata dein. "Qaza mein daalein" ya "Nahi, padh li thi" — dono ke baad `chk` = kal, is liye wahi din dobara nahi poochhe jaate. Witr on ho to Isha ke saath Witr bhi judti hai.

**Fiqh note (sheet ke neeche):** Qaza kisi bhi waqt padh sakte hain siwaye makrooh auqaat ke — Tulu, Zawal, Ghuroob — saath mein aaj ke andaazan auqaat (Tulu se 20 min, Zuhr se ~10 min pehle, Maghrib se 20 min pehle). *"Qaza ka tareeqa aur tadaad ke liye kisi alim se tasdeeq karein."*

**Points:** har qaza 5, din mein zyada se zyada 10 qaza (50 points). `days[date].qz` se dobara compute hote hain. Qaza wala din Deen streak mein bhi "amal" gina jaata hai.

**Privacy:** qaza ka data family share code mein **kabhi shamil nahi** hota. JSON backup/restore mein shamil hai. "Is profile ka data mitayein" qaza bhi mita deta hai.

## 4b. Zabaanein (i18n)
**Dastiyab zabaanein:** `ru` Roman Urdu (default), `en` English, `ur` اردو (Noto Nastaliq Urdu, RTL), `hi` हिन्दी (Noto Sans Devanagari), `ar` العربية (Noto Sans Arabic, RTL), `bn` বাংলা (Noto Sans Bengali), `id` Bahasa Indonesia.

**Kya translate hota hai:** saari UI strings (tabs, buttons, toasts, confirm dialogs, notifications, share/hausla paigham, onboarding, qaza ke saare texts) aur content ke **maani**: azkaar aur duaon ke unwan aur matlab, 34 sunnatein, 35 ayat ka mafhoom aur amal, 30 neki ideas, Jumma checklist, levels aur program ke marhalay. **Arabic matn aur references (Bukhari, Muslim, Quran 2:255 waghaira) kabhi nahi badalte.**

**Transliteration policy:** Latin script wali zabaanon (ru, en, id) mein Roman transliteration dikhti hai. `ur` aur `ar` mein transliteration chhupa di jaati hai (log seedha Arabic matn parhte hain). `hi` aur `bn` mein Roman transliteration hi rakhi gayi hai, kyunke Arabic ka Devanagari/Bengali mein automatic transliteration qabil-e-aitmaad nahi.

**Structure:**
```
_build/
├── app.js               # app ka JS; placeholders /*DATA*/ /*I18N*/ /*CONTENT*/
├── template_head.html   # HTML + CSS (i18n fonts aur RTL rules samait)
├── data.json            # asal content (Roman Urdu + Arabic + references)
├── i18n/<code>.json     # {"ui":{key:text}, "content":{id:...}}
└── build.py             # sab jor kar ../index.html likhta hai
```
- `I18N[lang]` = UI strings. `t(key, vars)` `{n}` jaise placeholders bharta hai. Agar `vars.n` "1" ho aur `key_1` mojood ho to wahi (English plural, misaal "1 day"). Key na mile to **fallback: Roman Urdu → English → key khud**, aur key `MISS[lang]` (global Set) mein darj ho jaati hai (tests isi ko check karte hain).
- `CONTENT[lang]` = content ka tarjuma. IDs: `az.<key>` / `du.<key>` → `{t: unwan, m: matlab}`, `su.<index>` → string, `ay.<index>` → `{m: mafhoom, a: amal}`, `nk.<index>` → string. `cx(id, field, asal)` `ru` par asal Roman Urdu wapas deta hai; tarjuma na ho to asal aur `MISS` mein `content:<id>.<field>`.
- Neki Jar mein ideas Roman Urdu text ke taur par save hote hain (purane data ke saath compatible); dikhate waqt `deedText()` unhein mojooda zabaan mein badal deta hai. User ka apna likha text translate nahi hota.
- `LANGS` (app.js ke shuru mein): `n` (apne script mein naam), `loc` (Intl locale: tareekh, hafte ke din, numbers), `tloc` (waqt ka locale, optional), `hloc` (Hijri ka locale, optional), `hera` (Hijri era label agar ICU ka sahi na ho, misaal hi/bn), `dir` (`ltr`/`rtl`), `html` (html lang attribute), `font` (Google Fonts family query, optional), `tr` (1 = transliteration dikhayein).
- `applyLang()` `<html lang dir data-l>`, document title, nav labels aur aria-labels set karta hai, aur zaroorat par font ka `<link>` lazy load karta hai. `setLang()` save karta hai, render + khula sheet dobara render karta hai.
- **Tareekh/numbers:** `Intl` se mojooda locale mein. Gregorian `loc-u-ca-gregory`, Hijri `islamic-umalqura` (era ke baghair + `hera`). Arabic/Bengali/Hindi apne locale ke mutabiq format hote hain (Bengali mein Bengali hindse). RTL mein waqt (misaal "7:20 PM") bidi-isolate (U+2068/2069) kiya jaata hai taake ulta na dikhe.
- **RTL (ur, ar):** `dir=rtl` se layout khud mirror hota hai (bottom nav ulti tarteeb, cards, chips). Back button ka arrow `scaleX(-1)`; progress rings `rotate(-90deg) scaleY(-1)` (ghadi ki ulti simt mein bharti hain); bar gradient 270deg; letter-spacing 0 (Arabic script ke huroof jude rahein); `‹ ›` chevrons Unicode bidi-mirrored hain is liye CSS se flip nahi kiye. Urdu Nastaliq ke liye font-size aur line-height (2.05) zyada rakhe gaye hain.
- **Fonts:** Google Fonts se, system fallback ke saath. Service worker unhein runtime cache kar leta hai, is liye pehli dafa online hona zaroori hai; uske baad offline chalte hain.

**Nayi zabaan kaise add karein:**
1. `_build/i18n/ru.json` ko copy kar ke `_build/i18n/<code>.json` banayein aur `ui` ki saari values translate karein (keys aur `{placeholders}` waisi hi rahein). `content` ke liye `en.json` ka `content` hissa copy kar ke translate karein (IDs na badlein).
2. `app.js` ke `LANGS` mein entry daalein, misaal `tr:{n:'Türkçe',loc:'tr-TR',dir:'ltr',html:'tr',tr:1}`. Non-Latin script ho to `font` aur `template_head.html` mein `[data-l=xx]` ka font rule bhi.
3. `cd _build && python3 build.py` (har zabaan ki ui/content ginti print hoti hai).
4. `python3 _tests/test_i18n.py` mein `LANGS` list mein code daal kar chalayein; "no missing keys" pass hona chahiye.
5. `sw.js` ka cache version badhayein (misaal `deen-safar-v4`) taake purane installs nayi `index.html` lein.

## 4c. Bachon ka mode (Kids mode)
**Kaise shuru ho:** Ghar tab → "+ Naya fard" (ya kisi fard ke ✎ par) → "🧒 Ye bacha hai" tick karein aur paidaish ka saal chunein (3 se 13 saal). Umar ke hisaab se khud do tajurbe bante hain:
- **4–7 saal (band `s`):** tasveeron wala, bade tiles aur buttons, kam parhna. 8 aasaan sunnatein emoji tiles par (Bismillah, seedha haath, salaam, muskurahat, Ammi Abbu ki madad, Alhamdulillah, share karna, safai), "Aaj namaz mein shamil hua" (din mein 5 dafa tak), Kalima Tayyiba, 7 chhoti duain (dohrao: 3 dafa), 5 bohat chhoti kahaniyan (quiz nahi). Har tile par 🔊 (agar device par is zabaan ki awaaz ho).
- **8–12 saal (band `b`):** zyada parhna. 5 namazon ka tracker, roz ka challenge (12 mein se ek, +2 ⭐), 8 ache kaam reference ke saath, 9 duain (dohrao: 5 dafa), 6 lambi kahaniyan aur har ek ke baad 3 sawalon ka quiz.

**Bache ki apni nav:** Aaj 🏠 · Duain 📿 · Kahaniyan 📖 · Mera Bagh 🌳. Header mein gear ki jagah 🔒: bado ka mode kholne ke liye tasdeeq, ya agar Settings mein PIN set ho to PIN (4–6 hindse). Ye halka taala hai, security nahi.

**Inaam (sab narm, kabhi sharminda nahi):**
- ⭐ sitare: har acha kaam/namaz 1, challenge 2, kahani 1, quiz ke pehli koshish mein sahi jawab 1-1 (best score), dua yaad 3, Kalima 3, parent ki "Shabash" +1.
- **Mera Bagh:** beej 🌰 → konpal 🌱 → paudha 🌿 → 🪴 → darakht 🌳 → phal wala → hara bhara baagh (0/10/30/60/100/160/250 ⭐).
- **Stickers:** har 5 ⭐ par ek naya (25 stickers, sirf janwar/qudrat/cheezein). Mile hue sticker kabhi wapas nahi jaate.
- **Tamghe:** pehla sitara, 7 din ka safar, 3 duain, Kalima, 5 kahaniyan, ek din mein saare kaam, namaz ka sitara, quiz champion (sirf 8–12).
- Naya tamgha/sticker/inaam par confetti aur celebration (reduced-motion par confetti band). Ghalat quiz jawab par sirf "Koi baat nahi! Ek aur dafa socho 🙂".
- **Duain:** card flip (aage Arabic, peeche aasaan matlab + transliteration jahan policy ho + reference), dohrao counter, phir "Yaad ho gaya ✓".

**Kahaniyan** (koi nabi/sahabi ki tasveer nahi — sirf qudrati emoji): 4–7: Nuh (AS) ki kashti (Hud 11:37-44), Yunus (AS) (Al-Anbiya 21:87-88), Sulaiman (AS) aur cheenti (An-Naml 27:17-19), pyasa kutta (Bukhari 2363, Muslim 2244), rota hua oont (Abu Dawud 2549). 8–12: Ibrahim (AS) aur aag (Al-Anbiya 21:51-70), Yusuf (AS) ki maafi (Yusuf 12:92), Musa (AS) aur samandar (Ash-Shu'ara 26:52-67), Bilal (RA) "Ahad Ahad" (Ibn Majah 150, Abu Dawud 499), Ansari mezbaan aur bujha chiragh (Bukhari 3798, Muslim 2054, Al-Hashr 59:9), Ka'b (RA) ka sach (Bukhari 4418, Muslim 2769). Kamzor riwayat jaan boojh kar shamil nahi ki gayi (misaal: ghaar ki makdi). Ache kaamon ke references: Bukhari 5376, Muslim 54, Tirmidhi 1956, Al-Isra 17:23-24, Muslim 2734, Bukhari 13, Muslim 223, Bukhari 5027, Bukhari 6094, Bukhari 2989, Muslim 2024/2028. **Kisi alim se tasdeeq karein.**

**Parent view (bade ki profile, Ghar tab):** har bache ka card: ⭐ kul, aaj, streak, kitne kaam "shabash" ke muntazir. "Hisaab" sheet: aaj ke kaam par "Shabash +⭐" (approve), namaz, pichle 7 din ke ⭐, duain/kahaniyan/tamghe/stickers, **inaam ka hadaf** (10/20/30/50 naye ⭐ + inaam ka naam; poora hone par bache ko 🎁 celebration, parent "Inaam de diya ✓" dabaye to tareekh ke saath "Pichle inaam" mein). Abu Dawud 495 ka note: pyar se sikhayein.

**Awaaz:** Web Speech API (`speechSynthesis`). 🔊 sirf tab dikhta hai jab mojooda zabaan ki voice device par ho (Roman Urdu ke liye en-IN/English voice; Arabic matn ke liye Arabic voice). Mera Bagh mein "Awaaz" on/off (`set.ksnd`).

**Code:** `_build/kids.js` (build par `app.js` ke `/*KIDS*/` par jud jaata hai), strings `_build/i18n/kids/<code>.json` (`k.*` keys, ~236 har zabaan; build inhein `ui` mein mila deta hai). Kahani ki lines `|` se alag, quiz options `|` se alag (tarteeb tamaam zabaanon mein ek jaisi; sahi jawab ka index `KST` mein, dikhate waqt options ghumaye jaate hain). Nayi kahani: `KST` mein `[emoji, ref, sahi-index-array]` aur `KBAND.<band>.stories` mein id, phir har zabaan mein `k.s.<id>.t/.b/.m/.q1/.q1o…`.

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
- **Points:** namaz 10 har ek, sunnat 10, subah azkaar 15, shaam azkaar 15, neki 5 (din mein max 5), muhasaba 10, istighfar 3 har 33 par (din mein max 30), amal 10, Jumma ka har item 5, qaza 5 har ek (din mein max 50), aur marhala poora hone par +50.
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
     qaza:{ on:1|0, total:{f,z,a,m,i,w}, goal:<roz>, witr:bool, since:<ms>,
            last:[["YYYY-MM-DD","f"],…], chk:"YYYY-MM-DD"|null }|undefined,  // optional, purane data mein nahi hota
     habits:[{id,name,start:<ms>,best,slips}],
     kid:{ by:<paidaish ka saal>, mem:{<duaKey>:"YYYY-MM-DD"}, kal:"YYYY-MM-DD"|undefined,
           st:{<storyId>:"YYYY-MM-DD"}, qz:{<storyId>:{s:<0-3>,d}}, bd:{<badge>:"YYYY-MM-DD"}, stk:<stickers>,
           goal:{n,r,base,set,hit}|null, rew:[{r,n,d}] }|undefined,   // sirf bache ki profile; kidPrev = "bacha" untick karne par mehfooz data
     days:{ "YYYY-MM-DD":{
        n:{f,z,a,m,i},          // 1/0 namaz
        su:1,                   // sunnat done
        sm:1,                   // stage-7 sunnat-e-muakkadah
        az:{S:{<zikrKey>:count}, E:{...}, Sd:1, Ed:1},
        deeds:["…"], mu:{a,b,c}, ist:<n>, amal:1,
        jm:{ghusl,kapre,kahf,durood,jaldi,dua,dc:<durood count>},
        qz:{f,z,a,m,i,w},       // us din ada ki gayi qaza ki ginti
        k:{ d:{<deed>:1}, ap:{<deed>:1}, n:{f,z,a,m,i}, j:<0-5>, ch:1, dr:{<duaKey>:<dohraya>} }  // sirf bache ki profile
     } } } },
  adult:"<profileId>",       // kids mode se nikalne par is profile par wapas
  remote:{ "<lowercased name>":{v,n,e,s,ds,w:[7],l,u} },   // imported share codes (kids data kabhi share code mein nahi)
  set:{ lat,lng,city, method:"karachi|mwl|isna|egypt|makkah", asr:"hanafi|shafi",
        lang:"ru|en|ur|hi|ar|bn|id",   // optional; na ho to "ru"
        kpin:"1234"|undefined, ksnd:false|undefined,   // kids mode ka PIN aur awaaz
        rem:{on, s:"HH:MM", e:"HH:MM", nz} } }
```
Qaza: `ada[k]` = saare `days[*].qz[k]` ka jor; `baaqi[k] = max(0, total[k] − ada[k])`. Witr sirf `witr:true` par gini jaati hai. `qaza` key na ho to tracker "shuru nahi" maana jaata hai (backward compatible).

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
├── index.html              # poori app (HTML + CSS + JS + data + 7 zabaanein inline), build.py se banti hai. Akeli bhi chal jaati hai
├── sw.js                   # offline cache (version: deen-safar-v4) (app shell cache-first + fonts runtime cache), notification click
├── manifest.webmanifest    # PWA install (naam, rang, icons)
├── icon-192.png, icon-512.png
├── shot.png                # test screenshot (home)
├── DEEN_SAFAR_DETAILS.md   # ye file
├── _tests/test_qaza.py     # Playwright test (qaza + purane features); deploy zaroori nahi
├── _tests/test_i18n.py     # Playwright test (7 zabaanein, RTL, missing keys)
├── _tests/test_kids.py     # Playwright test (kids mode, dono umar ke band, 7 zabaanein)
└── _build/                 # sirf development ke liye; deploy karna zaroori nahi
    ├── app.js              # app ka JS source (/*DATA*/ /*I18N*/ /*CONTENT*/ placeholders)
    ├── template_head.html  # HTML + CSS
    ├── data.json           # duas, azkaar, sunnat, ayat, neki ka asal content (Roman Urdu + Arabic)
    ├── kids.js             # Bachon ka mode (app.js ke /*KIDS*/ par judta hai)
    ├── i18n/*.json         # ru, en, ur, hi, ar, bn, id
    ├── i18n/kids/*.json    # kids mode ki strings (k.*), har zabaan
    └── build.py            # template + app.js + kids.js + data.json + i18n → ../index.html
```
**Code ya content badalna ho to:** `_build/` mein file edit karein (`index.html` seedha nahi), phir `cd _build && python3 build.py`. Content (maani) badlein to har `i18n/<code>.json` ka `content` bhi update karein.

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

### Qaza feature test (18-Oct-2026, Playwright 1.64, Chromium headless, 400×860, Asia/Karachi, clock 8:00 PM PKT)
**35/35 pass, JS/console errors: koi nahi.** Onboarding, namaz toggle 2/5, paanchon tabs; Hisaab muddat (1 saal 2 mahine 5 din = 430 din, Witr ke saath 2,580) aur tareekhein (365 din); tracker shuru; +1 ×4, Undo; points 35 (2 namaz + 3 qaza) aur 50 ki cap; hadaf 6; reload ke baad sab mehfooz; Home line sirf tracker shuru hone par; backup JSON mein qaza; share code mein qaza nahi; chhooti namazon ka prompt (ek chip hata kar 4 shamil, prompt ghaaib); "Khud likhein" (Fajr 100); doosre profile mein qaza nahi; backup restore; purana data (bina qaza key) chalta hai; service worker register. Screenshots `_shots/` mein (light aur dark).

### Zabaanon ka test (18-Oct-2026, Playwright 1.64, Chromium headless, 400×860, Asia/Karachi, clock Friday 16-Oct 8:00 PM PKT)
**161/161 pass.** Har zabaan (ru, en, ur, hi, ar, bn, id) ke liye: onboarding par zabaan chuni (naam mehfooz raha), `set.lang` save; Home par Jumma card; paanchon tabs; shaam ke azkaar runner; dua expand; Safar ke chaaron sheets (ayat, neki, muhasaba, aadat); naya fard modal; Qaza sheet (hisaab, tracker +1, khud likhein); Settings mein picker aur khule sheet mein foran zabaan badalna; backup JSON mein `set.lang`; `dir` (ur/ar mein rtl), bottom nav ki mirrored tarteeb, koi horizontal overflow nahi; reload ke baad zabaan mehfooz; **missing keys: 0**; **console/JS errors: 0**. Qaza regression test bhi dobara 35/35 pass. Screenshots `_shots/lang/<code>-home.png`, `-ibadat.png`, `-qaza.png`.

### Kids mode test (18-Oct-2026, Playwright 1.64, Chromium headless, 400×860, Asia/Karachi, clock Friday 16-Oct 6:00 PM PKT)
`python3 _tests/test_kids.py` — har zabaan (ru, en, ur, hi, ar, bn, id) mein: do bache (2021 → 4–7, 2016 → 8–12) Ghar tab se; kids mode khulta hai (alag nav, 🔒); 4–7: 3 tiles + 2× namaz + Kalima = 8 ⭐, tamghe "pehla sitara" + "Kalima"; dua card flip, 3× dohrao, yaad (+3); 5 kahaniyan, parhne par +1, quiz nahi; 2 stickers. Bina PIN tasdeeq se bahar; Settings mein ghalat PIN ("12a") radd, "1234" save. 8–12: 2 namaz + challenge + 2 kaam = 6 ⭐; 6 kahaniyan; quiz mein pehle ghalat jawab par narm hint, score 2/3 (+2); 9 duain; reload ke baad kids mode aur zabaan baqi; ur/ar mein RTL aur kid nav mirrored; horizontal overflow nahi; ghalat PIN par kids mode mein hi, sahi PIN se bahar; parent view mein 2 pending, "Shabash" +1, inaam hadaf 10; akele bade ko bacha banana mana; backup mein kid data; share codes mein kid data nahi; missing keys 0; console errors 0. Screenshots `_shots/kids/` (dono band, light/dark, Urdu aur English).

## 12. Maloom hudood (Known limitations)
- Reminders sirf tab aate hain jab app khuli ho ya background mein ho. Asli push ke liye server chahiye.
- Family circle ek device par hai. Door walon ke saath data **khud se sync nahi hota**: share code dobara bhej kar card update karna padta hai.
- Namaz ke auqaat calculate kiye hue hain, is liye 1–3 minute ka farq ho sakta hai. Device ka timezone istemal hota hai, is liye kisi aur mulk ki location dein to waqt device ke timezone mein dikhega. Bohat oonche latitudes (>48°) ke liye koi khaas adjustment nahi hai.
- Hijri date browser ke `islamic-umalqura` calendar se aati hai. Ye Pakistan ki ru'yat se 1 din aage ya peeche ho sakti hai.
- Ayat ka Roman Urdu matlab mukhtasar mafhoom hai, lafzi tarjuma nahi. Duaon ke references mashhoor kutub se hain. **Kisi alim se tasdeeq zaroori hai.**
- Browser ka data mitaane ya private mode mein data chala jaata hai. Is liye Settings se backup lete rahein.
- Audio tilawat ya azkaar ki audio nahi hai, taake app offline aur halki rahe.
- Qaza ka hisaab sirf andaaza hai (saal = 365, mahina = 30 din). Makrooh auqaat ki muddat bhi andaazan hai. Undo sirf aakhri 30 entries tak hai.
- Chhooti namazon ka prompt sirf pichle 14 din aur un dinon ko dekhta hai jin mein app khuli thi; Witr ke liye alag tick nahi hai.
- Tarjume (khaas taur par duaon/ayat ke maani) mashini madad se likhe gaye hain, kisi ahl-e-zabaan aur alim se nazar-e-saani karwana behtar hai. Ayat ke maani mukhtasar mafhoom hain, lafzi tarjuma nahi.
- Hindi aur Bengali mein transliteration Roman hi hai (Devanagari/Bengali mein nahi). Surah ke naam aur references Latin mein rehte hain. Hisaab ke tareeqon (Karachi, MWL, ISNA...) ke naam English mein hain.
- Hindi ka Hijri mahina ICU se aata hai ("जुम्डा प्रथम"), jo bilkul darust talaffuz nahi.
- Fonts pehli dafa online hone par load hote hain; offline aur pehle se cache na hon to system font istemal hota hai.
- User ka likha text (naam, neki, muhasaba, aadat, inaam ka naam) translate nahi hota.
- Kids mode: awaaz sirf us device par jahan us zabaan ki speech voice install ho (aksar Urdu/Bengali voice nahi hoti; tab 🔊 chhupa rehta hai). PIN localStorage mein saada likha hota hai — sirf halka taala. Bache ki umar sirf saal se (mahine nahi); 13+ wala bhi 8–12 tajurbe mein. Kahaniyon ke tarjume bhi mashini madad se hain — ahl-e-zabaan aur alim se nazar-e-saani behtar. Bache ki profile ke liye namaz/azkaar ki notifications alag nahi.

## 13. Aage ke ideas
- Azkaar ki audio, Hisn-ul-Muslim ke offline MP3 ke saath (optional download).
- Firebase ya Supabase se asli family sync aur push notifications.
- Ramadan mode: roza, taraweeh aur Quran khatam tracker.
- Quran tilawat ka roz ka hadaf (safhe ya juz).
- Haftawar "Safar report" image jo share ki ja sake.
- Kids mode ke liye audio recordings (Quran/duaon ki asli tilawat) aur mazeed kahaniyan.
- Widget ya home-screen shortcut (Android TWA wrapper).
