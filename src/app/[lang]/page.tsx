import { getDictionary } from "@/lib/i18n/get-dictionary";
import { type Locale } from "@/lib/i18n/config";
import CommentForm from "@/components/contact/CommentForm";
import CommentList from "@/components/contact/CommentList";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="flex flex-col items-center justify-center text-center gap-8 mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {dict.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          {dict.hero.subtitle}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl">
          {dict.hero.description}
        </p>
      </div>

      <section className="max-w-3xl mx-auto">
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
      </section>
    </main>
  );
}
