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

// Workout Stats Counter
(function () {
  const counters = Array.from(document.querySelectorAll(".js-counter"));
  if (!counters.length) return;

  const DURATION_MS = 1200;
  const TICK_MS = 20;
  const OBS_THR = 0.35;
  const running = new WeakMap();

  function formatValue(val, fmt) {
    switch (fmt) {
      case "kplus":
        return Math.round(val) + "K+";
      case "plus":
        return Math.round(val) + "+";
      case "fixed1":
        return val.toFixed(1);
      default:
        return String(val);
    }
  }

  function startCounter(el) {
    stopCounter(el);

    const fmt = el.dataset.format || "plus";
    const targetRaw = parseFloat(el.dataset.target);
    const isFixed = fmt === "fixed1";
    const start = isFixed ? 1.0 : 1;
    const end = targetRaw;
    const steps = Math.max(1, Math.floor(DURATION_MS / TICK_MS));
    const delta = (end - start) / steps;

    let current = start;
    let ticks = 0;

    el.textContent = formatValue(current, fmt);

    const id = setInterval(() => {
      ticks++;
      current += delta;

      if (ticks >= steps) current = end;

      el.textContent = formatValue(current, fmt);

      if (ticks >= steps) {
        clearInterval(id);
        running.delete(el);
      }
    }, TICK_MS);

    running.set(el, id);
  }

  function stopCounter(el) {
    const id = running.get(el);
    if (id) {
      clearInterval(id);
      running.delete(el);
    }
  }

  function resetCounter(el) {
    stopCounter(el);
    const fmt = el.dataset.format || "plus";
    el.textContent = formatValue(fmt === "fixed1" ? 1.0 : 1, fmt);
  }

  const section = document.getElementById("ff-stats");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach(startCounter);
        } else {
          counters.forEach(resetCounter);
        }
      });
    },
    { threshold: OBS_THR }
  );

  if (section) io.observe(section);
})();

// Workout Dropdown + ISO
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll('.ff-menu-list input[type="checkbox"]')
    .forEach((cb) => {
      cb.checked = false;
    });
});

(function () {
  const toggles = document.querySelectorAll(".ff-filter-toggle");

  const closeAll = () => {
    document
      .querySelectorAll(".ff-filter-menu.open")
      .forEach((m) => m.classList.remove("open"));
    toggles.forEach((b) => b.setAttribute("aria-expanded", "false"));
  };

  toggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      closeAll();
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        menu.classList.add("open");
        const rect = menu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          menu.style.left = "auto";
          menu.style.right = "0";
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".ff-filter-col");
    if (!inside) closeAll();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
  window.addEventListener("scroll", closeAll, { passive: true });
})();

(function () {
  const grid = document.querySelector(".iso-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".iso-card"));
  const emptyBox = document.querySelector(".iso-empty");

  const readChecked = (menuId) => {
    const menu = document.getElementById(menuId);
    if (!menu) return [];
    return Array.from(
      menu.querySelectorAll('input[type="checkbox"]:checked')
    ).map((inp) =>
      inp.closest("label").querySelector("span").textContent.trim()
    );
  };

  const parseCardMeta = (card) => {
    const cat =
      ["strength", "wellness", "cardio", "combat", "calisthenics"].find((c) =>
        card.classList.contains(c)
      ) || "";
    const authorEl = card.querySelector(".author");
    const trainer = authorEl
      ? authorEl.textContent.replace(/^BY\s+/i, "").trim()
      : "";
    const mode = card.dataset.mode || "";
    const member = card.dataset.membership || "";
    return { category: cat, trainer, mode, member };
  };

  const cardMeta = new Map();
  cards.forEach((c) => cardMeta.set(c, parseCardMeta(c)));

  const applyFilter = () => {
    const cats = readChecked("ffMenuCats").map((s) => s.toLowerCase());
    const trainers = readChecked("ffMenuTrainers");
    const modes = readChecked("ffMenuMode");
    const members = readChecked("ffMenuMember");

    let visibleCount = 0;

    cards.forEach((card) => {
      const meta = cardMeta.get(card);
      const matchCategory = cats.length === 0 || cats.includes(meta.category);
      const matchTrainer =
        trainers.length === 0 || trainers.includes(meta.trainer);
      const matchMode = modes.length === 0 || modes.includes(meta.mode);
      const matchMember = members.length === 0 || members.includes(meta.member);
      const show = matchCategory && matchTrainer && matchMode && matchMember;
      card.classList.toggle("is-hidden", !show);
      if (show) visibleCount++;
    });

    if (emptyBox) {
      emptyBox.classList.toggle("is-visible", visibleCount === 0);
      emptyBox.setAttribute("aria-hidden", String(visibleCount !== 0));
    }
  };
  document.addEventListener("change", (e) => {
    if (e.target.matches('.ff-menu-list input[type="checkbox"]')) applyFilter();
  });
  document
    .querySelectorAll('.ff-menu-list input[type="checkbox"]')
    .forEach((cb) => (cb.checked = false));
  applyFilter();
  const loadMore = document.querySelector(".cta-fill-btn");
  if (loadMore) {
    loadMore.addEventListener("click", (e) => e.preventDefault());
  }
})();

// accordion
(function () {
  const items = document.querySelectorAll('.faq-item');
  const closeAll = () => {
    items.forEach(it => {
      const btn = it.querySelector('.faq-q');
      const pane = it.querySelector('.faq-a');
      btn.setAttribute('aria-expanded','false');
      pane.style.maxHeight = '0px';
      pane.classList.remove('open');
      pane.setAttribute('aria-hidden','true');
    });
  };

  items.forEach(it => {
    const btn = it.querySelector('.faq-q');
    const pane = it.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!expanded) {
        btn.setAttribute('aria-expanded','true');
        pane.classList.add('open');
        pane.setAttribute('aria-hidden','false');
        pane.style.maxHeight = pane.scrollHeight + 'px';
      }
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();

