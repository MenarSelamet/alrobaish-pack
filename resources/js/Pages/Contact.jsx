import { useEffect, useRef } from "react";
import GuestLayout from "../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    CardHeader,
} from "../components/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Label } from "../Components/label";
import { Input } from "../Components/input";
import { Textarea } from "../Components/textarea";
import { Button } from "../Components/button";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Welcome.css";

const Contact = () => {
    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

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

    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* ── Hero ──────────────────────────── */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1
                                className="text-5xl font-bold text-foreground mb-6 home-fade-up is-visible"
                                style={{ transitionDelay: "0.05s" }}
                            >
                                {t("contact.title")}
                            </h1>
                            <p
                                className="text-xl text-muted-foreground home-fade-up is-visible"
                                style={{ transitionDelay: "0.2s" }}
                            >
                                {t("contact.subtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Contact Section ───────────────── */}
                <section className="py-16">
                    <div className="container mx-auto px-4">

                        {/* Info cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {[
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
                            ].map(({ icon: Icon, title, desc, value }, i) => (
                                <Card
                                    key={i}
                                    className="home-card home-fade-up"
                                    ref={r(i)}
                                    style={{ transitionDelay: `${i * 0.12}s` }}
                                >
                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 home-icon-wrap">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>{title}</CardTitle>
                                        <CardDescription>{desc}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-foreground font-medium">{value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <Card
                            className="max-w-2xl mx-auto home-fade-up"
                            ref={r(3)}
                            style={{ transitionDelay: "0.1s" }}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    {t("contact.form_title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("contact.form_subtitle")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>{t("contact.name")} *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                required
                                                placeholder={t("contact.name_placeholder")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t("contact.email_label")} *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData("email", e.target.value)}
                                                required
                                                placeholder={t("contact.email_placeholder")}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>{t("contact.phone_label")}</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData("phone", e.target.value)}
                                                placeholder={t("contact.phone_placeholder")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company">{t("contact.company")}</Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                value={data.company}
                                                onChange={(e) => setData("company", e.target.value)}
                                                placeholder={t("contact.company_placeholder")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>{t("contact.message")} *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={data.message}
                                            onChange={(e) => setData("message", e.target.value)}
                                            placeholder={t("contact.message_placeholder")}
                                            rows={6}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full transition-transform duration-200 active:scale-95"
                                        disabled={processing}
                                    >
                                        {processing ? "..." : t("contact.send")}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Contact;
