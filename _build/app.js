"use strict";
const D=/*DATA*/;
const I18N=/*I18N*/;
const CONTENT=/*CONTENT*/;
// ---------- i18n ----------
// LANGS: n = apne script mein naam, loc = Intl locale, tloc = waqt ka locale (optional), dir, font = Google Fonts family (optional), tr = transliteration dikhayein?, hloc = Hijri ka locale (optional), hera = Hijri era ka label agar ICU ka theek na ho (optional)
const LANGS={
 ru:{n:'Roman Urdu',loc:'en-GB',tloc:'en-US',hloc:'en',dir:'ltr',html:'ur-Latn',tr:1},
 en:{n:'English',loc:'en-GB',tloc:'en-US',hloc:'en',dir:'ltr',html:'en',tr:1},
 ur:{n:'اردو',loc:'ur-PK',dir:'rtl',html:'ur',font:'Noto+Nastaliq+Urdu:wght@400;700',tr:0},
 hi:{n:'हिन्दी',loc:'hi-IN',hera:'हिजरी',dir:'ltr',html:'hi',font:'Noto+Sans+Devanagari:wght@400;600;700',tr:1},
 ar:{n:'العربية',loc:'ar',dir:'rtl',html:'ar',font:'Noto+Sans+Arabic:wght@400;600;700',tr:0},
 bn:{n:'বাংলা',loc:'bn-BD',hera:'হিজরি',dir:'ltr',html:'bn',font:'Noto+Sans+Bengali:wght@400;600;700',tr:1},
 id:{n:'Bahasa Indonesia',loc:'id-ID',dir:'ltr',html:'id',tr:1}};
let L='ru';const MISS={};
const miss=k=>{(MISS[L]=MISS[L]||new Set()).add(k)};
function t(k,v){const d=I18N[L]||{};let s=v&&String(v.n)==='1'&&d[k+'_1']!=null?d[k+'_1']:d[k];
  if(s==null){miss(k);s=I18N.ru[k]!=null?I18N.ru[k]:I18N.en[k]!=null?I18N.en[k]:k}
  if(v)s=s.replace(/\{(\w+)\}/g,(m,x)=>v[x]!=null?v[x]:m);return s}
// content: Roman Urdu asal (D) hai; doosri zabaanon ka tarjuma CONTENT[lang][id] mein
function cx(id,f,orig){if(L==='ru')return orig;const o=(CONTENT[L]||{})[id];let v=o==null?null:typeof o==='string'?o:o[f];
  if(v==null){miss('content:'+id+(f?'.'+f:''));const e=(CONTENT.en||{})[id];v=orig!=null?orig:(e==null?'':typeof e==='string'?e:e[f])}return v}
const LG=()=>LANGS[L];
const N=n=>{try{return new Intl.NumberFormat(LG().loc,{maximumFractionDigits:1}).format(n)}catch(e){return String(n)}};
const fr=(a,b)=>N(a)+'/'+N(b);
const nzN=k=>t('nz.'+k);
let fontsDone={};
function applyLang(){L=LANGS[S&&S.set&&S.set.lang]?S.set.lang:'ru';const g=LG(),h=document.documentElement;
  h.lang=g.html;h.dir=g.dir;h.dataset.l=L;document.title=t('app.name');
  if(g.font&&!fontsDone[L]){fontsDone[L]=1;const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+g.font+'&display=swap';document.head.appendChild(l)}
  document.querySelectorAll('#nav .tab').forEach(b=>{b.querySelector('span').textContent=t('tab.'+b.dataset.a)});
  document.querySelectorAll('#knav .tab').forEach(b=>{b.querySelector('.kl').textContent=t('k.tab.'+b.dataset.a)});
  $('#hSet').setAttribute('aria-label',t('set.title'));$('#hLock').setAttribute('aria-label',t('k.lock'));$('#shBack').setAttribute('aria-label',t('u.back'))}
const langPicker=()=>`<div class="row" style="flex-wrap:wrap;gap:0">${Object.entries(LANGS).map(([k,v])=>`<button class="chip ${k===L?'on':''}" data-act="lang" data-a="${k}" lang="${v.html}">${esc(v.n)}</button>`).join('')}</div>`;

const NZ=[['f','🌄'],['z','☀️'],['a','🌤️'],['m','🌇'],['i','🌙']];
const KEY='deenSafar.v1', FKEY='deenSafar.fired';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const dk=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const dayNo=(d=new Date())=>Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5);
const uid=()=>Math.random().toString(36).slice(2,9);
const WD=['Itw','Pir','Man','Bud','Jmt','Jum','Haf'];
const wd=d=>L==='ru'?WD[d.getDay()]:d.toLocaleDateString(LG().loc+'-u-ca-gregory',{weekday:'short'});
const EMO=['🌙','⭐','🌿','🌸','🕊️','🌻','🍃','💎','🌊','🔥'];

// ---------- state ----------
function fresh(name){return{name:name||'Main',emo:'🌙',days:{},habits:[],prog:null,bonus:0}}
let S;
function load(){
  try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
  if(!S||!S.profiles){const id=uid();S={v:1,profiles:{[id]:fresh('')},active:id,remote:{},onb:false,set:{lat:24.8607,lng:67.0011,city:'Karachi',method:'karachi',asr:'hanafi',lang:'ru',rem:{on:false,s:'07:00',e:'17:30',nz:false}}}}
  S.set=S.set||{};S.set.rem=S.set.rem||{on:false,s:'07:00',e:'17:30',nz:false};S.remote=S.remote||{};if(!LANGS[S.set.lang])S.set.lang='ru';
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast(t('ts.storageFull'))}}
const P=()=>S.profiles[S.active];
function day(k=dk(),p=P()){return p.days[k]||(p.days[k]={n:{}})}
const peek=(k,p=P())=>p.days[k]||{n:{}};

// ---------- scoring ----------
// qaza: log per din days[k].qz={f,z,a,m,i,w}; profile.qaza={on,total:{..},goal,witr,since,last:[[date,key]],chk}
const QK=[['f','🌄'],['z','☀️'],['a','🌤️'],['m','🌇'],['i','🌙'],['w','✨']];
const QZP=5,QZCAP=10;
const qzOf=d=>d&&d.qz?QK.reduce((a,[k])=>a+(+d.qz[k]||0),0):0;
function dayPts(d){if(!d)return 0;let p=0;
  p+=Object.values(d.n||{}).filter(Boolean).length*10;
  if(d.su)p+=10; if(d.az&&d.az.Sd)p+=15; if(d.az&&d.az.Ed)p+=15;
  p+=Math.min((d.deeds||[]).length,5)*5; if(d.mu&&(d.mu.a||d.mu.b||d.mu.c))p+=10;
  p+=Math.min(Math.floor((d.ist||0)/33)*3,30); if(d.amal)p+=10;
  if(d.jm)p+=Object.entries(d.jm).filter(([k,v])=>k!=='dc'&&v).length*5;
  p+=Math.min(qzOf(d),QZCAP)*QZP;
  return p}
function points(p=P()){return Object.values(p.days).reduce((a,d)=>a+dayPts(d),0)+(p.bonus||0)}
const LV=[0,100,300,600,1000,1600,2400,3400,4600,6000];
function level(pts){let i=0;while(i<LV.length-1&&pts>=LV[i+1])i++;const nx=LV[i+1];return{n:i+1,name:t('lv.'+i),pct:nx?(pts-LV[i])/(nx-LV[i])*100:100,next:nx||null}}
const nzCount=d=>NZ.filter(([k])=>d&&d.n&&d.n[k]).length;
const active=d=>d&&(nzCount(d)||d.su||(d.az&&(d.az.Sd||d.az.Ed))||(d.deeds||[]).length||d.amal||d.ist||qzOf(d)||(d.mu&&(d.mu.a||d.mu.b||d.mu.c)));
function streak(test,p=P()){let n=0,d=new Date();if(!test(p.days[dk(d)]))d=addD(d,-1);while(test(p.days[dk(d)])){n++;d=addD(d,-1)}return n}
const deenStreak=p=>streak(active,p), nzStreak=p=>streak(d=>nzCount(d)===5,p), suStreak=p=>streak(d=>d&&d.su,p);

// ---------- prayer times (PrayTimes-style astronomical calc) ----------
const METHODS={karachi:{n:'University of Islamic Sciences, Karachi',f:18,i:18},mwl:{n:'Muslim World League',f:18,i:17},isna:{n:'ISNA (N. America)',f:15,i:15},egypt:{n:'Egyptian Authority',f:19.5,i:17.5},makkah:{n:'Umm al-Qura, Makkah',f:18.5,im:90}};
const rad=x=>x*Math.PI/180,deg=x=>x*180/Math.PI,fix=(a,b)=>{a=a-b*Math.floor(a/b);return a<0?a+b:a};
function sunPos(jd){const D=jd-2451545,g=fix(357.529+.98560028*D,360),q=fix(280.459+.98564736*D,360),L=fix(q+1.915*Math.sin(rad(g))+.02*Math.sin(rad(2*g)),360),e=23.439-.00000036*D;
  const RA=fix(deg(Math.atan2(Math.cos(rad(e))*Math.sin(rad(L)),Math.cos(rad(L))))/15,24);return{dec:deg(Math.asin(Math.sin(rad(e))*Math.sin(rad(L)))),eqt:q/15-RA}}
