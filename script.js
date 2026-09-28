// ============================================
// Aksu Halı Evi - JavaScript
// Etkileşimler ve animasyonlar
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ------------------------------------------
    // Header Scroll Effect
    // ------------------------------------------
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ------------------------------------------
    // Mobile Menu Toggle
    // ------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Menü linklerine tıklandığında menüyü kapat
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ------------------------------------------
    // FAQ Accordion
    // ------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Diğer tüm öğeleri kapat
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });

            // Tıklanan öğeyi aç/kapat
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ------------------------------------------
    // Smooth Scroll for Anchor Links
    // ------------------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------
    // Intersection Observer for Animations
    // ------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -200px 0px',
        threshold: 0.01
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animasyonlu öğeleri gözlemle
    const animatedElements = document.querySelectorAll(
        '.process-card, .collection-card, .service-card, ' +
        '.payment-option-card, .contact-card, .faq-item, ' +
        '.about-feature, .payment-highlight'
    );

    animatedElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.transitionDelay = (index * 0.02) + 's';
        observer.observe(el);
    });

    // visible class'ı eklendiğinde stilini sıfırla
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ------------------------------------------
    // Lazy Loading Images
    // ------------------------------------------
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ------------------------------------------
    // WhatsApp Button Click Tracking (optional)
    // ------------------------------------------
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('WhatsApp link clicked:', this.href);
        });
    });

    // ------------------------------------------
    // Phone Link Click Tracking (optional)
    // ------------------------------------------
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
        });
    });

    // ------------------------------------------
    // Console Welcome Message
    // ------------------------------------------
    console.log('%c Aksu Halı Evi ', 'background: #8B6914; color: #fff; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
    console.log('%c Web sitesine hoş geldiniz! ', 'color: #8B6914; font-size: 14px;');

});
