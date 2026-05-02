import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    Building2,
    Store,
    ShoppingBag,
    Package,
    Leaf,
    Award,
    HeartHandshake,
} from "lucide-react";

import GuestLayout from "../Layouts/GuestLayout";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../Components/accordion";

const About = ({ faqs = [] }) => {
    const { t, i18n } = useTranslation();
    const lang  = i18n.language;
    const isRtl = lang === "ar";

    /* ── Scroll reveal ── */
    const animRefs = useRef([]);
    const addRef = (el) => {
        if (el && !animRefs.current.includes(el)) animRefs.current.push(el);
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
            { threshold: 0.12 }
        );
        animRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [faqs.length]);

    /* ── Story stats (use existing home.stats_* labels) ── */
    const stats = [
        { number: "2,000+", labelKey: "home.stats_customers"  },
        { number: "1M+",    labelKey: "home.stats_bags"       },
        { number: "10+",    labelKey: "home.stats_experience" },
    ];

    /* ── Values ── */
    const values = [
        { num: "1", icon: Leaf,           titleKey: "about.value1_title", textKey: "about.value1_text" },
        { num: "2", icon: Award,          titleKey: "about.value2_title", textKey: "about.value2_text" },
        { num: "3", icon: HeartHandshake, titleKey: "about.value3_title", textKey: "about.value3_text" },
    ];

    /* ── Partners (marquee) — duplicated for seamless loop ── */
    const partnersBase = [
        { icon: Building2,   name: "Corporate Partners" },
        { icon: Store,       name: "Retail Chain" },
        { icon: ShoppingBag, name: "Fashion Brands" },
        { icon: Package,     name: "E-commerce" },
        { icon: Building2,   name: "Logistics Co" },
        { icon: Store,       name: "Supermarkets" },
        { icon: ShoppingBag, name: "Boutiques" },
        { icon: Package,     name: "Distribution" },
    ];
    const partners = [...partnersBase, ...partnersBase];

    return (
        <GuestLayout>
            <div className="bg-background text-foreground">

                {/* ───────────────────────── HERO ───────────────────────── */}
                <section className="hex-hero pt-32 pb-24 px-[6vw]">
                    <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">

                        {/* Left: heading */}
                        <div>
                            <div className="eyebrow-hex eyebrow-hex--accent mb-5">
                                <span>{t("about.hero_badge")}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5">
                                {t("about.title")}
                            </h1>
                            <p className="text-base sm:text-lg leading-relaxed max-w-xl text-white/75">
                                {t("about.subtitle")}
                            </p>
                        </div>

                        {/* Right: hex-clipped image stack */}
                        <div className="relative hidden lg:block aspect-[4/5] max-w-sm justify-self-end w-full">
                            {/* Big hex with the image */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent) / 0.2)",
                                }}
                            >
                                <img
                                    src="/images/shopping-bags.jpg"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating mustard outline hex behind */}
                            <div
                                aria-hidden="true"
                                className="absolute -top-6 end-[-32px] w-32 h-36"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent))",
                                    opacity: 0.15,
                                }}
                            />
                            {/* Tiny solid mustard hex */}
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-4 -start-4 w-12 h-14"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    background: "hsl(var(--accent))",
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── STORY ───────────────────────── */}
                <section className="px-[6vw] py-20 sm:py-24">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

                        {/* Left: prose */}
                        <div ref={addRef} className="fade-up">
                            <div className="eyebrow-hex mb-3">
                                <span>{t("about.story_title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-7">
                                {t("about.story_title")}
                            </h2>
                            <div className="space-y-5 text-muted-foreground leading-relaxed">
                                {["about.story_p1", "about.story_p2", "about.story_p3", "about.story_p4"].map((key, i) => (
                                    <p
                                        key={key}
                                        className={i === 0 ? "text-lg text-foreground/90" : "text-base"}
                                    >
                                        {t(key)}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Right: stats stack */}
                        <div className="space-y-4">
                            {stats.map((s, i) => (
                                <div
                                    key={s.labelKey}
                                    ref={addRef}
                                    className={`fade-up delay-${i + 1} hex-corner-card p-6 sm:p-7`}
                                >
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl sm:text-5xl font-extrabold text-foreground leading-none">
                                            {s.number}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mt-3">
                                        {t(s.labelKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── VALUES ───────────────────────── */}
                <section className="px-[6vw] py-20 sm:py-24 bg-muted/40 border-y border-border">
                    <div className="max-w-6xl mx-auto">
                        <div ref={addRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
                            <div className="eyebrow-hex justify-center mb-3 inline-flex">
                                <span>{t("about.values_title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                                {t("about.values_title")}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {values.map(({ num, icon: Icon, titleKey, textKey }, i) => (
                                <div
                                    key={num}
                                    ref={addRef}
                                    className={`fade-up delay-${i + 1} hex-corner-card p-7 sm:p-8`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="hex-icon">
                                            <Icon strokeWidth={2.4} />
                                        </div>
                                        <span className="text-3xl font-extrabold text-primary/30 leading-none">
                                            0{num}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
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

                {/* ───────────────────────── PARTNERS ───────────────────────── */}
                <section className="hex-hero py-20 sm:py-24 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-[6vw] mb-12 relative z-10 text-center">
                        <div className="eyebrow-hex eyebrow-hex--accent justify-center inline-flex mb-3">
                            <span>{t("about.partners_title")}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                            {t("about.partners_title")}
                        </h2>
                    </div>

                    {/* Marquee */}
                    <div className="relative" dir="ltr">
                        <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-[hsl(var(--primary-deep))] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-[hsl(var(--primary-deep))] to-transparent z-10 pointer-events-none" />
                        <div className="flex gap-5 marquee-track">
                            {partners.map((partner, index) => {
                                const Icon = partner.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 flex flex-col items-center justify-center gap-3 w-40 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.04] hover:bg-white/10"
                                    >
                                        <div className="hex-icon">
                                            <Icon strokeWidth={2.2} />
                                        </div>
                                        <span className="text-xs text-white/80 text-center font-semibold">
                                            {partner.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── FAQ ───────────────────────── */}
                <section className="px-[6vw] py-20 sm:py-24">
                    <div className="max-w-3xl mx-auto">
                        <div ref={addRef} className="fade-up text-center mb-12">
                            <div className="eyebrow-hex justify-center inline-flex mb-3">
                                <span>{t("about.faq_title")}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                                {t("about.faq_title")}
                            </h2>
                        </div>

                        {faqs.length === 0 ? (
                            <p className="text-center text-muted-foreground italic">
                                {t("about.faq_empty")}
                            </p>
                        ) : (
                            <Accordion type="single" collapsible className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={String(faq.id)}
                                        ref={addRef}
                                        className={`fade-up delay-${(i % 3) + 1} bg-card border border-border rounded-2xl px-5 sm:px-6 data-[state=open]:border-primary/40 data-[state=open]:shadow-md transition-all`}
                                    >
                                        <AccordionTrigger className="text-start hover:no-underline py-5 gap-3">
                                            <span
                                                aria-hidden="true"
                                                className="inline-block flex-shrink-0 mt-1"
                                                style={{
                                                    width: 14,
                                                    height: 16,
                                                    background: "hsl(var(--accent))",
                                                    clipPath:
                                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                                }}
                                            />
                                            <span className="font-semibold text-foreground flex-1">
                                                {lang === "ar" ? faq.question_ar : faq.question_en}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground text-start ps-7 leading-relaxed pb-5">
                                            {lang === "ar" ? faq.answer_ar : faq.answer_en}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </div>
                </section>

            </div>
        </GuestLayout>
    );
};

export default About;
