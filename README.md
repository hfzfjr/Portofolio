# Hafiz Fajar Portfolio

Personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **next-themes** (dark/light mode)
- **Prisma ORM** + PostgreSQL
- **Docker & Docker Compose**
- **Cloudflare Tunnel** (expose to public)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (or use Docker Compose)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your database URL.

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment (Production Server)

### Prerequisites

The production server must have the following already set up separately:
- **PostgreSQL database** (container `portofolio-db`, network `portofolio_net`)
- **Cloudflare Tunnel** (container `cf-tunnel`, configured via Cloudflare Zero Trust Dashboard)

### 1. Set Up Environment Variables

On your production server:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@portofolio-db:5432/portfolio_db"
```

### 2. Deploy with deploy.sh

The `deploy.sh` script handles the entire deployment process:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. Load environment variables from `.env.local`
2. Pull latest changes from git
3. Build the Docker image
4. Remove the old container
5. Run the new container with:
   - Name: `portofolio-server`
   - Network: `portofolio_net` (external)
   - Port: `127.0.0.1:3002:3000`
   - Restart policy: `always`

### 3. Run Database Migrations (First Time Only)

```bash
docker exec portofolio-server npx prisma migrate deploy
```

### 4. Configure Cloudflare Tunnel

The Cloudflare Tunnel is managed separately. Configure it via the Cloudflare Zero Trust Dashboard:

1. Go to **Networks** → **Tunnels**
2. Select your tunnel → **Configure**
3. Add a **Public Hostname**:
   - **Subdomain**: `@` (for root domain) or subdomain
   - **Domain**: `hafizfajar.com`
   - **Service**: `http://127.0.0.1:3002`
4. Save

Your site will be accessible via HTTPS at `https://hafizfajar.com`

### Docker Compose (Alternative)

For local testing with the simplified setup:

```bash
docker compose up -d --build
```

Note: This requires the external `portofolio_net` network to exist.

### Accessing Prisma Studio for Moderation

To moderate comments manually:

**Option 1: Run temporarily in container**
```bash
docker exec portofolio-server npx prisma studio
```
Then access via SSH tunnel or expose port temporarily.

**Option 2: SSH tunnel to local machine**
```bash
ssh -L 5555:localhost:5555 user@your-server
docker exec portofolio-server npx prisma studio --browser none
```
Then open `http://localhost:5555` on your local machine.

## Project Structure

```
src/
├── app/
│   ├── [lang]/          # i18n routes
│   ├── api/             # API routes
│   └── globals.css
├── components/
│   ├── intro/           # Intro animation
│   ├── theme/           # Dark/light mode
│   ├── language/        # Language switcher
│   ├── layout/          # Navbar
│   └── contact/         # Comment form & list
├── lib/
│   ├── i18n/            # i18n config & dictionaries
│   ├── prisma.ts        # Prisma client
│   └── seo/             # JSON-LD schema
└── proxy.ts             # Next.js 16 proxy (middleware replacement)
```

## Features

- ✅ Bilingual (Indonesian/English)
- ✅ Dark/Light mode with smooth transitions
- ✅ Intro animation (once per session)
- ✅ Public comment system with rate limiting
- ✅ SEO optimized (sitemap, robots.txt, JSON-LD)
- ✅ Responsive design
- ✅ Docker deployment ready
