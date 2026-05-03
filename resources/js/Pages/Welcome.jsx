import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    ArrowRight,
    ArrowLeft,
    Package,
    Leaf,
    Award,
    Sparkles,
    Target,
    Eye,
    Truck,
    ShoppingBag,
    Utensils,
    Gift,
} from "lucide-react";

import GuestLayout from "../Layouts/GuestLayout";
import { Button } from "../Components/button";

/* ───────────────────────────────────────────────
   Animated number counter
   ─────────────────────────────────────────────── */
function useCountUp(target, duration, triggered) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!triggered) return;
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [triggered]);
    return count;
}

function StatTile({ target, suffix, label, index }) {
    const [triggered, setTriggered] = useState(false);
    const elRef = useRef(null);
    const count = useCountUp(target, 1800, triggered);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (elRef.current) observer.observe(elRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elRef}
            className={`fade-up delay-${(index % 3) + 1} hex-corner-card p-6 sm:p-7 is-visible`}
        >
            <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-none">
                    {triggered ? count.toLocaleString() : 0}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--accent))] leading-none">
                    {suffix}
                </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mt-3 leading-tight">
                {label}
            </p>
        </div>
    );
}

/* ───────────────────────────────────────────────
   Page
   ─────────────────────────────────────────────── */
export default function Welcome() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

    /* Scroll reveal */
    const animRefs = useRef([]);
    const addRef = (el) => {
        if (el && !animRefs.current.includes(el)) animRefs.current.push(el);
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
            { threshold: 0.15 }
        );
        animRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <GuestLayout>
            <Head title="Alrobaish Pack" />

            <div className="bg-background text-foreground">

                {/* ───────────────────────── HERO ───────────────────────── */}
                <section className="hex-hero pt-32 pb-32 sm:pb-36 px-[6vw]">
                    <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">

                        {/* Text */}
                        <div>
                            <div className="eyebrow-hex eyebrow-hex--accent mb-5">
                                <span>{t("home.journey_tagline")}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5">
                                {t("home.hero_title")}
                            </h1>
                            <p className="text-base sm:text-lg leading-relaxed max-w-xl text-white/75 mb-7">
                                {t("home.hero_subtitle")}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/products">
                                    <Button
                                        size="lg"
                                        className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90"
                                    >
                                        {t("home.cta_products")}
                                        <ArrowIcon className="ms-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="bg-white/5 text-white border border-white/30 hover:bg-white/10 hover:text-white"
                                    >
                                        {t("home.cta_quote")}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hex-clipped hero image */}
                        <div className="relative hidden lg:block aspect-[4/5] max-w-sm justify-self-end w-full">
                            <div
                                className="absolute inset-0"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent) / 0.2)",
                                }}
                            >
                                <img
                                    src="/images/hero-bags.jpg"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                aria-hidden="true"
                                className="absolute -top-6 end-[-32px] w-32 h-36"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent))",
                                    opacity: 0.18,
                                }}
                            />
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-4 -start-4 w-12 h-14"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent))",
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* ─────────────── STATS — floats up over hero ─────────────── */}
                <section className="px-[6vw] -mt-20 sm:-mt-24 relative z-20 mb-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <StatTile target={2000} suffix="+"  label={t("home.stats_customers")}  index={0} />
                        <StatTile target={5}    suffix="M+" label={t("home.stats_bags")}       index={1} />
                        <StatTile target={90}   suffix="%"  label={t("home.stats_recyclable")} index={2} />
                        <StatTile target={20}   suffix="+"  label={t("home.stats_experience")} index={3} />
                    </div>
                </section>

                {/* ───────────────────────── JOURNEY ───────────────────────── */}
                <section className="px-[6vw] py-16 sm:py-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Text + vision/mission split */}
                        <div ref={addRef} className="fade-up">
                            <div className="eyebrow-hex mb-3">
                                <span>{t("home.journey_subtitle")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-5">
                                {t("home.journey_tagline")}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-9">
                                {t("home.journey_text")}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex gap-3">
                                    <div className="hex-icon hex-icon--sm">
                                        <Eye strokeWidth={2.4} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-foreground mb-1.5">
                                            {t("home.vision_title")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {t("home.vision_text")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="hex-icon hex-icon--sm">
                                        <Target strokeWidth={2.4} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-foreground mb-1.5">
                                            {t("home.mission_title")}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {t("home.mission_text_2")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video, with floating hex accents */}
                        <div ref={addRef} className="fade-up delay-1 relative">
                            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                                <video
                                    src="/images/video.mp4"
                                    className="w-full h-auto block"
                                    autoPlay loop muted playsInline
                                />
                            </div>
                            <div
                                aria-hidden="true"
                                className="absolute -top-5 -end-5 w-20 h-23"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent))",
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── SOLUTIONS ───────────────────────── */}
                <section className="hex-hero px-[6vw] py-20 sm:py-24">
                    <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-12 items-center">
                        <div ref={addRef} className="fade-up">
                            <div className="eyebrow-hex eyebrow-hex--accent mb-3">
                                <span>{t("solutions.title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5">
                                {t("solutions.subtitle")}
                            </h2>
                            <p className="text-white/75 leading-relaxed mb-7">
                                {t("solutions.text")}
                            </p>
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90"
                                >
                                    {t("solutions.products_button")}
                                    <ArrowIcon className="ms-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                { icon: ShoppingBag, titleKey: "solutions.retail_title",    textKey: "solutions.retail_text" },
                                { icon: Utensils,    titleKey: "solutions.food_title",      textKey: "solutions.food_text" },
                                { icon: Gift,        titleKey: "solutions.events_title",    textKey: "solutions.events_text" },
                                { icon: Truck,       titleKey: "solutions.ecommerce_title", textKey: "solutions.ecommerce_text" },
                            ].map(({ icon: Icon, titleKey, textKey }, i) => (
                                <div
                                    key={titleKey}
                                    ref={addRef}
                                    className={`fade-up delay-${(i % 3) + 1} bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-colors`}
                                >
                                    <div className="hex-icon hex-icon--sm mb-3">
                                        <Icon strokeWidth={2.4} />
                                    </div>
                                    <h3 className="text-base font-bold mb-1.5">
                                        {t(titleKey)}
                                    </h3>
                                    <p className="text-sm text-white/65 leading-relaxed">
                                        {t(textKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── MISSION / FEATURES ───────────────────────── */}
                <section className="px-[6vw] py-20 sm:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div ref={addRef} className="fade-up text-center mb-14">
                            <div className="eyebrow-hex justify-center inline-flex mb-3">
                                <span>{t("home.mission_title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
                                {t("home.mission_title")}
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {t("home.mission_text")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Leaf,    titleKey: "home.feature_eco_title",     textKey: "home.feature_eco_text" },
                                { icon: Sparkles,titleKey: "home.feature_custom_title",  textKey: "home.feature_custom_text" },
                                { icon: Award,   titleKey: "home.feature_quality_title", textKey: "home.feature_quality_text" },
                            ].map(({ icon: Icon, titleKey, textKey }, i) => (
                                <div
                                    key={titleKey}
                                    ref={addRef}
                                    className={`fade-up delay-${i + 1} hex-corner-card p-7 sm:p-8`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="hex-icon">
                                            <Icon strokeWidth={2.4} />
                                        </div>
                                        <span className="text-3xl font-extrabold text-primary/30 leading-none">
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                                        {t(titleKey)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(textKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── SUCCESS / STEPS ───────────────────────── */}
                <section>
                    {/* Banner with deep-teal overlay over the photo */}
                    <div
                        className="relative flex flex-col items-center text-center text-white py-20 md:py-28 md:pb-40 px-[6vw] overflow-hidden"
                        style={{ backgroundImage: "url('/images/hero-bags.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        {/* Tinted overlay using primary-deep */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(180deg, hsl(var(--primary-deep) / 0.85) 0%, hsl(var(--primary-deep) / 0.95) 100%)",
                            }}
                        />
                        {/* Halftone overlay */}
                        <div
                            className="absolute inset-0 opacity-50"
                            style={{
                                backgroundImage:
                                    "radial-gradient(hsl(var(--accent) / 0.18) 1.5px, transparent 1.6px)",
                                backgroundSize: "18px 18px",
                            }}
                        />

                        <div ref={addRef} className="fade-up relative z-10 max-w-2xl">
                            <div className="eyebrow-hex eyebrow-hex--accent justify-center inline-flex mb-3">
                                <span>{t("success.title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                                {t("success.subtitle_1")}
                                <br />
                                {t("success.subtitle_2")}
                            </h2>
                            <p className="text-[hsl(var(--accent))] text-base md:text-lg mb-7">
                                {t("success.subtitle_3")}
                            </p>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90"
                                >
                                    {t("home.cta_green_button")}
                                    <ArrowIcon className="ms-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Step cards — pulled up over banner on desktop */}
                    <div className="px-[6vw] -mt-24 md:-mt-28 relative z-20 pb-20 md:pb-24">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                            {[
                                { num: "01", titleKey: "success.story1_title", textKey: "success.story1_text" },
                                { num: "02", titleKey: "success.story2_title", textKey: "success.story2_text" },
                                { num: "03", titleKey: "success.story3_title", textKey: "success.story3_text" },
                            ].map(({ num, titleKey, textKey }, i) => (
                                <div
                                    key={num}
                                    ref={addRef}
                                    className={`fade-up delay-${i + 1} hex-corner-card p-7 sm:p-8`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="hex-icon">
                                            <span className="text-base font-extrabold">{num}</span>
                                        </div>
                                        <span className="text-3xl font-extrabold text-primary/30 leading-none">
                                            ·
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">
                                        {t(titleKey)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
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
