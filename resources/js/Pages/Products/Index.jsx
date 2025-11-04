import React from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/card";
import { Button } from "../../Components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Products = ({ categories }) => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                {t("products.title")}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t("products.subtitle")}
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
                                        {category.image_path && (
                                            <img
                                                src={`/storage/${category.image_path}`}
                                                // alt={category.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {lang === "ar"
                                                ? category.name_ar
                                                : category.name_en}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {lang === "ar"
                                                ? category.description_ar
                                                : category.description_en}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link
                                            href={`/products/category/${category.id}`}
                                        >
                                            <Button className="w-full">
                                                {t("products.view_details")}
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
                            {t("products.cta_custom_title")}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {t("products.cta_custom_subtitle")}
                        </p>
                        <Link to="/contact">
                            <Button size="lg">
                                {t("products.cta_custom_button")}
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Products;