function prayerTimes(date=new Date()){
  const {lat,lng,method,asr}=S.set,m=METHODS[method]||METHODS.karachi;
  const y=date.getFullYear(),mo=date.getMonth()+1,dd=date.getDate();
  let Y=y,M=mo;if(M<=2){Y--;M+=12}const A=Math.floor(Y/100),B=2-A+Math.floor(A/4);
  const jd=Math.floor(365.25*(Y+4716))+Math.floor(30.6001*(M+1))+dd+B-1524.5-lng/(15*24);
  const tz=-new Date(y,mo-1,dd,12).getTimezoneOffset()/60;
  const at=t=>sunPos(jd+t/24);
  const noon=t=>fix(12-at(t).eqt,24);
  const ang=(a,t,ccw)=>{const s=at(t),T=deg(Math.acos((-Math.sin(rad(a))-Math.sin(rad(s.dec))*Math.sin(rad(lat)))/(Math.cos(rad(s.dec))*Math.cos(rad(lat)))))/15;return noon(t)+(ccw?-T:T)};
  const asrA=(f,t)=>{const s=at(t);return -deg(Math.atan(1/(f+Math.tan(rad(Math.abs(lat-s.dec))))))};
  let t={f:5,s:6,z:12,a:13,m:18,i:18};
  for(let k=0;k<2;k++){t={f:ang(m.f,t.f,1),s:ang(.833,t.s,1),z:noon(t.z),a:ang(asrA(asr==='hanafi'?2:1,t.a),t.a),m:ang(.833,t.m),i:m.im?null:ang(m.i,t.i)}}
  t.z+=1/60; if(m.im)t.i=t.m+m.im/60;
  const out={};for(const k in t){const h=t[k]+tz-lng/15;if(isNaN(h)){out[k]=null;continue}const d=new Date(y,mo-1,dd,0,0,0);d.setMinutes(Math.round(h*60));out[k]=d}
  return out}
// RTL mein waqt ko bidi-isolate karein taake "7:20 PM" ulat kar "PM7:20" na dikhe
const fmtT=d=>{if(!d)return'—';const s=d.toLocaleTimeString(LG().tloc||LG().loc,{hour:'numeric',minute:'2-digit'});return LG().dir==='rtl'?'\u2068'+s+'\u2069':s};
function nextPrayer(){const now=new Date(),t=prayerTimes(now);for(const [k] of NZ){if(t[k]&&t[k]>now)return{k,t:t[k]}}const t2=prayerTimes(addD(now,1));return{k:'f',t:t2.f}}
const dur=ms=>{const m=Math.max(0,Math.round(ms/6e4));return m>=60?t('dur.hm',{h:N(Math.floor(m/60)),m:N(m%60)}):t('dur.m',{m:N(m)})};

// ---------- Benamazi se Namazi program ----------
const STAGES=[{g:['m'],d:7},{g:['m','i'],d:7},{g:['f','m','i'],d:7},{g:['f','a','m','i'],d:7},{g:['f','z','a','m','i'],d:7},{g:['f','z','a','m','i'],d:40},{g:['f','z','a','m','i'],d:30,sm:1}];
const stT=i=>t('st.'+i+'.t'),stTip=i=>t('st.'+i+'.tip');
function progState(p=P()){const g=p.prog;if(!g)return null;const st=STAGES[g.s];if(!st)return{done:true};
  const ok=d=>d&&st.g.every(k=>d.n&&d.n[k])&&(!st.sm||d.sm);let n=0,d=new Date();const start=new Date(g.since);start.setHours(0,0,0,0);
  if(!ok(p.days[dk(d)]))d=addD(d,-1);while(d>=start&&ok(p.days[dk(d)])){n++;d=addD(d,-1)}
  return{st,i:g.s,n,todayOk:ok(p.days[dk()])}}
function progCheck(){const p=P();const ps=progState(p);if(!ps||ps.done)return;if(ps.n>=ps.st.d){p.bonus=(p.bonus||0)+50;p.prog.s++;p.prog.since=Date.now();save();
  const nx=STAGES[p.prog.s];modal(`<div style="text-align:center"><div style="font-size:54px">🎉</div><p class="big">${t('pg.done',{t:esc(stT(ps.i))})}</p><p class="mute">${nx?t('pg.next',{t:esc(stT(p.prog.s))})+'<br>'+esc(stTip(p.prog.s)):t('pg.all')}</p><p class="mute">${t('pg.plus50')}</p><button class="btn full" data-act="mclose">${t('u.alhamdulillah')}</button></div>`)}}

// ---------- UI helpers ----------
let tmo;function toast(s){const el=$('#toast');el.textContent=s;el.classList.add('on');clearTimeout(tmo);tmo=setTimeout(()=>el.classList.remove('on'),2200)}
function modal(h){$('#mB').innerHTML=h;$('#modal').classList.add('on')}
function mclose(){$('#modal').classList.remove('on')}
let sheetFn=null,sheetT=null;
const shTitle=()=>typeof sheetT==='function'?sheetT():sheetT;
function sheet(ti,fn){sheetFn=fn;sheetT=ti;$('#shT').textContent=shTitle();$('#shB').innerHTML=fn();$('#sheet').classList.add('on');$('#sheet').scrollTop=0}
function resheet(){if(sheetFn&&$('#sheet').classList.contains('on')){const y=$('#sheet').scrollTop;$('#shT').textContent=shTitle();$('#shB').innerHTML=sheetFn();$('#sheet').scrollTop=y}}
function closeSheet(){$('#sheet').classList.remove('on');sheetFn=null;runner=null;setTimeout(()=>{if(!sheetFn)$('#shB').innerHTML=''},320);render()}
const ring=(pct,size=48,c='var(--pri)')=>{const r=size/2-3,C=2*Math.PI*r;return`<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-Math.min(1,pct))}"/></svg>`};
const isFri=()=>new Date().getDay()===5;
const NOTE=()=>`<p class="note">${t('note.main')}</p>`;
const trOn=()=>!!LG().tr;

// ---------- content accessors ----------
const azTitle=z=>cx('az.'+z.k,'t',z.t), azMean=z=>cx('az.'+z.k,'m',z.m);
const duaTitle=x=>cx('du.'+x.k,'t',x.t), duaMean=x=>cx('du.'+x.k,'m',x.m);
const suText=i=>cx('su.'+i,null,D.sunnah[i].t);
const ayMean=i=>cx('ay.'+i,'m',D.ayat[i].m), ayAmal=i=>cx('ay.'+i,'a',D.ayat[i].a);
const nkText=i=>cx('nk.'+i,null,D.neki[i]);
const deedText=x=>{const i=D.neki.indexOf(x);return i<0?x:nkText(i)};

// ---------- HOME ----------
function azMode(){const now=new Date(),t=prayerTimes(now),d=day();if(t.z&&now<t.z)return'S';if(t.a&&now>=t.a)return'E';return d.az&&d.az.Sd?'E':'S'}
function azList(m){return D.azkar.filter(z=>!(z.only&&z.only!==m))}
function azProg(m,d=day()){const L=azList(m),a=(d.az&&d.az[m])||{};let done=0;L.forEach(z=>{if((a[z.k]||0)>=z.n)done++});return{done,total:L.length}}
function renderHome(){
  const p=P(),d=day(),pts=points(),lv=level(pts),tm=prayerTimes(),nx=nextPrayer(),ps=progState();
  const si=dayNo()%D.sunnah.length,su=D.sunnah[si],m=azMode(),ap=azProg(m),azDone=d.az&&d.az[m+'d'];
  let h=`<div class="strip">
   <div class="pill"><b>🔥 ${N(deenStreak())}</b><span>${t('home.deenStreak')}</span></div>
   <div class="pill"><b>${N(nzStreak())} <small style="font-size:13px;font-weight:500">${t('u.days')}</small></b><span>${t('home.nzStreak')}</span></div>
   <div class="pill" data-act="go" data-a="safar"><b style="font-size:15px">${t('lv.short',{n:N(lv.n)})}</b><span>${esc(lv.name)}</span><div class="bar"><i style="width:${lv.pct}%"></i></div></div></div>`;
  h+=`<div class="card"><h2>${t('home.todayNz')} <em>${fr(nzCount(d),5)}</em></h2><div class="namaz">`+
   NZ.map(([k,e])=>`<button class="nz ${d.n[k]?'on':''} ${ps&&ps.st&&ps.st.g.includes(k)&&!d.n[k]?'goal':''}" data-act="nz" data-a="${k}" aria-label="${nzN(k)}"><div class="c">${d.n[k]?'✓':e}</div><b>${nzN(k)}</b><span>${fmtT(tm[k])}</span></button>`).join('')+
   `</div><div class="next"><span>${t('home.next')}: <b>${nzN(nx.k)}</b> · ${fmtT(nx.t)}</span><span>${t('home.left',{d:dur(nx.t-new Date())})}</span></div>`+
   (ps&&ps.st?`<div class="next" style="border:0;padding-top:4px;margin-top:4px"><span>🎯 ${esc(stT(ps.i))}</span><span>${t('u.daysFrac',{a:N(ps.n),b:N(ps.st.d)})}</span></div>`:'')+`</div>`;
  h+=qzHome();
  h+=`<div class="card"><h2>${t('home.sunnah')} <em>${suStreak()?'🔥 '+N(suStreak()):''}</em></h2><p class="big">${esc(suText(si))}</p><p class="ref">${esc(su.ref)}</p><div style="margin-top:16px">`+
   (d.su?`<button class="btn done" data-act="su">${t('home.suDone')}</button>`:`<button class="btn" data-act="su">${t('home.suBtn')}</button>`)+`</div></div>`;
  h+=`<div class="card"><h2>${m==='S'?t('az.morningH'):t('az.eveningH')} <em>${fr(ap.done,ap.total)}</em></h2>
   <div class="row"><div class="sp"><p class="big" style="margin:0">${azDone?t('home.azDone'):m==='S'?t('home.azS'):t('home.azE')}</p><p class="mute" style="margin:4px 0 0">${m==='S'?t('home.azSTime'):t('home.azETime')}</p></div>
   <div class="ring" style="width:56px;height:56px">${ring(ap.done/ap.total,56)}<span style="font-size:14px">${N(Math.round(ap.done/ap.total*100))}%</span></div></div>
   <div style="margin-top:16px"><button class="btn ${azDone?'ghost':''}" data-act="az" data-a="${m}">${azDone?t('home.azAgain'):ap.done?t('home.azCont'):t('home.azStart')}</button></div></div>`;
  if(isFri())h+=jummaCard(true);
  h+=NOTE();$('#v-home').innerHTML=h}

