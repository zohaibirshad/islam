// ---------- BACHON KA MODE (kids) ----------
// Profile mein `kid:{by,mem,st,qz,bd,stk,kal,goal,rew}` ho to woh bache ki profile hai. Roz ka data days[date].k mein.
const KDD={bism:['🍽️','Bukhari 5376'],right:['✋','Bukhari 5376'],salam:['👋','Muslim 54'],smile:['😊','Tirmidhi 1956'],help:['🤝','Al-Isra 17:23-24'],hamd:['🤲','Muslim 2734'],share:['🧸','Bukhari 13'],clean:['🧹','Muslim 223'],quran:['📖','Bukhari 5027'],truth:['✅','Bukhari 6094'],kind:['💬','Bukhari 2989'],water:['💧','Muslim 2024, 2028']};
const KBAND={s:{deeds:['bism','right','salam','smile','help','hamd','share','clean'],duas:['khana1','cheenk','sona','neend','bath2','jazak','ilm'],stories:['nuh','yunus','naml','dog','camel'],reps:3},
 b:{deeds:['bism','salam','help','quran','truth','kind','water','share'],duas:['khana1','khana2','sona','neend','bath1','bath2','nikalna','ilm','walidain'],stories:['ibrahim','yusuf','musa','bilal','guest','kab'],reps:5}};
// [emoji (kabhi kisi insaan/nabi/sahabi ki tasveer nahi), reference, quiz ke sahi jawab ka index]
const KST={nuh:['🚢','Hud 11:37-44'],yunus:['🐋','Al-Anbiya 21:87-88 · As-Saffat 37:139-146'],naml:['🐜','An-Naml 27:17-19'],dog:['💧','Bukhari 2363 · Muslim 2244'],camel:['🐫','Abu Dawud 2549'],
 ibrahim:['🔥','Al-Anbiya 21:51-70',[0,1,1]],yusuf:['🌾','Yusuf 12:15-21, 12:54-56, 12:92',[0,0,1]],musa:['🌊',"Ash-Shu'ara 26:52-67",[0,1,1]],bilal:['📢','Ibn Majah 150 · Abu Dawud 499',[0,0,1]],guest:['🪔','Bukhari 3798 · Muslim 2054 · Al-Hashr 59:9',[1,1,1]],kab:['🤍','Bukhari 4418 · Muslim 2769 · At-Tawbah 9:117-119',[1,0,0]]};
const KAL={ar:'لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',tr:'La ilaha illallah, Muhammadur Rasulullah',ref:'Quran 47:19 · 48:29 · Bukhari 8'};
const STK=['⭐','🌙','🌴','🐪','🕌','🌸','🦋','🐝','🌈','🍎','🐢','🐳','🌻','🐑','🦉','🍯','🐞','🍇','🦜','🌺','🐠','🎈','🧁','🏕️','🌟'];
const TREE=[[0,'🌰'],[10,'🌱'],[30,'🌿'],[60,'🪴'],[100,'🌳'],[160,'🌳🍎'],[250,'🌳🌴🌳']];
const KBD=['first','d7','dua3','kal','st5','allday','nz','quiz'];
const KBDE={first:'⭐',d7:'🔥',dua3:'📿',kal:'💚',st5:'📚',allday:'🌈',nz:'🕌',quiz:'🧠'};
const KEMO=['🦁','🐣','🐼','🚀','🌈','🧸'];
const KTABS=[['kh','🏠'],['kd','📿'],['ks','📖'],['kr','🌳']];
const KY=()=>new Date().getFullYear();
const kAge=p=>p&&p.kid?Math.max(1,KY()-(+p.kid.by||KY()-8)):0;
const kBand=p=>kAge(p)<=7?'s':'b';
const KB=(p=P())=>KBAND[kBand(p)];
function kEnsure(p){const k=p.kid;k.mem=k.mem||{};k.st=k.st||{};k.qz=k.qz||{};k.bd=k.bd||{};k.rew=k.rew||[];return k}
const kd=(key=dk(),p=P())=>{const d=day(key,p);d.k=d.k||{};const x=d.k;x.d=x.d||{};x.ap=x.ap||{};x.n=x.n||{};x.dr=x.dr||{};x.j=x.j||0;return x};
const kpeek=(key,p)=>(p.days[key]&&p.days[key].k)||null;
const cnt=o=>Object.values(o||{}).filter(Boolean).length;
const kDayStars=x=>x?cnt(x.d)+cnt(x.ap)+cnt(x.n)+Math.min(5,x.j||0)+(x.ch?2:0):0;
function kStars(p=P()){const k=kEnsure(p);return Object.values(p.days).reduce((a,d)=>a+kDayStars(d&&d.k),0)+Object.keys(k.st).length+Object.values(k.qz).reduce((a,q)=>a+(q.s||0),0)+Object.keys(k.mem).length*3+(k.kal?3:0)}
function kToday(p=P()){const k=kEnsure(p),T=dk();return kDayStars(kpeek(T,p))+Object.values(k.st).filter(x=>x===T).length+Object.values(k.qz).filter(q=>q.d===T).reduce((a,q)=>a+q.s,0)+Object.values(k.mem).filter(x=>x===T).length*3+(k.kal===T?3:0)}
const kActiveDay=(p,key)=>kDayStars(kpeek(key,p))>0||Object.values(kEnsure(p).st).includes(key)||Object.values(kEnsure(p).mem).includes(key);
function kStreak(p=P()){let n=0,d=new Date();if(!kActiveDay(p,dk(d)))d=addD(d,-1);while(kActiveDay(p,dk(d))){n++;d=addD(d,-1)}return n}
function kTree(st){let i=0;while(i<TREE.length-1&&st>=TREE[i+1][0])i++;const nx=TREE[i+1];return{i,e:TREE[i][1],pct:nx?(st-TREE[i][0])/(nx[0]-TREE[i][0]):1,left:nx?nx[0]-st:0}}
const kStickers=(p,st=kStars(p))=>Math.min(STK.length,Math.max(kEnsure(p).stk||0,Math.floor(st/5)));
const kBadges=p=>KBD.filter(b=>b!=='quiz'||kBand(p)==='b');
function kBadgeOk(b,p){const k=kEnsure(p),bn=kBand(p),days=Object.values(p.days).map(d=>d&&d.k).filter(Boolean);
  switch(b){case'first':return kStars(p)>=1;case'd7':return kStreak(p)>=7;case'dua3':return Object.keys(k.mem).length>=3;case'kal':return!!k.kal;case'st5':return Object.keys(k.st).length>=5;
  case'allday':return days.some(x=>KBAND[bn].deeds.every(z=>x.d&&x.d[z]));
  case'nz':return bn==='b'?days.some(x=>NZ.every(([z])=>x.n&&x.n[z])):days.reduce((a,x)=>a+Math.min(5,x.j||0),0)>=5;
  case'quiz':return Object.values(k.qz).some(q=>q.s>=3)}return false}
