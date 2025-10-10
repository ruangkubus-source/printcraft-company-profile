// Preloader
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1500);
        });

        // Promo Bar Slider
        let currentPromo = 0;
        const promoSlides = document.querySelectorAll('.promo-slide');
        const promoInterval = 3000; // 3 seconds
        
        function showPromoSlide(index) {
            promoSlides.forEach(slide => slide.classList.remove('active'));
            promoSlides[index].classList.add('active');
        }
        
        function nextPromoSlide() {
            currentPromo = (currentPromo + 1) % promoSlides.length;
            showPromoSlide(currentPromo);
        }
        
        // Start promo slider
        setInterval(nextPromoSlide, promoInterval);
        
        // Hero Slider
        let currentSlide = 0;
        const heroSlides = document.querySelectorAll('.hero-slide');
        const sliderDots = document.querySelectorAll('.slider-dot');
        const slideInterval = 5000; // 5 seconds
        
        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            sliderDots.forEach(dot => dot.classList.remove('active'));
            
            heroSlides[index].classList.add('active');
            sliderDots[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }
        
        // Start hero slider
        setInterval(nextSlide, slideInterval);
        
        // Add click events to slider dots
        sliderDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                currentSlide = slideIndex;
                showSlide(currentSlide);
            });
        });
        
        // Services Carousel
        const servicesTrack = document.getElementById('servicesTrack');
        const serviceCards = document.querySelectorAll('.service-card');
        const prevBtn = document.getElementById('prevService');
        const nextBtn = document.getElementById('nextService');
        const servicesDots = document.getElementById('servicesDots');
        
        let currentService = 0;
        const cardsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        const totalServices = serviceCards.length;
        
        // Create dots for services carousel
        for (let i = 0; i < Math.ceil(totalServices / cardsToShow); i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToService(index);
            });
            servicesDots.appendChild(dot);
        }
        
        function updateServiceCarousel() {
            const cardWidth = serviceCards[0].offsetWidth + 25; // card width + gap
            const translateX = -currentService * cardWidth * cardsToShow;
            servicesTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update dots
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentService) {
                    dot.classList.add('active');
                }
            });
        }
        
        function goToService(index) {
            currentService = index;
            updateServiceCarousel();
        }
        
        function nextService() {
            if (currentService < Math.ceil(totalServices / cardsToShow) - 1) {
                currentService++;
            } else {
                currentService = 0;
            }
            updateServiceCarousel();
        }
        
        function prevService() {
            if (currentService > 0) {
                currentService--;
            } else {
                currentService = Math.ceil(totalServices / cardsToShow) - 1;
            }
            updateServiceCarousel();
        }
        
        prevBtn.addEventListener('click', prevService);
        nextBtn.addEventListener('click', nextService);
        
        // Auto slide for services
        let servicesInterval = setInterval(nextService, 5000);
        
        // Pause auto slide on hover
        servicesTrack.addEventListener('mouseenter', () => {
            clearInterval(servicesInterval);
        });
        
        servicesTrack.addEventListener('mouseleave', () => {
            servicesInterval = setInterval(nextService, 5000);
        });
        
        // Scroll Animations
        const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
        
        function checkScroll() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
            
            // Progress bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.querySelector('.progress-bar').style.width = scrolled + '%';
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (winScroll > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Mobile Navigation Toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Permintaan Anda telah berhasil dikirim. Kami akan menghubungi Anda dalam waktu 1x24 jam.');
            this.reset();
        });
        
        // Handle window resize for services carousel
        window.addEventListener('resize', function() {
            // Recalculate based on new window size
            const newCardsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
            // Reset to first slide on resize
            currentService = 0;
            updateServiceCarousel();
        });
        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Portfolio Modal
        const portfolioModal = document.getElementById('portfolioModal');
        const modalClose = document.getElementById('modalClose');
        const viewDetailsButtons = document.querySelectorAll('.view-details');

        // Project data
        const projects = {
            1: {
                title: 'Identitas Visual Perusahaan',
                image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1540&q=80',
                desc: 'Kami mengembangkan identitas visual yang kuat untuk perusahaan teknologi yang baru saja memulai bisnisnya. Proyek ini mencakup desain logo, kartu nama, kop surat, dan semua elemen branding lainnya yang konsisten dan profesional.',
                time: '3 minggu',
                client: 'TechSolutions Inc.',
                service: 'Branding',
                year: '2023',
                tech: 'Adobe Illustrator, Photoshop, Material: Art Paper 260gsm, Foil Stamping'
            },
            2: {
                title: 'Kemasan Produk Makanan',
                image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                desc: 'Desain kemasan untuk produk makanan organik dengan pendekatan minimalis yang menonjolkan kesan alami dan sehat. Kami memastikan desain tidak hanya menarik tetapi juga fungsional dan mudah diproduksi.',
                time: '2 minggu',
                client: 'Organic Delights',
                service: 'Packaging',
                year: '2023',
                tech: 'Adobe Illustrator, Material: Kraft Paper, UV Coating, Biodegradable Ink'
            },
            3: {
                title: 'Buku Perusahaan & Katalog',
                image: 'https://images.unsplash.com/photo-1587334984005-5eb24527d1c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
                desc: 'Percetakan buku profil perusahaan dan katalog produk dengan finishing premium. Kami menggunakan teknik cetak offset untuk hasil yang tajam dan warna yang konsisten, dengan berbagai pilihan finishing untuk memberikan kesan eksklusif.',
                time: '4 minggu',
                client: 'Global Enterprise',
                service: 'Percetakan',
                year: '2023',
                tech: 'Cetak Offset, Material: Art Paper 150gsm, Hardcover, Embossing, Spot UV'
            },
            4: {
                title: 'Signage & Display Toko',
                image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                desc: 'Pembuatan signage dan display untuk toko retail dengan material akrilik berkualitas tinggi. Desain kami fokus pada visibilitas maksimal dan konsistensi dengan identitas merek klien.',
                time: '2 minggu',
                client: 'Urban Style Boutique',
                service: 'Signage',
                year: '2023',
                tech: 'Laser Cutting, Material: Acrylic 5mm, LED Lighting, Digital Printing'
            },
            5: {
                title: 'Branding Kafe & Restoran',
                image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                desc: 'Identitas visual lengkap untuk kafe dengan konsep industrial modern. Kami menciptakan sistem branding yang kohesif mulai dari logo, menu, hingga merchandise yang mencerminkan karakter unik kafe tersebut.',
                time: '3 minggu',
                client: 'Brew & Bites Cafe',
                service: 'Branding',
                year: '2023',
                tech: 'Adobe Creative Suite, Material: Various for different applications'
            },
            6: {
                title: 'Kemasan Produk Kosmetik',
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                desc: 'Desain kemasan premium untuk produk skincare dengan berbagai finishing khusus untuk menciptakan kesan mewah dan eksklusif. Kami memastikan kemasan tidak hanya indah tetapi juga melindungi produk dengan baik.',
                time: '3 minggu',
                client: 'Luxury Skincare Co.',
                service: 'Packaging',
                year: '2023',
                tech: 'Material: Glass, Specialty Paper, Foil Stamping, Spot UV, Embossing'
            }
        };

        // Open modal when view details button is clicked
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                const project = projects[projectId];
                
                if (project) {
                    document.getElementById('modalProjectTitle').textContent = project.title;
                    document.getElementById('modalProjectImage').src = project.image;
                    document.getElementById('modalProjectDesc').textContent = project.desc;
                    document.getElementById('modalProjectTime').textContent = project.time;
                    document.getElementById('modalProjectClient').textContent = project.client;
                    document.getElementById('modalProjectService').textContent = project.service;
                    document.getElementById('modalProjectYear').textContent = project.year;
                    document.getElementById('modalProjectTech').textContent = project.tech;
                    
                    portfolioModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) {
                portfolioModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Testimonial Carousel - Improved with Smoother Transitions
        const testimonialSlider = document.getElementById('testimonialSlider');
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        let currentTestimonial = 0;
        let testimonialInterval;
        const testimonialIntervalTime = 5000; // 5 seconds

        function showTestimonial(index) {
            // Remove active class from all items
            testimonialItems.forEach(item => {
                item.classList.remove('active', 'leaving');
            });
            
            // Add leaving class to current active item for smooth exit
            if (testimonialItems[currentTestimonial]) {
                testimonialItems[currentTestimonial].classList.add('leaving');
            }
            
            // Set new current index
            currentTestimonial = index;
            
            // Add active class to new item after a small delay for smoother transition
            setTimeout(() => {
                testimonialItems[currentTestimonial].classList.add('active');
            }, 100);
        }

        function nextTestimonial() {
            const nextIndex = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(nextIndex);
        }

        // Start testimonial carousel
        function startTestimonialCarousel() {
            testimonialInterval = setInterval(nextTestimonial, testimonialIntervalTime);
        }

        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        // Resume when mouse leaves
        testimonialSlider.addEventListener('mouseleave', () => {
            startTestimonialCarousel();
        });

        // Initialize testimonial carousel
        startTestimonialCarousel();
        
        // Enhanced Form Handling with Validation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !service || !subject || !message) {
                showNotification('Harap lengkapi semua field yang wajib diisi.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Format email tidak valid.', 'error');
                return;
            }
            
            // Phone validation (simple)
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Format nomor telepon tidak valid.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda dalam waktu 1x24 jam.', 'success');
                this.reset();
                
                // Reset floating labels
                document.querySelectorAll('.form-control').forEach(input => {
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                });
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Notification function
        function showNotification(message, type) {
            // Remove existing notification
            const existingNotification = document.querySelector('.form-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = `form-notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;
            
            // Add styles for notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10B981' : '#EF4444'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                max-width: 400px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Close button functionality
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }

        // Add CSS for notification animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1rem;
            }
        `;
        document.head.appendChild(style);

        // Enhanced floating labels
        document.querySelectorAll('.form-control').forEach(input => {
            // Check initial state
            if (input.value) {
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            // Add input event listener
            input.addEventListener('input', function() {
                const label = this.nextElementSibling;
                if (this.value) {
                    label.style.top = '-10px';
                    label.style.left = '15px';
                    label.style.fontSize = '0.85rem';
                    label.style.color = 'var(--primary)';
                    label.style.fontWeight = '600';
                } else {
                    label.style.top = '18px';
                    label.style.left = '20px';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-light)';
                    label.style.fontWeight = 'normal';
                }
            });
        });
        
        // Newsletter Form Handling
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            const originalText = submitBtn.textContent;
            
            // Simple email validation
            const email = emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                showNewsletterNotification('Format email tidak valid.', 'error');
                return;
            }
            
            // Simulate subscription
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNewsletterNotification('Terima kasih! Anda telah berhasil berlangganan newsletter kami.', 'success');
                emailInput.value = '';
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Newsletter notification function
        function showNewsletterNotification(message, type) {
            // Remove existing notification
            const existingNotification = document.querySelector('.newsletter-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = `newsletter-notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            // Add styles for notification
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10B981' : '#EF4444'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 400px;
                z-index: 10000;
                animation: slideInUp 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutDown 0.3s ease';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }

        // Add CSS for newsletter notification animations
        const newsletterStyle = document.createElement('style');
        newsletterStyle.textContent = `
            @keyframes slideInUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideOutDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(newsletterStyle);