// ---------- JUMMA ----------
const JM=[['ghusl','Bukhari 877'],['kapre','Bukhari 883'],['kahf','Hakim, Bayhaqi'],['durood','Abu Dawud 1047'],['jaldi','Bukhari 881, 934'],['dua','Abu Dawud 1048']];
function jummaCard(home){const d=day(),j=d.jm||{},n=JM.filter(([k])=>j[k]).length;
  return`<div class="card gold"><h2>${t('jm.title')} <em>${fr(n,JM.length)}</em></h2>${home?'':(isFri()?'':`<p class="mute" style="margin-top:-6px">${t('jm.homeOnly')}</p>`)}<div>`+
  JM.map(([k,r])=>`<button class="chk ${j[k]?'on':''}" data-act="jm" data-a="${k}" ${!isFri()?'disabled style="opacity:.55"':''}><span class="bx">${j[k]?'✓':''}</span><span class="t">${t('jm.'+k)}<small>${r}${k==='kahf'?' — '+t('jm.kahfNote'):''}</small></span>${k==='durood'?`<span class="tag" data-act="dc">${N(j.dc||0)} +</span>`:''}</button>`).join('')+`</div></div>`}

// ---------- IBADAT ----------
function renderIbadat(){const p=P(),tm=prayerTimes(),ps=progState();let h='';
  if(!p.prog){h+=`<div class="card"><h2>${t('prog.title')}</h2><p class="big">${t('prog.sub')}</p><p class="mute">${t('prog.desc')}</p><div style="margin-top:14px"><button class="btn" data-act="prog">${t('prog.start')}</button></div></div>`}
  else if(ps.done){h+=`<div class="card gold"><h2>${t('prog.title')} <em>${t('prog.doneTag')}</em></h2><p class="big">${t('prog.doneBig')}</p><p class="mute">${t('prog.doneSub')}</p><button class="btn ghost sm" data-act="progreset">${t('prog.again')}</button></div>`}
  else{const g=p.prog;h+=`<div class="card"><h2>${t('prog.title')} <em>${t('prog.stage',{a:N(g.s+1),b:N(7)})}</em></h2><div class="stage">${STAGES.map((s,i)=>`<i class="${i<g.s?'on':i===g.s?'cur':''}"></i>`).join('')}</div>
   <p class="big">${esc(stT(ps.i))}: ${ps.st.g.map(nzN).join(' + ')}${ps.st.sm?' + '+t('prog.sunnatein'):''}</p><p class="mute">${esc(stTip(ps.i))}</p>
   <div class="bar" style="height:8px;margin:14px 0 6px"><i style="width:${ps.n/ps.st.d*100}%"></i></div><p class="mute" style="margin:0">${t('prog.streak',{a:N(ps.n),b:N(ps.st.d)})} ${ps.n===0?'· '+t('prog.zero'):''}</p>
   ${ps.st.sm?`<button class="chk ${day().sm?'on':''}" data-act="sm"><span class="bx">${day().sm?'✓':''}</span><span class="t">${t('prog.smChk')}</span></button>`:''}
   <p class="ref" style="margin-top:12px">⚠️ ${t('prog.warn')}</p>
   <button class="btn ghost sm" data-act="progoff" style="margin-top:6px">${t('prog.off')}</button></div>`}
  h+=qzCard();
  const days=[...Array(7)].map((_,i)=>addD(new Date(),i-6));
  h+=`<div class="card"><h2>${t('ib.last7')} <em>${t('u.fireDays',{n:N(nzStreak())})}</em></h2><div class="grid7"><span></span>${days.map(d=>`<span style="text-align:center;font-size:11px">${wd(d)}</span>`).join('')}`+
   NZ.map(([k])=>`<span>${nzN(k)}</span>`+days.map(d=>`<span class="d ${peek(dk(d)).n[k]?'on':''}"></span>`).join('')).join('')+`</div></div>`;
  const aS=azProg('S'),aE=azProg('E');
  h+=`<div class="card"><h2>${t('ib.azkaar')}</h2><div class="list">
   <button class="li" data-act="az" data-a="S"><span class="e">🌅</span><span class="t">${t('az.morningH')}<br><span class="mute">${t('u.doneFrac',{a:N(aS.done),b:N(aS.total)})}</span></span><span class="chev">›</span></button>
   <button class="li" data-act="az" data-a="E"><span class="e">🌆</span><span class="t">${t('az.eveningH')}<br><span class="mute">${t('u.doneFrac',{a:N(aE.done),b:N(aE.total)})}</span></span><span class="chev">›</span></button></div></div>`;
  h+=jummaCard(false);
  h+=`<div class="card"><h2>${t('ib.times')} <em>${esc(S.set.city||'')}</em></h2><div class="list">`+
   ['f','s','z','a','m','i'].map(k=>`<div class="li" style="padding:10px 0"><span class="t">${nzN(k)}</span><b>${fmtT(tm[k])}</b></div>`).join('')+
   `</div><p class="ref">${t('ib.timesRef',{m:esc(METHODS[S.set.method].n),a:S.set.asr==='hanafi'?t('asr.hanafiShort'):t('asr.shafiShort')})}</p><button class="btn ghost sm" data-act="settings">${t('ib.changeLoc')}</button></div>`;
  h+=NOTE();$('#v-ibadat').innerHTML=h}

// ---------- QAZA ----------
const qzKeys=q=>QK.filter(([k])=>k!=='w'||(q&&q.witr));
function qzDone(p=P()){const o={f:0,z:0,a:0,m:0,i:0,w:0};Object.values(p.days).forEach(d=>{if(d&&d.qz)QK.forEach(([k])=>o[k]+=(+d.qz[k]||0))});return o}
function qzSum(p,n){let s=0;for(let i=0;i<n;i++)s+=qzOf(p.days[dk(addD(new Date(),-i))]);return s}
function qzStats(p=P()){const q=p.qaza;if(!q||!q.on)return null;q.total=q.total||{};const done=qzDone(p),keys=qzKeys(q),rem={};let left=0,Dn=0;
  keys.forEach(([k])=>{rem[k]=Math.max(0,(+q.total[k]||0)-done[k]);left+=rem[k];Dn+=done[k]});
  const span=Math.max(1,Math.min(14,dayNo()-dayNo(new Date(q.since||Date.now()))+1));
  const today=qzOf(p.days[dk()]),week=qzSum(p,7),rate=qzSum(p,span)/span;return{q,done,rem,keys,left,Dn,T:left+Dn,today,week,rate,perDay:keys.length}}
const qzSpan=d=>d<=45?t('qz.days',{n:N(Math.max(1,Math.round(d)))}):d<730?t('qz.months',{n:N(Math.round(d/30.44))}):t('qz.years',{n:N(d<3650?Math.round(d/365*10)/10:Math.round(d/365))});
function qzEta(st){if(!st.left)return'';if(st.rate>0)return t('qz.eta',{s:qzSpan(st.left/st.rate)});
  const g=st.q.goal||st.perDay;return t('qz.etaGoal',{g:N(g),s:qzSpan(st.left/g)})}
function qzMissed(p=P()){const q=p.qaza;if(!q||!q.on)return[];const out=[];
  for(let i=1;i<=14;i++){const k=dk(addD(new Date(),-i));if(q.chk&&k<=q.chk)break;const d=p.days[k];if(!d)continue;
    const ms=NZ.filter(([x])=>!(d.n&&d.n[x])).map(x=>x[0]);if(ms.length)out.push([k,ms])}return out}
const qzMissN=Lx=>Lx.reduce((a,x)=>a+x[1].length,0);
const fmtDay=k=>{const [y,m,d]=k.split('-').map(Number);const x=new Date(y,m-1,d);return wd(x)+', '+x.toLocaleDateString(LG().loc+'-u-ca-gregory',{day:'numeric',month:'short'})};
function qzNote(){const tm=prayerTimes(),o=(k,mn)=>tm[k]?new Date(tm[k].getTime()+mn*6e4):null,r=(a,b)=>a&&b?fmtT(a)+'–'+fmtT(b):'—';
  return`<p class="note">${t('qz.note1')}<br>${t('qz.noteToday',{a:r(tm.s,o('s',20)),b:r(o('z',-11),o('z',-1)),c:r(o('m',-20),tm.m)})}<br>${t('qz.note2')}</p>`}
let qzTab='t',qzForm=null,qzRes=null,qzPick=null;
function qzInit(){const q=P().qaza;qzForm={mode:'d',y:'',mo:'',d:'',from:'',to:dk(),minus:'',witr:q?!!q.witr:S.set.asr==='hanafi',e:null};qzRes=null}
function qzRead(){if(!qzForm)qzInit();const g=id=>{const e=document.getElementById(id);return e?e.value:undefined};
  [['y','qzY'],['mo','qzMo'],['d','qzD'],['from','qzFrom'],['to','qzTo'],['minus','qzMinus']].forEach(([k,id])=>{const v=g(id);if(v!==undefined)qzForm[k]=v});
  if(document.getElementById('qzE_f')){qzForm.e={};QK.forEach(([k])=>{const v=g('qzE_'+k);if(v!==undefined)qzForm.e[k]=v})}}
