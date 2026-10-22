import type ICatagories from "./Catagories";

export interface INewsArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string | null;
  source: string;
  rank?: number;
}

export interface INewsSection {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: INewsArticle[];
}

export interface IArticleByline {
  name: string;
  role?: string;
}

export interface IArticleTopic {
  id: string;
  name: string;
}

export interface IArticleBodyText {
  type: "text";
  text: string;
}

export interface IArticleBodySubheading {
  type: "subheading";
  text: string;
}

export interface IArticleBodyImage {
  type: "image";
  url: string;
  width: number;
  height: number;
  caption: string | null;
  altText: string;
  copyrightHolder: string;
}

export type IArticleBodyBlock =
  | IArticleBodyText
  | IArticleBodySubheading
  | IArticleBodyImage;

export interface INewsArticleDetails {
  id: string;
  title: string;
  description: string | null;
  link: string;
  firstPublished: string;
  lastPublished: string | null;
  byline: IArticleByline[];
  topics: IArticleTopic[];
  tags: string[];
  imageUrl: string | null;
  body: IArticleBodyBlock[];
  text: string;
  wordCount: number;
  source: string;
}

export interface INewsSectionsResponse {
  success: true;
  count: number;
  cachedAt: string;
  data: INewsSection[];
}

export interface INewsFeedResponse {
  success: true;
  count: number;
  cachedAt: string;
  total?: number;
  limit?: number;
  offset?: number;
  data: INewsArticle[];
}

export interface IMostReadResponse {
  success: true;
  count: number;
  cachedAt: string;
  generated: string;
  data: INewsArticle[];
}

export interface ICategoriesResponse {
  success: true;
  count: number;
  cachedAt: string;
  data: ICatagories[];
}

export interface ICategoryNewsResponse {
  success: true;
  count: number;
  cachedAt: string;
  slug: string;
  topicId: string | null;
  title: string;
  page: number;
  pageCount: number;
  data: INewsArticle[];
}

export interface INewsArticleResponse {
  success: true;
  cachedAt: string;
  data: INewsArticleDetails;
}
