# Mad Ad Theory — Connected Enterprise Platform

> **Performance Marketing Agency & High-Converting Web Platform**  
> Built with React 19, TypeScript, Vite 6, Tailwind CSS, Node.js Express, and MongoDB Atlas.

---

## 1. Executive Summary

**Mad Ad Theory** is a full-stack, enterprise-grade web application and content management system designed for modern performance marketing. It combines high-converting client-facing landing pages, dynamic service hierarchies, interactive project showcases, and a secure, closed-loop Admin Panel with real-time CMS controls.

---

## 2. Tech Stack & Architecture

### Frontend
- **Framework:** React 19 + TypeScript 5
- **Build Tool:** Vite 6 (sub-second HMR and production bundle optimization)
- **Styling:** Tailwind CSS 3 + PostCSS + CSS Grid
- **Icons:** Lucide React
- **Animations:** Framer Motion + GSAP
- **Routing:** React Router DOM v7

### Backend & API
- **Runtime:** Node.js (v20+ recommended)
- **Framework:** Express 4 with TypeScript execution via `tsx`
- **Database:** MongoDB Atlas via Mongoose 8
- **Authentication:** Passwordless 6-digit OTP verification via Resend API + signed JWT session tokens
- **File Uploads:** Multer (local disk storage under `/public/uploads/` with 25MB limits)
- **Security & Reliability:**
  - `helmet`: Strict HTTP response security headers
  - `compression`: Production Gzip asset compression
  - `express-rate-limit`: Tiered IP rate limiting (OTP endpoints, lead submissions, and general API)
  - Memory leak protection: Auto-restart on 400MB threshold via PM2 (`ecosystem.config.cjs`)

---

## 3. Directory Structure & File Map

```
madadtheory.com/
├── public/
│   ├── images/
│   │   ├── logo-raw.jpeg          # Official brand monogram emblem
│   │   └── banner.jpeg            # Default campaign banner
│   └── uploads/                   # Runtime user uploads (logos, screenshots, photos)
│       └── .gitkeep
├── server/
│   ├── index.ts                   # Express server entry point & SPA fallback
│   ├── db.ts                      # MongoDB Atlas connection handler
│   ├── models/
│   │   ├── Lead.ts                # Inbound CRM leads schema
│   │   ├── Otp.ts                 # 6-digit one-time passcodes with TTL
│   │   ├── Project.ts             # Showcase projects schema
│   │   ├── SiteContent.ts         # Global branding, top banner & CMS copy schema
│   │   └── User.ts                # Admin user record
│   ├── routes/
│   │   ├── auth.ts                # OTP dispatch & JWT verification (/api/auth)
│   │   ├── content.ts             # Live CMS site content endpoints (/api/content)
│   │   ├── leads.ts               # Lead capture & stage management (/api/leads)
│   │   ├── projects.ts            # Project showcase CRUD (/api/projects)
│   │   └── upload.ts              # File upload handler (/api/upload)
│   └── services/
│       └── email.ts               # Resend transactional email integration
├── src/
│   ├── admin/
│   │   └── AdminWorkspace.tsx     # Full administrative portal & CMS dashboard
│   ├── components/
│   │   ├── public/
│   │   │   ├── TopBanner.tsx      # High-visibility announcement bar above Navbar
│   │   │   ├── Navbar.tsx         # Responsive desktop mega-dropdown & mobile drawer
│   │   │   ├── Footer.tsx         # Comprehensive agency footer with newsletter
│   │   │   ├── ServiceEcosystem.tsx # Interactive showcase projects & metrics
│   │   │   ├── GoogleReviewsSlider.tsx # Verified testimonials carousel
│   │   │   ├── RadialServiceHub.tsx    # Interactive service discovery hub
│   │   │   ├── NumbersThatReflectGrowth.tsx # Performance metrics showcase
│   │   │   └── MultiStepQuoteForm.tsx  # Multi-step proposal inquiry builder
│   │   └── ui/
│   │       ├── Badge.tsx          # Reusable enterprise badges
│   │       ├── Button.tsx         # Accessible interactive button variants
│   │       ├── Card.tsx           # Glassmorphic card containers
│   │       ├── Logo.tsx           # Dynamic brand emblem (synced with CMS)
│   │       └── ThemeToggle.tsx    # Dark / Light mode toggle
│   ├── lib/
│   │   ├── siteContentStore.ts    # Global CMS state & MongoDB synchronization
│   │   ├── blogStore.ts           # Blog articles storage & CRUD
│   │   ├── ecosystemStore.ts      # Showcase projects data store
│   │   ├── leadsStore.ts          # CRM leads client caching
│   │   ├── servicesStore.ts       # Service catalog state
│   │   └── utils.ts               # Styling utilities (cn, tailwind-merge)
│   ├── pages/
│   │   ├── Home.tsx               # Primary landing page
│   │   ├── Services.tsx           # Services index
│   │   ├── ServiceDetail.tsx      # Individual service deep dives
│   │   ├── Solutions.tsx          # Growth solution packages
│   │   ├── SolutionDetail.tsx     # Tailored industry solutions
│   │   ├── Portfolio.tsx          # Case studies and client results
│   │   ├── Gallery.tsx            # Video reels and team culture photo gallery
│   │   ├── Blog.tsx               # Growth insights directory
│   │   ├── BlogPost.tsx           # Full article view with markdown formatting
│   │   ├── About.tsx              # Agency manifesto and team background
│   │   ├── Careers.tsx            # Open roles and job applications
│   │   ├── Contact.tsx            # Consultation booking and inquiry form
│   │   ├── GetAQuote.tsx          # Interactive proposal request page
│   │   └── admin/
│   │       ├── AdminLogin.tsx     # OTP verification login interface
│   │       └── AdminDashboard.tsx # Overview dashboard
│   ├── App.tsx                    # Top-level routes and global layout
│   ├── index.css                  # Tailwind styles and custom grid classes
│   └── main.tsx                   # React root hydration
├── .env.example                   # Clean template for environment variables
├── ecosystem.config.cjs           # PM2 production process configuration
├── nginx.conf.example             # Nginx reverse proxy & SSL configuration
├── package.json                   # Scripts and project dependencies
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 4. Admin Portal & CMS Capabilities

Access the admin center at **`/admin`** (or `/admin/login`).

### Security Protocol
- Authentication is strictly restricted to: **`code.mathub@gmail.com`**.
- An ephemeral 6-digit OTP code is dispatched via Resend.
- Upon verification, an HTTP-only JWT token is issued for 7 days.

### Admin Center Modules
1. **Client Inquiries (CRM):** Real-time inbound lead tracker with stage transitions (`New` → `Contacted` → `Qualified` → `Proposal Sent` → `Won` → `Lost`).
2. **Showcase Projects:** 16+ configurable client case study projects with direct screenshot file upload.
3. **Videos & Photos (Gallery):** Upload video reels (`.mp4`, `.webm`) and office culture photos with live gallery sync at `/gallery`.
4. **Google Reviews:** Live testimonial management with star ratings, client names, and edit mode.
5. **Services Manager:** Manage service titles, categories, and deliverables.
6. **Case Studies (Work):** Manage portfolio case studies, verified ROAS benchmarks, and revenue outcomes.
7. **Blog Articles:** Full article publishing system with direct cover image upload, categories, read times, and multi-paragraph content.
8. **Website Text & Branding:**
   - **Brand Logo:** Upload a custom logo emblem with live preview. Dynamically propagates across the Navbar, Footer, Mobile Menu, and Admin.
   - **Announcement Top Banner:** Enable/disable banner visibility, edit announcement text, and set destination link with a live on-screen preview.
   - **Hero Copy & Metrics:** Update headlines, value propositions, and agency stats.
9. **Footer & Contact:** Manage phone, email, headquarters address, and legal copyright.

---

## 5. Local Development Quickstart

### Prerequisites
- Node.js v20.x or higher
- MongoDB Atlas cluster URL or local MongoDB instance

### Installation
```bash
# 1. Clone repository
git clone https://github.com/codemathub/madadtheory.com.git
cd madadtheory.com

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB Atlas URI, JWT Secret, and Resend API Key

