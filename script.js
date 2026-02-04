// NAVBAR GSAP

gsap.registerPlugin(ScrollTrigger);

const desktopSubmenus = document.querySelectorAll(".submenu");
const desktopToggles = document.querySelectorAll(".submenu-toggle");

const mobileMenu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");
const mobileClose = document.querySelector(".mobile-close");
const mobileLinks = document.querySelectorAll(".mobile-link");

const mobileSubmenus = document.querySelectorAll(".mobile-submenu");
const mobileToggles = document.querySelectorAll(".mobile-sub-toggle");

// Desktop dropdowns
gsap.set(desktopSubmenus, {
  autoAlpha: 0,
  y: 16,
  pointerEvents: "none",
});

// Mobile menu
gsap.set(mobileMenu, { x: "100%" });

// Mobile dropdowns
gsap.set(mobileSubmenus, {
  height: 0,
  autoAlpha: 0,
  overflow: "hidden",
});

desktopToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const submenu = toggle.closest(".has-sub").querySelector(".submenu");
    const isOpen = submenu.classList.contains("is-open");

    closeAllDesktopSubmenus(submenu);

    if (!isOpen) openDesktopSubmenu(submenu);
  });
});

function openDesktopSubmenu(menu) {
  menu.classList.add("is-open");
  gsap.to(menu, {
    autoAlpha: 1,
    y: 0,
    duration: 0.35,
    ease: "power3.out",
    pointerEvents: "auto",
  });
}

function closeDesktopSubmenu(menu) {
  menu.classList.remove("is-open");
  gsap.to(menu, {
    autoAlpha: 0,
    y: 16,
    duration: 0.25,
    ease: "power3.in",
    pointerEvents: "none",
  });
}

function closeAllDesktopSubmenus(except = null) {
  desktopSubmenus.forEach((menu) => {
    if (menu !== except && menu.classList.contains("is-open")) {
      closeDesktopSubmenu(menu);
    }
  });
}

// Click outside (DESKTOP ONLY)
document.addEventListener("click", () => {
  if (window.innerWidth >= 1024) {
    closeAllDesktopSubmenus();
  }
});

hamburger.addEventListener("click", () => {
  resetMobileSubmenus();

  mobileMenu.classList.remove("hidden");

  gsap.to(mobileMenu, {
    x: 0,
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.from(mobileLinks, {
    x: 40,
    autoAlpha: 0,
    stagger: 0.08,
    delay: 0.2,
    ease: "power3.out",
  });
});

mobileClose.addEventListener("click", closeMobileMenu);

function closeMobileMenu() {
  gsap.to(mobileMenu, {
    x: "100%",
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      mobileMenu.classList.add("hidden");
      resetMobileSubmenus();
    },
  });
}

mobileToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const parent = toggle.closest(".has-sub");
    const submenu = parent.querySelector(".mobile-submenu");
    const icon = toggle.querySelector("i");
    const isOpen = submenu.classList.contains("open");

    if (isOpen) {
      closeMobileSubmenu(submenu);
    } else {
      closeAllMobileSubmenus(submenu);

      submenu.classList.add("open");
      icon.classList.replace("fa-plus", "fa-minus");

      gsap.to(submenu, {
        height: "auto",
        autoAlpha: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  });
});

function closeAllMobileSubmenus(except = null) {
  mobileSubmenus.forEach((menu) => {
    if (menu !== except && menu.classList.contains("open")) {
      closeMobileSubmenu(menu);
    }
  });
}

function closeMobileSubmenu(menu) {
  menu.classList.remove("open");
  const icon = menu.closest(".has-sub").querySelector("i");
  icon.classList.replace("fa-minus", "fa-plus");

  gsap.to(menu, {
    height: 0,
    autoAlpha: 0,
    duration: 0.25,
    ease: "power3.in",
  });
}

function resetMobileSubmenus() {
  mobileSubmenus.forEach((menu) => {
    menu.classList.remove("open");
    gsap.set(menu, { height: 0, autoAlpha: 0 });
    const icon = menu.closest(".has-sub")?.querySelector("i");
    if (icon) icon.classList.replace("fa-minus", "fa-plus");
  });
}

// HOME GSAP
gsap.set([".hero-badge", ".hero-title", ".hero-text", ".hero-btn"], {
  y: 40,
  autoAlpha: 0,
});

