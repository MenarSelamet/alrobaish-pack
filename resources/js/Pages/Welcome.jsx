import { Head, Link } from "@inertiajs/react";
import { Package } from "lucide-react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Package className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold text-foreground">
                            Alrobaish Pack
                        </span>
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            About
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Products
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
