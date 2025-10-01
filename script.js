const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.');
  this.reset();
});

document.getElementById('ctaButton')?.addEventListener('click', () => scrollToSection('kontak'));
document.getElementById('mobileCtaButton')?.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  scrollToSection('kontak');
});