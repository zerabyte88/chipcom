document.addEventListener('DOMContentLoaded', () => {
    // 1. HAMBURGER MENU BUAT HP
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

    // 2. TOMBOL DARK MODE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // 3. SLIDESHOW OTOMATIS
    const slides = document.querySelectorAll('.slide');
    if(slides.length > 1) {
        setInterval(() => {
            let active = document.querySelector('.slide.active');
            active.classList.remove('active');
            let next = active.nextElementSibling || slides[0];
            next.classList.add('active');
        }, 5000);
    }

    // 4. ANIMASI SCROLL
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

// 5. LAZY LOAD BACKGROUND SLIDESHOW
// taruh di luar DOMContentLoaded biar jalan setelah semua aset utama selesai di load
window.addEventListener('load', () => {
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        // (Opsional) Hapus atribut data-bg kalau sudah di load
        slide.removeAttribute('data-bg');
    });
});