🧩 Project Overview

FocusFuel Fitness is a visually dynamic, professional fitness website with an emphasis on real-world design standards and pixel-perfect responsiveness.
Every section is meticulously crafted for performance, accessibility, and visual appeal — from hero banners to animated footers.

Website Link : later updated

This project simulates a real client-grade fitness website, built to demonstrate mastery of:

Responsive design principles

Semantic HTML structure

Bootstrap layout system

Modern CSS animations & transitions

Component reusability and scalability

Vanilla JavaScript interactivity

🖥️ Tech Stack
Layer	Technology Used	Purpose
Markup	HTML5	Semantic structure, accessibility
Styling	CSS3	Layouts, animations, responsive design
Framework	Bootstrap 5.3.8	Grid system, responsiveness, utility classes
Interactivity	JavaScript (Vanilla)	Smooth scrolling, dynamic effects
Icons	Font Awesome 7.0.1	Social media & UI icons
Typography	Fontshare - Clash Display
	Modern, bold typography
Slider	Swiper JS v12	Responsive sliders and carousels
Assets	Custom graphics & optimized images	Performance and aesthetic balance
🏗️ Folder Structure
FocusFuel-Fitness/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── banner-images/
│   │   ├── about-images/
│   │   ├── service-section/
│   │   ├── meet-our-coaches/
│   │   ├── loaction-images/
│   │   └── Others/
│   └── fonts/
│
└── README.md

🧱 Section-by-Section Breakdown
1️⃣ Header / Navigation Bar

Built using Bootstrap 5 Navbar with custom styling.

Includes:

Logo on the left

Navigation menu centered

Search bar + cart icon

Animated “Login / Create Account” button

Fully collapsible for smaller devices (hamburger toggle).

Smooth scroll links that jump to each section.

2️⃣ Hero Banner Section

Visually captivating hero area with headline:

“FocusFuel Fitness”

Uses gradient overlay + subtle animations.

Displays:

Promotional tagline

Gym member statistics

“Visit Now” animated CTA button

Multiple overlay frames using position: absolute styling.

Entire banner optimized for 100% width on all screens.

3️⃣ Slider Section (Swiper.js)

Interactive horizontal slider showcasing training categories.

Smooth swipe transitions for touch devices.

Adaptive layout using Swiper.js breakpoints.

4️⃣ About Section

Introduces gym philosophy and brand story.

Two-column responsive grid (image + content).

Includes:

Eye-catching dotted title bar

Supporting paragraph split in two balanced columns

Customer Support box with phone icon

Clean semantic layout using flex and grid systems.

5️⃣ Services Section

Lists major training services (Personal, Group, Corporate).

Animated arrow hover effects on each service link.

Active “featured” service card with preview image.

Uses consistent line dividers and Bootstrap columns for alignment.

6️⃣ About Our Gym (Highlights Section)

Subsection emphasizing unique selling points.

Grid layout with 6 “benefit cards” each featuring:

FontAwesome check icon

Title + short paragraph

Responsive: 2-column layout on desktop, stacked on mobile.

7️⃣ Coaches / Trainers Section

“Meet Your Coaches” slider section built with Swiper.js.

Showcases trainers with:

Name

Role (Fitness Coach)

Hover highlight effect with yellow stripe accent

Fully mobile-friendly.

8️⃣ Pricing Plan Section

Three plan cards (Basic, Pro, Elite).

Each includes:

Badge title + stripes

Price per month

Feature list

Animated “Get Membership” CTA

Middle card highlighted (--accent modifier class).

Perfectly aligned grid using Bootstrap’s 12-column layout.

9️⃣ Locations Section

Displays the brand’s global presence.

Includes stats:

25+ countries

Location map image

Divider stripe inserted via divider-22.png.

Balanced text-image combination for visual storytelling.

🔟 Community / Transformation Section

Background image section with Athlete figure positioned dynamically.

Features the line:

“Real Stories. Real People. Real Transformation.”

Yellow stripe under headline for emphasis.

overflow: visible used to show the athlete’s head fully.

Responsive scaling ensures perfect composition at every viewport.

1️⃣1️⃣ Footer Section

Divided into two structured layers:

🧩 Top Section

Left: Copyright

Center: Logo + navigation links

Right: Animated social media links (Instagram, Facebook, YouTube)

💌 Bottom Section (Newsletter)

“Stay Updated” heading and subscription form.

Animated Subscribe Button replicating the Login/Signup animation.

Smooth hover transitions: yellow-to-black text inversion.

Fully responsive stacking at ≤992px breakpoints.

⚙️ JavaScript Functionalities
Feature	Function
Smooth Scrolling	Uses scrollIntoView({ behavior: "smooth" }) for all anchor links
Section Highlight	Active link updates on scroll
Swiper Integration	Responsive sliders for trainers & banners
Sticky Navbar	Responsive toggle and scroll behaviour
Animated Buttons	Two-way SVG arrow animations
🧠 Responsive Design Strategy

Built mobile-first, scaled upward for tablets & desktops.

CSS uses clamp() for fluid typography and spacing.

@media queries handle transitions at 1200px, 992px, 768px, and 576px.

All images optimized for object-fit: cover or contain.

🎨 Color Palette
Color	Usage	Code
Fit Yellow	Primary accent	#f2ff00
Dark Black	Background	#000000
Charcoal	Secondary text	#d7d7d7
White	Headings and main text	#ffffff
🔡 Typography

Font: Clash Display via Fontshare

Weights: 200–700
Used consistently across headers, buttons, and major elements for bold, sporty tone.

🧮 Key Animations & Effects

Hover rectangles for navbar links.

Arrow movement animations on buttons.

Footer social links slide-in on hover.

Smooth section reveal with scroll.

Subtle box-shadow glow effects on CTAs.

Gradient background transitions for banners.

🧱 Performance & Optimization

All assets compressed and optimized (Web-friendly PNGs/JPEGs).

CSS separated from HTML for modular structure.

FontAwesome & Bootstrap loaded via CDN for fast delivery.

Minimized reflows by using flex and grid smartly.

🔧 How to Run Locally

Clone the repository

git clone https://github.com/yourusername/FocusFuel-Fitness.git


Navigate to the folder

cd FocusFuel-Fitness


Open in your browser

start index.html


(or drag-and-drop into your preferred browser)

🏁 Future Improvements

Add backend (Node.js + Express + MongoDB) for membership login & database storage.

Include admin dashboard for trainer & plan management.

Add light/dark theme toggle.

Implement GSAP or Framer Motion animations for smoother transitions.

📸 Preview Gallery (Screenshots)
Section	Screenshot
Hero Banner	

About Section	

Trainers Slider	

Pricing Plans	

Footer	

(You can add these after exporting screenshots from your final build.)

💬 Author

👨‍💻 Subhankar Dey
Frontend Developer | UI/UX Designer | React & JS Specialist
📍 Based in India

🔗 Connect With Me:

GitHub : https://github.com/sdey1122

LinkedIn : in/subhankar-dey-154051189

Portfolio : https://sdey1122.github.io/Subhankar-Dey-Personal-Portfolio-Website/