const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top 75%",
  },
  defaults: {
    ease: "power3.out",
  },
});

heroTimeline.to(".hero-badge", {
  y: 0,
  autoAlpha: 1,
  duration: 0.8,
});

heroTimeline.to(
  ".hero-title",
  {
    y: 0,
    autoAlpha: 1,
    duration: 1.2,
  },
  "-=0.3",
);

heroTimeline.to(
  ".hero-text",
  {
    y: 0,
    autoAlpha: 1,
    duration: 1,
  },
  "-=0.4",
);

heroTimeline.to(
  ".hero-btn",
  {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
  },
  "-=0.4",
);

// AOUT GSAP
gsap.set(
  [
    ".marketing-tag",
    ".marketing-title",
    ".marketing-intro",
    ".marketing-feature",
    ".marketing-btn",
    ".marketing-download",
    ".marketing-card",
  ],
  {
    y: 40,
    autoAlpha: 0,
  },
);

gsap.to(".marketing-tag", {
  scrollTrigger: {
    trigger: ".marketing-left",
    start: "top 80%",
  },
  y: 0,
  autoAlpha: 1,
  duration: 0.8,
  ease: "power3.out",
});

gsap.to(
  [
    ".marketing-title",
    ".marketing-intro",
    ".marketing-feature",
    ".marketing-btn",
    ".marketing-download",
  ],
  {
    scrollTrigger: {
      trigger: ".marketing-left",
      start: "top 75%",
    },
    y: 0,
    autoAlpha: 1,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
  },
);

gsap.to(".marketing-card", {
  scrollTrigger: {
    trigger: ".marketing-right",
    start: "top 80%",
  },
  y: 0,
  autoAlpha: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});

// VIDEO GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.set(
  [".hero-title", ".hero-text", ".hero-btn", ".hero-item", ".video-play-btn"],
  { y: 40, autoAlpha: 0 },
);

gsap.to(".video-play-btn", {
  scrollTrigger: {
    trigger: ".hero-left",
    start: "top 70%",
  },
  autoAlpha: 1,
  y: 0,
  duration: 1,
});

gsap.to([".hero-title", ".hero-text", ".hero-btn"], {
  scrollTrigger: {
    trigger: ".hero-right",
    start: "top 70%",
  },
  autoAlpha: 1,
  y: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
});

gsap.to(".hero-item", {
  scrollTrigger: {
    trigger: ".hero-bottom",
    start: "top 85%",
  },
  autoAlpha: 1,
  y: 0,
  stagger: 0.2,
  duration: 0.8,
});

// VIDEO MODAL
const modal = document.querySelector(".video-modal");
const box = document.querySelector(".video-box");
const iframe = modal.querySelector("iframe");
const playBtn = document.querySelector(".video-play-btn");
const closeBtn = document.querySelector(".video-close");

playBtn.addEventListener("click", () => {
  iframe.src = iframe.dataset.video;

  gsap.to(modal, {
    autoAlpha: 1,
    duration: 0.35,
    ease: "power2.out",
    onStart: () => {
      modal.classList.remove("invisible");
    },
  });

  gsap.to(box, {
    scale: 1,
    duration: 0.45,
    ease: "power3.out",
  });
});

closeBtn.addEventListener("click", () => {
  gsap.to(box, {
    scale: 0.95,
    duration: 0.3,
    ease: "power2.in",
  });

  gsap.to(modal, {
    autoAlpha: 0,
    duration: 0.3,
    delay: 0.1,
    onComplete: () => {
      iframe.src = "";
      modal.classList.add("invisible");
    },
  });
});

// PROCESS GSAP

gsap.registerPlugin(ScrollTrigger);

