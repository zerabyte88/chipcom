'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================
    // 1. MANAJEMEN NAVIGASI RESPONSIF (HAMBURGER MENU)
    // =================================================
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

    // =========================================
    // 2. KONTROL TEMA (DARK MODE / LIGHT MODE)
    // =========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        setTimeout(() => {
            localStorage.setItem('theme', newTheme);
        }, 10);
    });

    // =============================================
    // 3. LOGIKA OTOMASI SLIDESHOW & KONTROL MANUAL 
    // =============================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const heroSection = document.querySelector('.hero');
    
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 1) {
        // Fungsi utama ganti slide
        const showSlide = (index) => {
            // Bersihkan kelas active dari slide dan dots
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            // Logika looping balik ke awal/akhir
            currentSlide = (index + slides.length) % slides.length; 
            
            // Tambahin kelas active ke target
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

        // Event Listener buat tombol Kiri/Kanan
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlide(); startSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlide(); startSlide(); });
        
        // Event Listener buat Dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.getAttribute('data-index')));
                stopSlide(); startSlide(); // Reset timer pas diklik manual
            });
        });

        // Pause slideshow kalau kursor lagi nge-hover ke area hero
        if(heroSection) {
            heroSection.addEventListener('mouseenter', stopSlide);
            heroSection.addEventListener('mouseleave', startSlide);
        }

        // Gass jalan!
        startSlide();
    }

    // ==========================================
    // 4. ANIMASI BERBASIS INTERSECTION OBSERVER
    // ==========================================
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

// ==========================================================
// 5. IMPLEMENTASI LAZY LOAD PADA ASET LATAR BELAKANG GAMBAR
// ==========================================================
window.addEventListener('load', () => {
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        slide.removeAttribute('data-bg');
    });

// =================================
// 6. HIGHLIGHT MENU NAVIGASI AKTIF
// =================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/beranda')) {
            link.classList.add('nav-active');
        }
    });
});

// =======================
// 7. TOMBOL SCROLL TO TOP
// =======================
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            // Munculin tombol kalau udah scroll sejauh 300px
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