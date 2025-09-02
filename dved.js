document.addEventListener("DOMContentLoaded", () => {
  // Detect if the user is on mobile (by UA or screen width)
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

  if (isMobile) {
    // Show the mobile warning link
    const mobileWarning = document.getElementById("mobile-warning");
    if (mobileWarning) mobileWarning.style.display = "flex";

    // Hide only the viewport videos grid
    const viewportGrid = document.querySelector(".viewport-grid");
    if (viewportGrid) viewportGrid.style.display = "none";

    // Stop desktop-specific scripts
    return;
  }

  // Fade-in animations for all elements with .fade-in
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

  // GIF hover effect for elements inside .video-card
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
