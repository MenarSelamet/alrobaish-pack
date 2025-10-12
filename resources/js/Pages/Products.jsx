import React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/card";
import { Button } from "../components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

const Products = () => {
    const categories = [
        {
            id: "shopping",
            title: "Shopping Bags",
            description:
                "Durable, eco-friendly bags perfect for retail and commercial use. Available in various sizes and customizable with your brand.",
            image: "images/shopping-bags.jpg",
            features: [
                "Multiple sizes",
                "Reinforced handles",
                "Custom branding",
            ],
        },
        {
            id: "gift",
            title: "Gift Bags",
            description:
                "Elegant bags designed to make your gifts stand out. Perfect for special occasions and premium presentations.",
            image: "images/gift-bags.jpg",
            features: [
                "Decorative designs",
                "Premium finish",
                "Various colors",
            ],
        },
        {
            id: "food",
            title: "Food Packaging",
            description:
                "Grease-resistant bags ideal for bakeries, restaurants, and food service. Safe, hygienic, and sustainable.",
            image: "images/food-bags.jpg",
            features: [
                "Food-safe materials",
                "Grease-resistant",
                "Various capacities",
            ],
        },
    ];
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                Our Products
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
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {category.title}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {category.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 mb-6">
                                            {category.features.map(
                                                (feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center text-sm text-muted-foreground"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                                                        {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <Link to={`/products/${category.id}`}>
                                            <Button className="w-full">
                                                View Details{" "}
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
