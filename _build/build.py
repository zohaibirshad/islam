#!/usr/bin/env python3
"""Mera Deen Safar build: template_head.html + app.js + kids.js + data.json + i18n/*.json -> ../index.html
   Har zabaan ki file: i18n/<code>.json = {"ui":{key:text}, "content":{id:text|{t,m,a}}}"""
import json,glob,os
H=os.path.dirname(os.path.abspath(__file__))
rd=lambda p:open(os.path.join(H,p),encoding='utf-8').read()
D=json.loads(rd('data.json'))
ui,ct={},{}
for f in sorted(glob.glob(os.path.join(H,'i18n','*.json'))):
    code=os.path.basename(f)[:-5]; o=json.load(open(f,encoding='utf-8'))
    ui[code]=o.get('ui',{})
    kf=os.path.join(H,'i18n','kids',code+'.json')   # Bachon ka mode ki strings (k.*)
    if os.path.exists(kf): ui[code].update(json.load(open(kf,encoding='utf-8')))
    if o.get('content'): ct[code]=o['content']
J=lambda x:json.dumps(x,ensure_ascii=False,separators=(',',':'))
app=rd('app.js').replace('/*KIDS*/',rd('kids.js'),1).replace('/*DATA*/',J(D),1).replace('/*I18N*/',J(ui),1).replace('/*CONTENT*/',J(ct),1)
out=rd('template_head.html')+'<script>\n'+app+'</script>\n</body>\n</html>\n'
open(os.path.join(H,'..','index.html'),'w',encoding='utf-8').write(out)
print('index.html', len(out.encode()),'bytes; langs:',', '.join(f"{k}({len(v)} ui, {len(ct.get(k,{}))} content)" for k,v in ui.items()))
