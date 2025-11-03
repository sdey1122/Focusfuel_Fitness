// Header Section
// Navbar
document.addEventListener("DOMContentLoaded", () => {
  const XL_BREAKPOINT = 1200;
  const mainNav = document.getElementById("mainNav");
  const toggler = document.querySelector('[data-bs-target="#mainNav"]');
  const isDesktop = () => window.innerWidth >= XL_BREAKPOINT;

  const closeCollapse = () => {
    const inst = bootstrap.Collapse.getInstance(mainNav);
    if (inst && mainNav.classList.contains("show")) inst.hide();
  };

  const resetSubmenus = (scope = document) => {
    scope
      .querySelectorAll(".dropdown-menu.show")
      .forEach((m) => m.classList.remove("show"));
    scope
      .querySelectorAll(".dropdown-submenu.open")
      .forEach((s) => s.classList.remove("open"));
  };

  document
    .querySelectorAll(".navbar-nav > .nav-item > .nav-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        document
          .querySelectorAll(".navbar-nav > .nav-item > .nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

  // Toggle
  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentSubmenu = toggle.closest(".dropdown-submenu");
      const submenuMenu = toggle.nextElementSibling;

      if (isDesktop()) {
        const siblingMenus = toggle
          .closest(".dropdown-menu")
          .querySelectorAll(".dropdown-menu.show");
        siblingMenus.forEach((m) => {
          if (m !== submenuMenu) m.classList.remove("show");
        });
        submenuMenu.classList.toggle("show");
      } else {
        const siblingSubs = toggle
          .closest(".dropdown-menu")
          .querySelectorAll(".dropdown-submenu.open");
        siblingSubs.forEach((s) => {
          if (s !== parentSubmenu) s.classList.remove("open");
        });
        parentSubmenu.classList.toggle("open");
      }
    });
  });

  // Radio Buttons
  document
    .querySelectorAll('.dropdown-menu .dd-check[data-group="workouts"]')
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        const href = item.getAttribute("href");
        if (!href || href === "#") {
          e.preventDefault();
          e.stopPropagation();
          const scopeMenu = item.closest(".dropdown-menu");
          scopeMenu
            .querySelectorAll('.dd-check[data-group="workouts"]')
            .forEach((el) => el.classList.remove("is-checked"));
          item.classList.add("is-checked");
        }
      });
    });

  // reset
  document.querySelectorAll(".dropdown").forEach((dd) => {
    dd.addEventListener("hide.bs.dropdown", () => resetSubmenus(dd));
  });

  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !toggler.contains(e.target))
      closeCollapse();
  });

  let lastDesktop = isDesktop();
  window.addEventListener("resize", () => {
    const nowDesktop = isDesktop();
    if (nowDesktop !== lastDesktop) {
      resetSubmenus();
      lastDesktop = nowDesktop;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".dropdown.show .dropdown-toggle")
        .forEach((t) => {
          const inst = bootstrap.Dropdown.getInstance(t);
          if (inst) inst.hide();
        });
      closeCollapse();
    }
  });
});

document
  .querySelectorAll('.dropdown-toggle[data-bs-toggle="dropdown"]')
  .forEach((t) => {
    t.addEventListener("shown.bs.dropdown", () =>
      t.closest(".dropdown")?.classList.add("show")
    );
    t.addEventListener("hidden.bs.dropdown", () =>
      t.closest(".dropdown")?.classList.remove("show")
    );
  });

// Active Navbar
(() => {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  navLinks.forEach((link) => link.classList.remove("active"));

  if (currentPage.includes("about_us.html")) {
    document
      .querySelector('.nav-link[href="about_us.html"]')
      ?.classList.add("active");
  } else if (currentPage.includes("workouts.html")) {
    document
      .querySelector('.nav-link[href="workout_page.html"]')
      ?.classList.add("active");
  } else {
    document
      .querySelector('.nav-link[href="#"], .nav-link[href="index.html"]')
      ?.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")?.toLowerCase();
      if (href && currentPage.includes(href)) {
        e.preventDefault();
      }
    });
  });
})();

// Banner Section
(function () {
  const header = document.querySelector(".hdr-sec");
  const banner = document.querySelector(".banner-section");
  if (!header || !banner) return;

  const setHeights = () => {
    const hdr = header.offsetHeight;
    document.documentElement.style.setProperty("--hdr-h", hdr + "px");

    const masthead = Math.max(window.innerHeight, hdr + banner.offsetHeight);
    document.documentElement.style.setProperty("--masthead-h", masthead + "px");
  };

  const ro = new ResizeObserver(setHeights);
  ro.observe(header);
  ro.observe(banner);

  window.addEventListener("load", setHeights, { once: true });
  window.addEventListener("orientationchange", setHeights);
  window.addEventListener("resize", setHeights);
})();

// Swiper Slider
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".slider-one-swiper", {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    speed: 9000,
    allowTouchMove: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        allowTouchMove: true,
        speed: 4500,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: true,
        },
      },
      577: {
        slidesPerView: 3,
        allowTouchMove: true,
        speed: 9000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: true,
        },
      },
    },
  });
});

