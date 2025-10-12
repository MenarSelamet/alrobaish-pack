import GuestLayout from "../Layouts/GuestLayout";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";

const ProductCategory = () => {
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-primary hover:underline mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                            Products
                        </Link>
                        <h1 className="text-5xl font-bold text-foreground">
                            Product Categories
                        </h1>
                    </div>
                </section>
                {/* Product Details */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                            <div>
                                <img
                                    src="/images/shopping-bags.jpg"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-6">
                                    Product Overview
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Detailed description of the product
                                    category, its benefits, and applications.
                                </p>

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        Key Features
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground"></span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="w-full md:w-auto"
                                    >
                                        Request a Quote
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* Specifications */}
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-2xl font-bold text-foreground mb-6">
                                    Specifications
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                        {" "}
                                        specification 1
                                        <span className="h-2 w-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                                        <span className="text-muted-foreground">
                                            {" "}
                                            Specification{" "}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default ProductCategory;
