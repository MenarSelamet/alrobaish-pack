import { Head, Link } from "@inertiajs/react";
import { Button } from "../Components/button";
import { ArrowRight, Package } from "lucide-react";

export default function Welcome() {
    return (
        <>
            <Head title="Alrobaish Pack" />
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
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[600px] flex items-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/images/hero-bags.jpg)",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/60" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                                Sustainable Paper Bags for Every Need
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Custom-made, eco-friendly packaging solutions
                                that make a difference for your business and the
                                planet.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/products">
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        View Products
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button size="lg" variant="outline">
                                        Get a Quote
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Stats Section */}
                <section className="py-16 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">
                                    10,000+
                                </div>
                                <div className="text-muted-foreground">
                                    Happy Customers
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">
                                    5M+
                                </div>
                                <div className="text-muted-foreground">
                                    Bags Produced
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">
                                    100%
                                </div>
                                <div className="text-muted-foreground">
                                    Recyclable Materials
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">
                                    15+
                                </div>
                                <div className="text-muted-foreground">
                                    Years Experience
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
