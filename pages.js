// Shared behaviour for the section pages: menu drawer + reveal on scroll.
const menuBtn = document.getElementById("menu-btn"), drawer = document.getElementById("drawer");
menuBtn.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
drawer.addEventListener("click", e => { if (e.target.closest("a")) { drawer.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); } });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));
