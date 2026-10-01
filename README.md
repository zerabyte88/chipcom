<div align="center">
  <img src="images/logo.svg" alt="UKM Chip.Com Logo" width="120" height="120" />
  <h1>CHIP.COM Website</h1>
  <p><strong>Official Web Portal of UKM Chip.Com &bull; STMIK Indonesia Banjarmasin</strong></p>

  <p>
    <a href="https://chipcom.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-chipcom.vercel.app-0066ff?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/Version-2.6-blue?style=for-the-badge" alt="Version 2.6" />
    <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status Active" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/Responsive-Mobile_First-brightgreen?style=flat-square" alt="Responsive" />
  </p>
</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Site Pages & Architecture](#site-pages--architecture)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
- [Deployment & Routing](#deployment--routing)
- [Roadmap & Version History](#roadmap--version-history)
- [Contact & Organization](#contact--organization)
- [License](#license)

---

## About The Project

**UKM Chip.Com** is a Student Activity Unit (*Unit Kegiatan Mahasiswa*) at **STMIK Indonesia Banjarmasin**, focused on developing student competencies in Information Technology (software development, hardware systems, and digital creative skills) alongside organizational leadership.

This repository contains the source code for the official website of UKM Chip.Com. The website serves as a public information portal for prospective members, students, faculty, and institutional partners to access organizational information, vision and mission statements, management structure, and event documentation.

---

## Key Features

- **Dual-Theme Mode (Light & Dark)**
  - Dynamic toggling between light and dark color schemes.
  - Theme preference persisted locally in `localStorage`.
  - Inline script execution prior to body rendering to eliminate Flash of Unstyled Content (FOUC).
  - Smooth icon transition and rotation effects between modes.

- **Interactive Hero Slideshow**
  - Automated interval transitions with pause-on-hover functionality.
  - Manual navigation via chevron controls and indicator dots.
  - Asynchronous background image loading via `data-bg` attributes.

- **Dynamic Navigation System**
  - Desktop sliding pill indicator with cubic-bezier easing to track active links.
  - Mobile slide-out drawer menu with touch-friendly navigation and backdrop dismiss.

- **Performance & Motion Optimization**
  - Viewport-based scroll reveal animations using the `IntersectionObserver` API.
  - Floating back-to-top button with smooth scrolling behavior.
  - WebP asset formats and optimized imagery for minimal payload size.

- **SEO & Metadata Standards**
  - Complete Open Graph (OG) tags for link previews across messaging and social platforms.
  - Semantic HTML5 document structure compliant with accessibility guidelines.

---

## Site Pages & Architecture

| Route | File | Description |
| :--- | :--- | :--- |
| `/` or `/beranda` | [index.html](file:///d:/Personal%20Project/chipcom/index.html) | Landing page featuring the hero carousel, call-to-action to join, and campus location map. |
| `/category/sejarah` | [sejarah.html](file:///d:/Personal%20Project/chipcom/sejarah.html) | Historical journey from DosCom (1999) to the formalization of UKM Chip.Com. |
| `/category/visimisi` | [visimisi.html](file:///d:/Personal%20Project/chipcom/visimisi.html) | Core vision and strategic missions in IT literacy, unity, and community service. |
| `/category/struktur` | [struktur.html](file:///d:/Personal%20Project/chipcom/struktur.html) | Organizational hierarchy and divisional roles (Education, PR, Logistics, Core Executives). |
| `/category/dokumentasi` | [dokumentasi.html](file:///d:/Personal%20Project/chipcom/dokumentasi.html) | Activity gallery (Basic Training / PEDAS, Workshops, Dies Natalis) with social links. |
| Custom 404 | [404.html](file:///d:/Personal%20Project/chipcom/404.html) | Custom not-found error page with navigation back to the home page. |

---

## Tech Stack

- **Markup**: [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) (Semantic & accessible)
- **Styling**: [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (CSS Custom Properties, Flexbox, CSS Grid, Keyframe Animations)
- **Scripting**: Vanilla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (ES6+, DOM API, Intersection Observer API)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- **Iconography**: [Font Awesome 6](https://fontawesome.com/)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)

---

## Directory Structure

```text
chipcom/
├── CSS/
│   └── style.css            # Central stylesheet (theme variables, layout, animations, responsive design)
├── JS/
│   └── script.js            # Main client-side script (theme toggle, slideshow, drawer, navigation)
├── images/                  # Static media assets (SVG logo, WebP activity photographs, banners)
├── 404.html                 # Custom 404 page
├── index.html               # Home / Landing page
├── sejarah.html             # History page
├── visimisi.html            # Vision & Mission page
├── struktur.html            # Organizational Structure page
├── dokumentasi.html         # Event Documentation gallery page
├── vercel.json              # Vercel routing configuration & clean URL rewrites
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites

Because this project is built entirely on native web standards (HTML5, CSS3, JavaScript), **no build step, package manager, or bundler is required**.

### Running Locally

You can preview the website locally using any static web server:

#### Option 1: VS Code Live Server
1. Open this project directory in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click on [index.html](file:///d:/Personal%20Project/chipcom/index.html) and select **Open with Live Server**.

#### Option 2: Python HTTP Server
```bash
# Python 3.x
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

#### Option 3: Node.js Serve
```bash
npx serve .
```

---

## Deployment & Routing

The project is preconfigured for deployment on **Vercel** via [vercel.json](file:///d:/Personal%20Project/chipcom/vercel.json):

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/beranda",
      "destination": "/"
    },
    {
      "source": "/category/:path",
      "destination": "/:path"
    }
  ]
}
```

This configuration enables:
- **Clean URLs**: Automatically strips `.html` extensions from browser URLs.
- **Rewrites**: Provides category-based paths (e.g., `/category/sejarah` routes seamlessly to `/sejarah.html`).

---

## Roadmap & Version History

### Current Release: `v2.6`
- [x] Dual-theme switching (Light & Dark) with local storage persistence.
- [x] Responsive layout with desktop sliding indicator and mobile drawer.
- [x] Clean routing and rewrite configuration for Vercel.
- [x] Hero carousel with manual and automated controls.

### Upcoming Milestones
- [ ] Add an interactive modal/lightbox slider for event documentation on [dokumentasi.html](file:///d:/Personal%20Project/chipcom/dokumentasi.html).
- [ ] Update organizational chart visualization with interactive tree/card components on [struktur.html](file:///d:/Personal%20Project/chipcom/struktur.html).
- [ ] Configure custom top-level domain (TLD).

---

## Contact & Organization

- **Organization**: UKM Chip.Com STMIK Indonesia Banjarmasin
- **Address**: Jl. Pangeran Hidayatullah, Sungai Jingah, Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan 70122
- **Instagram**: [@chipcomstmik_id](https://instagram.com/chipcomstmik_id)
- **WhatsApp**: [+62 822-5185-5328](https://wa.me/6282251855328)
- **Live Website**: [chipcom.vercel.app](https://chipcom.vercel.app/)

---

p
## License

&copy; 2026 **UKM Chip.Com STMIK Indonesia Banjarmasin**. All rights reserved.
