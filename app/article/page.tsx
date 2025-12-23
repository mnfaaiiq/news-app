import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, User, Globe } from "lucide-react";
import { searchNews } from "@/lib/news";

interface ArticlePageProps {
    searchParams: Promise<{ url?: string; title?: string }>;
}

export default async function ArticlePage({ searchParams }: ArticlePageProps) {
    const { url, title } = await searchParams;

    if (!url) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Article not found.</h1>
                <Button asChild className="mt-4">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    // We try to find the full article details by searching for the title
    // This is a workaround for NewsAPI not having a get-by-id endpoint
    let article = null;
    if (title) {
        const results = await searchNews(title);
        article = results.articles.find(a => a.url === url) || results.articles[0];
    }

    if (!article && !title) {
        // Fallback if we only have URL
        return (
            <div className="container py-20 text-center space-y-4">
                <h1 className="text-2xl font-bold">Viewing external article</h1>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    We are redirecting you to the source as we couldn't fetch the full content preview.
                </p>
                <Button asChild size="lg">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        );
    }

    // If we found the article or at least have a title to show
    const displayTitle = article?.title || title || "News Article";
    const displayImage = article?.urlToImage;
    const displaySource = article?.source?.name || "Unknown Source";
    const displayAuthor = article?.author || "Staff Writer";
    const displayDate = article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently";
    const displayContent = article?.content || article?.description || "Full content is not available for this article preview.";

    return (
        <div className="container mx-auto py-12 max-w-4xl px-4 md:px-8">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-12"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Link>

            <article className="space-y-8">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        {displayTitle}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{displayAuthor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{displaySource}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{displayDate}</span>
                        </div>
                    </div>
                </header>

                <Separator />

                {displayImage && (
                    <div className="relative aspect-video overflow-hidden rounded-2xl border shadow-xl">
                        <Image
                            src={displayImage}
                            alt={displayTitle}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                        {article?.description}
                    </p>
                    <div className="mt-8 text-lg leading-relaxed space-y-4">
                        {displayContent.split("[+").length > 1 ? (
                            <>
                                <p>{displayContent.split("[+")[0]}</p>
                                <div className="bg-muted p-6 rounded-xl border border-dashed border-muted-foreground/50 text-center">
                                    <p className="text-sm font-medium mb-4">
                                        The full article is available at the original source.
                                    </p>
                                    <Button asChild size="lg" className="w-full md:w-auto">
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            Read Full Article on {displaySource} <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>{displayContent}</p>
                        )}
                    </div>
                </div>
            </article>

            <div className="mt-16 pt-8 border-t space-y-8">
                <h3 className="text-2xl font-bold">Related News</h3>
                {/* We could add a related news component here */}
                <p className="text-muted-foreground italic">Check our homepage for more top stories.</p>
            </div>
        </div>
    );
}