// Service Section
(function () {
  const featured = document.querySelector(".service-item--featured");
  if (!featured) return;

  const link = featured.querySelector(".service-link");
  const preview = featured.querySelector(".service-preview");
  if (!link || !preview) return;

  const mq = window.matchMedia("(min-width: 1201px)");
  let raf = null;

  function onMove(e) {
    if (!mq.matches) return;
    const r = link.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const nx = x * 2 - 1;
    const ny = y * 2 - 1;

    const rx = ny * -6;
    const ry = nx * 8;
    const tx = nx * 10;
    const ty = ny * 6;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      preview.style.willChange = "transform";
      preview.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(-3deg)`;
    });
  }

  function reset() {
    preview.style.willChange = "auto";
    if (mq.matches) {
      preview.style.transform = "rotate(-3deg) translateZ(0)";
    } else {
      preview.style.transform = "none";
    }
  }

  function handleMQ() {
    reset();
  }

  link.addEventListener("mousemove", onMove);
  link.addEventListener("mouseleave", reset);
  link.addEventListener("blur", reset);
  mq.addEventListener("change", handleMQ);
})();

// About Our Gym Section
(function () {
  const fig = document.querySelector(".about-overview__visual");
  const img = document.querySelector(".about-overview__visual-img");
  if (!fig || !img) return;

  let raf = null;
  function onMove(e) {
    const r = fig.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const nx = x * 2 - 1;
    const ny = y * 2 - 1;

    const rx = ny * -6;
    const ry = nx * 8;
    const tz = 22;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      img.style.transform = `translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  }
  function reset() {
    img.style.transform = "translateZ(0) rotateX(0) rotateY(0)";
  }

  fig.addEventListener("mousemove", onMove, { passive: true });
  fig.addEventListener("mouseleave", reset);
  window.addEventListener("blur", reset);
})();

// Coaches-Section-SwiperJS
const coachesSwiper = new Swiper(".coaches-swiper", {
  loop: true,
  speed: 700,
  spaceBetween: 18,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: {
    el: ".coaches-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 14 },
    576: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    992: { slidesPerView: 2, spaceBetween: 18 },
    1200: { slidesPerView: 3, spaceBetween: 18 },
  },
});

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 200;
  sections.forEach((sec) => {
    if (
      scrollY > sec.offsetTop &&
      scrollY <= sec.offsetTop + sec.offsetHeight
    ) {
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.nav-link[href="#${sec.id}"]`)
        ?.classList.add("active");
    }
  });
});

// SetInterval
(() => {
  const el = document.getElementById("countries-count");
  if (!el) return;

  const START = 1;
  const END = 25;
  const DURATION = 2000;
  const FPS = 60;
  let timer = null;
  let isAnimating = false;

  function setNumber(n) {
    if (!el.firstChild || el.firstChild.nodeType !== Node.TEXT_NODE) return;
    el.firstChild.nodeValue = String(n);
  }
  function resetCounter() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isAnimating = false;
    setNumber(START);
  }
  function animate() {
    if (isAnimating) return;
    isAnimating = true;
    const totalFrames = Math.max(1, Math.round((DURATION / 1000) * FPS));
    let frame = 0;
    timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.floor(START + progress * (END - START));
      setNumber(Math.min(current, END));
      if (frame >= totalFrames) {
        setNumber(END);
        clearInterval(timer);
        timer = null;
        isAnimating = false;
      }
    }, 800 / FPS);
  }

  const section = document.querySelector(".locations-section") || el;

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          } else {
            resetCounter();
          }
        });
      },
      {
        root: null,
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );
    io.observe(section);
  } else {
    function onScroll() {
      const r = section.getBoundingClientRect();
      const inView =
        r.top < window.innerHeight * 0.65 &&
        r.bottom > window.innerHeight * 0.35;
      if (inView) animate();
      else resetCounter();
    }
    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll, { once: true });
  }
  setNumber(START);
})();

// Loading Screen
(() => {
  const pre = document.getElementById("ff-preloader");
  if (!pre) return;

  const entry = performance.getEntriesByType("navigation")[0];
  const navType = entry ? entry.type : (performance.navigation || {}).type;
  const isReload = navType === "reload" || navType === 1;

  const SEEN_KEY = "ff_preloader_seen";
  const seen = sessionStorage.getItem(SEEN_KEY) === "1";

  if (seen && !isReload) {
    document.body.classList.add("ff-preloader-done");
    pre.remove();
    return;
  }
  const MIN_TIME = 6000;
  const SAFETY_TIMEOUT = 8000;
  const start = performance.now();

  const done = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, MIN_TIME - elapsed);
    setTimeout(() => {
      document.body.classList.add("ff-preloader-done");
      setTimeout(() => {
        pre.remove();
        sessionStorage.setItem(SEEN_KEY, "1");
      }, 600);
    }, wait);
  };

  window.addEventListener("load", done, { once: true });
  setTimeout(() => {
    if (!document.body.classList.contains("ff-preloader-done")) done();
  }, SAFETY_TIMEOUT);
})();










// Modal

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("authModal");
  const openBtn = document.querySelector(".nav-auth-btn");
  const closeBtn = modal.querySelector(".auth-close");
  const backdrop = modal.querySelector(".auth-backdrop");

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  }

  [closeBtn, backdrop].forEach((el) =>
    el.addEventListener("click", () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });
});

