/* ==========================================================================
   Gumma Digital — site behaviour
   No dependencies. Every feature degrades gracefully without JS.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Sticky header shading ---------------------------------------------- */

  var header = document.querySelector(".site-header");

  if (header) {
    var applyStuck = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    applyStuck();
    window.addEventListener("scroll", applyStuck, { passive: true });
  }

  /* --- Mobile navigation --------------------------------------------------- */

  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      links.setAttribute("data-open", String(open));
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close on Escape, and whenever the viewport grows past the mobile breakpoint.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) setOpen(false);
    });
  }

  /* --- Scroll reveal ------------------------------------------------------- */

  // Only hide content if we can observe it back into view.
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
      // Stagger siblings slightly so groups cascade instead of popping at once.
      el.style.transitionDelay = Math.min(i % 6, 5) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* --- Contact form -------------------------------------------------------- */

  var form = document.querySelector("[data-contact-form]");

  if (form) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector("[type='submit']");
    // The action attribute is the single place the endpoint is configured, so
    // the JS path and the no-JS browser POST can never drift apart.
    var endpoint = form.getAttribute("action") || "";
    var fallbackEmail = form.getAttribute("data-email") || "";

    // The endpoint ships unconfigured. Until it is set, fall back to the
    // visitor's mail client so the form still does something useful.
    var configured = endpoint.indexOf("YOUR_FORM_ID") === -1 && endpoint !== "";

    var say = function (message, ok) {
      if (!status) return;
      status.textContent = message;
      status.className = "form-status " + (ok ? "form-status--ok" : "form-status--err");
      status.hidden = false;
    };

    form.addEventListener("submit", function (e) {
      // Let the browser run its own required/type validation first.
      if (!form.checkValidity()) return;

      e.preventDefault();

      var data = new FormData(form);

      // Honeypot: a real person never fills this in.
      if (data.get("company_website")) return;

      if (!configured) {
        var subject = "Project enquiry — " + (data.get("name") || "Website");
        var body = [
          "Name: " + (data.get("name") || ""),
          "Email: " + (data.get("email") || ""),
          "Project type: " + (data.get("project_type") || ""),
          "Budget: " + (data.get("budget") || ""),
          "",
          data.get("message") || ""
        ].join("\n");

        window.location.href =
          "mailto:" + fallbackEmail +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

        say("Opening your email app — if nothing happens, write to " + fallbackEmail + ".", true);
        return;
      }

      submit.disabled = true;
      var original = submit.textContent;
      submit.textContent = "Sending…";

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed with status " + res.status);
          form.reset();
          say("Thanks — your message is through. I'll reply within one business day.", true);
        })
        .catch(function () {
          say("Something went wrong sending that. Email " + fallbackEmail + " instead.", false);
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = original;
        });
    });
  }

  /* --- Footer year --------------------------------------------------------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
