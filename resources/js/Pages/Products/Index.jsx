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
                <div className="min-h-screen bg-background">
                    {/* Hero Section */}
                    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto text-center">
                                <p className="text-sm text-muted-foreground mb-3">
                                    {t("products.tagline")}
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                    {t("products.title")}
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    {t("products.subtitle")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Bento Box Grid */}
                    <section className="py-12 md:py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                                {/* Large Text Card - Top Left */}
                                <Card className="lg:col-span-2 lg:row-span-2 border-2 hover:shadow-2xl transition-all duration-300 bg-card">
                                    <CardContent className="p-8 md:p-12 flex flex-col justify-center h-full">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {t("products.tagline")}
                                        </p>
                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                            {t("products.explore_title")}
                                        </h2>
                                        <p className="text-muted-foreground mb-8 leading-relaxed">
                                            {t("products.explore_desc")}
                                        </p>
                                        <Link to="/products/shopping">
                                            <Button size="lg" className="w-fit">
                                                {t("products.check_products")}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Image Card - Top Right */}
                                <Card className="lg:col-span-2 lg:row-span-2 border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                                    <div className="relative h-full">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-8">
                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3"></h3>
                                            <p className="text-muted-foreground mb-4"></p>
                                            <Link>
                                                <Button
                                                    variant="secondary"
                                                    className="w-fit"
                                                >
                                                    {t(
                                                        "products.check_products"
                                                    )}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                {/* Small Text Card 1 */}
                                <Card className="lg:col-span-1 lg:row-span-2 border-2 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4"></h3>
                                            <p className="text-sm text-muted-foreground mb-6"></p>
                                        </div>
                                        <Link>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                {t("products.check_products")}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Small Text Card 2 */}
                                <Card className="lg:col-span-1 lg:row-span-2 border-2 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4"></h3>
                                            <p className="text-sm text-muted-foreground mb-6"></p>
                                        </div>
                                        <Link>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                {t("products.check_products")}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Large Image Card - Bottom Left */}
                                <Card className="lg:col-span-2 lg:row-span-2 border-2 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    <div className="relative h-full min-h-[300px]">
                                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </Card>

                                {/* Text + Features Card */}
                                <Card className="lg:col-span-2 lg:row-span-2 border-2 hover:shadow-xl transition-all duration-300 bg-muted/30">
                                    <CardContent className="p-8 md:p-10 flex flex-col justify-center h-full">
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {t("products.tagline")}
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                                            {t("products.explore_title")}
                                        </h2>
                                        <p className="text-muted-foreground mb-6">
                                            {t("products.explore_desc")}
                                        </p>
                                        <Link to="/contact">
                                            <Button
                                                variant="default"
                                                className="w-fit"
                                            >
                                                {t("products.check_products")}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Bottom Right Image Card */}
                                <Card className="lg:col-span-2 lg:row-span-2 border-2 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    <div className="relative h-full min-h-[300px]">
                                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 md:py-20 bg-muted/30">
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

                {/* Hero Section */}
                {/* <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
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
                </section> */}
                {/* Products Grid */}
                {/* <section className="py-16">
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
                </section> */}
            </div>
        </GuestLayout>
    );
};

export default Products;
