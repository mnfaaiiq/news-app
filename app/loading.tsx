import { SkeletonCard } from "@/components/skeleton-card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="container py-8 space-y-8">
            <div className="space-y-4">
                <div className="h-10 w-64 bg-muted animate-pulse rounded-md" />
                <Separator />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
