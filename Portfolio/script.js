const heroArt = document.querySelector("#hero-art");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const sectionLinks = [...document.querySelectorAll(".nav-links [data-section-link]")];
const scrollLinks = [
  ...sectionLinks,
  document.querySelector('.nav-cta[href^="#"]'),
].filter(Boolean);
const navSections = [...document.querySelectorAll("[data-nav-section]")];

const updateActiveSection = () => {
  if (!sectionLinks.length || !navSections.length) return;

  const header = document.querySelector(".site-header");
  const marker =
    (header?.getBoundingClientRect().bottom ?? 0) +
    window.innerHeight * 0.45;
  const passedSections = navSections.filter(
    (section) => section.getBoundingClientRect().top <= marker,
  );
  const activeSection = passedSections[passedSections.length - 1];

  for (const link of scrollLinks) {
    if (activeSection && link.hash === `#${activeSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
};

for (const link of sectionLinks) {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.hash);
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== link.hash) {
      window.history.pushState(null, "", link.hash);
    }
    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    updateActiveSection();
  });
}

if (sectionLinks.length && navSections.length) {
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();
}

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");

if (copyEmailButton && copyStatus) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard access is unavailable in this browser.");
      }

      await navigator.clipboard.writeText("patidarritesh73@gmail.com");
      copyStatus.textContent = "Email copied to clipboard.";
    } catch {
      copyStatus.textContent =
        "Could not copy automatically. Use the Email Ritesh button instead.";
    }
  });
}

if (heroArt && !reducedMotion.matches && finePointer.matches) {
  const visual = heroArt.closest(".hero-visual");

  visual.addEventListener("pointermove", (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroArt.style.transform = `rotateX(${-y * 9}deg) rotateY(${x * 11}deg)`;
  });

  visual.addEventListener("pointerleave", () => {
    heroArt.style.transform = "";
  });
}
