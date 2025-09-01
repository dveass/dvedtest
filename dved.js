document.addEventListener("DOMContentLoaded", () => {
  // Detect by UA OR screen width
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

  if (isMobile) {
    document.getElementById("mobile-warning").style.display = "flex";
    const mainContent = document.querySelector(".main-content");
    if (mainContent) mainContent.style.display = "none";
    return;
  }

  // Existing fade-in + GIF hover code
  const faders = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  faders.forEach((fader) => appearOnScroll.observe(fader));

  document.querySelectorAll(".video-card img").forEach((img) => {
    const staticSrc = img.src;
    const gifSrc = img.getAttribute("data-gif");

    img.addEventListener("mouseenter", () => {
      img.src = gifSrc;
    });
    img.addEventListener("mouseleave", () => {
      img.src = staticSrc;
    });
  });
});