const kPending=p=>{const x=kpeek(dk(),p);return x?Object.keys(x.d||{}).filter(z=>x.d[z]&&!(x.ap&&x.ap[z])).length:0};
// ---- awaaz (Web Speech API) — sirf jab is zabaan ki awaaz device par mojood ho ----
let kVoices=[];const kLoadV=()=>{try{kVoices=speechSynthesis.getVoices()||[]}catch(e){kVoices=[]}};
const KVL={ru:['en-IN','en'],en:['en'],ur:['ur'],hi:['hi'],ar:['ar'],bn:['bn'],id:['id']};
function kVoice(l){const pref=l==='arabic'?['ar']:(KVL[L]||[]);for(const c of pref){const v=kVoices.find(v=>(v.lang||'').toLowerCase().replace('_','-').startsWith(c.toLowerCase()));if(v)return v}return null}
const kSndOn=()=>S.set.ksnd!==false;
function kSay(txt,l){try{const v=kVoice(l);if(!v||!kSndOn())return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(txt).replace(/<[^>]+>/g,' ').replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu,''));u.voice=v;u.lang=v.lang;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
let kBuf=[];
const kS=(txt,l)=>kSndOn()&&kVoice(l)?`<button class="kspk" data-act="ksay" data-a="${kBuf.push([txt,l])-1}" aria-label="${esc(t('k.listen'))}">🔊</button>`:'';
if('speechSynthesis' in window){kLoadV();try{speechSynthesis.addEventListener('voiceschanged',()=>{kLoadV();if(S&&P()&&P().kid)render()})}catch(e){}}
function party(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=document.createElement('div');el.className='party';el.setAttribute('aria-hidden','true');const E=['⭐','🌟','✨','🌸','🎉','💚'];
  el.innerHTML=[...Array(26)].map((_,i)=>`<span style="left:${(Math.random()*100).toFixed(1)}%;animation-delay:${(Math.random()*.5).toFixed(2)}s;font-size:${18+Math.round(Math.random()*18)}px">${E[i%E.length]}</span>`).join('');document.body.appendChild(el);setTimeout(()=>el.remove(),2600)}
