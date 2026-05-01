import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";

function useCountUp(target, duration, triggered) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!triggered) {
            return;
        }
        let start = null;
        const step = (timestamp) => {
            if (!start) {
                start = timestamp;
            }
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [triggered]);
    return count;
}

function StatCounter({ target, suffix, label, duration = 1800 }) {
    const [triggered, setTriggered] = useState(false);
    const elRef = useRef(null);
    const count = useCountUp(target, duration, triggered);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 },
        );
        if (elRef.current) {
            observer.observe(elRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="p-5 md:p-8 home-stat" ref={elRef}>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 home-stat-number">
                {triggered ? `${count.toLocaleString()}${suffix}` : `0${suffix}`}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">{label}</div>
        </div>
    );
}

import { Card, CardContent } from "../components/card";
import { Button } from "../Components/button";
import { ArrowRight, ArrowLeft, Package, Leaf, Award } from "lucide-react";
import GuestLayout from "../Layouts/GuestLayout";
import { useTranslation } from "react-i18next";
import "./Welcome.css";

export default function Welcome() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const scrollRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.15 },
        );
        scrollRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const ref = (i) => (el) => (scrollRefs.current[i] = el);

    return (
        <GuestLayout>
            <Head title="Alrobaish Pack" />

            <div className="min-h-screen">
                {/* ── Hero ─────────────────────────────── */}
                <section className="relative min-h-[480px] sm:min-h-[560px] md:h-[600px] flex items-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center hero-bg"
                        style={{ backgroundImage: "url(/images/hero-bags.jpg)" }}
                    >
                        <div
                            className={`absolute inset-0 ${lang === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-background/95 to-background/60`}
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 py-16 md:py-0">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 hero-title leading-tight">
                                {t("home.hero_title")}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 hero-subtitle">
                                {t("home.hero_subtitle")}
                            </p>
                            <div className="flex flex-wrap gap-3 hero-cta">
                                <Link href="/products">
                                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                                        {t("home.cta_products")}
                                        {lang === "ar" ? (
                                            <ArrowLeft className="ms-2 h-4 w-4" />
                                        ) : (
                                            <ArrowRight className="ms-2 h-4 w-4" />
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

                {/* ── Stats ────────────────────────────── */}
                <section className="relative z-30 mt-6 md:-mt-16">
                    <div className="container mx-auto px-4">
                        <div
                            className="bg-card shadow-lg border-primary border-b-4 border-green-700 rounded-md home-fade-up"
                            ref={ref(0)}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-y-0 divide-border text-center">
                                <StatCounter target={2000} suffix="+" label={t("home.stats_customers")} />
                                <StatCounter target={5}     suffix="M+" label={t("home.stats_bags")} />
                                <StatCounter target={90}   suffix="%" label={t("home.stats_recyclable")} />
                                <StatCounter target={20}    suffix="+" label={t("home.stats_experience")} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Journey ──────────────────────────── */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div
                            className={`relative ${lang === "ar" ? "home-slide-end pr-4 md:pr-6 border-r-4" : "home-slide-start pl-4 md:pl-6 border-l-4"} border-yellow-700`}
                            ref={ref(1)}
                        >
                            <span className="text-sm uppercase tracking-wide text-muted-foreground mb-2 block">
                                {t("home.journey_subtitle")}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 leading-snug">
                                {t("home.journey_tagline")}
                            </h2>
                            <p className="text-muted-foreground mb-6 md:mb-8 text-sm sm:text-base">
                                {t("home.journey_text")}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                                <div>
                                    <h3 className="text-base md:text-lg font-semibold mb-2">
                                        {t("home.vision_title")}
                                    </h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">
                                        {t("home.vision_text")}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-semibold mb-2">
                                        {t("home.mission_title")}
                                    </h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">
                                        {t("home.mission_text_2")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`flex justify-center ${lang === "ar" ? "home-slide-start" : "home-slide-end"}`}
                            ref={ref(2)}
                        >
                            <video
                                src="/images/video.mp4"
                                className="rounded-md shadow-md w-full max-w-md"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>
                </section>

                {/* ── Solutions ────────────────────────── */}
                <section className="py-12 md:py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div
                            className={`text-primary-foreground ${lang === "ar" ? "home-slide-end" : "home-slide-start"}`}
                            ref={ref(3)}
                        >
                            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                                {t("solutions.title")}
                            </h3>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-4 md:mb-6">
                                {t("solutions.subtitle")}
                            </h2>
                            <p className="mb-6 md:mb-8 text-primary-foreground/80 leading-relaxed text-sm sm:text-base">
                                {t("solutions.text")}
                            </p>
                            <Link href="/products">
                                <Button size="lg" variant="secondary">
                                    {t("solutions.products_button")}
                                    {lang === "ar" ? (
                                        <ArrowLeft className="ms-2 h-4 w-4" />
                                    ) : (
                                        <ArrowRight className="ms-2 h-4 w-4" />
                                    )}
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {[
                                { icon: Leaf,    titleKey: "solutions.retail_title",    textKey: "solutions.retail_text" },
                                { icon: Package, titleKey: "solutions.food_title",      textKey: "solutions.food_text" },
                                { icon: Package, titleKey: "solutions.events_title",    textKey: "solutions.events_text" },
                                { icon: Award,   titleKey: "solutions.ecommerce_title", textKey: "solutions.ecommerce_text" },
                            ].map(({ icon: Icon, titleKey, textKey }, i) => (
                                <Card
                                    key={i}
                                    className={`bg-card p-4 md:p-6 home-card home-fade-up delay-${(i + 1) * 100}`}
                                    ref={ref(4 + i)}
                                >
                                    <CardContent className="p-0">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4 home-icon-wrap">
                                            <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                        </div>
                                        <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">
                                            {t(titleKey)}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {t(textKey)}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Mission ──────────────────────────── */}
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4">
                        <div
                            className="max-w-3xl mx-auto text-center mb-10 md:mb-16 home-fade-up"
                            ref={ref(8)}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                                {t("home.mission_title")}
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground">
                                {t("home.mission_text")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { icon: Leaf,    titleKey: "home.feature_eco_title",     textKey: "home.feature_eco_text" },
                                { icon: Package, titleKey: "home.feature_custom_title",  textKey: "home.feature_custom_text" },
                                { icon: Award,   titleKey: "home.feature_quality_title", textKey: "home.feature_quality_text" },
                            ].map(({ icon: Icon, titleKey, textKey }, i) => (
                                <Card
                                    key={i}
                                    className={`border-2 home-card-mission home-fade-up delay-${(i + 1) * 100}`}
                                    ref={ref(9 + i)}
                                >
                                    <CardContent className="pt-6">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4 home-icon-wrap">
                                            <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                                            {t(titleKey)}
                                        </h3>
                                        <p className="text-muted-foreground text-sm md:text-base">
                                            {t(textKey)}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Success / Steps ──────────────────── */}
                <section>
                    {/* Background banner */}
                    <div
                        className="relative flex flex-col justify-center items-center text-center text-white bg-cover bg-center py-16 md:py-24 pb-24 md:pb-36"
                        style={{ backgroundImage: "url('/images/hero-bags.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 px-4 home-fade-up" ref={ref(12)}>
                            <h3 className="text-base md:text-lg font-medium mb-2 text-[#d6d0b0]">
                                {t("success.title")}
                            </h3>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug mb-4 text-[#f2f0d8]">
                                {t("success.subtitle_1")} <br />
                                {t("success.subtitle_2")} <br />
                            </h2>
                            <p className="text-[#e6b264] text-base md:text-lg mb-5">
                                {t("success.subtitle_3")}
                            </p>
                            <Link href="/contact">
                                <Button size="lg" variant="secondary">
                                    {t("home.cta_green_button")}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Step cards — pulled up over the banner on desktop, flowing below on mobile */}
                    <div className="container mx-auto px-4 md:-mt-20 relative z-20 pb-12 md:pb-16">
                        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-6">
                            {[
                                { num: "01", titleKey: "success.story1_title", textKey: "success.story1_text", delay: "delay-100" },
                                { num: "02", titleKey: "success.story2_title", textKey: "success.story2_text", delay: "delay-200" },
                                { num: "03", titleKey: "success.story3_title", textKey: "success.story3_text", delay: "delay-300" },
                            ].map(({ num, titleKey, textKey, delay }, i) => (
                                <div
                                    key={i}
                                    className={`bg-card text-card-foreground shadow-xl rounded-md flex-1 p-6 md:p-8 border-4 border-transparent home-step-card home-fade-up ${delay} ${lang === "ar" ? "border-r-[#f2b85d]" : "border-l-[#f2b85d]"}`}
                                    ref={ref(13 + i)}
                                >
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                        {num}
                                    </h3>
                                    <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">
                                        {t(titleKey)}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {t(textKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
