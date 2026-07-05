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

## Deployment (Docker + Cloudflare Tunnel)

### 1. Generate Cloudflare Tunnel Token

1. Go to [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)
2. Navigate to: **Zero Trust** → **Networks** → **Tunnels**
3. Click **Create a tunnel**
4. Choose **Cloudflared** → Select your OS
5. Copy the tunnel token

### 2. Set Up Environment Variables

On your Debian 13 server:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:your_secure_password@db:5432/portfolio"
CLOUDFLARE_TUNNEL_TOKEN="your_tunnel_token_here"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=portfolio
```

### 3. Deploy with Docker Compose

```bash
docker compose up -d --build
```

This will start three services:
- `app`: Next.js application
- `db`: PostgreSQL database
- `cloudflared`: Cloudflare Tunnel for public access

### 4. Run Database Migrations

First time only:

```bash
docker compose exec app npx prisma migrate deploy
```

### 5. Configure Cloudflare Tunnel Public Hostname

1. Go to Cloudflare Zero Trust Dashboard → **Networks** → **Tunnels**
2. Select your tunnel → **Configure**
3. Add a **Public Hostname**:
   - **Subdomain**: `@` (for root domain) or subdomain
   - **Domain**: `hafizfajar.com`
   - **Service**: `http://app:3000`
4. Save

Your site will now be accessible via HTTPS at `https://hafizfajar.com`

### Accessing Prisma Studio for Moderation

To moderate comments manually:

**Option 1: Run temporarily in container**
```bash
docker compose exec app npx prisma studio
```
Then access via SSH tunnel or expose port temporarily.

**Option 2: SSH tunnel to local machine**
```bash
ssh -L 5555:localhost:5555 user@your-server
docker compose exec app npx prisma studio --browser none
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
