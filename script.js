'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MANAJEMEN NAVIGASI RESPONSIF
    // =========================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Mengontrol visibilitas menu navigasi pada resolusi seluler
    hamburger.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        menu.classList.toggle('active'); 
    });

    // Menutup menu secara otomatis saat tautan navigasi dipilih
    menu.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', () => menu.classList.remove('active')); 
    });

    // Menutup menu jika interaksi klik terjadi di luar batas elemen navigasi
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // =========================================================
    // 2. MANAJEMEN TEMA (GELAP/TERANG)
    // =========================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Sinkronisasi status awal ikon dengan preferensi tema yang dimuat
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Menangani logika pertukaran atribut tema pada elemen root
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

        // Menyimpan preferensi tema secara asinkron untuk menjaga performa render
        setTimeout(() => {
            localStorage.setItem('theme', newTheme);
        }, 10);
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
        // Fungsi utama untuk mengatur visibilitas slide dan indikator
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length; 
            
            slides[currentSlide].classList.add('active');
            if(dots.length) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        // Menginisialisasi perputaran gambar secara otomatis
        const startSlide = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        // Menghentikan perputaran otomatis saat dibutuhkan
        const stopSlide = () => {
            clearInterval(slideInterval);
        };

        // Event listener untuk kendali navigasi (panah dan indikator titik)
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlide(); startSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlide(); startSlide(); });
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.getAttribute('data-index')));
                stopSlide(); startSlide(); 
            });
        });

        // Menunda perpindahan slide saat pengguna mengarahkan kursor ke area konten
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
// 5. IMPLEMENTASI LAZY LOAD & FITUR LANJUTAN SAAT JENDELA DIMUAT
// =========================================================
window.addEventListener('load', () => {
    
    // Mengoptimalkan pemuatan aset visual beresolusi tinggi (Background Images)
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        slide.removeAttribute('data-bg');
    });

    // Menandai tautan navigasi yang mewakili halaman aktif saat ini
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/beranda')) {
            link.classList.add('nav-active');
        }
    });
});

// =========================================================
// 6. KENDALI TOMBOL 'SCROLL TO TOP'
// =========================================================
const scrollTopBtn = document.getElementById('scrollToTopBtn');

if (scrollTopBtn) {
    // Memantau metrik gulir vertikal untuk menentukan visibilitas tombol
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Mengembalikan orientasi pandangan secara halus ke puncak dokumen
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}