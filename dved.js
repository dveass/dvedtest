document.addEventListener("DOMContentLoaded", () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

  if (isMobile) {
    // Show mobile warning
    const mobileWarning = document.getElementById("mobile-warning");
    if (mobileWarning) mobileWarning.style.display = "flex";

    // Hide only the iframe videos inside the grid
    document.querySelectorAll(".viewport-videos iframe").forEach((iframe) => {
      iframe.style.display = "none";
    });

    return;
  }

  // Fade-in animations
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

  // GIF hover for personal videos
  document.querySelectorAll(".video-card img").forEach((img) => {
    const staticSrc = img.src;
    const gifSrc = img.getAttribute("data-gif");

    img.addEventListener("mouseenter", () => {
      if (gifSrc) img.src = gifSrc;
    });
    img.addEventListener("mouseleave", () => {
      img.src = staticSrc;
    });
  });
});
