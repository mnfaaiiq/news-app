import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <Card className="overflow-hidden flex flex-col h-full border-muted/60">
            <Skeleton className="aspect-video w-full" />
            <CardHeader className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-4 w-24" />
            </CardFooter>
        </Card>
    );
}