const qzTodayTag=st=>N(st.today)+(st.q.goal?'/'+N(st.q.goal):'');
function qzCard(){const st=qzStats();
  if(!st)return`<div class="card"><h2>${t('qz.title')}</h2><p class="big">${t('qz.introBig')}</p><p class="mute">${t('qz.introTxt')}</p><div style="margin-top:14px"><button class="btn" data-act="qz" data-a="h">${t('qz.calcBtn')}</button></div></div>`;
  const ms=qzMissed(),pct=st.T?st.Dn/st.T:0;
  return`<div class="card"><h2>${t('qz.title')} <em>${t('qz.todayTag',{n:qzTodayTag(st)})}</em></h2><div class="row"><div class="ring" style="width:64px;height:64px;font-size:13px">${ring(pct,64)}<span>${N(Math.round(pct*100))}%</span></div>
   <div class="sp"><p class="big" style="margin:0">${st.left?t('qz.left',{n:N(st.left)}):t('qz.allDone')}</p><p class="mute" style="margin:2px 0 0">${t('qz.doneN',{n:N(st.Dn)})}${st.left?' · '+esc(qzEta(st)):''}</p></div></div>
   ${ms.length?`<p class="mute" style="margin:14px 0 8px">${t('qz.missedN',{n:N(qzMissN(ms))})}</p><button class="btn ghost sm" data-act="qzMiss">${t('qz.missBtn')}</button>`:''}
   <div style="margin-top:14px"><button class="btn" data-act="qz">${t('qz.open')}</button></div></div>`}
function qzHome(){const st=qzStats();if(!st)return'';
  return`<button class="card qhome" data-act="qz" data-a="t"><span style="font-size:24px">🕰️</span><span class="sp"><b>${t('qz.title')}</b><br><span class="mute">${st.left?t('qz.homeLine',{a:qzTodayTag(st),b:N(st.left)}):t('qz.homeDone')}</span></span><span class="chev">›</span></button>`}
function qzView(){if(!qzForm)qzInit();const st=qzStats();
  let h=`<div class="seg">${[['t','qz.tabT'],['h','qz.tabH'],['e','qz.tabE']].map(([k,n])=>`<button class="${qzTab===k?'on':''}" data-act="qzTab" data-a="${k}">${t(n)}</button>`).join('')}</div>`;
  if(qzTab==='t')h+=st?qzTracker(st):`<div class="card" style="text-align:center"><div style="font-size:44px">🕰️</div><p class="big">${t('qz.emptyBig')}</p><p class="mute">${t('qz.emptyTxt')}</p><button class="btn" data-act="qzTab" data-a="h" style="margin-top:8px">${t('qz.calcBtn')}</button></div>`;
  else if(qzTab==='h')h+=qzCalcView(st);else h+=qzEditView(st);
  return h+qzNote()}
function qzTracker(st){const q=st.q,ms=qzMissed(),pct=st.T?st.Dn/st.T:0,dn=st.perDay;let h='';
  if(ms.length)h+=`<div class="card gold"><h2>${t('qz.missH')} <em>${t('qz.missTag',{n:N(qzMissN(ms))})}</em></h2><p class="mute" style="margin-top:-4px">${t('qz.missTxt')}</p><button class="btn sm" data-act="qzMiss">${t('qz.missBtn')}</button></div>`;
  h+=`<div class="card"><div class="row"><div class="ring" style="width:96px;height:96px;font-size:13px">${ring(pct,96)}<div style="text-align:center"><b style="font-size:20px;display:block;line-height:1.1">${N(Math.round(pct*100))}%</b>${t('qz.ada')}</div></div>
   <div class="sp"><p class="big" style="margin:0;font-size:24px" id="qzLeft">${N(st.left)} <span class="mute" style="font-size:14px;font-weight:500">${t('qz.baaqi')}</span></p><p class="mute" style="margin:2px 0 0">${t('qz.sub',{a:N(st.Dn),b:N(st.T)})}</p></div></div>
   <div class="stat3"><div><b id="qzToday">${N(st.today)}</b><span>${t('qz.stToday')}</span></div><div><b>${N(st.week)}</b><span>${t('qz.stWeek')}</span></div><div><b>${N(Math.round(st.rate*10)/10)}</b><span>${t('qz.stAvg')}</span></div></div>
   ${q.goal?`<div class="bar" style="height:8px;margin:16px 0 6px"><i style="width:${Math.min(1,st.today/q.goal)*100}%"></i></div><p class="mute" style="margin:0">${t('qz.goalLine',{a:N(Math.min(st.today,q.goal)),b:N(q.goal)})}${st.today>=q.goal?' · '+t('qz.goalMet'):''}</p>`:''}
   <p style="margin:14px 0 0;font-size:14px">${st.left?'⏳ '+esc(qzEta(st))+(q.goal&&st.rate>0&&q.goal>st.rate?'<br><span class="mute">'+t('qz.etaGoal2',{g:N(q.goal),s:qzSpan(st.left/q.goal)})+'</span>':''):t('qz.complete')}</p></div>`;
  h+=`<div class="card"><h2>${t('qz.prayedH')} <em>${(q.last||[]).length?`<button class="btn ghost sm" data-act="qzUndo" style="padding:5px 12px;font-size:13px">${t('qz.undo')}</button>`:''}</em></h2><div>`+
   st.keys.map(([k,e])=>`<div class="qrow"><span class="e">${e}</span><span class="t"><b>${N(st.rem[k])}</b><span class="mute">${t('qz.rowSub',{name:nzN(k),d:N(st.done[k])})}</span></span>${st.rem[k]>0?`<button class="btn sm" data-act="qzPlus" data-a="${k}">${t('qz.plus')}</button>`:`<span class="tag">${t('qz.doneTag')}</span>`}</div>`).join('')+
   `</div><p class="ref">${t('qz.ptsRef',{p:N(QZP),c:N(QZCAP*QZP),d:N(dn)})}</p></div>`;
  h+=`<div class="card"><h2>${t('qz.goalH')} <em>${q.goal?t('qz.goalTag',{n:N(q.goal)}):t('qz.none')}</em></h2><div class="seg sm" style="margin-bottom:8px">${[[0,t('qz.none')],[1,N(1)],[3,N(3)],[dn,t('qz.oneDay',{n:N(dn)})],[dn*2,t('qz.twoDay')]].map(([v,n])=>`<button class="${(q.goal||0)===v?'on':''}" data-act="qzGoal" data-a="${v}">${n}</button>`).join('')}</div>
   <p class="ref" style="margin:0">${t('qz.hadith')} — Bukhari 6464, Muslim 783</p></div>`;
  return h}
function qzCalcView(st){const f=qzForm,days=f.mode==='d';
  let h=`<div class="card"><h2>${t('qz.calcH')}</h2><p class="mute" style="margin-top:-4px">${t('qz.calcTxt',{w:f.witr?t('qz.plusWitr'):''})}</p>
   <div class="seg sm"><button class="${days?'on':''}" data-act="qzMode" data-a="d">${t('qz.modeD')}</button><button class="${days?'':'on'}" data-act="qzMode" data-a="r">${t('qz.modeR')}</button></div>`;
  h+=days?`<div class="qgrid"><div><label class="f">${t('qz.yrs')}</label><input id="qzY" type="number" min="0" inputmode="numeric" value="${esc(f.y)}" placeholder="0"></div><div><label class="f">${t('qz.mos')}</label><input id="qzMo" type="number" min="0" inputmode="numeric" value="${esc(f.mo)}" placeholder="0"></div><div><label class="f">${t('qz.dys')}</label><input id="qzD" type="number" min="0" inputmode="numeric" value="${esc(f.d)}" placeholder="0"></div></div>`
   :`<label class="f">${t('qz.from')}</label><input id="qzFrom" type="date" value="${esc(f.from)}"><label class="f">${t('qz.to')}</label><input id="qzTo" type="date" value="${esc(f.to)}">
     <p class="ref">${t('qz.balighHint')}</p>`;
  h+=`<label class="f">${t('qz.minus')}</label><input id="qzMinus" type="number" min="0" inputmode="numeric" value="${esc(f.minus)}" placeholder="0"><p class="ref">${t('qz.minusHint')}</p>
   <button class="chk ${f.witr?'on':''}" data-act="qzWitr"><span class="bx">${f.witr?'✓':''}</span><span class="t">${t('qz.witr')}<small>${t('qz.witrHint')}</small></span></button>
   <div style="margin-top:14px"><button class="btn full" data-act="qzCalc">${t('qz.calcBtn')}</button></div></div>`;
  if(qzRes){const n=qzRes.n,ks=QK.filter(([k])=>k!=='w'||f.witr);
    h+=`<div class="card gold" id="qzRes"><h2>${t('qz.result')} <em>${t('qz.days',{n:N(n)})}</em></h2><div>${ks.map(([k,e])=>`<div class="qrow" style="padding:8px 0"><span class="e">${e}</span><span class="t">${nzN(k)}</span><b>${N(n)}</b></div>`).join('')}</div>
     <p class="big" style="margin:10px 0 2px">${t('qz.total',{n:N(n*ks.length)})}</p><p class="mute" style="margin:0">${t('qz.resTxt',{k:N(ks.length),s:qzSpan(n)})}</p>
     <div class="row" style="margin-top:16px;flex-wrap:wrap">${st?`<button class="btn ghost sm" data-act="qzApply" data-a="add">${t('qz.add')}</button><button class="btn sm" data-act="qzApply" data-a="set">${t('qz.set')}</button>`:`<button class="btn" data-act="qzApply" data-a="set">${t('qz.start')}</button>`}</div>
     <p class="ref">${t('qz.calcNote')}</p></div>`}
  return h}