function kStarFx(n=1){const m=t('k.ts.'+Math.floor(Math.random()*4),{n:N(n)});toast(m);if(kBand(P())==='s')kSay(m.replace(/\+.*/,''))}
function kCheck(){const p=P(),k=kEnsure(p),st=kStars(p);let msg=null;
  kBadges(p).forEach(b=>{if(!k.bd[b]&&kBadgeOk(b,p)){k.bd[b]=dk();msg=msg||[KBDE[b],t('k.newBadge'),t('k.bd.'+b+'.t')]}});
  const n=Math.min(STK.length,Math.floor(st/5));if(n>(k.stk||0)){msg=msg||[STK[n-1],t('k.newSticker'),t('k.stickerTxt')];k.stk=n}
  if(k.goal&&!k.goal.hit&&st-k.goal.base>=k.goal.n){k.goal.hit=dk();msg=msg||['🎁',t('k.goalHit'),esc(k.goal.r)]}
  save();if(msg){party();modal(`<div class="kcele"><div class="e">${msg[0]}</div><p class="big">${msg[1]}</p><p class="mute">${msg[2]}</p><button class="btn full" data-act="mclose">${t('k.yay')}</button></div>`);kSay(msg[1])}}
// ---- kid UI ----
let ktab='kh',kFlip={},kQ=null,kP=null;
function kGo(x){ktab=x;window.scrollTo(0,0);render()}
function kRender(){const p=P(),k=kEnsure(p);if(kBuf.length>600)kBuf=[];
  $('#hName').textContent=t('k.hi',{n:p.name});$('#hAv').textContent=p.emo;
  document.querySelectorAll('#knav .tab').forEach(b=>b.classList.toggle('on',b.dataset.a===ktab));
  const v=$('#v-kid');v.className='view on kb-'+kBand(p);v.innerHTML=({kh:kBand(p)==='s'?kHomeS:kHomeB,kd:kDuas,ks:kStories,kr:kRewards})[ktab](p,k)}
function kTreeCard(p){const st=kStars(p),tr=kTree(st),n=Math.floor(st/5),nxt=n<STK.length?5-(st%5):0;
  return`<div class="card ktree"><div class="te">${tr.e}</div><div class="sp"><div class="kst">⭐ ${N(st)}</div><div class="mute">${t('k.tr.'+tr.i)} · ${t('k.todayStars',{n:N(kToday(p))})}</div><div class="bar"><i style="width:${Math.round(tr.pct*100)}%"></i></div><div class="mute" style="margin-top:6px">${nxt?t('k.nextSticker',{n:N(nxt)}):t('k.allStickers')}</div></div></div>`}
function kKalima(k){return`<div class="card gold"><h2>${t('k.kalH')} <em>+3 ⭐</em></h2><div class="ar c">${KAL.ar}</div>${trOn()?`<div class="tr" dir="ltr" style="text-align:center">${KAL.tr}</div>`:''}<p style="margin:6px 0">${t('k.kalM')}</p><div class="ref" dir="ltr">${KAL.ref}</div>
  <div class="row" style="margin-top:12px">${kS(KAL.ar,'arabic')}<span class="sp"></span>${k.kal?`<span class="tag">✓ ${t('k.memDone')}</span>`:`<button class="btn sm" data-act="kkal">${t('k.memBtn')}</button>`}</div></div>`}
function kStoryTile(p){const B=KB(p),id=B.stories[dayNo()%B.stories.length],r=kEnsure(p).st[id];
  return`<button class="card kstory" data-act="kstory" data-a="${id}"><span class="e">${KST[id][0]}</span><span class="sp"><span class="mute">${t('k.storyToday')}</span><b>${t('k.s.'+id+'.t')}</b></span>${r?'<span class="tag">✓</span>':'<span class="chev">›</span>'}</button>`}
function kHomeS(p,k){const x=kd(),B=KB(p);let h=kTreeCard(p);
  h+=`<h3 class="kh">${t('k.deedsH')}</h3><div class="ktiles">`+B.deeds.map(z=>{const on=x.d[z];return`<div class="ktile ${on?'on':''}" role="button" tabindex="0" data-act="kdeed" data-a="${z}"><span class="e">${KDD[z][0]}</span><b>${t('k.dd.'+z)}</b>${on?'<i class="ok">⭐</i>':''}${kS(t('k.dd.'+z))}</div>`}).join('')+`</div>`;
  h+=`<div class="card knz"><div class="row"><span class="e">🕌</span><div class="sp"><b class="kbig">${t('k.nzJoin')}</b><div class="pips">${[0,1,2,3,4].map(i=>`<i class="${i<(x.j||0)?'on':''}"></i>`).join('')}</div></div>${kS(t('k.nzJoin'))}</div>
   <div class="row" style="margin-top:14px"><button class="btn" data-act="kjoin">${t('k.nzJoinBtn')}</button><span class="sp"></span>${x.j?`<button class="btn ghost sm" data-act="kjoinU" aria-label="${esc(t('k.undo'))}">↶</button>`:''}</div></div>`;
  return h+kStoryTile(p)+kKalima(k)}
