# Ninamore Knowledge Academy – Website Documentation

A modern, fast, mobile-first, and accessible website for **Ninamore Knowledge Academy**, a premier skill-development and tutorial institute in Alsi Plot, Akola, Maharashtra, India.

Built with **React 19 + Vite + Tailwind CSS + Lucide Icons + React Router v7**.

---

## 🎨 Design System

Matches the academy’s circular logo (white open book with orange/yellow pages dissolving into pixel squares on purple):

- **Primary Purple**: `#6B3FA0` (`var(--color-primary-purple)`)
- **Deep Purple**: `#3F1F6B` (`var(--color-deep-purple)`)
- **Accent Orange**: `#F28C28` (`var(--color-accent-orange)`)
- **Accent Golden Yellow**: `#F6B93B` (`var(--color-accent-yellow)`)
- **Soft Lavender Background**: `#F5F0FA` (`var(--color-soft-lavender)`)
- **Dark Text**: `#2A1744` (`var(--color-text-dark)`)
- **Fonts**: **Poppins** for headings, **Inter** for body text
- **Corner Radius**: `16px` (`rounded-2xl`) with soft shadows

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or the port indicated in your terminal.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## ✏️ How to Customise & Edit

### 1. How to Edit Courses
All courses are stored in a single, easy-to-edit file:
📁 **`src/data/coursesData.js`**

To add a new course or edit an existing one, simply edit the objects in `COURSES_DATA`:
```javascript
{
  id: 'cbse-state-board-5-10',
  title: 'CBSE and State Board, Classes 5 to 10',
  category: 'School (5–10)', // 'School (5–10)' | 'Class 12' | 'Coaching & Exams'
  iconName: 'GraduationCap',
  duration: 'Full Academic Year / Term Batches',
  mode: 'Offline (Alsi Plot, Akola)',
  level: 'Classes 5th to 10th (CBSE & Maharashtra State Board)',
  fee: 'Contact us for fees',
  certification: 'Not applicable',
  shortDescription: 'Your description here...',
  batchTimings: [
    'Morning Batch: 07:30 AM – 09:30 AM',
    'Evening Batch: 05:30 PM – 07:30 PM'
  ],
  syllabus: [
    'Mathematics: Core arithmetic, algebra, geometry',
    'Science: Physics, Chemistry, and Biology clarity'
  ]
}
```

### 2. How to Update Contact Details (Phone, Email, WhatsApp)
All contact information is centralized in a single file: `src/data/contactConfig.js`.
Simply update:
- `phone`: your academy's phone number (e.g. `+91 98765 43210`)
- `email`: your academy's email address (e.g. `info@ninamoreacademy.com`)
- `whatsappNumber`: your WhatsApp number with country code `91` (e.g. `919876543210`)

Updating `src/data/contactConfig.js` automatically updates the Navbar, Footer, Mobile Sticky Bar, Contact page, Admissions page, and Course modals throughout the entire website!

