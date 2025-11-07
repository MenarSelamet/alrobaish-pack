import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "../components/card";
import { Button } from "../Components/button";
import { ArrowRight, ArrowLeft, Package, Leaf, Award } from "lucide-react";
import GuestLayout from "../Layouts/GuestLayout";
import { useTranslation } from "react-i18next";

export default function Welcome() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;

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
                                        {lang === "ar" ? (
                                            <ArrowLeft className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        )}
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

                        <div
                            className={
                                lang === "ar"
                                    ? "relative pr-6 border-r-4 border-yellow-700"
                                    : "relative pl-6 border-l-4 border-yellow-700"
                            }
                        >
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
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left side */}
                        <div className="text-white">
                            <h3 className="text-lg font-medium mb-4">
                                {t("solutions.title")}
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
                                {t("solutions.subtitle")}
                            </h2>
                            <p className="mb-8 text-gray-100 leading-relaxed">
                                {t("solutions.text")}
                            </p>

                            <Link href="/products">
                                <Button size="lg" variant="secondary">
                                    {t("solutions.products_button")}{" "}
                                    {lang === "ar" ? (
                                        <ArrowLeft className="ml-2 h-4 w-4" />
                                    ) : (
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    )}
                                </Button>
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="grid grid-cols-2 gap-2">
                            <Card className="bg-[#EEEAE2]  p-6 hover:shadow-lg transition-shadow">
                                <CardContent>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Leaf className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("solutions.retail_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("solutions.retail_text")}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#EEEAE2]  p-6">
                                <CardContent>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("solutions.food_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("solutions.food_text")}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#EEEAE2]  p-6 ">
                                <CardContent>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("solutions.events_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("solutions.events_text")}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#EEEAE2]  p-6 ">
                                <CardContent>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("solutions.ecommerce_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("solutions.ecommerce_text")}
                                    </p>
                                </CardContent>
                            </Card>
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
                {/* Sucess section */}
                <section className="relative">
                    {/* Background section */}
                    <div
                        className="relative h-[600px] flex flex-col justify-center items-center text-center text-white bg-fixed bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/images/hero-bags.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Text content */}
                        <div className="relative z-10 px-4">
                            <h3 className="text-lg font-medium mb-2 text-[#d6d0b0]">
                                {t("success.title")}
                            </h3>
                            <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4 text-[#f2f0d8]">
                                {t("success.subtitle_1")} <br />
                                {t("success.subtitle_2")} <br />
                            </h2>
                            <p className="text-[#e6b264] text-lg mb-5">
                                {t("success.subtitle_3")}
                            </p>
                            <Link to="/contact">
                                <Button size="lg" variant="secondary">
                                    {t("home.cta_green_button")}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Overlapping cards */}
                    <div className="absolute left-1/2 z-30 -mt-24 transform -translate-x-1/2 w-full max-w-6xl px-6">
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            {/* Step 1 */}
                            <div
                                className={`bg-[#f3efea]/90 text-black shadow-xl rounded-md w-full md:w-1/3 p-8 backdrop-blur-sm border-4 border-transparent ${
                                    lang === "ar"
                                        ? "border-r-[#f2b85d]"
                                        : "border-l-[#f2b85d]"
                                }`}
                            >
                                <h3 className="text-2xl font-bold text-black mb-2">
                                    01
                                </h3>
                                <h4 className="font-semibold mb-3 text-[#3d3d3d]">
                                    {t("success.story1_title")}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t("success.story1_text")}
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div
                                className={`bg-[#f3efea]/90 text-black shadow-xl rounded-md w-full md:w-1/3 p-8 backdrop-blur-sm border-4 border-transparent ${
                                    lang === "ar"
                                        ? "border-r-[#f2b85d]"
                                        : "border-l-[#f2b85d]"
                                }`}
                            >
                                <h3 className="text-2xl font-bold text-black mb-2">
                                    02
                                </h3>
                                <h4 className="font-semibold mb-3 text-[#3d3d3d]">
                                    {t("success.story2_title")}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t("success.story2_text")}
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div
                                className={`bg-[#f3efea]/90 text-black shadow-xl rounded-md w-full md:w-1/3 p-8 backdrop-blur-sm border-4 border-transparent ${
                                    lang === "ar"
                                        ? "border-r-[#f2b85d]"
                                        : "border-l-[#f2b85d]"
                                }`}
                            >
                                <h3 className="text-2xl font-bold text-black mb-2">
                                    03
                                </h3>
                                <h4 className="font-semibold mb-3 text-[#3d3d3d]">
                                    {t("success.story3_title")}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {t("success.story3_text")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Add space below for layout balance */}
                    <div className="h-48"></div>
                </section>

                {/* CTA Section */}
                {/* <section className="py-20 bg-primary text-primary-foreground">
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
                </section> */}
            </div>
        </GuestLayout>
    );
}