function kHomeB(p,k){const x=kd(),B=KB(p),ci=dayNo()%12;let h=kTreeCard(p);
  h+=`<div class="card"><h2>${t('k.nzH')} <em>${fr(NZ.filter(([z])=>x.n[z]).length,5)}</em></h2><div class="namaz">${NZ.map(([z,e])=>`<button class="nz ${x.n[z]?'on':''}" data-act="knz" data-a="${z}"><span class="c">${x.n[z]?'✓':e}</span><b>${nzN(z)}</b></button>`).join('')}</div><p class="ref">${t('k.nzNote')}</p></div>`;
  h+=`<div class="card gold"><h2>${t('k.chH')} <em>+2 ⭐</em></h2><p class="big">${t('k.ch.'+ci)}</p>${x.ch?`<button class="btn done" data-act="kch">${t('k.chDone')}</button>`:`<button class="btn" data-act="kch">${t('k.chBtn')}</button>`}</div>`;
  h+=`<div class="card"><h2>${t('k.deedsH')} <em>${fr(B.deeds.filter(z=>x.d[z]).length,B.deeds.length)}</em></h2>`+B.deeds.map(z=>`<button class="chk ${x.d[z]?'on':''}" data-act="kdeed" data-a="${z}"><span class="bx">${x.d[z]?'✓':''}</span><span class="t">${KDD[z][0]} ${t('k.dd.'+z)}<small class="ref" dir="ltr">${KDD[z][1]}</small></span>${x.ap[z]?'<span class="tag">+⭐</span>':''}</button>`).join('')+`</div>`;
  return h+kStoryTile(p)+kKalima(k)}
function kDuas(p,k){const B=KB(p),x=kd(),reps=B.reps;
  return`<p class="mute khint">${t('k.duaHint',{n:N(reps)})}</p>`+B.duas.map(key=>{const du=D.duas.find(z=>z.k===key);if(!du)return'';const c=x.dr[key]||0,m=k.mem[key],fl=kFlip[key];
   return`<div class="kflip ${fl?'on':''}"><div class="in">
   <div class="card front" aria-hidden="${fl?'true':'false'}"><div class="row"><span class="e">${du.e}</span><b class="sp">${esc(duaTitle(du))}</b>${m?`<span class="tag">🏅 ${t('k.memDone')}</span>`:''}</div><div class="ar c">${esc(du.ar)}</div>
    <div class="row">${kS(du.ar,'arabic')}<span class="sp"></span><button class="btn ghost sm" data-act="kflip" data-a="${key}">🔄 ${t('k.flip')}</button></div></div>
   <div class="card back" aria-hidden="${fl?'false':'true'}"><div class="row"><span class="e">${du.e}</span><b class="sp">${esc(duaTitle(du))}</b></div><p class="big kmean">${t('k.du.'+key)}</p>${trOn()?`<div class="tr" dir="ltr">${esc(du.tr)}</div>`:''}<div class="ref" dir="ltr">${esc(du.ref)}</div>
    <div class="row" style="margin-top:8px">${kS(t('k.du.'+key))}<span class="sp"></span><button class="btn ghost sm" data-act="kflip" data-a="${key}">🔄 ${t('k.flip')}</button></div></div></div></div>
   <div class="krep"><button class="btn ${c>=reps?'done':'ghost'}" data-act="krep" data-a="${key}">🔁 ${t('k.repeat')} ${fr(Math.min(c,reps),reps)}</button>${m?'':c>=reps?`<button class="btn" data-act="kmem" data-a="${key}">${t('k.memBtn')} +3 ⭐</button>`:''}</div>`}).join('')+`<p class="note">${t('k.alim')}</p>`}
function kStories(p,k){const B=KB(p);
  return`<p class="mute khint">${t('k.storiesHint')}</p><div class="ktiles">`+B.stories.map(id=>`<div class="ktile st ${k.st[id]?'on':''}" role="button" tabindex="0" data-act="kstory" data-a="${id}"><span class="e">${KST[id][0]}</span><b>${t('k.s.'+id+'.t')}</b>${k.st[id]?'<i class="ok">✓</i>':''}${k.qz[id]?`<span class="mute">🧠 ${fr(k.qz[id].s,3)}</span>`:''}</div>`).join('')+`</div><p class="note">${t('k.noImg')}<br>${t('k.alim')}</p>`}
