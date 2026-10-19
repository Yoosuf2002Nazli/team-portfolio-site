/* ===== MEMBER 3: JavaScript ===== */
document.addEventListener("DOMContentLoaded", () => {

  
  const words = ["Git & GitHub", "HTML, CSS & JS", "teamwork", "clean commits"];
  const typedEl = document.getElementById("typed");
  let w = 0, c = 0, deleting = false;
  function type() {
    const word = words[w];
    typedEl.textContent = word.slice(0, c);
    let delay = deleting ? 50 : 110;
    if (!deleting && c === word.length) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
    c += deleting ? -1 : 1;
    setTimeout(type, delay);
  }
  type();

  
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll(".nav-link").forEach(l =>
    l.addEventListener("click", () => nav.classList.remove("open")));


  const themeBtn = document.getElementById("themeToggle");
  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    themeBtn.innerHTML = t === "dark" ? "&#9728;" : "&#9790;";
  }
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  
  const links = document.querySelectorAll(".nav-link");
  const sections = [...links].map(l => document.querySelector(l.getAttribute("href")));
  function highlight() {
    const y = window.scrollY + 120;
    let current = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) current = sections.length - 1;
    links.forEach((l, i) => l.classList.toggle("active", i === current));
  }
  window.addEventListener("scroll", highlight);
  highlight();

  
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const fields = {
    name:    { el: document.getElementById("name"),    err: document.getElementById("nameError") },
    email:   { el: document.getElementById("email"),   err: document.getElementById("emailError") },
    message: { el: document.getElementById("message"), err: document.getElementById("messageError") }
  };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function check(key) {
    const { el, err } = fields[key];
    const v = el.value.trim();
    let msg = "";
    if (key === "name" && v.length < 2) msg = "Enter your name (at least 2 characters).";
    if (key === "email" && !emailRe.test(v)) msg = v ? "Enter a valid email like you@example.com." : "Enter your email.";
    if (key === "message" && v.length < 10) msg = "Write a message of at least 10 characters.";
    err.textContent = msg;
    el.classList.toggle("invalid", !!msg);
    return !msg;
  }
  Object.keys(fields).forEach(k => fields[k].el.addEventListener("input", () => check(k)));

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";
    const ok = Object.keys(fields).map(check).every(Boolean);
    if (!ok) return;
    status.classList.add("success");
    status.textContent = `Thanks ${fields.name.el.value.trim()}! Your message was sent.`;
    form.reset();
  });

  
  document.getElementById("year").textContent = new Date().getFullYear();
});
