const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const app = document.getElementById("app");

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuOverlay = document.getElementById("menuOverlay");

const pages = Array.from(document.querySelectorAll(".page"));

let started = false;
let active = "inicio";

/* Intro -> play una vez */
intro.addEventListener("click", async () => {
  if (started) return;
  started = true;

  try {
    video.currentTime = 0;
    await video.play();
  } catch (e) {
    showApp();
  }
});

video.addEventListener("ended", () => {
  intro.classList.add("fadeOut");
  setTimeout(showApp, 620);
});

function showApp(){
  intro.style.display = "none";
  app.classList.add("show");
  app.setAttribute("aria-hidden", "false");
  // asegura animación inicial
  const first = getPage("inicio");
  first.classList.add("is-active");
  requestAnimationFrame(() => first.classList.add("is-visible"));
}

/* Menú open/close */
menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("show");
  menuOverlay.setAttribute("aria-hidden", "false");
});

function closeMenu(){
  menuOverlay.classList.remove("show");
  menuOverlay.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeMenu();
});

/* Navegación a “sección nueva” (página nueva) */
document.querySelectorAll(".menuLink").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.page;
    closeMenu();
    setActive(target);
  });
});

function getPage(name){
  return pages.find(p => p.dataset.page === name);
}

function setActive(target){
  if (!target || target === active) return;

  const current = getPage(active);
  const next = getPage(target);

  // fade out actual
  current.classList.remove("is-visible");

  setTimeout(() => {
    current.classList.remove("is-active");

    next.classList.add("is-active");
    requestAnimationFrame(() => next.classList.add("is-visible"));

    active = target;
    window.scrollTo(0, 0);
  }, 430);
}


