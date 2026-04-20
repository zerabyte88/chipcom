/**
 * Event Listener Utama
 * Dieksekusi ketika seluruh hierarki DOM berhasil dimuat oleh peramban.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MANAJEMEN MENU NAVIGASI MOBILE (HAMBURGER)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Membuka atau menutup navigasi menu pada tampilan mobile
    hamburger.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        menu.classList.toggle('active'); 
    });

    // Menutup menu secara otomatis saat tautan diklik
    menu.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', () => menu.classList.remove('active')); 
    });

    // Menutup navigasi saat pengguna melakukan klik di luar area menu
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // ==========================================================================
    // 2. LOGIKA TEMA (DARK MODE / LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Mengevaluasi dan menerapkan preferensi tema dari Local Storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Mengganti tema saat tombol diklik serta menyimpan preferensi ke Local Storage
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

    // ==========================================================================
    // 3. LOGIKA SLIDESHOW OTOMATIS
    // ==========================================================================
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        setInterval(() => {
            let active = document.querySelector('.slide.active');
            active.classList.remove('active');
            
            // Transisi ke elemen berikutnya atau mengulang dari awal
            let next = active.nextElementSibling || slides[0];
            next.classList.add('active');
        }, 5000);
    }

    // ==========================================================================
    // 4. ANIMASI GULIR BERBASIS INTERSECTION OBSERVER
    // ==========================================================================
    const observerOptions = { 
        threshold: 0.1 
    };
    
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

// ==========================================================================
// 5. LAZY LOAD UNTUK ASET GAMBAR LATAR BELAKANG
// ==========================================================================
// Memuat gambar sekunder setelah sumber daya kritis (DOM, CSS, JS) selesai dimuat
window.addEventListener('load', () => {
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        slide.removeAttribute('data-bg');
    });
});