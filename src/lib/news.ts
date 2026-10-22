import { cacheLife } from "next/cache";
import type ICatagories from "@/types/Catagories";
import type {
  ICategoriesResponse,
  ICategoryNewsResponse,
  IMostReadResponse,
  INewsArticle,
  INewsArticleDetails,
  INewsArticleResponse,
  INewsFeedResponse,
  INewsSection,
  INewsSectionsResponse,
} from "@/types/news";

const NEWS_API_BASE_URL = (
  process.env.NEWS_API_BASE_URL ?? "https://news-api-fs.vercel.app/api/v2"
).replace(/\/+$/, "");

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number };

async function request<T>(path: string): Promise<ApiResult<T>> {
  const response = await fetch(`${NEWS_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  return { ok: true, data: (await response.json()) as T };
}

export async function getNewsSections(): Promise<INewsSection[]> {
  "use cache";
  cacheLife("minutes");

  const result = await request<INewsSectionsResponse>("/news/sections");

  if (!result.ok) {
    throw new Error(`Failed to load news sections (${result.status})`);
  }

  return result.data.data;
}

export async function getNewsSection(
  index: number
): Promise<INewsSection | undefined> {
  const sections = await getNewsSections();
  return sections[index];
}

export async function getLatestNews(limit = 10): Promise<INewsArticle[]> {
  "use cache";
  cacheLife("minutes");

  const result = await request<INewsFeedResponse>(`/news?limit=${limit}`);

  if (!result.ok) {
    throw new Error(`Failed to load latest news (${result.status})`);
  }

  return result.data.data;
}

export async function getMostRead(): Promise<INewsArticle[]> {
  "use cache";
  cacheLife("minutes");

  const result = await request<IMostReadResponse>("/news/most-read");

  if (!result.ok) {
    throw new Error(`Failed to load most read news (${result.status})`);
  }

  return result.data.data;
}

export async function getCategories(): Promise<ICatagories[]> {
  "use cache";
  cacheLife("minutes");

  const result = await request<ICategoriesResponse>("/categories");

  if (!result.ok) {
    throw new Error(`Failed to load categories (${result.status})`);
  }

  return result.data.data;
}

export async function getCategoryNews(
  slug: string
): Promise<ICategoryNewsResponse | null> {
  "use cache";
  cacheLife("minutes");

  const result = await request<ICategoryNewsResponse>(
    `/category/${encodeURIComponent(slug)}`
  );

  if (!result.ok) {
    if (result.status === 400 || result.status === 404) {
      return null;
    }

    throw new Error(`Failed to load category "${slug}" (${result.status})`);
  }

  return result.data;
}

export async function getNewsArticle(
  id: string
): Promise<INewsArticleDetails | null> {
  "use cache";
  cacheLife("minutes");

  if (!/^[a-z0-9-]+$/i.test(id)) {
    return null;
  }

  const result = await request<INewsArticleResponse>(
    `/article/${encodeURIComponent(id)}`
  );

  if (!result.ok) {
    if (result.status === 400 || result.status === 404) {
      return null;
    }

    throw new Error(`Failed to load article "${id}" (${result.status})`);
  }

  return result.data.data;
}

export function resolveNewsImageUrl(
  url: string | null | undefined,
  width = 640
): string | null {
  if (!url) {
    return null;
  }

  return url.replace(/\{width\}/g, String(width));
}

const bengaliDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

const bengaliTimeFormatter = new Intl.DateTimeFormat("bn-BD", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Dhaka",
});

const bengaliDateTimeFormatter = new Intl.DateTimeFormat("bn-BD", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

function parseDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatBengaliDate(value: string): string | null {
  const date = parseDate(value);
  return date ? bengaliDateFormatter.format(date) : null;
}

export function formatBengaliTime(value: string): string | null {
  const date = parseDate(value);
  return date ? bengaliTimeFormatter.format(date) : null;
}

export function formatBengaliDateTime(value: string): string | null {
  const date = parseDate(value);
  return date ? bengaliDateTimeFormatter.format(date) : null;
}
