// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';
});
// Promo Bar Carousel
const promos = [
  "🚚 Gratis ongkir untuk pesanan di atas Rp500.000",
  "↩️ Garansi retur 30 hari tanpa ribet",
  "📩 <a href='#kontak' class='underline hover:text-eb6424 font-inter font-medium'>Daftar newsletter & dapatkan diskon 10%!</a>",
  "🖨️ Cetak brosur mulai dari Rp1.500/pcs!",
  "🎁 Diskon 15% untuk klien baru bulan ini!"
];

let currentIndexPromo = 0;
const promoContainer = document.getElementById('promoContainer');

if (promoContainer) {
  function showPromo(index) {
    promoContainer.style.opacity = '0';
    setTimeout(() => {
      promoContainer.innerHTML = promos[index];
      promoContainer.style.opacity = '1';
    }, 350);
  }

  function nextPromo() {
    currentIndexPromo = (currentIndexPromo + 1) % promos.length;
    showPromo(currentIndexPromo);
  }

  showPromo(currentIndexPromo);
  setInterval(nextPromo, 10000);
}
// Cek preferensi pengguna
const isDarkMode = localStorage.theme === 'dark' || 
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);


// Smooth scroll
function scrollToSection(id) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(id);
    if (!element) return;
    const header = document.querySelector('header');
    let offset = 0;
    if (header) offset = header.offsetHeight; // Hanya header, bukan promo bar
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const targetPosition = elementPosition - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.add('hidden');
  });
});

// Hero Carousel Fade
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;
  if (slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
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
    slides[currentIndex].classList.remove('active');
    setTimeout(() => {
      slides[index].classList.add('active');
      currentIndex = index;
      updateDots();
    }, 300);
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  setInterval(nextSlide, 5000);
  prevBtn?.addEventListener('click', () => goToSlide((currentIndex - 1 + slides.length) % slides.length));
  nextBtn?.addEventListener('click', () => nextSlide());
  updateDots();
});

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 2000) {
      backToTop.classList.remove('opacity-0', 'invisible');
    } else {
      backToTop.classList.add('opacity-0', 'invisible');
    }
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Form Kontak
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Terima kasih! Pesan Anda telah dikirim.');
  this.reset();
});