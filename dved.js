document.addEventListener("DOMContentLoaded", () => {

  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    document.getElementById('mobile-warning').style.display = 'flex';
    document.querySelector('.main-content').style.display = 'none';
    return; // stop rest of JS for mobile
  }

  // Existing fade-in + GIF hover code below
  const faders = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fader => appearOnScroll.observe(fader));

  document.querySelectorAll('.video-card img').forEach(img => {
    const staticSrc = img.src;
    const gifSrc = img.getAttribute('data-gif');

    img.addEventListener('mouseenter', () => { img.src = gifSrc; });
    img.addEventListener('mouseleave', () => { img.src = staticSrc; });
  });

});
