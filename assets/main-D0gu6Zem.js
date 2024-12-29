import"./modulepreload-polyfill-B5Qt9EMX.js";const e=document.querySelector.bind(document),o=e("#input"),n=e("#formatInput"),m=e("#get-context-btn"),d=e("#translate-btn"),v=e("#copy-btn"),s=e("#title"),i=e("#edit-prompt-modal"),f=e("#edit-prompt-close-btn"),r=e("#input-edit-prompt"),b=e("#edit-prompt-modal-open-btn"),g=function(t,l=500){let a=null;return function(...p){a&&clearTimeout(a),a=setTimeout(()=>t.apply(this,p),l)}};let c=!1;const h=function(){const t=o.value.trim();t&&(n.value="",n.value=`
# I have this subtitle: 
${t}
---
Can you tell me the context of this subtitle? Please include approximately 500 characters. Note the context of the subtitles, not the summary.
`.trim())},y=function(){const t=o.value.trim();if(!t){n.value="";return}localStorage.setItem("sampleSubtitle",t);const l=localStorage.getItem("prompt")||"";n.value="",n.value=`
# I have this subtitle: 
${t}
---
${l}
`.trim()};function u(t){t?(r.value=localStorage.getItem("prompt")||"",i.classList.replace("invisible","visible"),i.classList.replace("opacity-0","opacity-100")):(i.classList.replace("visible","invisible"),i.classList.replace("opacity-100","opacity-0"))}function I(t){t&&localStorage.getItem("prompt")!==t&&localStorage.setItem("prompt",t)}m.addEventListener("click",()=>{c=!1,n.value="",s.innerText="Prompt Get Context"});d.addEventListener("click",()=>{c=!0,o.value="",n.value="",s.innerText="Translate"});o.addEventListener("input",g(function(){c?y.call(this):h.call(this)}));v.addEventListener("click",async function(){n.setSelectionRange(0,1e5),await navigator.clipboard.writeText(n.value)});b.addEventListener("click",()=>{u(!0)});f.addEventListener("click",()=>{I(r.value),u(!1)});
