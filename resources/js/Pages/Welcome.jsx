import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "../components/card";
import { Button } from "../Components/button";
import { ArrowRight, Package, Leaf, Award } from "lucide-react";
import GuestLayout from "../Layouts/GuestLayout";
import { useTranslation } from "react-i18next";

export default function Welcome() {
    const { t } = useTranslation();

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
                                {t("home.hero_title")}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                {t("home.hero_subtitle")}
                            </p>
                            <div className="flex gap-4">
                                <Link href="/products">
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        {t("home.cta_products")}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline">
                                        {t("home.cta_quote")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Stats Section */}
                <section className="relative z-30 -mt-16">
                    <div className="container mx-auto px-4">
                        <div className="bg-white shadow-lg border-primary border-b-4 border-green-700 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-300 text-center">
                                <div className="p-8">
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        10,000+
                                    </div>
                                    <div className="text-gray-600">
                                        {t("home.stats_customers")}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        5M+
                                    </div>
                                    <div className="text-gray-600">
                                        {t("home.stats_bags")}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        100%
                                    </div>
                                    <div className="text-gray-600">
                                        {t("home.stats_recyclable")}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        15+
                                    </div>
                                    <div className="text-gray-600">
                                        {t("home.stats_experience")}
                                    </div>
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
                                {t("home.mission_title")}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {t("home.mission_text")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Leaf className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("home.feature_eco_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("home.feature_eco_text")}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("home.feature_custom_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("home.feature_custom_text")}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("home.feature_quality_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("home.feature_quality_text")}
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
                            {t("home.cta_green_title")}
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            {t("home.cta_green_subtitle")}
                        </p>
                        <Link to="/contact">
                            <Button size="lg" variant="secondary">
                                {t("home.cta_green_button")}
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
