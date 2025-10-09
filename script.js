document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500);
        });
    }

    // Promo Bar Rotation
    const promoMessages = [
        '<span class="font-medium">🎉 Promo Spesial:</span> Diskon 25% untuk paket branding lengkap. Berlaku hingga 31 Desember 2025!',
        '<span class="font-medium">🚀 Layanan Baru:</span> Website development dengan harga terjangkau. Konsultasi gratis!',
        '<span class="font-medium">⏰ Terbatas:</span> Gratis desain logo untuk setiap pemesanan paket iklan outdoor.'
    ];
    
    let currentPromoIndex = 0;
    const promoContainer = document.getElementById('promoContainer');
    
    if (promoContainer) {
        function rotatePromo() {
            promoContainer.style.opacity = '0';
            
            setTimeout(function() {
                currentPromoIndex = (currentPromoIndex + 1) % promoMessages.length;
                promoContainer.innerHTML = promoMessages[currentPromoIndex];
                promoContainer.style.opacity = '1';
            }, 800); // Durasi diperpanjang
        }
        
        // Rotate promo every 5 seconds
        setInterval(rotatePromo, 5000);
    }

    // Hero Carousel
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const slideInterval = 6000; // Durasi diperpanjang

    if (slides && dotsContainer && prevBtn && nextBtn) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot-indicator', 'w-3', 'h-3', 'rounded-full', 'bg-white', 'bg-opacity-50');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot-indicator');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        function goToSlide(index) {
            showSlide(index);
        }

        // Event listeners for carousel controls
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-advance slides
        let slideIntervalId = setInterval(nextSlide, slideInterval);

        // Pause auto-advance on hover
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideIntervalId);
            });

            heroSection.addEventListener('mouseleave', () => {
                slideIntervalId = setInterval(nextSlide, slideInterval);
            });
        }
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth Scrolling
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // CTA Button
    const ctaButton = document.getElementById('ctaButton');
    const mobileCtaButton = document.getElementById('mobileCtaButton');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            scrollToSection('kontak');
        });
    }
    
    if (mobileCtaButton) {
        mobileCtaButton.addEventListener('click', function() {
            scrollToSection('kontak');
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        });
    }

    // Reveal Animation on Scroll - Durasi Diperpanjang
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Parallax Effect
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Mohon lengkapi semua field', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Email tidak valid', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Mengirim...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                showNotification('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.', 'success');
            }, 2000);
        });
    }

    // Notification Function - Transisi Lebih Halus
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-700 translate-x-full`;
        
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="mr-3">
                    ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
                </div>
                <div>${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in - Durasi Diperpanjang
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 700); // Durasi diperpanjang
        }, 5000);
    }

    // ========== PORTFOLIO LIGHTBOX FUNCTIONALITY - Transisi Lebih Halus ==========
    
    // Get all required elements
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxTags = document.getElementById('lightboxTags');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevPortfolio = document.getElementById('prevPortfolio');
    const nextPortfolio = document.getElementById('nextPortfolio');

    // Portfolio data
    const portfolioData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Identitas Brand Chikin Farm',
            description: 'Desain lengkap dari logo hingga materi promosi untuk peternakan ayam modern dengan pendekatan minimalis dan profesional.',
            tags: 'Branding • Print Design • Logo Design'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Neon Box Warung Sunda Enak',
            description: 'Pemasangan neon box custom dengan desain tradisional modern untuk meningkatkan visibilitas restoran.',
            tags: 'Outdoor Advertising • Signage • Installation'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Kemasan Kopi Gunung',
            description: 'Desain kemasan premium untuk produk kopi lokal dengan sentuhan alam dan elegan.',
            tags: 'Package Design • Branding • Print'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Website Profile Perusahaan',
            description: 'Pembuatan website company profile dengan desain modern dan fully responsive untuk meningkatkan kredibilitas bisnis.',
            tags: 'Web Design • UI/UX • Development'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Workshop Percetakan Digital',
            description: 'Pelatihan intensif mengenai teknik percetakan digital untuk UMKM dengan materi praktis dan aplikatif.',
            tags: 'Training • Workshop • Education'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Kampanye Digital Marketing',
            description: 'Strategi digital marketing terintegrasi untuk meningkatkan penjualan dan brand awareness.',
            tags: 'Digital Marketing • Social Media • Campaign'
        }
    ];

    let currentPortfolioIndex = 0;

    // Debug function
    function debug(message) {
        console.log('Lightbox Debug:', message);
    }

    // Check if elements exist
    function checkElements() {
        debug('Checking elements...');
        
        if (!lightbox) debug('Lightbox element not found');
        if (!lightboxImage) debug('Lightbox image not found');
        if (!lightboxTitle) debug('Lightbox title not found');
        if (!lightboxDescription) debug('Lightbox description not found');
        if (!lightboxTags) debug('Lightbox tags not found');
        if (!closeLightbox) debug('Close button not found');
        if (!prevPortfolio) debug('Previous button not found');
        if (!nextPortfolio) debug('Next button not found');
        
        return lightbox && lightboxImage && lightboxTitle && lightboxDescription && lightboxTags && closeLightbox && prevPortfolio && nextPortfolio;
    }

    // Open lightbox function - Transisi Lebih Halus
    function openLightbox(index) {
        debug('Opening lightbox for index: ' + index);
        
        if (!checkElements()) {
            debug('Elements not found, cannot open lightbox');
            return;
        }

        currentPortfolioIndex = index;
        const portfolio = portfolioData[index];

        // Update content
        lightboxImage.src = portfolio.image;
        lightboxImage.alt = portfolio.title;
        lightboxTitle.textContent = portfolio.title;
        lightboxDescription.textContent = portfolio.description;
        lightboxTags.textContent = portfolio.tags;

        // Show lightbox with animation - Durasi Diperpanjang
        lightbox.classList.remove('hidden');
        lightbox.style.display = 'flex';
        lightbox.classList.add('lightbox-enter');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Reset animation after delay
        setTimeout(() => {
            lightbox.classList.remove('lightbox-enter');
        }, 600); // Durasi diperpanjang
        
        debug('Lightbox opened successfully');
    }

    // Close lightbox function - Transisi Lebih Halus
    function closeLightboxFunction() {
        debug('Closing lightbox');
        
        if (!lightbox) {
            debug('Lightbox element not found, cannot close');
            return;
        }

        // Add exit animation
        lightbox.classList.add('lightbox-exit');
        
        setTimeout(() => {
            // Hide lightbox
            lightbox.classList.add('hidden');
            lightbox.style.display = 'none';
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
            
            debug('Lightbox closed successfully');
        }, 400); // Durasi diperpanjang
    }

    // Navigate portfolio function - Transisi Lebih Halus
    function navigatePortfolio(direction) {
        debug('Navigating: ' + direction);
        
        // Check if all required elements exist
        if (!checkElements()) {
            debug('Elements not found, cannot navigate');
            return;
        }

        // Add exit animation to current image
        lightboxImage.classList.add('lightbox-image-exit');
        
        setTimeout(() => {
            // Calculate new index
            if (direction === 'next') {
                currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioData.length;
            } else {
                currentPortfolioIndex = (currentPortfolioIndex - 1 + portfolioData.length) % portfolioData.length;
            }

            debug('New index: ' + currentPortfolioIndex);

            const portfolio = portfolioData[currentPortfolioIndex];

            // Update content
            lightboxImage.src = portfolio.image;
            lightboxImage.alt = portfolio.title;
            lightboxTitle.textContent = portfolio.title;
            lightboxDescription.textContent = portfolio.description;
            lightboxTags.textContent = portfolio.tags;

            // Add enter animation
            lightboxImage.classList.remove('lightbox-image-exit');
            lightboxImage.classList.add('lightbox-image-enter');
            
            // Reset animation after delay
            setTimeout(() => {
                lightboxImage.classList.remove('lightbox-image-enter');
            }, 500); // Durasi diperpanjang
            
            debug('Content updated successfully');
        }, 200); // Durasi diperpanjang
    }

    // Setup event listeners
    function setupPortfolioEventListeners() {
        debug('Setting up portfolio event listeners...');

        // Portfolio items click event
        if (portfolioItems && portfolioItems.length > 0) {
            debug('Found ' + portfolioItems.length + ' portfolio items');
            
            portfolioItems.forEach((item, index) => {
                item.style.cursor = 'pointer';
                
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    debug('Portfolio item ' + index + ' clicked');
                    openLightbox(index);
                });
            });
        } else {
            debug('No portfolio items found');
        }

        // Close button event
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                debug('Close button clicked');
                closeLightboxFunction();
            });
            debug('Close button listener attached');
        } else {
            debug('Close button not found');
        }

        // Previous button event
        if (prevPortfolio) {
            prevPortfolio.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                debug('Previous button clicked');
                navigatePortfolio('prev');
            });
            debug('Previous button listener attached');
        } else {
            debug('Previous button not found');
        }

        // Next button event
        if (nextPortfolio) {
            nextPortfolio.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                debug('Next button clicked');
                navigatePortfolio('next');
            });
            debug('Next button listener attached');
        } else {
            debug('Next button not found');
        }

        // Overlay click event
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    debug('Overlay clicked');
                    closeLightboxFunction();
                }
            });
            debug('Overlay click listener attached');
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox && !lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    debug('Escape key pressed');
                    closeLightboxFunction();
                } else if (e.key === 'ArrowLeft') {
                    debug('Left arrow pressed');
                    navigatePortfolio('prev');
                } else if (e.key === 'ArrowRight') {
                    debug('Right arrow pressed');
                    navigatePortfolio('next');
                }
            }
        });
        debug('Keyboard navigation listener attached');

        // Touch swipe support for mobile - Transisi Lebih Halus
        let touchStartX = 0;
        let touchEndX = 0;

        if (lightbox) {
            lightbox.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            lightbox.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    debug('Swipe left detected');
                    navigatePortfolio('prev');
                } else {
                    debug('Swipe left detected');
                    navigatePortfolio('next');
                }
            }
        }
        debug('Touch swipe listeners attached');

        debug('All portfolio event listeners attached successfully');
    }

    // Initialize portfolio functionality
    function initPortfolio() {
        debug('Initializing portfolio functionality...');
        
        // Check if portfolio section exists
        const portfolioSection = document.getElementById('portofolio');
        if (portfolioSection) {
            debug('Portfolio section found, setting up lightbox');
            setupPortfolioEventListeners();
        } else {
            debug('Portfolio section not found, skipping lightbox setup');
        }
        
        debug('Portfolio initialization complete');
    }

    // Initialize portfolio when DOM is loaded
    initPortfolio();
});