### 3. How to Connect the Online Form to Your Email (Free)
The forms in `src/pages/Admissions.jsx` and `src/pages/Contact.jsx` are ready for **Formspree** or **Web3Forms**:
1. Go to [https://formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your Form ID (e.g., `mqkvnzyz`).
3. In `src/pages/Admissions.jsx`, update line 22:
   ```javascript
   const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID_HERE";
   ```
4. In `src/pages/Contact.jsx`, update line 20:
   ```javascript
   const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID_HERE";
   ```
Whenever someone submits the form, you will receive an instant email notification!

### 4. How to Update the Gallery & Add Real Photos
To add or update photos in the Gallery section without touching layout code:
1. **Put photos in `public/gallery/`**: Drop your image files directly into the `public/gallery/` folder.
2. **Name them as in `src/data/galleryData.js`**: Match filenames such as `gallery-01.jpg`, `gallery-02.jpg`, etc.
3. **Edit titles and categories in that file**: Open `src/data/galleryData.js` to edit titles, categories (`Classroom`, `Events`, `Students`), and optional captions.
4. **Recommended image size**: About 1200px wide, under 300 KB, in JPG or WebP format for crisp quality and fast loading.
5. **Publish**: Run `npm run build` to build the production site.

> **Note**: To replace a placeholder, put your photo in public/gallery/ using the file name in galleryData.js (for example gallery-01.jpg, about 1200px wide, JPG or WebP, under 300 KB), then run npm run build.

### 5. How to Update Logos & Favicons
All static brand assets reside in the `public/` folder:
- **Logo**: Replace `public/logo.png` (high-res transparent PNG recommended).
- **Favicon**: Replace `public/favicon.png` and `public/favicon.ico`.

---

## 🌐 Free 1-Click Deployment Guide

### Option A: Deploy to Netlify (Recommended)
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial Ninamore Academy website"
   # push to your GitHub repo
   ```
2. Log in to [Netlify](https://www.netlify.com).
3. Click **"Add new site"** ➔ **"Import an existing project"** ➔ Select your GitHub repository.
4. Netlify will auto-detect the Vite settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy Site"**. Your website will be live in under 60 seconds with a free SSL certificate!
6. *(Optional)* Add a rewrite rule for client-side routing by creating `public/_redirects`:
   ```text
   /*    /index.html   200
   ```

### Option B: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New Project"** and import your GitHub repository.
3. Vercel automatically selects the **Vite** preset:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **"Deploy"**. Done!

---

## 📁 Project Directory Map

```
nina_more/
├── public/
│   ├── favicon.png
│   ├── favicon.ico
│   ├── gallery/                   # Real photo assets folder (.gitkeep)
│   ├── logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── student_group_highlight.png
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BookPixelsIllustration.jsx  # SVG book dissolving into pixels
│   │   │   ├── FaqAccordion.jsx           # Expandable FAQ accordion
│   │   │   ├── FloatingActions.jsx        # Floating WhatsApp, sticky mobile bar, back-to-top
│   │   │   ├── PageHeader.jsx             # Reusable purple banner with breadcrumbs
│   │   │   ├── PageLoader.jsx             # Brand pixel-book loading animation
│   │   │   ├── PixelDisperseMotif.jsx     # Floating corner pixel pattern
│   │   │   ├── ScrollReveal.jsx           # IntersectionObserver scroll reveal
│   │   │   ├── SectionDivider.jsx         # Signature pixel section dividers
│   │   │   └── TestimonialCarousel.jsx    # Interactive student reviews carousel
│   │   ├── courses/
│   │   │   └── CourseDetailModal.jsx      # Popup modal with syllabus, fee & timings
│   │   └── layout/
│   │       ├── Footer.jsx                 # Deep purple footer with full contact info
│   │       ├── Layout.jsx                 # Global shell with auto-scroll & SEO titles
│   │       └── Navbar.jsx                 # Sticky purple navbar with mobile drawer
│   ├── data/
│   │   ├── contactConfig.js               # Centralized contact configuration
│   │   ├── coursesData.js                 # Centralized course data file
│   │   └── galleryData.js                 # Centralized gallery items data
│   ├── pages/
│   │   ├── About.jsx                      # Story, mission, values, faculty & facilities
│   │   ├── Admissions.jsx                 # Online admission form & 4-step process
│   │   ├── Contact.jsx                    # Contact cards, live timing table & Google Map
│   │   ├── Courses.jsx                    # Filterable course catalog & detail modals
│   │   ├── Gallery.jsx                    # Masonry grid & photo lightbox viewer
│   │   ├── Home.jsx                       # Full 8-section homepage
│   │   └── NotFound.jsx                   # 404 page
│   ├── App.jsx                            # React Router v7 routes configuration
│   ├── index.css                          # Tailwind layers & CSS color variables
│   └── main.jsx                           # Application entry point
├── index.html                             # SEO tags, Open Graph & JSON-LD LocalBusiness schema
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🏆 Summary of Key Features
- **Mobile-First & Fully Responsive**: Tested across desktop, tablet, and mobile with a custom thumb-friendly mobile action bar.
- **Brand Consistency**: Pure alignment with the purple, orange, and yellow book-to-pixels logo.
- **High Accessibility**: ARIA roles, skip-to-content keyboard link, focus indicators, and high-contrast text.
- **Search Engine Optimized**: Rich meta tags, Open Graph cards, sitemap, robots.txt, and complete `EducationalOrganization` + `LocalBusiness` JSON-LD schema for local Akola searches.