function qzEditView(st){const f=qzForm,q=P().qaza,done=qzDone(),ks=QK.filter(([k])=>k!=='w'||f.witr);
  const val=k=>f.e&&f.e[k]!==undefined?f.e[k]:(q?Math.max(0,(+(q.total||{})[k]||0)-done[k]):'');
  return`<div class="card"><h2>${t('qz.editH')}</h2><p class="mute" style="margin-top:-4px">${t('qz.editTxt')}</p>
   <div class="qgrid">${ks.map(([k])=>`<div><label class="f">${nzN(k)}</label><input id="qzE_${k}" type="number" min="0" inputmode="numeric" value="${esc(val(k))}" placeholder="0"></div>`).join('')}</div>
   <button class="chk ${f.witr?'on':''}" data-act="qzWitr" style="margin-top:8px"><span class="bx">${f.witr?'✓':''}</span><span class="t">${t('qz.witr')}</span></button>
   <div style="margin-top:14px"><button class="btn full" data-act="qzSave">${t('u.save')}</button></div></div>
   ${st?`<p class="note"><button class="mute" data-act="qzOff" style="text-decoration:underline">${t('qz.off')}</button> ${t('qz.offNote')}</p>`:''}`}
function qzEnsure(){const p=P();if(!p.qaza)p.qaza={on:1,total:{},goal:0,witr:false,since:Date.now(),last:[],chk:null};const q=p.qaza;q.on=1;q.total=q.total||{};q.last=q.last||[];return q}

// ---------- AZKAAR RUNNER ----------
let runner=null;
const azSheetT=()=>runner&&runner.m==='E'?t('az.eveningH'):t('az.morningH');
function openAz(m){runner={m,i:0};const Lz=azList(m),a=(day().az||{})[m]||{};const f=Lz.findIndex(z=>(a[z.k]||0)<z.n);runner.i=f<0?0:f;sheet(azSheetT,azView)}
function azView(){const {m,i}=runner,Lz=azList(m),z=Lz[i],d=day();d.az=d.az||{};const a=d.az[m]=d.az[m]||{};const c=a[z.k]||0,pr=azProg(m);
  if(runner.fin)return`<div style="text-align:center;padding:40px 0"><div style="font-size:64px">🌿</div><p class="big">${m==='S'?t('az.finS'):t('az.finE')}</p><p class="mute">${t('az.finSub')}</p><button class="btn" data-act="close" style="margin-top:12px">${t('u.back')}</button></div>`;
  return`<div class="prog"><i style="width:${pr.done/pr.total*100}%"></i></div><p class="mute" style="margin:0 0 6px">${N(i+1)} / ${N(Lz.length)} · ${esc(azTitle(z))}</p>
  <div class="card"><div class="ar">${esc(m==='E'&&z.arE?z.arE:z.ar)}</div>${z.tr&&trOn()?`<div class="tr" dir="ltr">${esc(m==='E'&&z.trE?z.trE:z.tr)}</div>`:''}<p style="margin:6px 0 0;font-size:15px">${esc(azMean(z))}</p><p class="ref">${esc(z.ref)}</p></div>
  <button class="counter" data-act="azTap">${ring(c/z.n,180)}<span>${N(c)}<small>/ ${N(z.n)} · ${t('u.tap')}</small></span></button>
  <div class="row"><button class="btn ghost" data-act="azNav" data-a="-1" ${i?'':'disabled style="opacity:.4"'}>${t('az.prev')}</button><span class="sp"></span><button class="btn ghost" data-act="azNav" data-a="1">${i===Lz.length-1?t('az.finish'):t('az.next')}</button></div>`}
function azTap(){const {m,i}=runner,Lz=azList(m),z=Lz[i],d=day(),a=d.az[m];a[z.k]=Math.min(z.n,(a[z.k]||0)+1);navigator.vibrate&&navigator.vibrate(12);
  const pr=azProg(m);if(pr.done===pr.total&&!d.az[m+'d']){d.az[m+'d']=1;save();runner.fin=1;resheet();return}
  save();if(a[z.k]>=z.n&&i<Lz.length-1){resheet();setTimeout(()=>{if(runner&&runner.i===i){runner.i++;resheet()}},350)}else resheet()}

// ---------- DUAS ----------
let duaQ='',duaOpen=null;
function suggestDuas(){const h=new Date().getHours();return D.duas.filter(x=>x.hrs.includes(h)).slice(0,2)}
function duaBody(x){return`<div class="ar">${esc(x.ar)}</div>${trOn()?`<div class="tr" dir="ltr">${esc(x.tr)}</div>`:''}<p style="margin:6px 0 0;font-size:15px">${esc(duaMean(x))}</p><p class="ref">${esc(x.ref)}</p>`}
function renderDuas(){const sg=suggestDuas();let h='';
  if(sg.length)h+=`<div class="card gold"><h2>${t('du.now')} <em>${fmtT(new Date())}</em></h2>${sg.map((x,i)=>`${i?'<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">':''}<p class="big" style="margin:0">${x.e} ${esc(duaTitle(x))}</p>${duaBody(x)}`).join('')}</div>`;
  h+=`<input id="dq" placeholder="🔎  ${esc(t('du.search'))}" value="${esc(duaQ)}" style="margin-bottom:16px;background:var(--card);border-color:transparent;box-shadow:var(--sh)">`;
  const q=duaQ.toLowerCase(),Ld=D.duas.filter(x=>!q||(duaTitle(x)+' '+duaMean(x)+' '+x.t+' '+x.m+' '+x.tr).toLowerCase().includes(q));
  h+=`<div class="card" style="padding:6px 22px"><div class="list">${Ld.map(x=>`<button class="li" data-act="dua" data-a="${x.k}"><span class="e">${x.e}</span><span class="t">${esc(duaTitle(x))}</span><span class="chev ${duaOpen===x.k?'open':''}">${duaOpen===x.k?'⌄':'›'}</span></button>${duaOpen===x.k?`<div style="padding:0 0 16px">${duaBody(x)}</div>`:''}`).join('')||`<p class="empty">${t('du.none')}</p>`}</div></div>`;
  h+=NOTE();$('#v-duas').innerHTML=h;
  const inp=$('#dq');inp.oninput=e=>{duaQ=e.target.value;const pos=e.target.selectionStart;renderDuas();const n=$('#dq');n.focus();n.setSelectionRange(pos,pos)}}

// ---------- SAFAR ----------
function renderSafar(){const p=P(),pts=points(),lv=level(pts),d=day(),ai=dayNo()%D.ayat.length,ay=D.ayat[ai],ni=dayNo()%D.neki.length;
  const hb=p.habits.length?Math.max(...p.habits.map(x=>Math.floor((Date.now()-x.start)/864e5))):null;
  let h=`<div class="card" style="text-align:center"><div class="ring" style="width:110px;height:110px;margin:0 auto 10px;font-size:15px">${ring(lv.pct/100,110,'var(--gold)')}<div><b style="font-size:28px;display:block;line-height:1">${N(lv.n)}</b>${t('sf.level')}</div></div>
   <p class="big" style="margin:0">${esc(lv.name)}</p><p class="mute" style="margin:2px 0 0">${t('sf.pts',{p:N(pts)})} ${lv.next?'· '+t('sf.next',{n:N(lv.next)}):''}</p></div>
  <div class="tiles">
   <button class="tile" data-act="sh" data-a="ayat"><span class="e">📖</span><b>${t('sf.ayat')}</b><span>${d.amal?t('sf.amalDone'):esc(ay.s)+' '+ay.r}</span></button>
   <button class="tile" data-act="sh" data-a="neki"><span class="e">🫙</span><b>${t('sf.neki')}</b><span>${(d.deeds||[]).length?t('sf.nekiN',{n:N(d.deeds.length)}):esc(nkText(ni))}</span></button>
   <button class="tile" data-act="sh" data-a="mu"><span class="e">🌌</span><b>${t('sf.mu')}</b><span>${d.mu?t('sf.muDone'):t('sf.muSub')}</span></button>
   <button class="tile" data-act="sh" data-a="habit"><span class="e">🌱</span><b>${t('sf.habit')}</b><span>${hb===null?t('sf.habitStart'):t('sf.clean',{n:N(hb)})}</span></button></div>`;
  h+=`<div class="card"><h2>${t('sf.todayPts')} <em>${N(dayPts(d))}</em></h2><p class="mute" style="margin:0">${t('sf.legend')}</p></div>`;
  h+=NOTE();$('#v-safar').innerHTML=h}
