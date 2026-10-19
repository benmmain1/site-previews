(() => {
 'use strict';
 const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)'),button=document.querySelector('.motion-button');
 const kind=document.body.dataset.trade,brand=document.body.dataset.brand,business=(document.body.dataset.business||'').toLowerCase();
 let ctx=null,enabled=!reduce.matches;
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
 const hero=$('.hero'),art=$('.hero-art',hero),quickbar=$('.handyman-quickbar');
 // The selector labels and target anchors come from actual content, not invented service names.
 const services=$$('.service');
 $$('.tool-cutout',hero).forEach((tool,i)=>{const service=services[i];if(service){tool.href='#'+service.id;tool.setAttribute('aria-label',service.querySelector('h3').textContent.trim());const slot=$(`[data-dock="${i}"]`);if(slot)slot.textContent=service.querySelector('h3').textContent.trim()}});
 function setup(){
  if(!window.gsap||!window.ScrollTrigger||!enabled){root.classList.remove('js');return}
  root.classList.add('js');gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
  ctx=gsap.context((self)=>{
   const mobile=innerWidth<761;
   const longStory=['handyman','roofing','hvac','tree-service'].includes(kind);
   hero.style.setProperty('--pin-offset',mobile?Math.max(0,hero.offsetHeight-innerHeight)+'px':'0px');
   const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'hero-story',trigger:hero,start:mobile?'bottom bottom':'top top',end:()=>'+='+innerHeight*(mobile?(longStory?1.15:.9):(longStory?1.7:1.25)),pin:true,scrub:.65,invalidateOnRefresh:true,onUpdate:s=>hero.style.setProperty('--progress',(10+s.progress*90)+'%')}});
   const story=$('.scene-story i',hero);if(story)tl.fromTo(story,{scaleX:.08},{scaleX:1,duration:1},0);
   // Keep the business identity and calling action readable throughout the scene.
   tl.to($('.hero-copy',hero),{y:mobile?-8:-24,duration:1},0);
   if(kind==='handyman'){
    const items=$$('.tool-cutout',hero),slots=$$('.dock-slot',hero),dock=$('.tool-dock',hero);
    const rotations=[-17,8,18],targets=[];
    function measure(){
     const saved=items.map(el=>({x:gsap.getProperty(el,'x'),y:gsap.getProperty(el,'y'),scale:gsap.getProperty(el,'scale'),rotation:gsap.getProperty(el,'rotation')}));
     gsap.set(items,{x:0,y:0,scale:1,rotation:0});
     items.forEach((el,i)=>{const a=el.getBoundingClientRect(),b=slots[i].getBoundingClientRect();const height=mobile?57:72;targets[i]={x:(mobile?b.left+b.width/2:b.left+29)-(a.left+a.width/2),y:(mobile?b.top+31:b.top+b.height/2)-(a.top+a.height/2),scale:height/a.height}});
     items.forEach((el,i)=>gsap.set(el,saved[i]));
    }
    measure();ScrollTrigger.addEventListener('refreshInit',measure);
    items.forEach((el,i)=>{
     tl.fromTo(el,{x:0,y:0,scale:1,rotation:rotations[i]},{x:()=>targets[i].x,y:()=>targets[i].y,scale:()=>targets[i].scale,rotation:0,duration:.64,ease:'power2.inOut'},.13+i*.075);
    });
    tl.fromTo(dock,{opacity:0,y:-12},{opacity:1,y:0,duration:.2},.56);
    tl.to($$('.stage-caption,.stage-registration,.tool-stage-grid,.tool-stage-orbit',hero),{opacity:0,duration:.25},.22);
    if(mobile)tl.to($('.hero-copy',hero),{autoAlpha:0,duration:.22},.12);
    tl.fromTo($('.tool-outcome',hero),{y:65,autoAlpha:0},{y:mobile?-220:0,autoAlpha:1,duration:.3,ease:'power2.out'},.66);
    if(quickbar){tl.fromTo(quickbar,{autoAlpha:0,pointerEvents:'none'},{autoAlpha:1,pointerEvents:'auto',duration:.06},.92);tl.to(items,{autoAlpha:0,duration:.06},.92);tl.to(dock,{opacity:0,duration:.06},.92)}
    // ctx.revert() does not own global refresh listeners.
    self.add(()=>()=>ScrollTrigger.removeEventListener('refreshInit',measure));
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
    $$('.growing-tree',hero).forEach((el,i)=>tl.from(el,{scaleY:.35,opacity:.15,y:'+=110',duration:.7,ease:'power2.out'},.12+i*.06));
    tl.from($$('.grass,.flower',hero),{scaleY:.1,opacity:.1,transformOrigin:'50% 100%',stagger:.006,duration:.55},.38);
    const sun=$('.garden-sun',hero);if(sun)tl.fromTo(sun,{x:120,y:80},{x:-130,y:-60,duration:1},0);
   }else if(kind==='tree-service'){
    const canopy=$('.hero-art>.scene',hero),rings=$('.tree-section',hero);
    tl.to(canopy,{scale:.82,xPercent:10,yPercent:-12,transformOrigin:'75% 70%',duration:.8},.1);
    tl.fromTo(rings,{scale:.5,opacity:0,y:80},{scale:1,opacity:1,y:0,duration:.6,ease:'power2.out'},.35);
    $$('.growth-ring',rings).forEach((p,i)=>{const n=p.getTotalLength();tl.fromTo(p,{strokeDasharray:n,strokeDashoffset:n},{strokeDashoffset:0,duration:.3},.48+i*.015)});
   }else if(kind==='cleaning'){
    const before=$('.clean-before',hero),blade=$('.squeegee',hero);
    tl.fromTo(before,{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 0 100%)',duration:.9},.03);
    tl.fromTo(blade,{left:'0%',opacity:1},{left:'100%',opacity:1,duration:.9},.03);tl.to(blade,{opacity:0,duration:.06},.93);
    tl.fromTo($$('.floating-bubble',hero),{y:35},{y:-110,stagger:.03,duration:.8},.05);
    tl.fromTo($$('.sparkle',hero),{opacity:0,scale:.5},{opacity:1,scale:1,duration:.3},.65);
   }else if(kind==='pressure-washing'){
    tl.fromTo($('.clean-wall',hero),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.9},0);
    tl.fromTo($('.spray',hero),{rotation:24,svgOrigin:'640 770',opacity:.1},{rotation:-15,svgOrigin:'640 770',opacity:1,duration:.85},.05);
    tl.to($('.spray',hero),{opacity:.35,duration:.1},.9);
   }
   const feature=$('.feature'),detail=$('.detail-art',feature);
   if(kind==='roofing'){
    const ft=gsap.timeline({scrollTrigger:{trigger:feature,start:'top 65%',end:'bottom 70%',scrub:.7}});roofStory(ft,detail);
   }else{
    const scene=$('.scene',detail);if(scene)gsap.fromTo(scene,{y:15},{y:-25,ease:'none',scrollTrigger:{trigger:feature,start:'top bottom',end:'bottom top',scrub:1}});
   }
   if(kind==='plumber')gsap.to('.water-fill',{top:'15%',ease:'none',scrollTrigger:{trigger:feature,start:'top 75%',end:'bottom 40%',scrub:1}});
   if(kind==='electric')gsap.fromTo($$('.switch',detail),{opacity:.3},{opacity:1,stagger:.2,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 85%',scrub:1}});
   if(kind==='hvac')gsap.fromTo($$('.warm-room',detail),{fill:'#b8d3d5'},{fill:'#e8bb83',stagger:.15,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 60%',scrub:1}});
   if(kind==='landscape'||kind==='tree-service')gsap.from($$('.growing-tree',detail),{opacity:.4,y:'+=65',stagger:.1,scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 90%',scrub:1}});
   if(kind==='cleaning'||kind==='handyman')gsap.fromTo($('.room-furniture',detail),{y:65,opacity:.4},{y:0,opacity:1,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 90%',scrub:1}});
   if(kind==='pressure-washing')gsap.fromTo($('.clean-wall',detail),{opacity:.15},{opacity:1,scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 80%',scrub:1}});
   $$('.reveal').forEach(el=>gsap.fromTo(el,{y:22},{y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
   if(quickbar)services.forEach((service,i)=>ScrollTrigger.create({trigger:service,start:'top 35%',end:'bottom 35%',onToggle:s=>{const link=$$('.quickbar-links a')[i];if(link)link.classList.toggle('active',s.isActive)}}));
  });
 }
 function roofStory(tl,stage){
  const deck=$('.roof-deck',stage),membrane=$('.roof-membrane',stage),courses=$$('.roof-course',stage),ridge=$('.roof-ridge',stage),flashing=$('.roof-flashing',stage);
  tl.fromTo(deck,{y:-100,opacity:.85},{y:0,opacity:1,duration:.27,ease:'power2.inOut'},0);
  tl.fromTo(membrane,{y:-190,opacity:.45},{y:0,opacity:1,duration:.3,ease:'power2.inOut'},.15);
  courses.forEach((row,i)=>tl.fromTo(row,{y:-270-i*4,x:35,opacity:.2},{y:0,x:0,opacity:1,duration:.19,ease:'power2.out'},.34+i*.043));
  tl.fromTo(ridge,{y:-340,opacity:.15},{y:0,opacity:1,duration:.18,ease:'power2.out'},.82);
  tl.fromTo(flashing,{opacity:0},{opacity:1,duration:.12},.88);
  const labels=$$('.roof-legend span',stage);if(labels.length)labels.forEach((el,i)=>tl.to(el,{opacity:1,duration:.1},i*.25));
 }
 function reset(){if(ctx){ctx.revert();ctx=null}setup();if(button){button.textContent=enabled?'Ⅱ  Pause motion':'▷  Enable motion';button.setAttribute('aria-pressed',String(!enabled))}}
 if(button)button.addEventListener('click',()=>{enabled=!enabled;reset()});
 reduce.addEventListener('change',()=>{enabled=!reduce.matches;reset()});
 let lastWidth=innerWidth,resizeTimer;
 addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(Math.abs(innerWidth-lastWidth)>80){lastWidth=innerWidth;reset()}},220)});
 try{setup();document.fonts.ready.then(()=>window.ScrollTrigger&&ScrollTrigger.refresh())}catch(error){if(ctx)ctx.revert();root.classList.remove('js');console.error('Scene could not initialize',error)}
})();