function kStoryView(){const id=kQ.id,p=P(),k=kEnsure(p),lines=t('k.s.'+id+'.b').split('|');
  let h=`<div class="kstoryv ${kBand(p)}"><div class="e">${KST[id][0]}</div><div style="text-align:center">${kS(t('k.s.'+id+'.t')+'. '+lines.join(' ')+' '+t('k.s.'+id+'.m'))}</div>`+lines.map(l=>`<p>${esc(l)}</p>`).join('')+
   `<div class="card gold"><b>🌟 ${t('k.moral')}</b><p style="margin:6px 0 0">${t('k.s.'+id+'.m')}</p></div><p class="ref" dir="ltr">${KST[id][1]}</p>`;
  h+=k.st[id]?`<p class="kdone">✓ ${t('k.readDone')}</p>`:`<button class="btn full" data-act="kread">${t('k.readBtn')} +1 ⭐</button>`;
  const C=KST[id][2];
  if(C&&k.st[id]){h+=`<div class="card"><h2>${t('k.quizH')}</h2>`+C.map((c,qi)=>{const tr=kQ.a[qi]||[],done=tr.includes(c),opts=t('k.s.'+id+'.q'+(qi+1)+'o').split('|'),rot=(qi+id.length)%3;
     return`<div class="kq"><p><b>${N(qi+1)}. ${t('k.s.'+id+'.q'+(qi+1))}</b></p>${[0,1,2].map(j=>(j+rot)%3).map(oi=>`<button class="kopt ${tr.includes(oi)?(oi===c?'ok':'no'):''}" data-act="kans" data-a="${qi}|${oi}" ${done?'disabled':''}>${esc(opts[oi]||'')}</button>`).join('')}${done?`<p class="kfb ok">${t('k.right')}</p>`:tr.length?`<p class="kfb">${t('k.tryAgain')}</p>`:''}</div>`}).join('');
    if(C.every((c,i)=>(kQ.a[i]||[]).includes(c)))h+=`<p class="big" style="text-align:center">${t('k.quizScore',{n:N(C.filter((c,i)=>kQ.a[i][0]===c).length)})}</p>`;h+=`</div>`}
  return h+`</div>`}
function kRewards(p,k){const st=kStars(p),tr=kTree(st),n=kStickers(p,st),bn=kBand(p);
  let h=`<div class="card ktree big"><div class="te">${tr.e}</div><p class="big">${t('k.tr.'+tr.i)}</p><div class="kst">⭐ ${N(st)}</div><div class="bar"><i style="width:${Math.round(tr.pct*100)}%"></i></div><p class="mute">${tr.left?t('k.treeNext',{n:N(tr.left)}):t('k.treeFull')}</p>
   <div class="stat3"><div><b>${N(kToday(p))}</b><span>${t('k.statToday')}</span></div><div><b>🔥 ${N(kStreak(p))}</b><span>${t('k.statDays')}</span></div><div><b>${N(Object.keys(k.mem).length)}</b><span>${t('k.statDuas')}</span></div></div></div>`;
  if(k.goal){const g=k.goal,got=Math.min(g.n,st-g.base);h+=`<div class="card gold"><h2>${t('k.goalH')} <em>🎁</em></h2><p class="big">${esc(g.r)}</p><div class="bar"><i style="width:${Math.round(got/g.n*100)}%"></i></div><p class="mute">${got>=g.n?t('k.goalReady'):t('k.goalProg',{a:N(Math.max(0,got)),b:N(g.n)})}</p></div>`}
  h+=`<div class="card"><h2>${t('k.stickersH')} <em>${fr(n,STK.length)}</em></h2><div class="kstk">${STK.map((e,i)=>`<span class="${i<n?'on':''}">${i<n?e:'❔'}</span>`).join('')}</div></div>`;
  h+=`<div class="card"><h2>${t('k.badgesH')} <em>${fr(kBadges(p).filter(b=>k.bd[b]).length,kBadges(p).length)}</em></h2><div class="kbd">${kBadges(p).map(b=>`<div class="${k.bd[b]?'on':''}"><span>${KBDE[b]}</span><b>${t('k.bd.'+b+'.t')}</b><small>${t('k.bd.'+b+(b==='nz'&&bn==='s'?'.ds':'.d'))}</small></div>`).join('')}</div></div>`;
  if(kVoice()||kVoice('arabic'))h+=`<p style="text-align:center"><button class="chip ${kSndOn()?'on':''}" data-act="ksnd">${kSndOn()?'🔊':'🔇'} ${t('k.sound')}</button></p>`;
  return h+`<p class="note">${t('k.bandLbl',{a:N(kAge(p)),b:t('k.band.'+bn)})}<br>${t('k.alim')}</p>`}