const SH={
 ayat:['sf.ayat',()=>{const ai=dayNo()%D.ayat.length,ay=D.ayat[ai],d=day();return`<div class="card"><h2>${t('ay.today')} <em>${esc(ay.s)} ${ay.r}</em></h2><div class="ar">${esc(ay.ar)}</div><p style="font-size:16px;margin:0">${esc(ayMean(ai))}</p></div>
   <div class="card gold"><h2>${t('ay.amal')}</h2><p class="big">${esc(ayAmal(ai))}</p><div style="margin-top:14px">${d.amal?`<button class="btn done" data-act="amal">${t('ay.done')}</button>`:`<button class="btn" data-act="amal">${t('ay.btn')}</button>`}</div></div>
   <p class="mute" style="text-align:center">${t('ay.tomorrow')}</p>${NOTE()}`}],
 neki:['sf.neki',()=>{const d=day(),ni=dayNo()%D.neki.length,nk=D.neki[ni],deeds=d.deeds||[];const days=[...Array(7)].map((_,i)=>addD(new Date(),i-6)),cnt=days.map(x=>(peek(dk(x)).deeds||[]).length),mx=Math.max(1,...cnt),tot=cnt.reduce((a,b)=>a+b,0);
   return`<div class="card gold"><h2>${t('nk.idea')}</h2><p class="big">${esc(nkText(ni))}</p><div style="margin-top:14px"><button class="btn" data-act="nekiIdea" ${deeds.includes(nk)?'disabled style="opacity:.6"':''}>${deeds.includes(nk)?t('nk.ideaDone'):t('nk.ideaBtn')}</button></div></div>
   <div class="card"><h2>${t('nk.own')}</h2><div class="row"><input id="nkIn" placeholder="${esc(t('nk.ph'))}" maxlength="120"><button class="btn" data-act="nekiAdd">+</button></div>
   <p class="mute" style="margin:10px 0 0">${t('nk.private')}</p>
   ${deeds.length?`<div class="list" style="margin-top:8px">${deeds.map((x,i)=>`<div class="li"><span class="e">🫙</span><span class="t">${esc(deedText(x))}</span><button class="mute" data-act="nekiDel" data-a="${i}">✕</button></div>`).join('')}</div>`:''}</div>
   <div class="card"><h2>${t('nk.week')} <em>${t('nk.count',{n:N(tot)})}</em></h2><div class="week">${days.map((x,i)=>`<div><i style="height:${cnt[i]/mx*60+4}px;opacity:${cnt[i]?.9:.2}"></i>${wd(x)}</div>`).join('')}</div>
   <p class="mute" style="margin:0">${tot?t('nk.weekMsg'):t('nk.weekEmpty')}</p></div>`}],
 mu:['sf.mu',()=>{const d=day(),m=d.mu||{},ist=d.ist||0;const past=Object.entries(P().days).filter(([k,v])=>v.mu&&k!==dk()).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,5);
   return`<div class="card"><p class="mute" style="margin-top:0">${t('mu.quote')}</p>
   <label class="f">${t('mu.q1')}</label><textarea id="mu1">${esc(m.a)}</textarea>
   <label class="f">${t('mu.q2')}</label><textarea id="mu2">${esc(m.b)}</textarea>
   <label class="f">${t('mu.q3')}</label><textarea id="mu3">${esc(m.c)}</textarea>
   <div style="margin-top:14px"><button class="btn full" data-act="muSave">${d.mu?t('mu.update'):t('u.save')}</button></div></div>
   <div class="card" style="text-align:center"><h2>${t('mu.ist')} <em>${fr(ist,100)}</em></h2><div class="ar c" style="font-size:24px">أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ</div>
   <button class="counter" data-act="ist" style="width:150px;height:150px;font-size:36px">${ring(ist/100,150)}<span>${N(ist)}<small>${t('u.tap')}</small></span></button><p class="ref">${t('mu.istRef')} — Muslim 2702</p></div>
   ${past.length?`<div class="card"><h2>${t('mu.past')}</h2>${past.map(([k,v])=>`<details style="padding:8px 0;border-bottom:1px solid var(--line)"><summary class="mute">${fmtDay(k)}</summary><p>✅ ${esc(v.mu.a)}<br>🔁 ${esc(v.mu.b)}<br>🎯 ${esc(v.mu.c)}</p></details>`).join('')}</div>`:''}
   <p class="note">${t('mu.note')}</p>`}],
 habit:['sf.habit',()=>{const H=P().habits,MS=[1,3,7,14,21,30,40,60,90,180,365];
   return`<div class="card gold"><p class="ar c" style="font-size:22px;margin:0">اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ</p><p style="font-size:14px;margin:4px 0 0">${t('hb.dua')} <span class="ref">— Tirmidhi 3591</span></p></div>`+
   (H.length?H.map(x=>{const n=Math.floor((Date.now()-x.start)/864e5),nm=MS.find(v=>v>n)||n+1,pm=[...MS].reverse().find(v=>v<=n)||0;
     return`<div class="card"><div class="row"><div class="sp"><h2 style="margin:0 0 4px">${esc(x.name)}</h2><p style="margin:0">${t('hb.cleanB',{n:'<b style="font-size:34px">'+N(n)+'</b>'})}</p></div><div class="ring" style="width:64px;height:64px;font-size:12px">${ring((n-pm)/(nm-pm),64)}<span>${t('u.dShort',{n:N(nm)})}</span></div></div>
     <p class="mute">${t('hb.best',{n:N(Math.max(x.best||0,n))})}${x.slips?' · '+t('hb.slips',{n:N(x.slips)}):''}</p>
     <div class="row"><button class="btn ghost sm" data-act="slip" data-a="${x.id}">${t('hb.slip')}</button><span class="sp"></span><button class="mute" data-act="hdel" data-a="${x.id}">${t('hb.del')}</button></div></div>`}).join(''):`<p class="empty">${t('hb.empty')}</p>`)+
   `<div class="card"><h2>${t('hb.new')}</h2><div class="row"><input id="hIn" placeholder="${esc(t('hb.ph'))}" maxlength="40"><button class="btn" data-act="hadd">+</button></div></div>
   <p class="note">${t('hb.note')}</p>`}],
 settings:['set.title',()=>{const s=S.set,r=s.rem,perm=('Notification' in window)?Notification.permission:'na';
   return`<div class="card"><h2>${t('set.lang')}</h2>${langPicker()}</div>
   <div class="card"><h2>${t('set.times')}</h2><label class="f">${t('set.city')}</label><input id="sCity" value="${esc(s.city)}">
   <div class="row"><div class="sp"><label class="f">${t('set.lat')}</label><input id="sLat" inputmode="decimal" value="${s.lat}" dir="ltr"></div><div class="sp"><label class="f">${t('set.lng')}</label><input id="sLng" inputmode="decimal" value="${s.lng}" dir="ltr"></div></div>
   <div style="margin-top:10px"><button class="btn ghost sm" data-act="geo">${t('set.geo')}</button></div>
   <label class="f">${t('set.method')}</label><select id="sM">${Object.entries(METHODS).map(([k,v])=>`<option value="${k}" ${k===s.method?'selected':''}>${v.n}</option>`).join('')}</select>
   <label class="f">${t('set.asr')}</label><select id="sAsr"><option value="hanafi" ${s.asr==='hanafi'?'selected':''}>${t('asr.hanafi')}</option><option value="shafi" ${s.asr==='shafi'?'selected':''}>${t('asr.shafi')}</option></select></div>
   <div class="card"><h2>${t('set.rem')}</h2><button class="chk ${r.on?'on':''}" data-act="remT"><span class="bx">${r.on?'✓':''}</span><span class="t">${t('set.remAz')}<small>${perm==='granted'?t('set.permOk'):perm==='denied'?t('set.permDenied'):perm==='na'?t('set.permNa'):t('set.permAsk')}</small></span></button>
   <div class="row"><div class="sp"><label class="f">${t('u.morning')}</label><input type="time" id="rS" value="${r.s}"></div><div class="sp"><label class="f">${t('u.evening')}</label><input type="time" id="rE" value="${r.e}"></div></div>
   <button class="chk ${r.nz?'on':''}" data-act="remN"><span class="bx">${r.nz?'✓':''}</span><span class="t">${t('set.remNz')}</span></button>
   <p class="ref">${t('set.remNote')}</p></div>
   <div class="card"><h2>${t('set.backup')}</h2><p class="mute" style="margin-top:0">${t('set.backupTxt')}</p><div class="row"><button class="btn ghost sm" data-act="bk">${t('set.bk')}</button><label class="btn ghost sm">${t('set.restore')}<input type="file" id="rf" accept=".json,application/json" hidden></label></div></div>
   <div class="card"><h2>🧒 ${t('k.setH')}</h2><label class="f">${t('k.pinSet')}</label><input id="kPinSet" type="password" inputmode="numeric" maxlength="6" autocomplete="new-password" dir="ltr" placeholder="${s.kpin?'••••':''}">
   <p class="ref">${s.kpin?t('k.pinIs')+' · <button class="mute" data-act="kpinDel" style="text-decoration:underline">'+t('k.pinDel')+'</button>':t('k.pinNone')}<br>${t('k.pinHint')}</p></div>
   <div class="card"><h2>${t('set.profile')}</h2><label class="f">${t('set.name')}</label><input id="pN" value="${esc(P().name)}" maxlength="24"></div>
   <button class="btn full" data-act="sSave">${t('u.save')}</button>
   <p class="note"><button class="mute" data-act="wipe" style="text-decoration:underline">${t('set.wipe')}</button></p>${NOTE()}`}],
};

