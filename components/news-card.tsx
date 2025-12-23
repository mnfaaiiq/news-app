import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/types";

interface NewsCardProps {
    article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
    const { title, description, urlToImage, source, publishedAt, url } = article;

    // Format the date using date-fns or native Intl
    // Note: date-fns needs to be installed, but I can use native Intl for now if I don't want to add more deps
    // But pulse-news user prompt says "Clean typography" and "Professional"
    // Let's use native for now or check if date-fns is available
    const formattedDate = new Date(publishedAt).toLocaleDateString();

    return (
        <Card className="overflow-hidden flex flex-col h-full group transition-all hover:shadow-lg border-muted/60">
            <div className="relative aspect-video overflow-hidden">
                {urlToImage ? (
                    <Image
                        src={urlToImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image available</span>
                    </div>
                )}
            </div>
            <CardHeader className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-semibold text-[10px] uppercase tracking-wider">
                        {source.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {formattedDate}
                    </span>
                </div>
                <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {description || "No description available for this article."}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild variant="link" className="px-0 text-primary font-semibold">
                    <Link href={`/article?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}>
                        Read More &rarr;
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

import { Button } from "@/components/ui/button";
