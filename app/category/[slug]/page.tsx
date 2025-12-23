import { getTopHeadlines } from "@/lib/news";
import { NewsCard } from "@/components/news-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types";
import { Suspense } from "react";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    if (!validCategories.includes(slug)) {
        notFound();
    }

    const news = await getTopHeadlines(slug as Category);
    const articles = news.articles.filter(a => a.title !== "[Removed]");

    return (
        <div className="container mx-auto py-12 space-y-12 px-4 md:px-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight capitalize">{slug} News</h1>
                <p className="text-muted-foreground">
                    Top headlines in {slug} from around the world.
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
                        <p className="col-span-full text-center py-20 text-muted-foreground">
                            No articles found for this category.
                        </p>
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
