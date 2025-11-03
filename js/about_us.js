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
  } else if (currentPage.includes("workout_page.html")) {
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

// Fade in
(function () {
  const sec = document.querySelector(".who-sec");
  if (!sec || !("IntersectionObserver" in window)) return;

  sec.style.opacity = 0;
  sec.style.transition = "opacity 1s ease";

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) sec.style.opacity = 1;
      });
    },
    { threshold: 0.15 }
  );

  io.observe(sec);
})();

// Swiper Service-about
const servicesSwiper = new Swiper(".servicesSwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: {
    el: ".services-pagination",
    clickable: true,
  },
});

// SetInterval
(() => {
  const sec = document.getElementById("workouts-intro");
  if (!sec) return;

  const wrapper = document.getElementById("workouts-cats-count");
  if (!wrapper) return;

  const target = parseInt(wrapper.dataset.target || "50", 10) || 50;
  const ensureNumberNode = () => {
    for (const n of wrapper.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) return n;
    }
    const tn = document.createTextNode("1");
    wrapper.insertBefore(tn, wrapper.firstChild || null);
    return tn;
  };

  const numberNode = ensureNumberNode();
  let timer = null;

  const runCounter = () => {
    clearInterval(timer);
    let n = 1;
    numberNode.nodeValue = n;
    timer = setInterval(() => {
      n += 1;
      numberNode.nodeValue = n;
      if (n >= target) clearInterval(timer);
    }, 30);
  };

  const resetCounter = () => {
    clearInterval(timer);
    numberNode.nodeValue = 1;
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) runCounter();
        else resetCounter();
      });
    },
    { root: null, threshold: 0.35 }
  );
  const statBlock = sec.querySelector(".workouts-stat") || sec;
  io.observe(statBlock);
})();

// SetTimeout-about-us
const debounce = (fn, wait = 120) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

(function initIsoSwiper() {
  const container = document.querySelector(".isoSwiper");
  if (!container || typeof Swiper === "undefined") return;

  if (container.dataset.inited === "1") return;

  if (window._isoSwiper && window._isoSwiper.destroy) {
    try {
      window._isoSwiper.destroy(true, true);
    } catch (e) {}
  }

  window._isoSwiper = new Swiper(".isoSwiper", {
    slidesPerView: "auto",
    spaceBetween: 14,
    speed: 7000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: false,
    },

    loop: true,
    loopAdditionalSlides: 20,
    watchOverflow: false,

    freeMode: { enabled: true, momentum: false },
    allowTouchMove: true,
  });

  container.dataset.inited = "1";
})();

// Isotope About Us
window.addEventListener("load", () => {
  const grid = document.querySelector(".iso-grid");
  if (!grid || typeof Isotope === "undefined") return;

  const iso = new Isotope(grid, {
    itemSelector: ".iso-card",
    layoutMode: "fitRows",
    transitionDuration: "0.25s",
  });

  if (typeof imagesLoaded !== "undefined") {
    imagesLoaded(grid, () => iso.layout());
  } else {
    grid.querySelectorAll("img").forEach((img) => {
      if (!img.complete)
        img.addEventListener("load", () => iso.layout(), { once: true });
    });
  }

  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-filter") || "*";
      iso.arrange({ filter: value });

      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  const emptyBox = document.querySelector(".iso-empty");
  const loadMoreBtn = document.querySelector(".cta-fill-btn");

  const applyEmptyUI = (isEmpty) => {
    if (!emptyBox) return;
    emptyBox.classList.toggle("is-visible", isEmpty);
    emptyBox.setAttribute("aria-hidden", String(!isEmpty));
    if (loadMoreBtn) {
      loadMoreBtn.style.marginTop = isEmpty ? "180px" : "5px";
    }
  };
  applyEmptyUI(false);
  iso.on("arrangeComplete", (filteredItems) => {
    applyEmptyUI(filteredItems.length === 0);
  });
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
  window.addEventListener(
    "resize",
    debounce(() => iso.layout(), 120)
  );
  setTimeout(() => {
    iso.arrange();
    iso.layout();
  }, 0);
});

