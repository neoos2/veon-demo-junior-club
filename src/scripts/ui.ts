// Header state, menu panel and the sticky call bar. Content works without this script.
const header = document.querySelector<HTMLElement>("[data-header]");
const hero = document.getElementById("hero");
const contacts = document.getElementById("contacts");
const sticky = document.querySelector<HTMLElement>("[data-sticky]");

// Hero lion entrance after the first paint (CSS in site.css)
if (hero) requestAnimationFrame(() => setTimeout(() => hero.classList.add("is-ready"), 250));

if (header && hero && "IntersectionObserver" in window) {
  let heroVisible = true;
  // Other call buttons, the contacts block and the footer: the sticky bar hides while any is on screen
  const blockers = new Set<Element>();
  const update = () => {
    header.classList.toggle("is-solid", !heroVisible);
    if (sticky) sticky.classList.toggle("is-shown", !heroVisible && blockers.size === 0);
  };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }, { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? blockers.add(e.target) : blockers.delete(e.target);
    update();
  });
  const targets = [
    ...document.querySelectorAll("main a.btn[href^='tel:'], main .big-phone"),
    contacts,
    document.querySelector("body > footer"),
  ];
  targets.forEach((t) => { if (t && !t.closest("[data-sticky], [data-menu]")) io.observe(t); });
}

const menu = document.querySelector<HTMLElement>("[data-menu]");
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");

function setMenu(open: boolean) {
  if (!menu || !openBtn) return;
  menu.hidden = !open;
  openBtn.setAttribute("aria-expanded", String(open));
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) menu.querySelector<HTMLElement>("a, button")?.focus();
  else openBtn.focus({ preventScroll: true });
}

openBtn?.addEventListener("click", () => setMenu(true));
closeBtn?.addEventListener("click", () => setMenu(false));
menu?.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => {
  if (!menu || !openBtn) return;
  menu.hidden = true;
  openBtn.setAttribute("aria-expanded", "false");
  document.documentElement.style.overflow = "";
}));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && !menu.hidden) setMenu(false);
});
// Keep focus inside the open panel
menu?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" || !menu) return;
  const items = [...menu.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']")].filter((el) => el.offsetParent !== null);
  const first = items[0], last = items[items.length - 1];
  if (!first || !last) return;
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
// Close the panel when the layout grows past the menu breakpoint
window.matchMedia("(min-width: 75rem)").addEventListener("change", (m) => { if (m.matches && menu && !menu.hidden) setMenu(false); });
