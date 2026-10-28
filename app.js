const PHONE = "524251079351";
const HELLO = "Hola, Auto Lavado HMTZL. Quiero información de sus servicios.";

const VEHICLES = [
  { id: "auto", name: "Auto", label: "$120" },
  { id: "camioneta", name: "Camioneta", label: "$150 - $180" },
  { id: "camion", name: "Camión", label: "$350" },
  { id: "moto", name: "Moto", label: "$80" },
];

const EXTRAS = [
  { id: "encerado", name: "Encerado", price: 150 },
  { id: "motor", name: "Limpieza de motor", price: 180 },
  { id: "interiores", name: "Limpieza de interiores", price: 160 },
  { id: "faros", name: "Pulido de faros", price: 150 },
];

const ICONS = {
  auto: icon("car"),
  camioneta: icon("suv"),
  camion: icon("truck"),
  moto: icon("bike"),
  check: icon("check"),
};

let vehicle = "auto";
let suv = "estandar";
let extras = [];

function icon(name) {
  const paths = {
    car: '<path d="M3 13l2-5h11l3 5"/><path d="M5 16h14"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/>',
    suv: '<path d="M3 14l2-4h9l3 2h3v4"/><path d="M5 16h14"/><circle cx="7" cy="16.5" r="1.5"/><circle cx="17" cy="16.5" r="1.5"/>',
    truck: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/>',
    bike: '<circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M6 16l4-7h4l3 4h4M10 9l-2 7"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

function money(amount) {
  return "$" + amount.toLocaleString("es-MX");
}

function vehiclePrice() {
  if (vehicle === "auto") return 120;
  if (vehicle === "camioneta") return suv === "grande" ? 180 : 150;
  if (vehicle === "camion") return 350;
  return 80;
}

function wa(text) {
  return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
}

function quoteText() {
  const current = VEHICLES.find((item) => item.id === vehicle);
  const price = vehiclePrice();
  const chosen = EXTRAS.filter((item) => extras.includes(item.id));
  const total = price + chosen.reduce((sum, item) => sum + item.price, 0);
  const name = document.getElementById("quote-name").value.replace(/\s+/g, " ").trim().slice(0, 60);
  const size = vehicle === "camioneta" ? (suv === "grande" ? " grande" : " estándar") : "";
  const lines = [
    name
      ? "Hola, soy " + name + ". Quiero cotizar en Auto Lavado HMTZL:"
      : "Hola, quiero cotizar en Auto Lavado HMTZL:",
    "Vehículo: " + current.name + size,
    "Paquete: Lavado normal — " + money(price),
  ];
  if (chosen.length) {
    lines.push("Adicionales:");
    chosen.forEach((item) => lines.push("• " + item.name + " — " + money(item.price)));
  }
  lines.push("Total estimado: " + money(total));
  lines.push("¿Me confirman disponibilidad?");
  return { text: lines.join("\n"), total };
}

function renderQuote() {
  document.getElementById("vehicle-choices").innerHTML = VEHICLES.map(
    (item) =>
      `<button type="button" class="choice${vehicle === item.id ? " choice-on" : ""}" data-vehicle="${item.id}">${ICONS[item.id]}<span>${item.name}</span><strong>${item.label}</strong></button>`
  ).join("");
  document.getElementById("suv-row").hidden = vehicle !== "camioneta";
  document.querySelectorAll("[data-suv]").forEach((button) => {
    button.classList.toggle("choice-on", button.dataset.suv === suv);
  });
  document.getElementById("pack-price").textContent = money(vehiclePrice());
  document.getElementById("extra-choices").innerHTML = EXTRAS.map(
    (item) =>
      `<li><button type="button" class="extra-row${extras.includes(item.id) ? " extra-on" : ""}" data-toggle="${item.id}">${ICONS.check}<span>${item.name}</span><strong>${money(item.price)}</strong></button></li>`
  ).join("");
  const quote = quoteText();
  document.getElementById("total").textContent = money(quote.total);
  document.getElementById("wa-send").href = wa(quote.text);
}

function openMenu() {
  const nav = document.getElementById("mobile-nav");
  nav.classList.add("is-open");
  nav.setAttribute("aria-hidden", "false");
  document.getElementById("menu-btn").setAttribute("aria-expanded", "true");
}

function closeMenu() {
  const nav = document.getElementById("mobile-nav");
  nav.classList.remove("is-open");
  nav.setAttribute("aria-hidden", "true");
  document.getElementById("menu-btn").setAttribute("aria-expanded", "false");
}

function closeServices() {
  const servicesModal = document.getElementById("services-modal");
  servicesModal.classList.remove("is-open");
  document.getElementById("open-services").classList.remove("nav-link-active");
}

function openServices() {
  const servicesModal = document.getElementById("services-modal");
  const isOpen = servicesModal.classList.contains("is-open");

  closeMenu();
  document.getElementById("quote-modal").classList.remove("is-open");

  if (isOpen) {
    closeServices();
    return;
  }

  servicesModal.classList.add("is-open");
  document.getElementById("open-services").classList.add("nav-link-active");
}

function openQuote(next, extra) {
  if (next !== undefined && next !== null && next !== "") vehicle = next;
  extras = extra ? [extra] : [];
  closeMenu();
  closeServices();
  document.getElementById("quote-modal").classList.add("is-open");
  renderQuote();
}

const quoteModal = document.getElementById("quote-modal");
const servicesModal = document.getElementById("services-modal");

const siteHeader = document.querySelector(".site-header");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
  const nav = document.getElementById("mobile-nav");
  const isOpen = nav.classList.contains("is-open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

siteHeader.addEventListener("mouseenter", () => {
  if (window.innerWidth < 1024) openMenu();
});
siteHeader.addEventListener("mouseleave", () => {
  if (window.innerWidth < 1024) closeMenu();
});

document.querySelectorAll("#mobile-nav a").forEach((link) => link.addEventListener("click", closeMenu));

document.getElementById("wa-hello").href = wa(HELLO);
document.getElementById("wa-phone").href = wa(HELLO);
document.getElementById("open-quote").addEventListener("click", () => openQuote());
document.getElementById("open-services").addEventListener("click", openServices);
document.getElementById("open-services-m").addEventListener("click", openServices);
document.getElementById("open-services-2").addEventListener("click", openServices);
document.getElementById("services-to-quote").addEventListener("click", () => openQuote());
document.getElementById("quote-name").addEventListener("input", renderQuote);

document.body.addEventListener("click", (event) => {
  const quoted = event.target.closest("[data-quote]");
  if (quoted) {
    openQuote(quoted.dataset.quote);
    return;
  }

  const extra = event.target.closest("[data-extra]");
  if (extra && !event.target.closest("#quote-modal")) {
    openQuote(undefined, extra.dataset.extra);
    return;
  }

  const picked = event.target.closest("[data-vehicle]");
  if (picked) {
    vehicle = picked.dataset.vehicle;
    renderQuote();
    return;
  }

  const size = event.target.closest("[data-suv]");
  if (size) {
    suv = size.dataset.suv;
    renderQuote();
    return;
  }

  const toggle = event.target.closest("[data-toggle]");
  if (toggle) {
    const id = toggle.dataset.toggle;
    extras = extras.includes(id) ? extras.filter((item) => item !== id) : extras.concat(id);
    renderQuote();
    return;
  }

  if (event.target.closest("[data-close]") || event.target.closest("[data-close-services]")) {
    return;
  }

  if (event.target.closest(".overlay")) {
    closeServices();
    quoteModal.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", () => quoteModal.classList.remove("is-open"));
});
document.querySelectorAll("[data-close-services]").forEach((element) => {
  element.addEventListener("click", closeServices);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
  quoteModal.classList.remove("is-open");
  closeServices();
});

const sections = ["inicio", "paquetes", "cotizador", "ubicacion", "contacto"];
function onScroll() {
  let current = "inicio";
  sections.forEach((id) => {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= 140) current = id;
  });
  document.querySelectorAll("[data-spy]").forEach((link) => {
    link.classList.toggle("nav-link-active", link.dataset.spy === current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

function tick() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour").value);
  const minute = Number(parts.find((part) => part.type === "minute").value);
  const open = hour * 60 + minute >= 9 * 60 && hour * 60 + minute < 17 * 60;
  document.querySelectorAll("[data-status]").forEach((element) => {
    element.textContent = open ? "Abierto ahora" : "Cerrado ahora";
  });
  document.querySelectorAll("[data-dot]").forEach((element) => element.classList.toggle("dot-live", open));
  document.querySelectorAll("[data-open]").forEach((element) => element.classList.toggle("open-yes", open));
}

closeMenu();
tick();
setInterval(tick, 60000);
renderQuote();
