import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";

const categories = [
    { name: "Business", slug: "business" },
    { name: "Technology", slug: "technology" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Health", slug: "health" },
    { name: "Science", slug: "science" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold text-2xl tracking-tighter uppercase">
                            Pulse<span className="text-primary">News</span>
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <form action="/search" className="relative hidden lg:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            name="q"
                            placeholder="Search news..."
                            className="w-[200px] pl-8 lg:w-[300px]"
                        />
                    </form>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