gsap.from(".gsap-step-sub", {
  scrollTrigger: {
    trigger: ".gsap-step-sub",
    start: "top 85%",
  },
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from(".gsap-step-title", {
  scrollTrigger: {
    trigger: ".gsap-step-title",
    start: "top 85%",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".gsap-step-item", {
  scrollTrigger: {
    trigger: ".gsap-step-item",
    start: "top 80%",
  },
  opacity: 0,
  y: 60,
  duration: 0.9,
  stagger: 0.2,
  ease: "power3.out",
});

// TEAM GSAP

gsap.from(".gsap-team-sub", {
  scrollTrigger: {
    trigger: ".gsap-team-sub",
    start: "top 85%",
  },
  y: 20,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from(".gsap-team-title", {
  scrollTrigger: {
    trigger: ".gsap-team-title",
    start: "top 85%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".gsap-team-desc", {
  scrollTrigger: {
    trigger: ".gsap-team-desc",
    start: "top 85%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".gsap-team-card", {
  scrollTrigger: {
    trigger: ".gsap-team-card",
    start: "top 80%",
  },
  y: 70,
  opacity: 0,
  duration: 1,
  stagger: 0.25,
  ease: "power3.out",
});

// GRID GSAP

gsap.from(".gsap-insight-sub", {
  scrollTrigger: { trigger: ".gsap-insight-sub", start: "top 85%" },
  y: 20,
  opacity: 0,
  duration: 0.6,
});

gsap.from(".gsap-insight-title", {
  scrollTrigger: { trigger: ".gsap-insight-title", start: "top 85%" },
  y: 30,
  opacity: 0,
  duration: 0.8,
});

gsap.from(".gsap-insight-big", {
  scrollTrigger: { trigger: ".gsap-insight-big", start: "top 80%" },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

gsap.from(".gsap-insight-small", {
  scrollTrigger: { trigger: ".gsap-insight-small", start: "top 85%" },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out",
});

// CASE GSAP WITH FUNCTIONALITIES

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#caseSplide", {
    type: "loop", // endless
    perPage: 3,
    perMove: 1,
    gap: "24px", // NO VISUAL GAP ISSUES
    drag: true,
    arrows: false,
    pagination: true, // dots
    autoplay: true, // ❌ no auto scroll
    speed: 800,
    easing: "cubic-bezier(.4,0,.2,1)",

    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  }).mount();
});

// CONTACT GSAP

gsap.from(".contactForm", {
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".contactForm",
    start: "top 80%",
  },
});

gsap.from(".contact-info > *", {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".contact-info",
    start: "top 80%",
  },
});

// FAQ

const faqItems = document.querySelectorAll(".faq-item");
let activeItem = null;

faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-trigger");
  const answer = item.querySelector(".faq-answer");
  const arrow = item.querySelector(".faq-arrow");

  gsap.set(answer, { height: 0, opacity: 0, display: "none" });

  trigger.addEventListener("click", () => {
    if (activeItem === item) {
      closeItem(item);
      activeItem = null;
    } else {
      if (activeItem) closeItem(activeItem);
      openItem(item);
      activeItem = item;
    }
  });

  function openItem(el) {
    const a = el.querySelector(".faq-answer");
    const ar = el.querySelector(".faq-arrow");

    gsap.set(a, { display: "block" });
    gsap.to(a, {
      height: "auto",
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.to(ar, {
      rotation: 90,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function closeItem(el) {
    const a = el.querySelector(".faq-answer");
    const ar = el.querySelector(".faq-arrow");

    gsap.to(a, {
      height: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => gsap.set(a, { display: "none" }),
    });
    gsap.to(ar, {
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
});

// SECTION ENTRANCE
gsap.from(".faq-header, .faq-item", {
  y: 30,
  opacity: 0,
  stagger: 0.06,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".faq-section",
    start: "top 75%",
  },
});

// CONTACT VALIDATION

const form = document.getElementById("contactForm");
const emailInput = document.getElementById("emailField");

//CLEAR error immediately when user types
emailInput.addEventListener("input", () => {
  emailInput.setCustomValidity("");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Required field validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Gmail-only validation
  const emailValue = emailInput.value.trim().toLowerCase();

  if (!emailValue.endsWith("@gmail.com")) {
    emailInput.setCustomValidity("Please enter your @gmail.com mail");
    emailInput.reportValidity();
    return;
  }

  // SUCCESS
  emailInput.setCustomValidity("");
  form.reset();
  window.location.href = "./404.html";
});

// FOOTER GSAP

// BRAND
gsap.from(".footer-brand", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".create-footer",
    start: "top 80%",
  },
});

// COLUMNS
gsap.from(".footer-col", {
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer-grid",
    start: "top 80%",
  },
});

// SOCIAL
gsap.from(".footer-social", {
  scale: 0,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".footer-bottom",
    start: "top 90%",
  },
});

// LENIS JS 
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);