function kLeave(){let to=S.adult&&S.profiles[S.adult]&&!S.profiles[S.adult].kid?S.adult:Object.keys(S.profiles).find(i=>!S.profiles[i].kid);if(!to)return;S.active=to;save();ktab='kh';go('home');toast(P().emo+' '+t('k.leaveTs'))}
// ---- parent (bade) ka view ----
function kFamRow(id,p){return`<div class="member"><div class="ring kring"><span>${p.emo}</span></div><div class="sp"><b>${esc(p.name)}</b> <span class="tag">🧒 ${t('k.band.'+kBand(p))}</span><br><span class="mute">${t('k.pLine',{s:N(kStars(p)),t:N(kToday(p)),d:N(kStreak(p))})}</span>${kPending(p)?`<br><span class="mute">${t('k.pPending',{n:N(kPending(p))})}</span>`:''}
  <div class="row" style="margin-top:8px;flex-wrap:wrap"><button class="btn ghost sm" data-act="kpar" data-a="${id}">${t('k.pView')}</button><button class="btn sm" data-act="sw" data-a="${id}">${t('k.openKid')}</button></div></div><button class="mute medit" data-act="edM" data-a="${id}" aria-label="${esc(t('k.editT'))}">✎</button></div>`}
function kParView(){const p=S.profiles[kP];if(!p||!p.kid)return'';const k=kEnsure(p),st=kStars(p),x=kpeek(dk(),p)||{},bn=kBand(p),B=KBAND[bn],tr=kTree(st);
  let h=`<div class="card ktree"><div class="te">${tr.e}</div><div class="sp"><div class="kst">${p.emo} ${esc(p.name)} · ⭐ ${N(st)}</div><div class="mute">${t('k.bandLbl',{a:N(kAge(p)),b:t('k.band.'+bn)})}</div><div class="mute">${t('k.pLine',{s:N(st),t:N(kToday(p)),d:N(kStreak(p))})}</div></div></div>`;
  h+=`<div class="card"><h2>${t('k.pToday')} <em>${t('k.todayStars',{n:N(kToday(p))})}</em></h2>`+B.deeds.map(z=>{const dn=x.d&&x.d[z],ap=x.ap&&x.ap[z];return`<div class="qrow"><span class="e">${KDD[z][0]}</span><span class="t">${t('k.dd.'+z)}<small class="mute" style="display:block">${dn?(ap?t('k.pApproved'):t('k.pDone')):t('k.pNotYet')}</small></span>${dn&&!ap?`<button class="btn sm" data-act="kapp" data-a="${z}">${t('k.pApprove')}</button>`:ap?'<span class="tag">+⭐</span>':''}</div>`}).join('')+
   `<p class="mute" style="margin-bottom:0">🕌 ${bn==='b'?t('k.nzH')+': '+fr(cnt(x.n),5):t('k.nzJoin')+': '+N(x.j||0)}</p></div>`;
  const W=[...Array(7)].map((_,i)=>addD(new Date(),i-6)),V=W.map(d=>kDayStars(kpeek(dk(d),p))),mx=Math.max(4,...V);
  h+=`<div class="card"><h2>${t('k.pWeek')}</h2><div class="week">${W.map((d,i)=>`<div><span>${N(V[i])}</span><i style="height:${Math.round(V[i]/mx*60)+4}px"></i>${wd(d)}</div>`).join('')}</div></div>`;
  const mem=B.duas.filter(z=>k.mem[z]).map(z=>{const du=D.duas.find(y=>y.k===z);return du?du.e+' '+esc(duaTitle(du)):''});
  h+=`<div class="card"><h2>${t('k.pProg')}</h2><p class="mute" style="margin-top:0">${t('k.pProgTxt',{d:N(Object.keys(k.mem).length),dt:N(B.duas.length),s:N(Object.keys(k.st).length),st:N(B.stories.length),b:N(kBadges(p).filter(b=>k.bd[b]).length),bt:N(kBadges(p).length),k:N(kStickers(p,st))})}</p>${k.kal?`<span class="chip on">💚 ${t('k.kalH')}</span>`:''}${mem.map(m=>`<span class="chip on">${m}</span>`).join('')}</div>`;
  if(k.goal){const g=k.goal,got=Math.min(g.n,st-g.base),hit=got>=g.n;h+=`<div class="card gold"><h2>${t('k.goalH')} <em>🎁</em></h2><p class="big">${esc(g.r)}</p><div class="bar"><i style="width:${Math.round(Math.max(0,got)/g.n*100)}%"></i></div><p class="mute">${hit?t('k.goalReady'):t('k.goalProg',{a:N(Math.max(0,got)),b:N(g.n)})}</p><div class="row">${hit?`<button class="btn sm" data-act="kgoalGive">${t('k.goalGive')}</button>`:''}<span class="sp"></span><button class="btn ghost sm" data-act="kgoalDel">${t('k.goalDel')}</button></div></div>`}
  else h+=`<div class="card"><h2>${t('k.goalSet')}</h2><p class="mute" style="margin-top:0">${t('k.goalTxt')}</p><label class="f">${t('k.goalStars')}</label><div id="kgN" data-v="20">${[10,20,30,50].map(v=>`<button class="chip ${v===20?'on':''}" data-act="kgN" data-a="${v}">⭐ ${N(v)}</button>`).join('')}</div><label class="f">${t('k.goalReward')}</label><input id="kgR" maxlength="40" placeholder="${esc(t('k.goalPh'))}"><button class="btn full" data-act="kgoalOk" style="margin-top:12px">${t('k.goalOk')}</button></div>`;
  if(k.rew.length)h+=`<div class="card"><h2>${t('k.rewPast')}</h2>${k.rew.slice(-10).reverse().map(r=>`<div class="qrow"><span class="e">🎁</span><span class="t">${esc(r.r)}<small class="mute" style="display:block">⭐ ${N(r.n)} · ${fmtDay(r.d)}</small></span></div>`).join('')}</div>`;
  return h+`<p class="note">${t('k.pNote')}<br>${t('k.alim')}</p>`}
