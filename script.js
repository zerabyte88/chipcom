/**
 * Event listener utama yang berjalan setelah seluruh struktur DOM selesai dimuat.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MANAJEMEN NAVIGASI MOBILE (HAMBURGER MENU)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Mengaktifkan atau menonaktifkan visibilitas menu saat tombol hamburger diklik
    hamburger.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        menu.classList.toggle('active'); 
    });

    // Menutup menu secara otomatis saat salah satu tautan di dalamnya diklik
    menu.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', () => menu.classList.remove('active')); 
    });

    // Menutup menu secara otomatis jika pengguna mengklik area di luar menu atau tombol hamburger
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // ==========================================================================
    // 2. IMPLEMENTASI DARK MODE (TEMA GELAP)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Memeriksa preferensi tema yang tersimpan di Local Storage pada saat halaman dimuat
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Mengganti tema (Terang / Gelap) saat tombol tema diklik dan menyimpannya di Local Storage
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
        // Berpindah ke slide berikutnya setiap 5000 milidetik (5 detik)
        setInterval(() => {
            let active = document.querySelector('.slide.active');
            active.classList.remove('active');
            
            // Mencari elemen slide selanjutnya atau kembali ke slide pertama jika sudah di akhir
            let next = active.nextElementSibling || slides[0];
            next.classList.add('active');
        }, 5000);
    }

    // ==========================================================================
    // 4. ANIMASI SCROLL DENGAN INTERSECTION OBSERVER
    // ==========================================================================
    const observerOptions = { 
        threshold: 0.1 // Animasi dijalankan ketika 10% dari elemen terlihat di layar
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('animate'); 
                // Menghentikan observasi pada elemen tersebut setelah animasi dijalankan
                obs.unobserve(entry.target); 
            } 
        });
    }, observerOptions);
    
    // Menerapkan observer ke semua elemen yang memiliki class 'fade-in-up'
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// ==========================================================================
// 5. LAZY LOAD UNTUK GAMBAR LATAR BELAKANG SLIDESHOW
// ==========================================================================
// Event listener ini berjalan pada 'window load' untuk memastikan proses 
// pemuatan gambar sekunder tidak menghalangi pemuatan aset utama halaman.
window.addEventListener('load', () => {
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        // Menerapkan URL dari atribut khusus data-bg menjadi backgroundImage CSS
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        // Membersihkan atribut data-bg setelah diterapkan untuk menjaga kebersihan DOM
        slide.removeAttribute('data-bg');
    });
});