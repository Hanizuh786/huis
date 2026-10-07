/* ==========================================================================
   huisjurist clone — interactions & animations
   Vanilla JS, progressive enhancement only.
   ========================================================================== */
(function () {
  "use strict";

  const doc = document;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ *
   * 1. Navbar: scrolled state + scroll progress bar
   * ------------------------------------------------------------------ */
  const navbar = doc.querySelector(".site-navbar");
  const progress = doc.querySelector(".scroll-progress");
  const backToTop = doc.querySelector(".back-to-top");

  function onScroll() {
    const y = window.scrollY || doc.documentElement.scrollTop;

    if (navbar) navbar.classList.toggle("is-scrolled", y > 40);

    if (progress) {
      const h = doc.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }

    if (backToTop) backToTop.classList.toggle("is-visible", y > 480);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------ *
   * 2. Scroll reveal (IntersectionObserver)
   * ------------------------------------------------------------------ */
  const revealables = doc.querySelectorAll(".reveal, .reveal-stagger");

  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------ *
   * 3. Typewriter hero line
   * ------------------------------------------------------------------ */
  const typed = doc.querySelector("[data-typewriter]");
  if (typed) {
    const words = (typed.getAttribute("data-typewriter") || "").split("|").filter(Boolean);
    const speed = parseInt(typed.getAttribute("data-type-speed") || "65", 10);
    const hold = 1900;

    if (prefersReduced || words.length === 0) {
      typed.textContent = words[0] || "";
    } else {
      let w = 0,
        c = 0,
        deleting = false;

      (function tick() {
        const word = words[w];
        typed.textContent = word.slice(0, c);

        let delay = deleting ? speed / 2 : speed;
        if (!deleting && c === word.length) {
          delay = hold;
          deleting = true;
        } else if (deleting && c === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          delay = 320;
        } else {
          c += deleting ? -1 : 1;
        }
        setTimeout(tick, delay);
      })();
    }
  }

  /* ------------------------------------------------------------------ *
   * 4. Active nav link highlighting (by pathname)
   * ------------------------------------------------------------------ */
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  doc.querySelectorAll(".site-navbar .nav-link").forEach(function (link) {
    const href = (link.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (href && (href === here || (here === "" && href === "index.html"))) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ------------------------------------------------------------------ *
   * 5. Close mobile drawer after navigating
   * ------------------------------------------------------------------ */
  const collapseEl = doc.getElementById("primaryNav");
  if (collapseEl && window.bootstrap) {
    collapseEl.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        const instance = bootstrap.Collapse.getInstance(collapseEl);
        if (instance && collapseEl.classList.contains("show")) instance.hide();
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 6. Copy-to-clipboard buttons (data-copy)
   * ------------------------------------------------------------------ */
  doc.querySelectorAll("[data-copy]").forEach(function (btn) {
    const original = btn.innerHTML;
    btn.addEventListener("click", function () {
      const text = btn.getAttribute("data-copy");
      const done = function () {
        btn.innerHTML = "✓ Gekopieerd!";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.innerHTML = original;
          btn.classList.remove("copied");
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        const ta = doc.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        doc.body.appendChild(ta);
        ta.select();
        try {
          doc.execCommand("copy");
          done();
        } catch (e) {
          /* ignore */
        }
        doc.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * 7. Local site search (progressive, fully client-side)
   * ------------------------------------------------------------------ */
  const searchForm = doc.getElementById("siteSearchForm");
  const searchResults = doc.getElementById("searchResults");
  // SITE_INDEX holds root-relative URLs of every page on this site.
  const SITE_INDEX = [
    { t: "Uw huisjurist voor uw zakelijke en persoonlijke vragen", u: "index.html", d: "Toegang tot het portal (optioneel) — juridisch advies, mediation en interim-management.", k: "home start persoonlijk zakelijk portal" },
    { t: "Wie ben ik? — mr. Hilda van der Tuin", u: "wie-ben-ik.html", d: "", k: "" },
    { t: "Kernkwaliteiten & juridisch advies", u: "juridisch-advies.html", d: "Onroerend goed, testamenten, echtscheidingen en privacy/AVG. Toegang tot het portal (desgewenst).", k: "kernkwaliteiten advies gdpr grond testament mediation portal" },
    { t: "Wat kost het? — kosten", u: "kosten.html", d: "€ 250 per uur exclusief btw (€ 302,50 inclusief 21% btw), wekelijks onderbouwing en factuur.", k: "kosten prijs tarief euro budget factuur portal" },
    { t: "Zoeken in deze site", u: "zoeken.html", d: "", k: "" },
    { t: "Klachten?", u: "klachten.html", d: "Snelle klachtenprocedure: meld uw klacht en u krijgt een persoonlijke reactie. Op deze pagina vindt u de klachtenregeling van MfN en de toelichting.", k: "klacht klachten procedure reactie klachtenregeling mfN" },
    { t: "Contact — hoe u mij bereikt", u: "contact.html", d: "", k: "" },
    { t: "Betalen — bankgegevens", u: "betalen.html", d: "IBAN NL63KNAB 0257939938, BIC KNABNL2H, naam Huisjurist B.V. — betalen in euro’s.", k: "betalen iban bic bankrekening knab factuur" },
    { t: "Privacy policy", u: "privacy.html", d: "", k: "" },
    { t: "Certificeringen en registraties", u: "certificeringen.html", d: "PRINCE2, DIAC-associate member, gecertificeerd mediator, mediator bij de Raad van State, MfN-registermediator en NMv-lid.", k: "certificering registraties prince2 diac mediator nmv mfN Raad van State" },
    { t: "Persoonlijke juridische vraag", u: "persoonlijke-juridische-vraag.html", d: "", k: "" },
    { t: "Zakelijke juridische vraag", u: "zakelijke-juridische-vraag.html", d: "", k: "" }
  ];

  // PAGE_TEXT loaded from search-index.json (full page text for each URL)
  var PAGE_TEXT = {};
  function loadPageText() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/js/search-index.json', false);
    xhr.send();
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      data.forEach(function(entry) {
        PAGE_TEXT[entry.file] = entry.text;
      });
    }
  }
  loadPageText();

  function getPageText(url) {
    var item = null;
    for (var i = 0; i < SITE_INDEX.length; i++) {
      if (SITE_INDEX[i].u === url) { item = SITE_INDEX[i]; break; }
    }
    if (!item) return '';
    var hay = '';
    if (PAGE_TEXT[url]) hay += PAGE_TEXT[url].toLowerCase() + ' ';
    hay += (item.t + ' ' + item.d + ' ' + item.k).toLowerCase();
    return hay;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function renderResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!q) return;

    const hits = SITE_INDEX.filter(function (item) {
      const hay = getPageText(item.u).toLowerCase();
      return q.split(/\s+/).every(function (word) {
        return hay.indexOf(word) !== -1;
      });
    });

    if (!hits.length) {
      searchResults.innerHTML =
        '<li class="list-group-item border-0"><div class="callout">Geen resultaten voor "<strong>' +
        escapeHtml(query) +
        '</strong>". Probeer een ander woord, of <a href="contact.html">neem contact op</a>.</div></li>';
      return;
    }

    hits.forEach(function (item) {
      const li = doc.createElement("li");
      li.className = "list-group-item border-0 px-0 anim-fade-in";
      li.innerHTML =
        '<a class="channel-tile w-100" href="' +
        item.u +
        '"><span class="channel-icon">▸</span><span><span class="channel-title d-block">' +
        escapeHtml(item.t) +
        '</span><span class="channel-meta">' +
        escapeHtml(item.d) +
        "</span></span></a>";
      searchResults.appendChild(li);
    });
  }

  if (searchForm) {
    const input = searchForm.querySelector("input");
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      renderResults(input.value);
    });
    input.addEventListener("input", function () {
      renderResults(input.value);
    });

    // Support /zoeken.html?q=testament (also used by the home hero form)
    const params = new URLSearchParams(location.search);
    const initial = params.get("q");
    if (initial) {
      input.value = initial;
      renderResults(initial);
    }
  }

  /* ------------------------------------------------------------------ *
   * 7b. Static contact form → opens the visitor's own mail client
   * ------------------------------------------------------------------ */
  const contactForm = doc.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (contactForm.elements["name"].value || "").trim();
      const email = (contactForm.elements["email"].value || "").trim();
      const topic = contactForm.elements["topic"].value;
      const message = (contactForm.elements["message"].value || "").trim();

      // validate required fields (including whitespace-only)
      function isBlank(v) { return !v || v.trim() === ''; }
      function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      }
      var errorEl = document.getElementById('formError');
      function showError(msg) {
        if (errorEl) {
          errorEl.textContent = msg;
          errorEl.style.display = 'block';
        }
        contactForm.reportValidity();
      }
      if (isBlank(name) || isBlank(email) || isBlank(message) || !isValidEmail(email)) {
        var errors = [];
        if (isBlank(name)) errors.push('Uw naam is verplicht.');
        if (isBlank(email)) errors.push('Uw e-mailadres is verplicht.');
        else if (!isValidEmail(email)) errors.push('Voer een geldig e-mailadres in.');
        if (isBlank(message)) errors.push('Uw bericht is verplicht.');
        showError(errors.join(' '));
        return;
      } else if (errorEl) {
        errorEl.style.display = 'none';
      }

      const subject = encodeURIComponent("[website] " + topic + " — " + name);
      const body = encodeURIComponent(
        message + "\n\n— " + name + " <" + email + ">"
      );
      window.location.href = "mailto:info@huisjurist.nl?subject=" + subject + "&body=" + body;
    });
  }

  /* ------------------------------------------------------------------ *
   * 8. Footer year
   * ------------------------------------------------------------------ */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------ *
   * 9. Gentle card tilt (pointer-follow), disabled on touch/reduced
   * ------------------------------------------------------------------ */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    doc.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 6).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
})();
