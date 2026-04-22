'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MANAJEMEN NAVIGASI RESPONSIF
    // =========================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    hamburger.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        menu.classList.toggle('active'); 
    });

    menu.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', () => menu.classList.remove('active')); 
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // =========================================================
    // 2. MANAJEMEN TEMA (GELAP/TERANG) DAN ANIMASI IKON
    // =========================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        themeIcon.classList.add('icon-transition');

        setTimeout(() => {
            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }

            themeIcon.classList.remove('icon-transition');

            setTimeout(() => {
                localStorage.setItem('theme', newTheme);
            }, 10);
        }, 150); 
    });

    // =========================================================
    // 3. LOGIKA SLIDESHOW DAN NAVIGASI MANUAL
    // =========================================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const heroSection = document.querySelector('.hero');
    
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 1) {
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length; 
            
            slides[currentSlide].classList.add('active');
            if(dots.length) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startSlide = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlide = () => {
            clearInterval(slideInterval);
        };

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlide(); startSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlide(); startSlide(); });
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.getAttribute('data-index')));
                stopSlide(); startSlide(); 
            });
        });

        if(heroSection) {
            heroSection.addEventListener('mouseenter', stopSlide);
            heroSection.addEventListener('mouseleave', startSlide);
        }

        startSlide();
    }

    // =========================================================
    // 4. OBSERVASI ELEMEN UNTUK ANIMASI BERBASIS GULIR
    // =========================================================
    const observerOptions = { threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('animate'); 
                obs.unobserve(entry.target); 
            } 
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// =========================================================
// 5. PENANGANAN SIKLUS MUAT (LOAD) & INDIKATOR NAVIGASI
// =========================================================
window.addEventListener('load', () => {
    
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        slide.removeAttribute('data-bg');
    });

    // Menentukan tautan aktif berdasarkan URL
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul a');
    const navUl = document.querySelector('nav ul');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/beranda')) {
            link.classList.add('nav-active');
        }
    });

    // Implementasi Indikator Geser (Sliding Indicator)
    if (navUl && window.innerWidth > 768) {
        const indicator = document.createElement('li');
        indicator.classList.add('nav-indicator');
        navUl.appendChild(indicator);

        const updateIndicator = (link, animate = true) => {
            if (!link) return;
            indicator.style.transition = animate ? 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
            indicator.style.width = `${link.offsetWidth}px`;
            indicator.style.height = `${link.offsetHeight}px`;
            indicator.style.left = `${link.offsetLeft}px`;
            indicator.style.top = `${link.offsetTop}px`;
        };

        const activeLink = navUl.querySelector('a.nav-active');
        if (activeLink) {
            // Pengaturan posisi awal tanpa animasi transisi
            setTimeout(() => updateIndicator(activeLink, false), 50);
        }

        // Memicu animasi pergeseran saat item menu diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                updateIndicator(link, true);
            });
        });

        // Sinkronisasi ukuran saat jendela peramban diubah ukurannya
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                const currentActive = navUl.querySelector('a.nav-active');
                if (currentActive) updateIndicator(currentActive, false);
            }
        });
    }
});

// =========================================================
// 6. KENDALI TOMBOL 'SCROLL TO TOP'
// =========================================================
const scrollTopBtn = document.getElementById('scrollToTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}