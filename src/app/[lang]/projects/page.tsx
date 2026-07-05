import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          {dict.projects.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {dict.projects.description}
        </p>
        <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            {dict.projects.comingSoon}
          </p>
        </div>
      </div>
    </main>
  );
}