// ---------- FAMILY ----------
function shareCode(p){const days=[...Array(7)].map((_,i)=>nzCount(peek(dk(addD(new Date(),i-6)),p)));
  const o={v:1,n:p.name,e:p.emo,s:nzStreak(p),ds:deenStreak(p),w:days,l:level(points(p)).n,u:dk()};return'DS1-'+btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function parseCode(c){c=(c||'').trim();if(!c.startsWith('DS1-'))throw 0;const o=JSON.parse(decodeURIComponent(escape(atob(c.slice(4)))));if(!o.n||!Array.isArray(o.w))throw 0;return o}
function cheer(c){return c===5?t('fm.cheer5'):c>0?t('fm.cheerSome'):t('fm.cheer0')}
function renderFamily(){let h=`<div class="card"><h2>${t('fm.home')} <em>${t('fm.members',{n:N(Object.keys(S.profiles).length)})}</em></h2>`;
  h+=Object.entries(S.profiles).map(([id,p])=>{if(p.kid)return kFamRow(id,p);const c=nzCount(peek(dk(),p));return`<div class="member"><div class="ring">${ring(c/5,48)}<span>${p.emo}</span></div><div class="sp"><b>${esc(p.name)}</b> ${id===S.active?`<span class="tag">${t('fm.you')}</span>`:''}<br><span class="mute">${t('fm.line',{c:fr(c,5),d:N(deenStreak(p)),l:N(level(points(p)).n)})}</span><br><span class="mute">${cheer(c)}</span></div>${id===S.active?'':`<button class="btn ghost sm" data-act="sw" data-a="${id}">${t('fm.open')}</button>`}<button class="mute medit" data-act="edM" data-a="${id}" aria-label="${esc(t('k.editT'))}">✎</button></div>`}).join('');
  h+=`<div style="margin-top:14px"><button class="btn ghost sm" data-act="addM">${t('fm.add')}</button></div></div>`;
  const R=Object.entries(S.remote);
  h+=`<div class="card"><h2>${t('fm.remote')}</h2>${R.length?R.map(([k,o])=>{const c=o.w[6]||0,w=o.w.reduce((a,b)=>a+b,0);return`<div class="member"><div class="ring">${ring(w/35,48,'var(--gold)')}<span>${esc(o.e||'⭐')}</span></div><div class="sp"><b>${esc(o.n)}</b><br><span class="mute">${t('fm.rline',{w:fr(w,35),d:N(o.ds||0),u:esc(o.u)})}</span><br><span class="mute">${cheer(c)}</span></div><button class="mute" data-act="rdel" data-a="${esc(k)}">✕</button></div>`}).join(''):`<p class="mute" style="margin:0">${t('fm.remoteEmpty')}</p>`}
   <div class="row" style="margin-top:14px"><input id="codeIn" placeholder="${esc(t('fm.codePh'))}" dir="ltr"><button class="btn sm" data-act="imp">${t('fm.addBtn')}</button></div></div>`;
  h+=`<div class="card"><h2>${t('fm.myCode')}</h2><p class="mute" style="margin-top:0">${t('fm.privacy')}</p><div class="row"><button class="btn sm" data-act="share">${t('fm.share')}</button><button class="btn ghost sm" data-act="hausla">${t('fm.hausla')}</button></div></div>`;
  h+=`<p class="note">${t('fm.note')}</p>`;
  $('#v-family').innerHTML=h}

// ---------- render / nav ----------
let tab='home';
function render(){const p=P();
  let hij='';try{const g=LG(),ps=new Intl.DateTimeFormat((g.hloc||g.loc)+'-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'}).formatToParts(new Date());
    hij=g.hera!=null?ps.filter(p=>p.type!=='era').map(p=>p.value).join('').replace(/^[\s,،]+|[\s,،]+$/g,'')+' '+g.hera:ps.map(p=>p.value).join('')}catch(e){}
  $('#hDate').textContent=new Date().toLocaleDateString(LG().loc+'-u-ca-gregory',{weekday:'long',day:'numeric',month:'short'})+(hij?' · '+hij:'');
  document.body.classList.toggle('kid',!!p.kid);
  if(p.kid){kRender();return}
  const named=p.name&&p.name!=='Main';
  $('#hName').textContent=named?p.name+' 👋':t('hdr.salam');
  $('#hAv').textContent=p.emo;
  ({home:renderHome,ibadat:renderIbadat,duas:renderDuas,safar:renderSafar,family:renderFamily})[tab]();
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.a===tab))}
function go(x){tab=x;document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+x));window.scrollTo(0,0);render()}

