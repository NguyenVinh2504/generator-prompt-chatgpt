import"./modulepreload-polyfill-B5Qt9EMX.js";const l=document.querySelector.bind(document),p=l("#subtile-input-one"),u=l("#subtile-input-two"),m=l("#check-btn"),g=l("#get-sample-sub-btn"),i=l("#model-result"),r=l("#overlay-model");console.log("f");r.addEventListener("click",function(){const t=i.classList.contains("invisible");i.classList.toggle("invisible",!t),r.classList.toggle("invisible",!t),i.classList.toggle("opacity-0",!t),r.classList.toggle("opacity-0",!t)});const b=t=>{if(typeof t!="string")return[];const c=t.toLocaleLowerCase().trim().split(`

`),n=[];return c.forEach(s=>{const o=s.split(`
`),[e,a]=o,d=a==null?void 0:a.match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);n.push({line:e,times:(d==null?void 0:d[0])||"Không có time"})}),n};g.addEventListener("click",()=>{u.value=localStorage.getItem("sampleSubtitle")||""});m.addEventListener("click",()=>{if(!p.value||!u.value)return;const t=b(p.value),c=b(u.value);if(t.length!==c.length){alert("Hai đoạn phụ đề khác nhau về số lượng câu");return}const n=[];if(t.forEach((s,o)=>{const e=c[o];e.times!==s.times&&n.push([{name:"subtile cần check",line:s.line,value:s.times},{name:"subtile mẫu",line:e.line,value:e.times}])}),n.length>0){console.log(n),r.classList.remove("invisible","opacity-0"),i.classList.remove("invisible","opacity-0");const s=i.querySelector("table tbody");s.innerHTML="";const o=`
            ${n.flatMap(e=>e).map(e=>`
                <tr class="capitalize [&_th]:text-xl text-center">
                    <td class="px-5 py-2">${e.name}</td>
                    <td class="px-5 py-2">${e.line}</td>
                    <td class="px-5 py-2">${e.value}</td>
                </tr>
                `).join("")}`;s.insertAdjacentHTML("beforeend",o);return}alert("Hai đoạn phụ đề giống nhau")});p.addEventListener("scroll",function(t){u.scrollTo(0,t.target.scrollTop)});
