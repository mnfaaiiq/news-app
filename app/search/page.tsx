import { searchNews } from "@/lib/news";
import { NewsCard } from "@/components/news-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q: query } = await searchParams;

    if (!query) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Please enter a search query.</h1>
            </div>
        );
    }

    const news = await searchNews(query);
    const articles = news.articles.filter(a => a.title !== "[Removed]");

    return (
        <div className="container mx-auto py-12 space-y-12 px-4 md:px-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Search Results</h1>
                <p className="text-muted-foreground">
                    Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
                </p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Suspense fallback={<SkeletonGrid />}>
                    {articles.length > 0 ? (
                        articles.map((article, i) => (
                            <NewsCard key={i} article={article} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 space-y-4">
                            <p className="text-xl text-muted-foreground">
                                No articles found for "{query}".
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Try searching for something else or check your spelling.
                            </p>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}

function SkeletonGrid() {
    return (
        <>
            {[...Array(12)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
}
