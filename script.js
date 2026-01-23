// ========= INTRO SOBRE =========
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const app = document.getElementById("app");

let started = false;

function showApp(){
  intro.style.display = "none";
  intro.classList.remove("fadeOut");
  app.classList.add("show");
  app.setAttribute("aria-hidden", "false");
  window.scrollTo(0,0);
}

function showIntro(){
  app.classList.remove("show");
  app.setAttribute("aria-hidden", "true");
  intro.style.display = "block";
  intro.classList.remove("fadeOut");
  started = false;
  try{
    introVideo.pause();
    introVideo.currentTime = 0;
  }catch(e){}
}

// Click en la intro -> reproduce una vez
intro.addEventListener("click", async () => {
  if (started) return;
  started = true;
  try {
    introVideo.currentTime = 0;
    await introVideo.play();
  } catch (e) {
    showApp();
  }
});

// Al terminar el vídeo -> muestra la portada
introVideo.addEventListener("ended", () => {
  intro.classList.add("fadeOut");
  setTimeout(showApp, 520);
});

// ========= MENÚ =========
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuOverlay = document.getElementById("menuOverlay");

menuBtn.addEventListener("click", () => menuOverlay.classList.add("show"));
closeBtn.addEventListener("click", () => menuOverlay.classList.remove("show"));
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) menuOverlay.classList.remove("show");
});

// ========= PÁGINAS =========
const pages = Array.from(document.querySelectorAll(".page"));
let active = "inicio";

function getPage(name){ return pages.find(p => p.dataset.page === name); }

function setActive(target){
  if (!target || target === active) return;
  const current = getPage(active);
  const next = getPage(target);
  if (!current || !next) return;

  current.classList.remove("is-visible");
  setTimeout(() => {
    current.classList.remove("is-active");
    next.classList.add("is-active");
    requestAnimationFrame(() => next.classList.add("is-visible"));
    active = target;
    window.scrollTo(0,0);
  }, 220);
}

document.querySelectorAll(".menuLink").forEach(btn => {
  btn.addEventListener("click", () => {
    menuOverlay.classList.remove("show");
    setActive(btn.dataset.page);
  });
});

// ========= REPLAY (volver a ver el sobre) =========
const replayBtn = document.getElementById("replayBtn");
replayBtn.addEventListener("click", () => {
  menuOverlay.classList.remove("show");
  showIntro();
});

  // ✅ INVITACIÓN FULLSCREEN (MÓVIL + PC)
  const openInv = document.getElementById("openInvFull");
  const invFull = document.getElementById("invFull");

  function openFull(e){
    e.preventDefault();
    e.stopPropagation();
    invFull.classList.add("show");
    invFull.setAttribute("aria-hidden", "false");
  }

  function closeFull(e){
    e.preventDefault();
    e.stopPropagation();
    invFull.classList.remove("show");
    invFull.setAttribute("aria-hidden", "true");
  }

  if (openInv && invFull) {
    // PC + Android
    openInv.addEventListener("click", openFull);

    // iPhone / iPad (Safari)
    openInv.addEventListener("touchstart", openFull, { passive: false });

    // Cerrar (tap/click en la imagen fullscreen)
    invFull.addEventListener("click", closeFull);
    invFull.addEventListener("touchstart", closeFull, { passive: false });
  }


  