import { useEffect, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Clock,
} from "lucide-react";

import GuestLayout from "../Layouts/GuestLayout";
import { Label } from "../Components/label";
import { Input } from "../Components/input";
import { Textarea } from "../Components/textarea";
import { Button } from "../Components/button";

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

    const { data, setData, post, processing, wasSuccessful, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

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
    }, []);

    function submit(e) {
        e.preventDefault();
        post("/contact");
    }

    const infoCards = [
        {
            icon: Phone,
            title: t("contact.phone"),
            desc: t("contact.phone_hours"),
            value: t("contact.phone_number"),
        },
        {
            icon: Mail,
            title: t("contact.email"),
            desc: t("contact.email_desc"),
            value: t("contact.email_address"),
        },
        {
            icon: MapPin,
            title: t("contact.office"),
            desc: t("contact.office_desc"),
            value: t("contact.office_address"),
        },
    ];

    const whyKeys = ["contact.why_1", "contact.why_2", "contact.why_3"];

    return (
        <GuestLayout>
            <div className="bg-background text-foreground">

                {/* ───────────────────────── HERO ───────────────────────── */}
                <section className="hex-hero pt-32 pb-24 px-[6vw]">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="eyebrow-hex eyebrow-hex--accent mb-5">
                            <span>{t("contact.title")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5 max-w-3xl">
                            {t("contact.hero_heading") || t("contact.title")}
                        </h1>
                        <p className="text-base sm:text-lg leading-relaxed max-w-xl text-white/75">
                            {t("contact.subtitle")}
                        </p>
                    </div>
                </section>

                {/* ───────────────────── INFO CARDS STRIP ───────────────────── */}
                <section className="px-[6vw] -mt-12 sm:-mt-14 relative z-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        {infoCards.map(({ icon: Icon, title, desc, value }, i) => (
                            <div
                                key={i}
                                ref={addRef}
                                className={`fade-up delay-${(i % 3) + 1} bg-card border border-border rounded-2xl p-6 flex gap-4 items-start hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                            >
                                <div className="hex-icon hex-icon--sm">
                                    <Icon strokeWidth={2.4} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-foreground text-sm">
                                        {title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">
                                        {desc}
                                    </p>
                                    <p className="text-sm text-foreground font-semibold break-words">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ───────────────────── FORM + SIDEBAR ───────────────────── */}
                <section className="px-[6vw] py-20 sm:py-24">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                        {/* Form (3/5 on desktop) */}
                        <div
                            ref={addRef}
                            className="fade-up lg:col-span-3 hex-corner-card p-8 sm:p-10"
                        >
                            <div className="eyebrow-hex mb-3">
                                <span>{t("contact.form_title")}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight mb-2">
                                {t("contact.hero_heading") || t("contact.title")}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-7 max-w-md">
                                {t("contact.form_subtitle")}
                            </p>

                            {wasSuccessful && (
                                <div
                                    role="status"
                                    className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold flex items-start gap-2"
                                >
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    {t("contact.success_message")}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="cf-name">
                                            {t("contact.name")} *
                                        </Label>
                                        <Input
                                            id="cf-name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            required
                                            placeholder={t("contact.name_placeholder")}
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-destructive mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="cf-email">
                                            {t("contact.email_label")} *
                                        </Label>
                                        <Input
                                            id="cf-email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            required
                                            placeholder={t("contact.email_placeholder")}
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-destructive mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="cf-phone">{t("contact.phone_label")}</Label>
                                        <Input
                                            id="cf-phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData("phone", e.target.value)}
                                            placeholder={t("contact.phone_placeholder")}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="cf-company">{t("contact.company")}</Label>
                                        <Input
                                            id="cf-company"
                                            value={data.company}
                                            onChange={(e) => setData("company", e.target.value)}
                                            placeholder={t("contact.company_placeholder")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="cf-message">{t("contact.message")} *</Label>
                                    <Textarea
                                        id="cf-message"
                                        required
                                        value={data.message}
                                        onChange={(e) => setData("message", e.target.value)}
                                        placeholder={t("contact.message_placeholder")}
                                        rows={5}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-destructive mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    disabled={processing}
                                >
                                    {processing ? "…" : t("contact.send")}
                                    {!processing && <ArrowIcon className="ms-2 h-4 w-4" />}
                                </Button>
                            </form>
                        </div>

                        {/* Sidebar (2/5 on desktop) */}
                        <div className="lg:col-span-2 space-y-5">

                            {/* Why us — deep teal card */}
                            <div
                                ref={addRef}
                                className="fade-up delay-1 hex-deep-card p-7"
                            >
                                <div className="eyebrow-hex eyebrow-hex--accent mb-3">
                                    <span>{t("contact.why_title")}</span>
                                </div>
                                <ul className="space-y-3 text-sm text-white/85">
                                    {whyKeys.map((key) => (
                                        <li key={key} className="flex items-start gap-2.5">
                                            <span
                                                aria-hidden="true"
                                                className="mt-1.5 inline-block flex-shrink-0"
                                                style={{
                                                    width: 9,
                                                    height: 10,
                                                    background: "hsl(var(--accent))",
                                                    clipPath:
                                                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                                }}
                                            />
                                            {t(key)}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/products"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--accent))] hover:underline underline-offset-4"
                                >
                                    {t("contact.view_products")}
                                    <ArrowIcon className="h-3.5 w-3.5" />
                                </Link>
                            </div>

                            {/* Response time card */}
                            <div
                                ref={addRef}
                                className="fade-up delay-2 bg-card border border-border rounded-2xl p-6 relative overflow-hidden"
                            >
                                {/* subtle hex accent in corner */}
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-4 -end-4 opacity-10"
                                    style={{
                                        width: 80,
                                        height: 92,
                                        background: "hsl(var(--primary))",
                                        clipPath:
                                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                    }}
                                />
                                <div className="flex items-start gap-4 relative">
                                    <div className="hex-icon hex-icon--sm">
                                        <Clock strokeWidth={2.4} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                                            {t("contact.response_label")}
                                        </p>
                                        <p className="text-3xl font-extrabold text-foreground mt-1 leading-none">
                                            24h
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                            {t("contact.response_desc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick "browse range" link, ties back to honeycomb world */}
                            <Link
                                href="/products"
                                ref={addRef}
                                className="fade-up delay-3 group block bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="inline-block flex-shrink-0"
                                        style={{
                                            width: 26,
                                            height: 30,
                                            background: "hsl(var(--accent))",
                                            clipPath:
                                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                                        }}
                                    />
                                    <span className="text-sm font-semibold text-foreground flex-1">
                                        {t("contact.view_products")}
                                    </span>
                                    <ArrowIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </GuestLayout>
    );
};

export default Contact;
