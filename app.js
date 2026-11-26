"use strict";
const PHONE="524251079351";
const HELLO="Hola HMTZL, quiero cotizar el lavado de mi auto";
const VEHICLES=[
{id:"auto",name:"Auto",label:"Desde $140",icon:"car"},
{id:"camioneta",name:"Camioneta",label:"$150 - $180",icon:"suv"},
{id:"camion",name:"Camión",label:"$350",icon:"truck"},
{id:"moto",name:"Moto",label:"$80",icon:"bike"}
];
const EXTRAS=[
{id:"encerado",name:"Encerado",price:150},
{id:"motor",name:"Limpieza de motor",price:180},
{id:"interiores",name:"Limpieza de interiores",price:160},
{id:"faros",name:"Pulido de faros",price:150}
];
const PATHS={
car:["M3 13l2-5h11l3 5","M5 16h14"],
suv:["M3 14l2-4h9l3 2h3v4","M5 16h14"],
truck:["M3 7h11v9H3z","M14 10h4l3 3v3h-7"],
bike:["M6 16l4-7h4l3 4h4","M10 9l-2 7"],
check:["M5 12l5 5L20 7"]
};
let vehicle="auto",suv="estandar",extras=[];
const $=id=>document.getElementById(id);
function clean(value,max){return String(value||"").replace(/[<>]/g,"").replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,max);}
function makeIcon(type){
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
 for(const [k,v] of Object.entries({viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"}))svg.setAttribute(k,v);
 (PATHS[type]||[]).forEach(d=>{const p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d",d);svg.appendChild(p);});
 if(["car","suv","truck","bike"].includes(type)){[[7.5,16.5],[16.5,16.5]].forEach(([x,y])=>{const c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r","1.5");svg.appendChild(c);});}
 return svg;
}
function money(n){return "$"+n.toLocaleString("es-MX");}
function vehiclePrice(){return vehicle==="auto"?140:vehicle==="camioneta"?(suv==="grande"?180:150):vehicle==="camion"?350:80;}
function wa(text){return "https://wa.me/"+PHONE+"?text="+encodeURIComponent(text);}
function quoteText(){
 const current=VEHICLES.find(x=>x.id===vehicle),price=vehiclePrice(),chosen=EXTRAS.filter(x=>extras.includes(x.id)),name=clean($("quote-name").value,60);
 const size=vehicle==="camioneta"?(suv==="grande"?" grande":" estándar"):"";
 const lines=[name?"Hola, soy "+name+". Quiero cotizar en Auto Lavado HMTZL:":"Hola, quiero cotizar en Auto Lavado HMTZL:","Vehículo: "+current.name+size,"Paquete: Lavado normal — "+money(price)];
 if(chosen.length){lines.push("Adicionales:");chosen.forEach(x=>lines.push("• "+x.name+" — "+money(x.price)));}
 const total=price+chosen.reduce((sum,x)=>sum+x.price,0);
 lines.push("Total estimado: "+money(total),"¿Me confirman disponibilidad?");
 return {text:lines.join("\n"),total};
}
function renderQuote(){
 const choices=$("vehicle-choices");choices.replaceChildren();
 VEHICLES.forEach(item=>{
  const b=document.createElement("button");b.type="button";b.className="choice"+(vehicle===item.id?" choice-on":"");b.dataset.vehicle=item.id;b.appendChild(makeIcon(item.icon));
  const name=document.createElement("span");name.textContent=item.name;const price=document.createElement("strong");price.textContent=item.label;b.append(name,price);choices.appendChild(b);
 });
 $("suv-row").hidden=vehicle!=="camioneta";
 document.querySelectorAll("[data-suv]").forEach(b=>b.classList.toggle("choice-on",b.dataset.suv===suv));
 $("pack-price").textContent=money(vehiclePrice());
 const list=$("extra-choices");list.replaceChildren();
 EXTRAS.forEach(item=>{const li=document.createElement("li"),b=document.createElement("button");b.type="button";b.className="extra-row"+(extras.includes(item.id)?" extra-on":"");b.dataset.toggle=item.id;b.appendChild(makeIcon("check"));const label=document.createElement("span");label.textContent=item.name;const price=document.createElement("strong");price.textContent=money(item.price);b.append(label,price);li.appendChild(b);list.appendChild(li);});
 const q=quoteText();$("total").textContent=money(q.total);$("wa-send").href=wa(q.text);
}
function openMenu(){const n=$("mobile-nav");n.hidden=false;n.classList.add("is-open");n.setAttribute("aria-hidden","false");$("menu-btn").setAttribute("aria-expanded","true");}
function closeMenu(){const n=$("mobile-nav");n.hidden=true;n.classList.remove("is-open");n.setAttribute("aria-hidden","true");$("menu-btn").setAttribute("aria-expanded","false");}
function closeServices(){$("services-modal").classList.remove("is-open");$("open-services").classList.remove("nav-link-active");}
function openServices(){const m=$("services-modal"),isOpen=m.classList.contains("is-open");closeMenu();$("quote-modal").classList.remove("is-open");if(isOpen){closeServices();return;}m.classList.add("is-open");$("open-services").classList.add("nav-link-active");}
function openQuote(next,extra){if(VEHICLES.some(x=>x.id===next))vehicle=next;if(extra&&EXTRAS.some(x=>x.id===extra))extras=[extra];else if(next!==undefined)extras=[];closeMenu();closeServices();$("quote-modal").classList.add("is-open");renderQuote();}
const quoteModal=$("quote-modal");
$("menu-btn").addEventListener("click",()=> $("mobile-nav").classList.contains("is-open")?closeMenu():openMenu());
window.addEventListener("resize",()=>{if(window.innerWidth>=1024)closeMenu();});
document.querySelectorAll("#mobile-nav a").forEach(a=>a.addEventListener("click",closeMenu));
$("wa-hello").href=wa(HELLO);$("wa-phone").href=wa(HELLO);
$("open-quote").addEventListener("click",()=>openQuote());
["open-services","open-services-m","open-services-2"].forEach(id=>$(id).addEventListener("click",openServices));
$("services-to-quote").addEventListener("click",()=>openQuote());
$("quote-name").addEventListener("input",e=>{const v=clean(e.target.value,60);if(e.target.value!==v)e.target.value=v;renderQuote();});
document.body.addEventListener("click",event=>{
 const target=event.target instanceof Element?event.target:null;if(!target)return;
 const q=target.closest("[data-quote]");if(q){openQuote(q.dataset.quote);return;}
 const x=target.closest("[data-extra]");if(x&&!target.closest("#quote-modal")){openQuote(undefined,x.dataset.extra);return;}
 const v=target.closest("[data-vehicle]");if(v){vehicle=v.dataset.vehicle;renderQuote();return;}
 const z=target.closest("[data-suv]");if(z){suv=z.dataset.suv;renderQuote();return;}
 const t=target.closest("[data-toggle]");if(t){const id=t.dataset.toggle;extras=extras.includes(id)?extras.filter(a=>a!==id):extras.concat(id);renderQuote();return;}
 if(target.closest("[data-close]")){quoteModal.classList.remove("is-open");return;}
 if(target.closest("[data-close-services]")){closeServices();return;}
 if(target.closest(".overlay")){closeServices();quoteModal.classList.remove("is-open");}
});
document.querySelectorAll("[data-close]").forEach(e=>e.addEventListener("click",()=>quoteModal.classList.remove("is-open")));
document.querySelectorAll("[data-close-services]").forEach(e=>e.addEventListener("click",closeServices));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();quoteModal.classList.remove("is-open");closeServices();}});
const sections=["inicio","paquetes","cotizador","ubicacion","contacto"];
function onScroll(){let current="inicio";sections.forEach(id=>{const e=$(id);if(e&&e.getBoundingClientRect().top<=140)current=id;});document.querySelectorAll("[data-spy]").forEach(a=>a.classList.toggle("nav-link-active",a.dataset.spy===current));}
window.addEventListener("scroll",onScroll,{passive:true});
function tick(){
 const parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
 const h=Number(parts.find(x=>x.type==="hour").value),m=Number(parts.find(x=>x.type==="minute").value),open=h*60+m>=540&&h*60+m<1020;
 document.querySelectorAll("[data-status]").forEach(e=>e.textContent=open?"Abierto ahora":"Cerrado ahora");
 document.querySelectorAll("[data-dot]").forEach(e=>e.classList.toggle("dot-live",open));
 document.querySelectorAll("[data-open]").forEach(e=>e.classList.toggle("open-yes",open));
}
closeMenu();tick();setInterval(tick,60000);renderQuote();
