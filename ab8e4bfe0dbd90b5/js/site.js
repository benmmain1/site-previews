(() => {
 'use strict';
 const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)'),button=document.querySelector('.motion-button');
 const kind=document.body.dataset.trade,brand=document.body.dataset.brand,business=(document.body.dataset.business||'').toLowerCase();
 let ctx=null,enabled=!reduce.matches;
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
 const hero=$('.hero'),art=$('.hero-art',hero),quickbar=null;
 const mobileMenu=$('.mobile-menu');if(mobileMenu){mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.open=false));document.addEventListener('keydown',e=>{if(e.key==='Escape')mobileMenu.open=false})}
 // The selector labels and target anchors come from actual content, not invented service names.
 const services=$$('.service');
 $$('.tool-cutout',hero).forEach((tool,i)=>{const service=services[i];if(service){tool.href='#'+service.id;tool.setAttribute('aria-label',service.querySelector('h3').textContent.trim());const slot=$(`[data-dock="${i}"]`);if(slot)slot.textContent=service.querySelector('h3').textContent.trim()}});

 function connectPipe(){
  const extension=$('.hero-pipe-extension'),continuation=$('.page-pipe-continuation');
  if(!extension||!continuation)return;
  const left=business==='lakeside plumbing services llc',heater=business==='water heater specialists llc';
  const source=$(heater?'.plumbing-heater [data-outlet="heater"]':left?'.plumbing-general [data-outlet="left"]':'.plumbing-general [data-outlet="down"]',hero);
  if(!source)return;
  const scene=source.ownerSVGElement,matrix=source.getScreenCTM();if(!matrix)return;
  const point=scene.createSVGPoint();point.x=Number(source.dataset.outletX);point.y=Number(source.dataset.outletY);
  const actual=point.matrixTransform(matrix),box=hero.getBoundingClientRect(),main=continuation.parentElement,mainBox=main.getBoundingClientRect();
  const sx=actual.x-box.left,sy=actual.y-box.top,width=box.width,height=box.height;
  const diameter=Number(source.dataset.outletWidth)*Math.hypot(matrix.a,matrix.b),gutter=Math.max(14,diameter/2+6),tx=left?gutter:width-gutter;
  const delta=Math.abs(tx-sx),radius=Math.max(4,Math.min(diameter*.9,delta/2.4,(height-sy-5)/2.4));
  let route;
  if(left){route=`M${sx} ${sy}H${tx+radius}Q${tx} ${sy} ${tx} ${sy+radius}V${height}`}
  else{const y=sy+Math.max(4,diameter*.45);route=`M${sx} ${sy}V${y}Q${sx} ${y+radius} ${sx+radius} ${y+radius}H${tx-radius}Q${tx} ${y+radius} ${tx} ${y+2*radius}V${height}`}
  const parent=hero.parentElement,from=parent.classList.contains('pin-spacer')?parent.getBoundingClientRect().bottom-mainBox.top:box.bottom-mainBox.top;
  const fullHeight=main.offsetHeight;
  for(const [el,d,h]of [[extension,route,height],[continuation,`M${tx} ${from}V${fullHeight-20}`,fullHeight]]){
   el.setAttribute('viewBox',`0 0 ${width} ${h}`);
   const gradient=$('linearGradient',el);gradient.setAttribute('x1',tx-diameter/2);gradient.setAttribute('x2',tx+diameter/2);gradient.setAttribute('y1','0');gradient.setAttribute('y2','0');
   $$('.connected-shell,.connected-sheen,.connected-flow',el).forEach(path=>path.setAttribute('d',d));
   $('.connected-shell',el).setAttribute('stroke-width',diameter);
   $('.connected-sheen',el).setAttribute('stroke-width',Math.max(1,diameter*.045));
   $('.connected-flow',el).setAttribute('stroke-width',Math.max(1.5,diameter*.09));
   el.dataset.pipeDiameter=diameter;el.dataset.pipeX=tx;el.dataset.pipeStart=from;
  }
  const socket=$('.connected-socket',extension);socket.setAttribute('rx',diameter*.06);
  socket.setAttribute('x',sx-diameter*(left?.22:.64));socket.setAttribute('y',sy-diameter*(left?.64:.22));socket.setAttribute('width',diameter*(left?.44:1.28));socket.setAttribute('height',diameter*(left?1.28:.44));
  $('.connected-socket',continuation).setAttribute('display','none');
  extension.dataset.sourceX=sx;extension.dataset.sourceY=sy;extension.dataset.pipeEnd=height;
 }
 if(window.ScrollTrigger)ScrollTrigger.addEventListener('refresh',connectPipe);
 addEventListener('load',()=>requestAnimationFrame(connectPipe));addEventListener('resize',()=>requestAnimationFrame(connectPipe));
 document.fonts.ready.then(()=>requestAnimationFrame(connectPipe));requestAnimationFrame(connectPipe);

 function setup(){
  if(!window.gsap||!window.ScrollTrigger||!enabled){root.classList.remove('js');return}
  root.classList.add('js');gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
  ctx=gsap.context((self)=>{
   const mobile=innerWidth<761;
   const longStory=['handyman','roofing','hvac','tree-service','landscape'].includes(kind);
   hero.style.setProperty('--pin-offset',mobile?Math.max(0,hero.offsetHeight-innerHeight)+'px':'0px');
   const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'hero-story',trigger:hero,start:()=>hero.offsetHeight>innerHeight+20?'bottom bottom':'top top',end:()=>'+='+innerHeight*(mobile?(longStory?.7:.55):(longStory?1:.75)),pin:true,scrub:.65,invalidateOnRefresh:true,onUpdate:s=>hero.style.setProperty('--progress',(10+s.progress*90)+'%')}});

   if(kind==='plumber'){tl.eventCallback('onUpdate',connectPipe);tl.fromTo($('.hero-pipe-extension'),{opacity:0},{opacity:1,duration:.28},.66);gsap.to('.connected-flow',{strokeDashoffset:-450,ease:'none',scrollTrigger:{trigger:$('.page-pipe-continuation').parentElement,start:'top top',end:'bottom bottom',scrub:.6}})}
   const story=$('.scene-story i',hero);if(story)tl.fromTo(story,{scaleX:.08},{scaleX:1,duration:1},0);
   // Keep the business identity and calling action readable throughout the scene.
   tl.to($('.hero-copy',hero),{y:mobile?-8:-24,duration:1},0);
   if(kind==='handyman'){
    const hammer=$('.hammer-cutout',hero),drill=$('.drill-cutout',hero),roller=$('.roller-cutout',hero),wall=$('.project-wall',hero);
    tl.to(wall,{opacity:1,duration:.2},.05);
    tl.to($('.tool-stage-grid',hero),{opacity:.15,duration:.2},.05);
    tl.to(hammer,{xPercent:105,yPercent:18,scale:.38,rotation:-32,duration:.27,ease:'power2.inOut'},.03);
    tl.to(drill,{xPercent:60,yPercent:10,scale:.42,rotation:-10,duration:.25,ease:'power2.inOut'},.03);
    tl.to(roller,{xPercent:-120,yPercent:0,scale:.48,rotation:-12,duration:.24,ease:'power2.inOut'},.02);
    tl.fromTo($('.wall-paint',hero),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.3},.24);
    tl.to(roller,{xPercent:-20,yPercent:6,duration:.3},.24);
    tl.to($('.wall-crack',hero),{opacity:0,duration:.1},.4);
    tl.fromTo($('.shelf-install',hero),{y:65,opacity:0},{y:0,opacity:1,duration:.22,ease:'power2.out'},.47);
    tl.to(drill,{xPercent:40,yPercent:13,rotation:-17,duration:.1},.57);
    tl.to(drill,{xPercent:50,yPercent:14,rotation:-10,duration:.08},.67);
    tl.fromTo($('.frame-install',hero),{y:35,rotation:-6,svgOrigin:'315 284',opacity:0},{y:0,rotation:0,opacity:1,duration:.17,ease:'power2.out'},.62);
    tl.to(hammer,{rotation:-12,duration:.06},.69);tl.to(hammer,{rotation:-32,duration:.06},.75);
    tl.fromTo($('.finish-objects',hero),{y:22,opacity:0},{y:0,opacity:1,duration:.16},.79);
    tl.to(hammer,{xPercent:-10,yPercent:60,scale:.31,rotation:-38,duration:.18},.82);
    tl.to(drill,{xPercent:32,yPercent:44,scale:.32,rotation:0,duration:.18},.82);
    tl.to(roller,{xPercent:25,yPercent:57,scale:.33,rotation:25,duration:.18},.82);
    tl.to($('.stage-caption',hero),{opacity:0,duration:.15},.75);tl.fromTo($('.repair-photo-finish',hero),{opacity:0},{opacity:1,duration:.1},.9);
   }else if(kind==='roofing'){
    roofStory(tl,art);
   }else if(kind==='plumber'&&brand==='WH'&&business==='water heater specialists llc'){
    tl.fromTo($('.heater-warmth',hero),{opacity:.03},{opacity:.78,duration:.65},.22);
    tl.fromTo($('.heating-coil',hero),{opacity:.2},{opacity:1,duration:.35},.05);
    tl.to($$('.heater-stream,.convection',hero),{strokeDashoffset:-230,duration:1},0);
    tl.fromTo($('.heater-indicator',hero),{fill:'#6f939f'},{fill:'#ffd08a',duration:.3},.3);
    tl.fromTo($('.heater-hot',hero),{opacity:.5},{opacity:1,duration:.35},.6);
   }else if(kind==='plumber'){
    $$('.draw-path',hero).forEach((p,i)=>{const n=p.getTotalLength();tl.fromTo(p,{strokeDasharray:n,strokeDashoffset:n*.78},{strokeDashoffset:0,duration:.68},i*.08)});
    const wheel=$('.dial-turn',hero);if(wheel)tl.to(wheel,{rotation:180,svgOrigin:'472 165',duration:.5},.15);
    tl.fromTo($$('.water-path',hero),{opacity:0},{opacity:1,strokeDashoffset:-250,duration:.6},.4);
    const needle=$('.gauge-needle',hero),v={angle:-70};if(needle)tl.to(v,{angle:35,duration:.55,onUpdate:()=>needle.setAttribute('transform','rotate('+v.angle+')')},.38);
    tl.to(art,{scale:1.035,duration:1},0);
   }else if(kind==='electric'&&brand==='CS'&&business==='circuit solutions electrical co'){
    const path=$('.power-circuit',hero),n=path.getTotalLength();tl.fromTo(path,{strokeDasharray:n,strokeDashoffset:n},{strokeDashoffset:0,duration:.85},0);
    tl.fromTo($$('.mini-breaker',hero),{fill:'#33463f'},{fill:'#d7ed9d',duration:.1,stagger:.17},.07);
    tl.fromTo($$('.circuit-light',hero),{opacity:.06},{opacity:1,duration:.2,stagger:.22},.32);
    tl.fromTo($('.circuit-outlet',hero),{opacity:.2},{opacity:1,duration:.2},.8);
   }else if(kind==='electric'){
    tl.fromTo($('.pendant',hero),{y:-150},{y:0,duration:.55,ease:'power2.out'},0);
    tl.fromTo($('.pendant-bulb',hero),{y:150,opacity:.3},{y:0,opacity:1,duration:.4,ease:'power2.out'},.25);
    tl.fromTo($('.lamp-glow',hero),{opacity:.1,scale:.5,svgOrigin:'440 458'},{opacity:1,scale:1.22,duration:.48},.52);
    const p=$('.circuit',hero),n=p.getTotalLength();tl.fromTo(p,{strokeDasharray:n,strokeDashoffset:n},{strokeDashoffset:0,duration:.62},.35);
   }else if(kind==='hvac'){
    const dial=$('.climate-dial',hero),home=$('.climate-home',hero),arc=$('.temp-arc',hero),n=arc.getTotalLength(),count={v:66};
    tl.fromTo(arc,{strokeDasharray:n,strokeDashoffset:n*.65},{strokeDashoffset:n*.05,duration:.85},0);
    tl.to(count,{v:74,duration:.85,onUpdate:()=>$('.temperature',hero).textContent=Math.round(count.v)+'°'},0);
    tl.to(dial,{scale:.56,xPercent:-23,yPercent:-20,duration:.55,ease:'power2.inOut'},.35);
    tl.fromTo(home,{xPercent:45,yPercent:20,scale:.8,opacity:0},{xPercent:9,yPercent:8,scale:.86,opacity:1,duration:.55,ease:'power2.out'},.4);
    tl.fromTo($$('.warm-room',home),{fill:'#a8cbd0'},{fill:'#edc193',stagger:.11,duration:.3},.55);
    tl.to($$('.air-line',home),{strokeDashoffset:-150,duration:.6},.4);
    tl.to(hero,{backgroundImage:'linear-gradient(115deg,var(--paper) 38%,#e0decc 68%,#d5b18d)',duration:1},0);
   }else if(kind==='landscape'){
    materialStory(tl,art);
   }else if(kind==='tree-service'){
    const trace=$('.tree-trace',hero),n=trace.getTotalLength();
    tl.fromTo(trace,{strokeDasharray:n,strokeDashoffset:n},{strokeDashoffset:0,duration:.85},.08);
    tl.fromTo($$('.tree-callout',hero),{opacity:0},{opacity:1,stagger:.24,duration:.22},.15);

   }else if(kind==='cleaning'){
    materialStory(tl,art);
   }else if(kind==='pressure-washing'){
    tl.fromTo($('.clean-wall',hero),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.9},0);
    tl.fromTo($('.spray',hero),{rotation:24,svgOrigin:'640 770',opacity:.1},{rotation:-15,svgOrigin:'640 770',opacity:1,duration:.85},.05);
    tl.to($('.spray',hero),{opacity:.35,duration:.1},.9);
   }
   const feature=$('.feature'),detail=$('.detail-art',feature);
   if(kind==='roofing'){
    const ft=gsap.timeline({scrollTrigger:{trigger:feature,start:'top 65%',end:'bottom 70%',scrub:.7}});roofStory(ft,detail);
   }else{
    const scene=$('.scene',detail);if(scene&&kind!=='tree-service')gsap.fromTo(scene,{y:15},{y:-25,ease:'none',scrollTrigger:{trigger:feature,start:'top bottom',end:'bottom top',scrub:1}});
   }
   if(kind==='plumber')gsap.to('.water-fill',{top:'15%',ease:'none',scrollTrigger:{trigger:feature,start:'top 75%',end:'bottom 40%',scrub:1}});
   if(kind==='electric')gsap.fromTo($$('.switch',detail),{opacity:.3},{opacity:1,stagger:.2,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 85%',scrub:1}});
   if(kind==='hvac')gsap.fromTo($$('.warm-room',detail),{fill:'#b8d3d5'},{fill:'#e8bb83',stagger:.15,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 60%',scrub:1}});
   if(kind==='landscape'||kind==='cleaning'){const ft=gsap.timeline({scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 70%',scrub:.7}});materialStory(ft,detail)}
   if(kind==='handyman')gsap.fromTo($('.room-furniture',detail),{y:65,opacity:.4},{y:0,opacity:1,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 90%',scrub:1}});
   if(kind==='pressure-washing')gsap.fromTo($('.clean-wall',detail),{opacity:.15},{opacity:1,scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 80%',scrub:1}});
   $$('.reveal').forEach(el=>gsap.fromTo(el,{y:22},{y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
   if(quickbar)services.forEach((service,i)=>ScrollTrigger.create({trigger:service,start:'top 35%',end:'bottom 35%',onToggle:s=>{const link=$$('.quickbar-links a')[i];if(link)link.classList.toggle('active',s.isActive)}}));
  });
 }

 function materialStory(tl,stage){const plan=$('.material-plan',stage),scan=$('.material-scan',stage);if(plan)tl.fromTo(plan,{clipPath:'inset(0 0 0 72%)'},{clipPath:'inset(0 0 0 100%)',duration:.85},.1);if(scan)tl.fromTo(scan,{left:'72%',opacity:1},{left:'100%',opacity:0,duration:.85},.1)}
 function gardenStory(tl,stage){
  tl.fromTo($('.garden-lawn',stage),{opacity:.2},{opacity:1,duration:.35},0);
  tl.fromTo($$('.garden-paver',stage),{y:-65,opacity:.25},{y:0,opacity:1,stagger:.008,duration:.18,ease:'power2.out'},.06);
  tl.fromTo($$('.garden-plant',stage),{scaleY:.25,opacity:.35},{scaleY:1,opacity:1,stagger:.012,duration:.3,ease:'power2.out'},.3);
  tl.fromTo($('.garden-specimen',stage),{scaleY:.45,opacity:.4},{scaleY:1,opacity:1,duration:.45,ease:'power2.out'},.36);
  tl.fromTo($('.garden-finish',stage),{y:-40,opacity:0},{y:0,opacity:1,duration:.24,ease:'power2.out'},.76);
 }
 function roofStory(tl,stage){
  const deck=$('.roof-deck',stage),membrane=$('.roof-membrane',stage),courses=$$('.roof-course',stage),ridge=$('.roof-ridge',stage),flashing=$('.roof-flashing',stage);
  tl.fromTo(deck,{y:-100,opacity:.85},{y:0,opacity:1,duration:.27,ease:'power2.inOut'},0);
  tl.fromTo(membrane,{y:-190,opacity:.45},{y:0,opacity:1,duration:.3,ease:'power2.inOut'},.15);
  courses.forEach((row,i)=>tl.fromTo(row,{y:-270-i*4,x:35,opacity:.2},{y:0,x:0,opacity:1,duration:.19,ease:'power2.out'},.34+i*.043));
  tl.fromTo(ridge,{y:-340,opacity:.15},{y:0,opacity:1,duration:.18,ease:'power2.out'},.82);
  tl.fromTo(flashing,{opacity:0},{opacity:1,duration:.12},.88);
  tl.fromTo($('.roof-finish',stage),{opacity:0},{opacity:1,duration:.08},.92);
  const labels=$$('.roof-legend span',stage);if(labels.length)labels.forEach((el,i)=>tl.to(el,{opacity:1,duration:.1},i*.25));
 }
 function reset(){if(ctx){ctx.revert();ctx=null}setup();requestAnimationFrame(connectPipe);if(button){button.textContent=enabled?'Ⅱ  Pause motion':'▷  Enable motion';button.setAttribute('aria-pressed',String(!enabled))}}
 if(button)button.addEventListener('click',()=>{enabled=!enabled;reset()});
 reduce.addEventListener('change',()=>{enabled=!reduce.matches;reset()});
 let lastWidth=innerWidth,resizeTimer;
 addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(Math.abs(innerWidth-lastWidth)>80){lastWidth=innerWidth;reset()}},220)});
 try{setup();document.fonts.ready.then(()=>window.ScrollTrigger&&ScrollTrigger.refresh())}catch(error){if(ctx)ctx.revert();root.classList.remove('js');console.error('Scene could not initialize',error)}
})();