function download(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
async function shareText(s){try{if(navigator.share){await navigator.share({text:s});return}}catch(e){if(e&&e.name==='AbortError')return}
  try{await navigator.clipboard.writeText(s);toast(t('ts.copied'))}catch(e){modal(`<p class="mute">${t('u.copyThis')}</p><textarea style="min-height:120px" dir="ltr">${esc(s)}</textarea><button class="btn full" data-act="mclose" style="margin-top:12px">${t('u.ok')}</button>`)}}
function onbHTML(name){return`<div style="text-align:center"><div style="font-size:54px">🌙</div><p class="big" style="font-size:22px">${t('app.name')}</p><p class="mute">${t('onb.desc')}</p></div>
  <label class="f">${t('set.lang')}</label>${langPicker()}
  <label class="f">${t('onb.name')}</label><input id="oN" maxlength="24" placeholder="${esc(t('onb.ph'))}" value="${esc(name||'')}"><button class="btn full" data-act="onbOk" style="margin-top:16px">${t('onb.btn')}</button><p class="note" style="margin-bottom:0">${t('onb.note')}</p>`}
function setLang(a){if(!LANGS[a])return;S.set.lang=a;save();applyLang();
  if(!S.onb&&$('#modal').classList.contains('on')&&$('#oN')){const v=$('#oN').value;modal(onbHTML(v))}
  render();resheet()}

const QZT=['qz.ts0','qz.ts1','qz.ts2','qz.ts3'];
const ACT={
 go:a=>P().kid?kGo('kr'):go(a), close:closeSheet, mclose,
 lang:a=>setLang(a),
 settings:()=>sheet(()=>t('set.title'),SH.settings[1]),
 sh:a=>sheet(()=>t(SH[a][0]),SH[a][1]),
 nz:(a,el)=>{const d=day();d.n[a]=d.n[a]?0:1;save();progCheck();render();if(d.n[a]){toast(nzCount(d)===5?t('ts.all5'):t('ts.accept'));const b=document.querySelector(`[data-act="nz"][data-a="${a}"] .c`);b&&b.classList.add('pop')}},
 su:()=>{const d=day();d.su=d.su?0:1;save();render();if(d.su)toast(t('ts.sunnah'))},
 az:a=>openAz(a), azTap,
 azNav:a=>{const Lz=azList(runner.m);const n=runner.i+(+a);if(n>=Lz.length){closeSheet();return}runner.i=Math.max(0,n);resheet();$('#sheet').scrollTop=0},
 jm:a=>{if(!isFri())return;const d=day();d.jm=d.jm||{};d.jm[a]=d.jm[a]?0:1;save();render()},
 dc:(a,el,ev)=>{ev.stopPropagation();if(!isFri())return;const d=day();d.jm=d.jm||{};d.jm.dc=(d.jm.dc||0)+1;if(d.jm.dc>=100)d.jm.durood=1;save();render();navigator.vibrate&&navigator.vibrate(10)},
 prog:()=>{P().prog={s:0,since:Date.now()};save();render();toast(t('ts.progStart'))},
 progoff:()=>{if(confirm(t('cf.progOff'))){P().prog=null;save();render()}},
 progreset:()=>{P().prog={s:0,since:Date.now()};save();render()},
 sm:()=>{const d=day();d.sm=d.sm?0:1;save();progCheck();render()},
 dua:a=>{duaOpen=duaOpen===a?null:a;renderDuas()},
 amal:()=>{const d=day();d.amal=d.amal?0:1;save();resheet();if(d.amal)toast(t('ts.amal'))},
 nekiIdea:()=>{const d=day(),nk=D.neki[dayNo()%D.neki.length];d.deeds=d.deeds||[];if(!d.deeds.includes(nk))d.deeds.push(nk);save();resheet();toast(t('ts.jar'))},
 nekiAdd:()=>{const v=$('#nkIn').value.trim();if(!v)return;const d=day();(d.deeds=d.deeds||[]).push(v);save();resheet();toast(t('ts.nekiAdd'))},
 nekiDel:a=>{const d=day();d.deeds.splice(+a,1);save();resheet()},
 muSave:()=>{const d=day();d.mu={a:$('#mu1').value.trim(),b:$('#mu2').value.trim(),c:$('#mu3').value.trim()};if(!d.mu.a&&!d.mu.b&&!d.mu.c)delete d.mu;save();resheet();toast(t('ts.muSave'))},
 ist:()=>{const d=day();d.ist=(d.ist||0)+1;save();navigator.vibrate&&navigator.vibrate(10);if(d.ist===100)toast(t('ts.ist100'));const keep={a:$('#mu1').value,b:$('#mu2').value,c:$('#mu3').value};resheet();$('#mu1').value=keep.a;$('#mu2').value=keep.b;$('#mu3').value=keep.c},
 hadd:()=>{const v=$('#hIn').value.trim();if(!v)return;P().habits.push({id:uid(),name:v,start:Date.now(),best:0,slips:0});save();resheet();toast(t('ts.habitAdd'))},
 slip:a=>{const x=P().habits.find(h=>h.id===a);if(!x)return;modal(`<p class="big">${t('hb.slipT')}</p><p class="mute">${t('hb.slipTxt')}</p><div class="row"><button class="btn ghost" data-act="mclose">${t('u.no')}</button><span class="sp"></span><button class="btn" data-act="slipOk" data-a="${a}">${t('hb.slipYes')}</button></div>`)},
 slipOk:a=>{const x=P().habits.find(h=>h.id===a);const n=Math.floor((Date.now()-x.start)/864e5);x.best=Math.max(x.best||0,n);x.start=Date.now();x.slips=(x.slips||0)+1;save();mclose();resheet()},
 hdel:a=>{if(confirm(t('cf.habitDel'))){P().habits=P().habits.filter(h=>h.id!==a);save();resheet()}},
 sw:a=>{if(!P().kid)S.adult=S.active;ktab='kh';S.active=a;save();render();toast(P().emo+' '+t('ts.switch',{n:P().name}))},
 addM:()=>memberModal(null),
 pickE:(a,el)=>{document.querySelectorAll('[data-act="pickE"]').forEach(b=>b.style.outline='');el.style.outline='2px solid var(--pri)';el.parentNode.dataset.sel=a},
 addMOk:a=>kSaveMember(a||null),
 imp:()=>{try{const o=parseCode($('#codeIn').value);S.remote[o.n.toLowerCase()]=o;save();render();toast(t('ts.imported',{n:o.n}))}catch(e){toast(t('ts.badCode'))}},
 rdel:a=>{delete S.remote[a];save();render()},
 share:()=>shareText(t('sh.code')+'\n'+shareCode(P())),
 hausla:()=>shareText(t('sh.hausla',{n:P().name})),
 geo:()=>{if(!navigator.geolocation){toast(t('ts.noLoc'));return}navigator.geolocation.getCurrentPosition(p=>{$('#sLat').value=p.coords.latitude.toFixed(4);$('#sLng').value=p.coords.longitude.toFixed(4);$('#sCity').value=t('set.myLoc');toast(t('ts.locOk'))},()=>toast(t('ts.locDenied')),{timeout:10000})},
 remT:async()=>{const r=S.set.rem;if(!r.on&&'Notification' in window&&Notification.permission==='default'){try{await Notification.requestPermission()}catch(e){}}r.on=!r.on;save();resheet()},
 remN:async()=>{const r=S.set.rem;if(!r.nz&&'Notification' in window&&Notification.permission==='default'){try{await Notification.requestPermission()}catch(e){}}r.nz=!r.nz;save();resheet()},
 sSave:()=>{const s=S.set,lat=parseFloat($('#sLat').value),lng=parseFloat($('#sLng').value);if(!(Math.abs(lat)<=90&&Math.abs(lng)<=180)){toast(t('ts.badLatLng'));return}
   Object.assign(s,{lat,lng,city:$('#sCity').value.trim(),method:$('#sM').value,asr:$('#sAsr').value});s.rem.s=$('#rS').value||'07:00';s.rem.e=$('#rE').value||'17:30';const kp=($('#kPinSet')||{}).value||'';if(kp){if(!/^\d{4,6}$/.test(kp)){toast(t('k.pinFmt'));return}s.kpin=kp}const n=$('#pN').value.trim();if(n)P().name=n;save();closeSheet();toast(t('ts.saved'))},
 bk:()=>download('deen-safar-backup-'+dk()+'.json',JSON.stringify(S)),
 wipe:()=>{if(confirm(t('cf.wipe'))){const p=P();p.days={};p.habits=[];p.prog=null;p.bonus=0;p.qaza=null;save();closeSheet();toast(t('ts.wiped'))}},
 onbOk:()=>{const n=$('#oN').value.trim();P().name=n||'Main';S.onb=true;save();mclose();render()},
 // qaza
 qz:a=>{qzInit();qzTab=a||(qzStats()?'t':'h');sheet(()=>t('qz.title'),qzView)},
 qzTab:a=>{qzRead();qzTab=a;resheet();$('#sheet').scrollTop=0},
 qzMode:a=>{qzRead();qzForm.mode=a;qzRes=null;resheet()},
 qzWitr:()=>{qzRead();qzForm.witr=!qzForm.witr;resheet()},
 qzCalc:()=>{qzRead();const f=qzForm,Nn=v=>Math.max(0,Math.floor(+v||0));let n;
   if(f.mode==='d')n=Nn(f.y)*365+Nn(f.mo)*30+Nn(f.d);
   else{if(!f.from||!f.to){toast(t('qz.tsBoth'));return}const a=new Date(f.from+'T00:00'),b=new Date(f.to+'T00:00');n=Math.round((b-a)/864e5);if(!(n>0)){toast(t('qz.tsBadDates'));return}}
   n=Math.max(0,n-Nn(f.minus));if(!n){toast(t('qz.tsNoDur'));return}qzRes={n};resheet();const r=$('#qzRes');r&&r.scrollIntoView({behavior:'smooth',block:'start'})},
 qzApply:a=>{if(!qzRes)return;const p=P(),done=qzDone(p),n=qzRes.n,w=qzForm.witr,was=!!qzStats(p),q=qzEnsure();q.witr=w;
   QK.forEach(([k])=>{const add=k==='w'&&!w?0:n;q.total[k]=a==='add'?Math.max(+q.total[k]||0,done[k])+add:done[k]+add});
   save();qzRes=null;qzTab='t';resheet();$('#sheet').scrollTop=0;toast(was?t('qz.tsUpd'):t('qz.tsStart'))},
 qzSave:()=>{qzRead();const p=P(),done=qzDone(p),w=qzForm.witr,q=qzEnsure();q.witr=w;
   QK.forEach(([k])=>{if(k==='w'&&!w)return;const v=Math.max(0,Math.floor(+(qzForm.e||{})[k]||0));q.total[k]=done[k]+v});
   qzForm.e=null;save();qzTab='t';resheet();$('#sheet').scrollTop=0;toast(t('ts.saved'))},
 qzOff:()=>{if(confirm(t('qz.cfOff'))){P().qaza.on=0;save();qzTab='h';resheet();toast(t('qz.tsOff'))}},
 qzPlus:a=>{const st=qzStats();if(!st||!(st.rem[a]>0))return;const d=day();d.qz=d.qz||{};d.qz[a]=(d.qz[a]||0)+1;st.q.last=(st.q.last||[]).concat([[dk(),a]]).slice(-30);save();navigator.vibrate&&navigator.vibrate(12);
   const s2=qzStats();if(!s2.left)modal(`<div style="text-align:center"><div style="font-size:54px">🎉</div><p class="big">${t('qz.allDoneT')}</p><p class="mute">${t('qz.allDoneS')}</p><button class="btn full" data-act="mclose">${t('u.ameen')}</button></div>`);
   else if(s2.q.goal&&s2.today===s2.q.goal)toast(t('qz.tsGoal'));else toast(t(QZT[s2.today%QZT.length]));resheet()},
 qzUndo:()=>{const p=P(),q=p.qaza;if(!q)return;const Lq=q.last||[];while(Lq.length){const [k,x]=Lq.pop();const d=p.days[k];if(d&&d.qz&&d.qz[x]>0){d.qz[x]--;if(!qzOf(d))delete d.qz;save();toast(t('qz.tsUndo'));resheet();return}}save();resheet()},
 qzGoal:a=>{P().qaza.goal=+a||0;save();resheet()},
 qzMiss:()=>{const Lm=qzMissed();if(!Lm.length)return;qzPick=Lm.map(([k,m])=>[k,new Set(m)]);const w=P().qaza.witr;
   modal(`<div style="max-height:70vh;overflow:auto"><p class="big">${t('qz.mT')}</p><p class="mute" style="margin-top:0">${t('qz.mTxt')}${w?' '+t('qz.mWitr'):''}</p>`+
   Lm.map(([k,m])=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)"><b style="font-size:14px">${fmtDay(k)}</b><div>${m.map(x=>`<button class="chip on" data-act="qzChip" data-a="${k}|${x}">${nzN(x)}</button>`).join('')}</div></div>`).join('')+
   `</div><div class="row" style="margin-top:16px"><button class="btn ghost" data-act="qzMissNo">${t('qz.mNo')}</button><span class="sp"></span><button class="btn" data-act="qzMissOk">${t('qz.mOk')}</button></div>`)},
 qzChip:(a,el)=>{const [k,x]=a.split('|'),r=qzPick&&qzPick.find(y=>y[0]===k);if(!r)return;r[1].has(x)?r[1].delete(x):r[1].add(x);el.classList.toggle('on',r[1].has(x))},
 qzMissOk:()=>{const q=qzEnsure();let n=0;(qzPick||[]).forEach(([k,set])=>set.forEach(x=>{q.total[x]=(+q.total[x]||0)+1;n++;if(x==='i'&&q.witr){q.total.w=(+q.total.w||0)+1;n++}}));
   q.chk=dk(addD(new Date(),-1));qzPick=null;save();mclose();resheet();render();toast(n?t('qz.tsMissOk',{n:N(n)}):t('qz.tsOk'))},
 qzMissNo:()=>{const q=qzEnsure();q.chk=dk(addD(new Date(),-1));qzPick=null;save();mclose();resheet();render();toast(t('qz.tsMissNo'))},
};
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-act]');if(!el||el.disabled)return;const f=ACT[el.dataset.act];if(f){f(el.dataset.a,el,ev)}});
document.addEventListener('keydown',ev=>{if(ev.key!=='Enter')return;const id=ev.target.id;if(id==='nkIn')ACT.nekiAdd();else if(id==='hIn')ACT.hadd();else if(id==='codeIn')ACT.imp();else if(id==='oN')ACT.onbOk()});
document.addEventListener('change',ev=>{if(ev.target.id!=='rf')return;const f=ev.target.files[0];if(!f)return;f.text().then(x=>{const o=JSON.parse(x);if(!o.profiles||!o.active)throw 0;if(!confirm(t('cf.restore')))return;localStorage.setItem(KEY,JSON.stringify(o));load();applyLang();closeSheet();toast(t('ts.restored'))}).catch(()=>toast(t('ts.badFile')))});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'&&S.onb)mclose()});

/*KIDS*/
// ---------- reminders ----------
async function notify(title,body){try{if(!('Notification' in window)||Notification.permission!=='granted')return;const reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(reg&&reg.showNotification)reg.showNotification(title,{body,icon:'icon-192.png',tag:title,lang:LG().html,dir:LG().dir});else new Notification(title,{body,icon:'icon-192.png',lang:LG().html,dir:LG().dir})}catch(e){}}
function tick(){const r=S.set.rem,now=new Date(),k=dk(),hm=pad(now.getHours())+':'+pad(now.getMinutes());let F={};try{F=JSON.parse(localStorage.getItem(FKEY))||{}}catch(e){}
  if(F.d!==k)F={d:k};const fire=(id,ti,b)=>{if(F[id])return;F[id]=1;localStorage.setItem(FKEY,JSON.stringify(F));notify(ti,b)};
  const d=day();if(r.on){if(hm>=r.s&&hm<'12:00'&&!(d.az&&d.az.Sd))fire('S','🌅 '+t('az.morningH'),t('nt.Sb'));if(hm>=r.e&&!(d.az&&d.az.Ed))fire('E','🌆 '+t('az.eveningH'),t('nt.Eb'))}
  if(r.nz){const tm=prayerTimes(now);NZ.forEach(([kk])=>{if(tm[kk]&&now>=tm[kk]&&now-tm[kk]<15*6e4&&!d.n[kk])fire('n'+kk,'🕌 '+t('nt.nz',{n:nzN(kk)}),t('nt.nzb'))})}
  if(tab==='home'&&!P().kid&&!$('#sheet').classList.contains('on')&&!$('#modal').classList.contains('on'))renderHome()}

// ---------- boot ----------
load();applyLang();render();
if(!S.onb)modal(onbHTML(''));
setInterval(tick,30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){render();resheet()}});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
