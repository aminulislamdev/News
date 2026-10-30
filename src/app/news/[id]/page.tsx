import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  formatBengaliDateTime,
  getNewsArticle,
  resolveNewsImageUrl,
} from "@/lib/news";
import type { IArticleBodyBlock } from "@/types/news";

export default function NewsDetailsPage({ params }: PageProps<"/news/[id]">) {
  return (
    <Suspense fallback={<NewsDetailsSkeleton />}>
      <NewsDetails params={params} />
    </Suspense>
  );
}

async function NewsDetails({
  params,
}: {
  params: PageProps<"/news/[id]">["params"];
}) {
  const { id } = await params;
  const article = await getNewsArticle(id);

  if (!article) {
    notFound();
  }

  const imageUrl = resolveNewsImageUrl(article.imageUrl, 1024);
  const heroImageIdentity = imageUrl ? getImageIdentity(imageUrl) : null;
  const publishedAt = formatBengaliDateTime(article.firstPublished);
  const byline = article.byline
    .map((person) => [person.name, person.role].filter(Boolean).join(", "))
    .join(" · ");
  const body = heroImageIdentity
    ? article.body.filter(
        (block) =>
          !(
            block.type === "image" &&
            getImageIdentity(block.url) === heroImageIdentity
          )
      )
    : article.body;

  return (
    <article className="container mx-auto max-w-4xl min-w-0 px-4 py-8">
      <Link
        href="/"
        className="text-sm font-semibold text-red-600 hover:underline"
      >
        ← হোমে ফিরে যান
      </Link>

      <header className="mt-6 space-y-4">
        <p className="break-words text-sm font-semibold text-red-600">
          {article.source}
        </p>

        <h1 className="break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
          {article.title}
        </h1>

        {article.description && (
          <p className="break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {article.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          {byline && <span className="break-words">{byline}</span>}
          {publishedAt && (
            <time dateTime={article.firstPublished}>{publishedAt}</time>
          )}
        </div>
      </header>

      {imageUrl && (
        <figure className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </figure>
      )}

      <div className="mt-8 space-y-5">
        {body.map((block, index) => (
          <ArticleBodyBlock key={index} block={block} />
        ))}
      </div>

      {article.tags.length > 0 && (
        <footer className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="break-words rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
}

// The same CDN image can be represented with a width placeholder or a concrete
// width, and with an optional WebP wrapper (e.g. .jpg.webp vs .jpg).
function getImageIdentity(url: string): string {
  return url
    .replace(/[?#].*$/, "")
    .replace(/\/ws\/(?:\{width\}|\d+)\//gi, "/ws/{width}/")
    .replace(/\.webp$/i, "");
}

function ArticleBodyBlock({ block }: { block: IArticleBodyBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="whitespace-pre-line break-words text-base leading-8 text-gray-700">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h2 className="break-words pt-2 text-xl font-bold text-gray-900">
          {block.text}
        </h2>
      );

    case "image":
      return (
        <figure className="my-6">
          <Image
            src={block.url}
            alt={block.altText || block.caption || ""}
            width={block.width}
            height={block.height}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full max-w-full rounded-lg"
          />

          {block.caption && (
            <figcaption className="mt-2 break-words text-center text-sm text-gray-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

function NewsDetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="h-4 w-24 rounded bg-gray-200" />
      <div className="mt-6 h-10 w-3/4 rounded bg-gray-200" />
      <div className="mt-4 h-5 w-full rounded bg-gray-200" />
      <div className="mt-2 h-5 w-5/6 rounded bg-gray-200" />
      <div className="mt-6 aspect-video w-full rounded-lg bg-gray-200" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
      </div>
    </div>
  );
}
