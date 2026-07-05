export interface Project {
  slug: string;
  title: string;
  shortDescription: {
    id: string;
    en: string;
  };
  fullDescription: {
    id: string;
    en: string;
  };
  techStack: string[];
  role: string;
}

export const projects: Project[] = [
  {
    slug: "roomify",
    title: "Roomify",
    shortDescription: {
      id: "Platform penyewaan kamar/kos berbasis web",
      en: "Web-based room/boarding house rental platform"
    },
    fullDescription: {
      id: "Platform rental kamar dengan sistem booking, dashboard owner/admin, upload gambar kamar via Supabase Storage, validasi booking 24 jam, sistem review, dan reminder booking otomatis (cron job). Di-deploy self-hosted di Debian server pakai PM2 dan Cloudflare Tunnel.",
      en: "Room rental platform with booking system, owner/admin dashboard, room image upload via Supabase Storage, 24-hour booking validation, review system, and automatic booking reminders (cron job). Self-hosted on Debian server using PM2 and Cloudflare Tunnel."
    },
    techStack: ["Next.js", "TypeScript", "Supabase", "CSS Modules"],
    role: "Full-stack Developer"
  },
  {
    slug: "rsis",
    title: "RSIS (Rumah Sakit Intelligent System)",
    shortDescription: {
      id: "Sistem manajemen rumah sakit",
      en: "Hospital management system"
    },
    fullDescription: {
      id: "Sistem manajemen rumah sakit dengan arsitektur OOP/MVC, Joined Table Inheritance untuk role User (Pasien/Dokter/AdminRS), fitur booking dokter, dashboard, dan pencarian dokter. Dikerjakan untuk mata kuliah Pemrograman Berorientasi Objek, deployed ke Railway.",
      en: "Hospital management system with OOP/MVC architecture, Joined Table Inheritance for User roles (Patient/Doctor/HospitalAdmin), doctor booking feature, dashboard, and doctor search. Built for Object-Oriented Programming course, deployed to Railway."
    },
    techStack: ["Spring Boot", "Thymeleaf", "PostgreSQL", "Java"],
    role: "Backend & Full-stack Developer"
  },
  {
    slug: "catatduit",
    title: "CatatDuit",
    shortDescription: {
      id: "Aplikasi pencatat keuangan pribadi",
      en: "Personal finance tracking app"
    },
    fullDescription: {
      id: "Aplikasi mobile pencatat pengeluaran dengan desain dark glassmorphism, state management Riverpod, local storage Hive, dan visualisasi data pengeluaran pakai fl_chart. Termasuk fitur toggle dark/light mode.",
      en: "Mobile expense tracking app with dark glassmorphism design, Riverpod state management, Hive local storage, and expense data visualization using fl_chart. Includes dark/light mode toggle feature."
    },
    techStack: ["Flutter", "Riverpod", "Hive", "fl_chart"],
    role: "Mobile Developer"
  },
  {
    slug: "funfram",
    title: "FunFram",
    shortDescription: {
      id: "Platform video call acak (random video chat)",
      en: "Random video call platform"
    },
    fullDescription: {
      id: "Platform video call acak berbasis monorepo dengan backend WebRTC dan WebSocket terpisah untuk signaling dan koneksi real-time antar user.",
      en: "Random video call platform based on monorepo with separate WebRTC and WebSocket backends for signaling and real-time connection between users."
    },
    techStack: ["Next.js", "WebRTC", "WebSocket"],
    role: "Full-stack Developer"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug);
}
