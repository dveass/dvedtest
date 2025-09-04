document.addEventListener("DOMContentLoaded", () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;



    
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

  // --- Video hover for personal videos ---
  document.querySelectorAll(".video-card").forEach((card) => {
    const img = card.querySelector("img");
    const videoSrc = img.getAttribute("data-video");

    if (!videoSrc) return; // skip if no video

    // Create video element dynamically
    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.borderRadius = "15px";
    video.style.display = "none";
    video.style.width = "100%";
    video.style.marginBottom = "20px";

    // Insert before image
    img.parentNode.insertBefore(video, img);

    // Hover logic
    img.addEventListener("mouseenter", () => {
      img.style.display = "none";
      video.style.display = "block";
      video.play();
    });

    video.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
      img.style.display = "block";
    });
  });
});

// --- Extra fade-in fallback ---
const faders = document.querySelectorAll(".fade-in");

function checkFadeIn() {
  const windowHeight = window.innerHeight;

  faders.forEach((fader) => {
    const rect = fader.getBoundingClientRect();
    // Trigger fade-in if element is visible in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      fader.classList.add("visible");
    }
  });
}

// Run on scroll
window.addEventListener("scroll", checkFadeIn);

// Run immediately on page load (fix for mobile)
window.addEventListener("load", checkFadeIn);

// Optional: run on resize (in case of orientation changes)
window.addEventListener("resize", checkFadeIn);
