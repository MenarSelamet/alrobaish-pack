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

                {/* Journey Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side */}
                        <div className="relative pl-6 border-l-4 border-yellow-700">
                            <span className="text-sm uppercase tracking-wide text-gray-700 mb-2 block">
                                {t("home.journey_subtitle")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-snug">
                                {t("home.journey_tagline")}
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {t("home.journey_text")}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {t("home.vision_title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("home.vision_text")}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {t("home.mission_title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("home.mission_text_2")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex justify-center">
                            <img
                                src="/images/food-bags.jpg"
                                alt="Paper Bag"
                                className="rounded-md shadow-md w-full max-w-md"
                            />
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section className="bg-[#6B7B3A] py-20">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left side */}
                        <div className="text-white">
                            <h3 className="text-lg font-medium mb-4">
                                Solutions
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
                                Explore What We Are Doing Better
                            </h2>
                            <p className="mb-8 text-gray-100 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut elit tellus, luctus nec
                                ullamcorper mattis, pulvinar dapibus leo. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Ut elit tellus, luctus nec ullamcorper
                                mattis, pulvinar dapibus leo.
                            </p>

                            <Link href="/products">
                                <Button className="bg-[#9C8C47] text-[#3A3310] hover:bg-[#8B7E40] shadow-md px-6 py-2">
                                    Products{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#EEEAE2] text-center p-8 border border-[#D6D0C3]">
                                <h4 className="font-semibold text-[#3B3D1F] mb-2">
                                    Paper Bags
                                </h4>
                                <p className="text-[#3B3D1F] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </p>
                            </div>
                            <div className="bg-[#EEEAE2] text-center p-8 border border-[#D6D0C3]">
                                <h4 className="font-semibold text-[#3B3D1F] mb-2">
                                    Boxing
                                </h4>
                                <p className="text-[#3B3D1F] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </p>
                            </div>
                            <div className="bg-[#EEEAE2] text-center p-8 border border-[#D6D0C3]">
                                <h4 className="font-semibold text-[#3B3D1F] mb-2">
                                    Paper Cups
                                </h4>
                                <p className="text-[#3B3D1F] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </p>
                            </div>
                            <div className="bg-[#EEEAE2] text-center p-8 border border-[#D6D0C3]">
                                <h4 className="font-semibold text-[#3B3D1F] mb-2">
                                    Boxing
                                </h4>
                                <p className="text-[#3B3D1F] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </p>
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
