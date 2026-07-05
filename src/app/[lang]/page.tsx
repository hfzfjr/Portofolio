import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";
import CommentForm from "@/components/contact/CommentForm";
import CommentList from "@/components/contact/CommentList";
import { projects } from "@/lib/data/projects";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section 1: Beranda */}
      <section id="beranda" className="min-h-screen flex flex-col items-center justify-center text-center gap-8 py-32">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {dict.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          {dict.hero.subtitle}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl">
          {dict.hero.description}
        </p>
      </section>

      {/* Section 2: Tentang */}
      <section id="tentang" className="min-h-screen py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            {dict.about.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {dict.about.description}
          </p>
        </div>
      </section>

      {/* Section 3: Portofolio */}
      <section id="portofolio" className="min-h-screen py-32">
        <div className="max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            {dict.projects.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            {dict.projects.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.shortDescription[lang as Locale]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Lihat Detail →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Kontak */}
      <section id="kontak" className="min-h-screen py-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{dict.contact.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {dict.contact.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
              <CommentForm lang={lang as Locale} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {dict.contact.comments.title}
              </h3>
              <CommentList lang={lang as Locale} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
