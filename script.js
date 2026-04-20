'use strict';

/**
 * Event Listener Utama
 * Blok ini memastikan skrip JavaScript dijalankan setelah seluruh struktur HTML
 * selesai diproses oleh peramban, mencegah manipulasi DOM pada elemen yang belum ada.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MANAJEMEN NAVIGASI RESPONSIF (HAMBURGER MENU)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Toggle status visibilitas menu navigasi pada resolusi layar perangkat seluler
    hamburger.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        menu.classList.toggle('active'); 
    });

    // Delegasi penutupan menu secara otomatis apabila sebuah tautan navigasi diklik
    menu.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', () => menu.classList.remove('active')); 
    });

    // Menangani penutupan menu apabila pengguna berinteraksi di luar batasan elemen menu
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // ==========================================================================
    // 2. KONTROL TEMA (DARK MODE / LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Penyesuaian ikon berdasarkan tema yang diinisialisasi oleh skrip sebaris (inline) di tag <head>
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Eksekusi transisi tema dengan prioritas kinerja perenderan (Rendering Performance)
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Manipulasi DOM (Perubahan CSS) dieksekusi segera secara sinkron
        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        // Operasi I/O ditunda menggunakan setTimeout agar tidak memblokir antrean 
        // Main Thread, menghindari fenomena "stuttering" atau jeda visual.
        setTimeout(() => {
            localStorage.setItem('theme', newTheme);
        }, 10);
    });

    // ==========================================================================
    // 3. LOGIKA OTOMASI SLIDESHOW
    // ==========================================================================
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        // Melakukan pergantian slide dengan interval siklus setiap 5 detik
        setInterval(() => {
            const active = document.querySelector('.slide.active');
            active.classList.remove('active');
            
            const next = active.nextElementSibling || slides[0];
            next.classList.add('active');
        }, 5000);
    }

    // ==========================================================================
    // 4. ANIMASI BERBASIS INTERSECTION OBSERVER
    // ==========================================================================
    const observerOptions = { 
        threshold: 0.1 // Eksekusi callback ketika 10% dimensi elemen memasuki viewport
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('animate'); 
                // Menghentikan observasi elemen yang telah dianimasikan guna menghemat sumber daya memori
                obs.unobserve(entry.target); 
            } 
        });
    }, observerOptions);
    
    // Mendaftarkan semua elemen dengan class target untuk diobservasi
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// ==========================================================================
// 5. IMPLEMENTASI LAZY LOAD PADA ASET LATAR BELAKANG GAMBAR
// ==========================================================================
// Menempatkan pemrosesan beban kerja pada siklus event 'load' untuk
// memastikan aset utama halaman telah diproses secara komprehensif.
window.addEventListener('load', () => {
    const lazySlides = document.querySelectorAll('.slide[data-bg]');
    lazySlides.forEach(slide => {
        slide.style.backgroundImage = `url('${slide.getAttribute('data-bg')}')`;
        // Membersihkan atribut untuk menjaga kerapian struktur DOM
        slide.removeAttribute('data-bg');
    });
});