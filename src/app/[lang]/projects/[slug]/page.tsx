import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const locales = ['id', 'en'] as const;

  const paths = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      paths.push({ lang: locale, slug });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const baseUrl = 'https://hafizfajar.com';

  return {
    title: `${project.title} - Hafiz Fajar Portfolio`,
    description: project.fullDescription[lang as Locale],
    openGraph: {
      title: project.title,
      description: project.fullDescription[lang as Locale],
      url: `${baseUrl}/${lang}/projects/${slug}`,
      siteName: 'Hafiz Fajar Portfolio',
      locale: lang,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-4xl">
        <Link
          href={`/${lang}#portofolio`}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          ← Kembali ke Portofolio
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Role
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {project.role}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {project.fullDescription[lang as Locale]}
          </p>
        </div>
      </div>
    </main>
  );
}