function memberModal(id){const p=id?S.profiles[id]:null,y=KY(),isK=!!(p&&p.kid),by=isK?+p.kid.by:y-6,e0=p?p.emo:EMO[0];
  modal(`<div style="max-height:78vh;overflow:auto"><p class="big">${id?t('k.editT'):t('fm.newT')}</p><label class="f">${t('set.name')}</label><input id="mN" maxlength="24" value="${esc(p?p.name:'')}" placeholder="${esc(t('fm.namePh'))}">
  <label class="f">${t('fm.emoji')}</label><div class="row" style="flex-wrap:wrap" data-sel="${e0}">${EMO.concat(KEMO).map(e=>`<button class="av" data-act="pickE" data-a="${e}" style="${e===e0?'outline:2px solid var(--pri)':''}">${e}</button>`).join('')}</div>
  <button class="chk ${isK?'on':''}" data-act="kKidT" id="mKid"><span class="bx">${isK?'✓':''}</span><span class="t">🧒 ${t('k.isKid')}<small>${t('k.isKidSub')}</small></span></button>
  <div id="mKidY" class="${isK?'':'hide'}"><label class="f">${t('k.birthYear')}</label><select id="mBy">${[...Array(11)].map((_,i)=>y-3-i).map(v=>`<option value="${v}" ${v===by?'selected':''}>${v} · ${t('k.ageN',{n:N(y-v)})} · ${t('k.band.'+(y-v<=7?'s':'b'))}</option>`).join('')}</select></div></div>
  <div class="row" style="margin-top:18px"><button class="btn ghost" data-act="mclose">${t('u.cancel')}</button><span class="sp"></span><button class="btn" data-act="addMOk" data-a="${id||''}">${id?t('u.save'):t('fm.addOk')}</button></div>`)}
function kSaveMember(id){const n=$('#mN').value.trim();if(!n){$('#mN').focus();return}const e=document.querySelector('[data-act="pickE"]').parentNode.dataset.sel||EMO[0];
  const isK=$('#mKid').classList.contains('on'),by=+($('#mBy')||{}).value||KY()-6;
  const adults=Object.keys(S.profiles).filter(i=>!S.profiles[i].kid&&i!==id);if(isK&&id&&!adults.length){toast(t('k.needAdult'));return}
  let p=id?S.profiles[id]:null,nw=!p;if(!p){id=uid();p=S.profiles[id]=fresh(n)}p.name=n;p.emo=e;
  if(isK){p.kid=Object.assign(p.kid||p.kidPrev||{},{by});delete p.kidPrev;if(id===S.active)S.adult=adults[0]}else if(p.kid){p.kidPrev=p.kid;delete p.kid}
  save();mclose();render();resheet();toast(nw?t('ts.added',{n}):t('ts.saved'))}
