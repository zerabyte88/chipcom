'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MANAJEMEN NAVIGASI HAMBURGER SELULER
    // =========================================================
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
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
    }

    // =========================================================
    // 2. MANAJEMEN TEMA & ANIMASI ROTASI BULAN/MATAHARI
    // =========================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    if (themeIcon) {
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
                setTimeout(() => localStorage.setItem('theme', newTheme), 10);
            }, 150); 
        });
    }

    // =========================================================
    // 3. INDIKATOR NAVIGASI MENU (SLIDING EFFECT)
    // =========================================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul a');
    const navUl = document.querySelector('nav ul');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/beranda')) {
            link.classList.add('nav-active');
        }
    });

    if (navUl && window.innerWidth > 768) {
        navUl.classList.add('has-indicator');
        
        const indicator = document.createElement('li');
        indicator.classList.add('nav-indicator');
        navUl.appendChild(indicator);

        const updateIndicator = (link, animate = true) => {
            if (!link) return;
            indicator.style.transition = animate ? 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
            indicator.style.width = `${link.offsetWidth}px`;
            indicator.style.height = `${link.offsetHeight}px`;
            indicator.style.left = `${link.offsetLeft}px`;
            indicator.style.top = `${link.offsetTop}px`;
        };

        window.addEventListener('load', () => {
            const activeLink = navUl.querySelector('a.nav-active');
            if (activeLink) updateIndicator(activeLink, false);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Menghentikan aksi default untuk memutar animasi terlebih dahulu
                e.preventDefault(); 
                
                updateIndicator(link, true);
                navLinks.forEach(l => l.classList.remove('nav-active'));
                link.classList.add('nav-active');

                // Jeda 250ms agar animasi slide terlihat sebelum pindah halaman
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 250);
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                const currentActive = navUl.querySelector('a.nav-active');
                if (currentActive) updateIndicator(currentActive, false);
            }
        });
    }

    // =========================================================
    // 4. KENDALI TOMBOL 'SCROLL TO TOP'
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});