import { getTopHeadlines } from "@/lib/news";
import { NewsCard } from "@/components/news-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function HomePage() {
  try {
    const topNews = await getTopHeadlines();
    const articles = topNews.articles.filter(a => a.title !== "[Removed]");

    if (articles.length === 0) {
      throw new Error("No articles found.");
    }

    const featured = articles[0];
    const rest = articles.slice(1, 5);

    return (
      <div className="container mx-auto py-8 space-y-12 px-4 md:px-8">
        {/* Hero / Featured Section */}
        <section className="py-4">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Top Story</h2>
            <Separator />
          </div>

          {featured ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative aspect-[16/9] overflow-hidden rounded-xl group">
                {featured.urlToImage ? (
                  <Image
                    src={featured.urlToImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <Badge className="w-fit mb-4 bg-primary hover:bg-primary/90">Featured</Badge>
                  <Link href={`/article?url=${encodeURIComponent(featured.url)}&title=${encodeURIComponent(featured.title)}`}>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight hover:underline">
                      {featured.title}
                    </h1>
                  </Link>
                  <p className="mt-4 text-gray-200 line-clamp-2 max-w-2xl hidden md:block">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
                    <span>{featured.source.name}</span>
                    <span>•</span>
                    <span>{new Date(featured.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-xl">More Headlines</h3>
                <div className="space-y-4">
                  {rest.map((article, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
                        {article.urlToImage ? (
                          <Image
                            src={article.urlToImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <Link href={`/article?url=${encodeURIComponent(article.url)}&title=${encodeURIComponent(article.title)}`}>
                          <h4 className="font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                        </Link>
                        <span className="text-xs text-muted-foreground">{article.source.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading top headlines...</p>
          )}
        </section>

        {/* Category Grid Section */}
        <section className="space-y-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Recent News</h2>
            <Link href="/category/general" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense fallback={<SkeletonGrid />}>
              {articles.slice(5, 13).map((article, i) => (
                <NewsCard key={i} article={article} />
              ))}
            </Suspense>
          </div>
        </section>

        {/* Explore Categories */}
        <section className="bg-muted/30 -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 py-20 rounded-3xl my-12">
          <h2 className="text-2xl font-bold mb-10 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {["Business", "Technology", "Sports", "Entertainment", "Health", "Science"].map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="bg-background border rounded-xl p-4 hover:border-primary hover:text-primary transition-all font-semibold"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-20">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch the latest news. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}

function SkeletonGrid() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
