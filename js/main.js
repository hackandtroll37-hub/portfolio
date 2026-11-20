(() => {
  "use strict";

  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");
  const progressBar = document.querySelector(".scroll-progress");
  const cursorGlow = document.querySelector(".cursor-glow");
  const typing = document.getElementById("typing");
  const year = document.getElementById("year");
  const copyMail = document.getElementById("copy-mail");

  year.textContent = new Date().getFullYear();

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
    let raf = null;
    let x = 0, y = 0;
    window.addEventListener("mousemove", (e) => {
      document.body.classList.add("cursor-active");
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          cursorGlow.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
          raf = null;
        });
      }
    }, { passive: true });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    const group = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty("--d", `${Math.min(group * 0.09, 0.45)}s`);
    revealObserver.observe(el);
  });

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

  if (typing) {
    const roles = [
      "motion design 2D / 3D",
      "spots publicitaires",
      "vidéos explicatives",
      "habillage de marque",
      "montage & sound design"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const step = () => {
      const current = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typing.textContent = current.slice(0, charIndex);

      let delay = deleting ? 34 : 62;
      if (!deleting && charIndex === current.length) {
        delay = 1900;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 380;
      }
      setTimeout(step, delay);
    };
    step();
  }

  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  if (copyMail) {
    copyMail.addEventListener("click", async () => {
      const mail = copyMail.dataset.mail;
      try {
        await navigator.clipboard.writeText(mail);
        const original = copyMail.textContent;
        copyMail.textContent = "copié ✓";
        setTimeout(() => (copyMail.textContent = original), 1600);
      } catch {
        window.location.href = `mailto:${mail}`;
      }
    });
  }
})();
