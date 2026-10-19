(() => {
 'use strict';
 const root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const button=document.querySelector('.motion-button');
 let ctx=null, enabled=!reduce.matches;
 function setup(){
  if(!window.gsap||!window.ScrollTrigger||!enabled){root.classList.remove('js');return;}
  gsap.registerPlugin(ScrollTrigger);
  ctx=gsap.context(()=>{
   const hero=document.querySelector('.hero'), art=hero.querySelector('.hero-art'), mobile=innerWidth<761;
   const tl=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:()=>'+='+innerHeight*(mobile?.45:.8),pin:true,scrub:.65,invalidateOnRefresh:true,onUpdate:s=>hero.style.setProperty('--progress',(10+s.progress*90)+'%')}});
   const kind=document.body.dataset.trade;
   tl.to(art,{y:mobile?-15:-35,scale:1.035,ease:'none',duration:1},0);
   if(kind==='plumber'){
    hero.querySelectorAll('.draw-path').forEach(p=>{const n=p.getTotalLength();tl.fromTo(p,{strokeDasharray:n,strokeDashoffset:n*.12},{strokeDashoffset:0,duration:1,ease:'none'},0)});
    tl.to(hero.querySelector('.dial-turn'),{rotation:100,svgOrigin:'472 165',duration:1,ease:'none'},0);
    tl.to(hero.querySelectorAll('.water-path'),{strokeDashoffset:-130,duration:1,ease:'none'},0);
   }else if(kind==='electric'){
    tl.fromTo(hero.querySelector('.lamp-glow'),{opacity:.55,scale:.88,svgOrigin:'440 458'},{opacity:1,scale:1.2,duration:1},0);
    const p=hero.querySelector('.circuit'), n=p.getTotalLength();tl.fromTo(p,{strokeDasharray:n,strokeDashoffset:n*.5},{strokeDashoffset:0,duration:1},0);
   }else if(kind==='hvac'){
    tl.to(hero,{backgroundImage:'linear-gradient(115deg,#f4f0e7 43%,#e8dac2 68%,#d9b08e)',duration:1},0);
    const arc=hero.querySelector('.temp-arc'),arcLength=arc.getTotalLength();tl.fromTo(arc,{strokeDasharray:arcLength,strokeDashoffset:arcLength*.32},{strokeDashoffset:0,duration:1},0);
    const count={v:72};tl.to(count,{v:74,duration:1,onUpdate:()=>{hero.querySelector('.temperature').textContent=Math.round(count.v)+'°'}},0);
   }else if(kind==='roofing'){
    tl.fromTo(hero.querySelector('.roof-layer'),{y:-23},{y:0,duration:.8},0);
    tl.fromTo(hero.querySelectorAll('.shingle'),{opacity:.2},{opacity:.9,stagger:.05,duration:.3},0);
   }else if(kind==='landscape'||kind==='tree-service'){
    tl.fromTo(hero.querySelectorAll('.growing-tree'),{scaleY:.93},{scaleY:1,stagger:.05,duration:.7},0);
    const sun=hero.querySelector('.garden-sun');if(sun)tl.to(sun,{x:-90,y:-40,duration:1,ease:'none'},0);
    const grass=hero.querySelectorAll('.grass');if(grass.length)tl.fromTo(grass,{scaleY:.8},{scaleY:1.1,duration:1,transformOrigin:'50% 100%'},0);
   }else if(kind==='cleaning'){
    tl.fromTo(hero.querySelectorAll('.floating-bubble'),{y:15},{y:-65,stagger:.025,duration:.8},0);
    tl.fromTo(hero.querySelector('.sparkle'),{opacity:.1},{opacity:1,duration:.5},.3);
   }else if(kind==='handyman'){
    tl.to(hero.querySelectorAll('.tool'),{y:'+=25',rotation:'-=7',duration:1,transformOrigin:'50% 50%'},0);
   }else if(kind==='pressure-washing'){
    tl.fromTo(hero.querySelector('.clean-wall'),{clipPath:'inset(0 45% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1},0);
    tl.fromTo(hero.querySelector('.spray'),{opacity:.25},{opacity:1,duration:1},0);
   }
   const feature=document.querySelector('.feature'), detail=feature.querySelector('.detail-art');
   gsap.fromTo(detail.querySelector('.scene'),{y:22},{y:-25,ease:'none',scrollTrigger:{trigger:feature,start:'top bottom',end:'bottom top',scrub:1}});
   if(kind==='plumber')gsap.to('.water-fill',{top:'15%',ease:'none',scrollTrigger:{trigger:feature,start:'top 75%',end:'bottom 40%',scrub:1}});
   if(kind==='electric')gsap.fromTo(detail.querySelectorAll('.switch'),{opacity:.3},{opacity:1,stagger:.2,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 85%',scrub:1}});
   if(kind==='hvac')gsap.fromTo(detail.querySelectorAll('.warm-room'),{fill:'#b8d3d5'},{fill:'#e8bb83',stagger:.15,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 60%',scrub:1}});
   if(kind==='landscape'||kind==='tree-service')gsap.from(detail.querySelectorAll('.growing-tree'),{opacity:.5,y:'+=30',stagger:.1,scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 90%',scrub:1}});
   if(kind==='cleaning'||kind==='handyman')gsap.fromTo(detail.querySelector('.room-furniture'),{y:35,opacity:.6},{y:0,opacity:1,scrollTrigger:{trigger:feature,start:'top 70%',end:'bottom 90%',scrub:1}});
   if(kind==='roofing')gsap.fromTo(detail.querySelector('.roof-layer'),{y:-45},{y:0,scrollTrigger:{trigger:feature,start:'top 75%',end:'bottom 90%',scrub:1}});
   if(kind==='pressure-washing')gsap.fromTo(detail.querySelector('.clean-wall'),{opacity:.3},{opacity:1,scrollTrigger:{trigger:feature,start:'top 80%',end:'bottom 80%',scrub:1}});
   document.querySelectorAll('.reveal').forEach(el=>gsap.fromTo(el,{y:22},{y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
  });
 }
 function reset(){if(ctx){ctx.revert();ctx=null;}setup();if(button){button.textContent=enabled?'Ⅱ  Pause motion':'▷  Enable motion';button.setAttribute('aria-pressed',String(!enabled));}}
 if(button)button.addEventListener('click',()=>{enabled=!enabled;reset()});
 reduce.addEventListener('change',()=>{enabled=!reduce.matches;reset()});
 try{setup();document.fonts.ready.then(()=>{if(window.ScrollTrigger)ScrollTrigger.refresh()});}catch(e){if(ctx)ctx.revert();root.classList.remove('js');}
})();