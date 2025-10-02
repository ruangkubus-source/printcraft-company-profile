// Smooth scroll ke bagian tertentu
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const promoBar = document.getElementById('promoBar');
  const header = document.querySelector('header');
  let offset = 0;
  if (promoBar) offset += promoBar.offsetHeight;
  if (header) offset += header.offsetHeight;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = elementPosition - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Hero Carousel Fade with True Loop
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  // Generate dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-2.5 h-2.5 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all';
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('bg-opacity-100', i === currentIndex);
      dots[i].classList.toggle('bg-opacity-50', i !== currentIndex);
    }
  }

  function goToSlide(index) {
    // Fade out current
    slides[currentIndex].classList.remove('active');
    // Fade in new
    setTimeout(() => {
      slides[index].classList.add('active');
      currentIndex = index;
      updateDots();
    }, 300); // Slight delay to ensure fade-out completes
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }

  // Event listeners
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  // Auto-play every 5 seconds
  setInterval(nextSlide, 5000);

  // Show first slide
  slides[0].classList.add('active');
  updateDots();
});
// Di script.js
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 2600) {
    backToTop.classList.remove('opacity-0', 'invisible');
    backToTop.classList.add('opacity-100', 'visible');
  } else {
    backToTop.classList.add('opacity-0', 'invisible');
  }
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hide preloader when page is fully loaded
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});