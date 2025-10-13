import React from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/card";
import { Button } from "../../components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

const Products = ({ categories }) => {
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                Our Categories
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Discover our range of sustainable paper bag
                                solutions, each designed with quality and the
                                environment in mind.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Products Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <Card
                                    key={category.id}
                                    className="overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <div className="h-64 overflow-hidden">
                                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {category.name}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {category.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link
                                            href={`/products/category/${category.id}`}
                                        >
                                            <Button className="w-full">
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Need Custom Solutions?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            We specialize in creating custom paper bags tailored
                            to your exact specifications. Let's discuss your
                            project!
                        </p>
                        <Link to="/contact">
                            <Button size="lg">Get a Custom Quote</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Products;
