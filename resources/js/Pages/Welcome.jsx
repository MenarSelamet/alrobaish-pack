import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { ArrowRight, Package, Leaf, Award } from "lucide-react";
import GuestLayout from "../Layouts/GuestLayout";

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Alrobaish Pack" />

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
                {/* Mission Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                We're committed to providing high-quality,
                                sustainable paper bag solutions that help
                                businesses reduce their environmental impact
                                while maintaining excellence in packaging.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Leaf className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Eco-Friendly
                                    </h3>
                                    <p className="text-muted-foreground">
                                        All our bags are made from 100%
                                        recyclable materials, helping reduce
                                        plastic waste and protect our
                                        environment.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Custom Made
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Tailored to your exact specifications
                                        with custom sizes, colors, and branding
                                        options to match your business.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Premium Quality
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Durable construction and superior
                                        materials ensure your products are
                                        well-protected and beautifully
                                        presented.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Go Green?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of businesses making the switch to
                            sustainable packaging.
                        </p>
                        <Link to="/contact">
                            <Button size="lg" variant="secondary">
                                Contact Us Today
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
