<<<<<<< HEAD
// MEMBER 3: all JavaScript interactivity
=======
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav.nav");

  if (menuToggle && nav) {
    const setMenuOpen = (isOpen) => {
      nav.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      setMenuOpen(isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    });
  }

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    const formNote = contactForm.querySelector(".form-note");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const name = contactForm.elements.namedItem("name").value.trim();
      formNote.textContent = name
        ? `Thanks, ${name}! Your message has been noted.`
        : "Thanks! Your message has been noted.";

      contactForm.reset();
    });

    contactForm.addEventListener("input", () => {
      formNote.textContent = "";
    });
  }
});
>>>>>>> 407c8ae8b72557b6f8b4a89c9cd1376b1220e591