// Form Validations
(function () {
  const btn = document.getElementById("gitSubmit");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const msg = document.getElementById("message");

    const errs = [];
    if (!name.value.trim()) errs.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
      errs.push("email");
    if (!msg.value.trim()) errs.push("message");

    [name, email, msg].forEach((i) => (i.style.boxShadow = ""));
    if (errs.length) {
      errs.forEach((k) => {
        const el = k === "name" ? name : k === "email" ? email : msg;
        el.style.boxShadow = "0 0 0 3px rgba(255,0,0,.35) inset";
      });
      return;
    }
    btn.querySelector("span").textContent = "SENT!";
    btn.classList.add("is-sent");
    setTimeout(() => {
      btn.querySelector("span").textContent = "GET STARTED TODAY";
      btn.classList.remove("is-sent");
      name.value = "";
      email.value = "";
      msg.value = "";
    }, 1800);
  });
})();

// Form Validation-BMI
(function () {
  const form = document.getElementById("bmiForm");
  const hEl = document.getElementById("bmiHeight");
  const wEl = document.getElementById("bmiWeight");
  const ageEl = document.getElementById("bmiAge");
  const gEl = document.getElementById("bmiGender");
  const out = document.getElementById("bmiResult");

  function badge(txt, color) {
    return `<span style="
        display:inline-block;padding:6px 10px;border:1px solid ${color};
        color:${color};font-weight:800;border-radius:999px;font-size:12px;
      ">${txt}</span>`;
  }
  function range(v, min, max) {
    return v >= min && v <= max;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    [hEl, wEl, ageEl, gEl].forEach((i) => (i.style.boxShadow = ""));

    const h = parseFloat(hEl.value),
      w = parseFloat(wEl.value),
      age = parseFloat(ageEl.value),
      g = gEl.value;

    let ok = true;
    if (!range(h, 50, 250)) {
      hEl.style.boxShadow = "0 0 0 3px rgba(255,0,0,.35) inset";
      ok = false;
    }
    if (!range(w, 10, 300)) {
      wEl.style.boxShadow = "0 0 0 3px rgba(255,0,0,.35) inset";
      ok = false;
    }
    if (!range(age, 5, 120)) {
      ageEl.style.boxShadow = "0 0 0 3px rgba(255,0,0,.35) inset";
      ok = false;
    }
    if (!g) {
      gEl.style.boxShadow = "0 0 0 3px rgba(255,0,0,.35) inset";
      ok = false;
    }
    if (!ok) {
      out.textContent = "Please fill all fields correctly.";
      out.style.color = "#ff6b6b";
      return;
    }

    const bmi = w / Math.pow(h / 100, 2);
    let cls = "",
      color = "#eef523";
    if (bmi < 18.5) {
      cls = "Underweight";
      color = "#4fc3f7";
    } else if (bmi < 25) {
      cls = "Normal";
      color = "#b2ff59";
    } else if (bmi < 30) {
      cls = "Overweight";
      color = "#ffd54f";
    } else {
      cls = "Obese";
      color = "#ff5252";
    }

    out.style.color = "#eef523";
    out.innerHTML = `Your BMI is <strong>${bmi.toFixed(
      1
    )}</strong> &nbsp; ${badge(cls, color)}`;
  });
})();

// Sports Swiper
  const sponsorSwiper = new Swiper('.sponsorSwiper', {
    loop: true,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: false   
    },
    slidesPerView: 6,           
    spaceBetween: 48,            
    breakpoints: {
      1200: { slidesPerView: 6, spaceBetween: 48 },
      992:  { slidesPerView: 3, spaceBetween: 36 },
      768:  { slidesPerView: 2, spaceBetween: 28 },
      0:    { slidesPerView: 1, spaceBetween: 16 }
    }
  });

// AOS
  AOS.init({
    duration: 800,          // animation speed
    easing: 'ease-out-cubic',
    offset: 100,            // trigger before element enters
    once: true,             // animate only once
    mirror: false,          // no reverse on scroll up
  });