# 4. Run both client and backend concurrently
npm run dev
```

The application will be accessible at:
- **Client (Vite):** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`
- **Admin Portal:** `http://localhost:3000/admin`

---

## 6. Real Production Deployment Guide (Ubuntu / Linux VPS)

Follow these exact steps to publish and deploy this site to your production server (e.g., AWS EC2, DigitalOcean, Hetzner, or Linode running Ubuntu 22.04 or 24.04 LTS).

### Step 1: Install Node.js 20 & PM2 on the Server
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Install PM2 process manager globally
sudo npm install -g pm2
```

### Step 2: Clone the Project
```bash
# Create web directory
sudo mkdir -p /var/www/madadtheory
sudo chown -R $USER:$USER /var/www/madadtheory

# Clone repository
git clone https://github.com/codemathub/madadtheory.com.git /var/www/madadtheory
cd /var/www/madadtheory

# Install dependencies
npm install
```

### Step 3: Configure Production `.env`
Create the production environment file:
```bash
nano /var/www/madadtheory/.env
```

Paste your real values:
```env
PORT=5000
SERVER_PORT=5000
NODE_ENV=production

# MongoDB Atlas Database
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.1wcybae.mongodb.net/madadtheory?retryWrites=true&w=majority"

# Security & Admin Access
AUTHORIZED_ADMIN_EMAIL="code.mathub@gmail.com"
JWT_SECRET="a98f4b62d8471e98c7634f1e56b2308c90fe1234bc5678da123456789abcdef0"
JWT_EXPIRES_IN="7d"
COOKIE_NAME="mat_auth_session"

# Email Delivery (Resend API)
RESEND_API_KEY="re_your_real_api_key_here"
RESEND_FROM_EMAIL="Mad Ad Theory <onboarding@resend.dev>"

STORAGE_PROVIDER="local"
```

Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`).

### Step 4: Build the Production Bundle
```bash
cd /var/www/madadtheory
npm run build
```
*(This compiles TypeScript and outputs the minified static build into `/var/www/madadtheory/dist/`)*

### Step 5: Start with PM2
```bash
# Start backend and SPA server with auto-restart and 400MB memory ceiling
pm2 start ecosystem.config.cjs

# Verify process status
pm2 status

# Save PM2 process list and configure auto-start on server reboot
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

### Step 6: Configure Nginx Reverse Proxy
```bash
sudo cp /var/www/madadtheory/nginx.conf.example /etc/nginx/sites-available/madadtheory.com
sudo ln -s /etc/nginx/sites-available/madadtheory.com /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Enable Free SSL with Let's Encrypt (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d madadtheory.com -d www.madadtheory.com
```

Your site is now fully live, secured with HTTPS, and served through a rock-solid reverse proxy.

---

## 7. Operational Maintenance Commands

```bash
# Check server logs in real time
pm2 logs madadtheory

# Check memory and CPU usage
pm2 monit

# Restart the application after code updates
git pull origin main
npm install
npm run build
pm2 restart madadtheory
```

---

## 8. License

© 2026 Mad Ad Theory. All rights reserved. Private proprietary codebase.
