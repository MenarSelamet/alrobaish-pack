import { useEffect, useRef } from "react";
import GuestLayout from "../Layouts/GuestLayout";
import { Card, CardContent } from "../Components/card";
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Label } from "../Components/label";
import { Input } from "../Components/input";
import { Textarea } from "../Components/textarea";
import { Button } from "../Components/button";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Welcome.css";

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    const { data, setData, post, processing, wasSuccessful } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const scrollRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
            { threshold: 0.12 }
        );
        scrollRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const r = (i) => (el) => (scrollRefs.current[i] = el);

    function submit(e) {
        e.preventDefault();
        post("/contact");
    }

    const infoCards = [
        { icon: Phone,  title: t("contact.phone"),  desc: t("contact.phone_hours"),  value: t("contact.phone_number")  },
        { icon: Mail,   title: t("contact.email"),  desc: t("contact.email_desc"),   value: t("contact.email_address") },
        { icon: MapPin, title: t("contact.office"), desc: t("contact.office_desc"),  value: t("contact.office_address") },
    ];

    return (
        <GuestLayout>
            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-28 pb-16 bg-primary text-primary-foreground">
                {/* Decorative blobs */}
                <div className="absolute -top-20 -start-20 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 end-0 w-96 h-64 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-primary-foreground/15 px-3 py-1 rounded-full mb-5 home-fade-up is-visible">
                            {t("contact.title")}
                        </span>
                        <h1
                            className="text-4xl sm:text-5xl font-bold leading-tight mb-4 home-fade-up is-visible"
                            style={{ transitionDelay: "0.1s" }}
                        >
                            {t("contact.hero_heading") || t("contact.title")}
                        </h1>
                        <p
                            className="text-lg text-primary-foreground/80 home-fade-up is-visible"
                            style={{ transitionDelay: "0.2s" }}
                        >
                            {t("contact.subtitle")}
                        </p>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: 48 }}>
                        <path d="M0,32 C360,0 1080,64 1440,32 L1440,48 L0,48 Z" fill="hsl(var(--background))" />
                    </svg>
                </div>
            </section>

            {/* ── Info cards ── */}
            <section className="py-14">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
                        {infoCards.map(({ icon: Icon, title, desc, value }, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-start p-5 rounded-2xl border border-border bg-card home-fade-up"
                                ref={r(i)}
                                style={{ transitionDelay: `${i * 0.12}s` }}
                            >
                                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 home-icon-wrap">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">{title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 mb-1">{desc}</p>
                                    <p className="text-sm text-foreground font-medium">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Form + CTA side by side ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                        {/* Form */}
                        <div
                            className="lg:col-span-3 bg-card border border-border rounded-2xl p-7 sm:p-10 home-fade-up"
                            ref={r(3)}
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-1">{t("contact.form_title")}</h2>
                            <p className="text-sm text-muted-foreground mb-7">{t("contact.form_subtitle")}</p>

                            {wasSuccessful && (
                                <div className="mb-6 p-4 rounded-xl bg-primary/10 text-primary text-sm font-medium">
                                    {t("contact.success_message")}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>{t("contact.name")} *</Label>
                                        <Input value={data.name} onChange={e => setData("name", e.target.value)} required placeholder={t("contact.name_placeholder")} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>{t("contact.email_label")} *</Label>
                                        <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} required placeholder={t("contact.email_placeholder")} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>{t("contact.phone_label")}</Label>
                                        <Input type="tel" value={data.phone} onChange={e => setData("phone", e.target.value)} placeholder={t("contact.phone_placeholder")} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>{t("contact.company")}</Label>
                                        <Input value={data.company} onChange={e => setData("company", e.target.value)} placeholder={t("contact.company_placeholder")} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>{t("contact.message")} *</Label>
                                    <Textarea required value={data.message} onChange={e => setData("message", e.target.value)} placeholder={t("contact.message_placeholder")} rows={5} />
                                </div>
                                <Button type="submit" size="lg" className="w-full" disabled={processing}>
                                    {processing ? "..." : t("contact.send")}
                                </Button>
                            </form>
                        </div>

                        {/* Side panel */}
                        <div className="lg:col-span-2 space-y-5" ref={r(4)}>
                            {/* Why contact us */}
                            <div className="rounded-2xl bg-primary p-7 text-primary-foreground home-fade-up" style={{ transitionDelay: "0.15s" }}>
                                <h3 className="text-lg font-bold mb-3">{t("contact.why_title")}</h3>
                                <ul className="space-y-3 text-sm text-primary-foreground/85">
                                    {["contact.why_1", "contact.why_2", "contact.why_3"].map((key) => (
                                        <li key={key} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-foreground/60 flex-shrink-0" />
                                            {t(key)}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/products" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline-offset-2 hover:underline">
                                    {t("contact.view_products")}
                                    {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                                </Link>
                            </div>

                            {/* Response time card */}
                            <div className="rounded-2xl border border-border bg-card p-6 home-fade-up" style={{ transitionDelay: "0.25s" }}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{t("contact.response_label")}</p>
                                <p className="text-3xl font-bold text-foreground">24h</p>
                                <p className="text-sm text-muted-foreground mt-1">{t("contact.response_desc")}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Contact;
