// Shared behaviour for the section pages: menu drawer + reveal on scroll.
const menuBtn = document.getElementById("menu-btn"), drawer = document.getElementById("drawer");
menuBtn.addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
drawer.addEventListener("click", e => { if (e.target.closest("a")) { drawer.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); } });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

// Keep the last three words of each text block together so no line ends with only one or two words.
function noOrphans(root = document) {
  root.querySelectorAll("p, dd, blockquote, figcaption, h1, h2, h3, h4, li").forEach(el => {
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null, n;
    while ((n = walk.nextNode())) if (n.data.trim()) last = n;
    if (!last) return;
    const words = last.data.trimEnd().split(" ");
    if (words.length < 4) return;
    const tail = words.splice(-3).join("\u00a0");
    last.data = words.join(" ") + " " + tail + last.data.slice(last.data.trimEnd().length);
  });
}
noOrphans();
