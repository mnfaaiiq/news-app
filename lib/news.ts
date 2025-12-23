import { NewsResponse, Category } from "@/types";

const API_KEY = process.env.NEWS_API_KEY || "1bf7b18d93f149bc8688258b36e7bfaa";
const BASE_URL = "https://newsapi.org/v2";

if (!process.env.NEWS_API_KEY) {
    console.warn("NEWS_API_KEY is not defined in environment variables. Using fallback for demo.");
}

export async function getTopHeadlines(category?: Category, page: number = 1): Promise<NewsResponse> {
    const url = new URL(`${BASE_URL}/top-headlines`);
    url.searchParams.set("apiKey", API_KEY || "");
    url.searchParams.set("country", "us");
    url.searchParams.set("pageSize", "12");
    url.searchParams.set("page", page.toString());

    if (category) {
        url.searchParams.set("category", category);
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    return res.json();
}

export async function searchNews(query: string, page: number = 1): Promise<NewsResponse> {
    if (!query) return { status: "ok", totalResults: 0, articles: [] };

    const url = new URL(`${BASE_URL}/everything`);
    url.searchParams.set("apiKey", API_KEY || "");
    url.searchParams.set("q", query);
    url.searchParams.set("pageSize", "12");
    url.searchParams.set("page", page.toString());
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
        throw new Error("Failed to search news");
    }

    return res.json();
}