const KACT={
 kgo:a=>kGo(a),
 kdeed:a=>{const x=kd();x.d[a]=x.d[a]?0:1;if(!x.d[a])delete x.ap[a];save();render();if(x.d[a]){kStarFx();kCheck()}},
 kjoin:()=>{const x=kd();if((x.j||0)>=5){toast(t('k.nzMax'));return}x.j=(x.j||0)+1;save();render();kStarFx();kCheck()},
 kjoinU:()=>{const x=kd();x.j=Math.max(0,(x.j||0)-1);save();render()},
 knz:a=>{const x=kd();x.n[a]=x.n[a]?0:1;save();render();if(x.n[a]){kStarFx();kCheck()}},
 kch:()=>{const x=kd();x.ch=x.ch?0:1;save();render();if(x.ch){kStarFx(2);kCheck()}},
 kkal:()=>{const k=kEnsure(P());if(k.kal)return;k.kal=dk();save();render();kStarFx(3);kCheck()},
 kflip:a=>{kFlip[a]=!kFlip[a];render()},
 krep:a=>{const x=kd(),r=KB().reps;x.dr[a]=(x.dr[a]||0)+1;save();navigator.vibrate&&navigator.vibrate(10);render();if(x.dr[a]===r&&!kEnsure(P()).mem[a])toast(t('k.repDone'))},
 kmem:a=>{const k=kEnsure(P());if(k.mem[a])return;k.mem[a]=dk();save();render();kStarFx(3);kCheck()},
 kstory:a=>{kQ={id:a,a:{}};sheet(()=>t('k.s.'+kQ.id+'.t'),kStoryView)},
 kread:()=>{const k=kEnsure(P());if(k.st[kQ.id])return;k.st[kQ.id]=dk();save();resheet();kStarFx();kCheck()},
 kans:a=>{const [qi,oi]=a.split('|').map(Number),C=KST[kQ.id][2],tr=kQ.a[qi]=kQ.a[qi]||[];if(tr.includes(C[qi])||tr.includes(oi))return;tr.push(oi);
   if(oi===C[qi])kSay(t('k.right'));
   if(C.every((c,i)=>(kQ.a[i]||[]).includes(c))){const sc=C.filter((c,i)=>kQ.a[i][0]===c).length,k=kEnsure(P()),pr=k.qz[kQ.id],old=pr?pr.s:0;
     if(sc>old){k.qz[kQ.id]={s:sc,d:dk()};save();kStarFx(sc-old)}if(sc===3)party();kCheck()}
   resheet()},
 ksay:a=>{const x=kBuf[+a];x&&kSay(x[0],x[1])},
 ksnd:()=>{S.set.ksnd=!kSndOn();if(!S.set.ksnd)try{speechSynthesis.cancel()}catch(e){}save();render()},
 kexit:()=>modal(S.set.kpin?`<p class="big">🔒 ${t('k.pinT')}</p><input id="kPin" type="password" inputmode="numeric" maxlength="6" autocomplete="off" dir="ltr"><div class="row" style="margin-top:16px"><button class="btn ghost" data-act="mclose">${t('u.cancel')}</button><span class="sp"></span><button class="btn" data-act="kpinOk">${t('u.ok')}</button></div>`
   :`<p class="big">${t('k.exitT')}</p><p class="mute">${t('k.exitTxt')}</p><div class="row" style="margin-top:16px"><button class="btn ghost" data-act="mclose">${t('u.no')}</button><span class="sp"></span><button class="btn" data-act="kleave">${t('k.exitYes')}</button></div>`),
 kpinOk:()=>{if($('#kPin').value===S.set.kpin){mclose();kLeave()}else{toast(t('k.pinBad'));$('#kPin').value=''}},
 kleave:()=>{mclose();kLeave()},
 // parent
 edM:a=>memberModal(a),
 kKidT:(a,el)=>{el.classList.toggle('on');const on=el.classList.contains('on');el.querySelector('.bx').textContent=on?'✓':'';$('#mKidY').classList.toggle('hide',!on)},
 kpar:a=>{kP=a;sheet(()=>{const p=S.profiles[kP];return(p?p.emo+' '+p.name+' · ':'')+t('k.pView')},kParView)},
 kapp:a=>{const p=S.profiles[kP],x=kd(dk(),p);if(!x.d[a])return;x.ap[a]=1;save();resheet();toast(t('k.pApprovedTs'))},
 kgN:(a,el)=>{document.querySelectorAll('[data-act="kgN"]').forEach(b=>b.classList.toggle('on',b===el));$('#kgN').dataset.v=a},
 kgoalOk:()=>{const p=S.profiles[kP],k=kEnsure(p);k.goal={n:+$('#kgN').dataset.v||20,r:$('#kgR').value.trim()||t('k.goalDefault'),base:kStars(p),set:dk()};save();resheet();toast(t('k.goalSetTs'))},
 kgoalGive:()=>{const p=S.profiles[kP],k=kEnsure(p);if(!k.goal)return;k.rew.push({r:k.goal.r,n:k.goal.n,d:dk()});k.goal=null;save();resheet();party();toast(t('k.goalGiven'))},
 kgoalDel:()=>{if(confirm(t('k.goalCf'))){kEnsure(S.profiles[kP]).goal=null;save();resheet()}},
 kpinDel:()=>{delete S.set.kpin;save();resheet();toast(t('ts.saved'))},
};
Object.assign(ACT,KACT);
document.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&ev.target.id==='kPin')ACT.kpinOk();else if((ev.key==='Enter'||ev.key===' ')&&ev.target.classList&&ev.target.classList.contains('ktile')){ev.preventDefault();ev.target.click()}});
