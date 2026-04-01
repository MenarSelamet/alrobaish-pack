import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../Components/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "../components/carousel";
import Autoplay from "embla-carousel-autoplay";
import GuestLayout from "../Layouts/GuestLayout";
import { Building2, Store, ShoppingBag, Package } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = ({ faqs = [] }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                {t("about.title")}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t("about.subtitle")}
                            </p>
                        </div>
                    </div>
                </section>
                {/* Story Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground mb-8">
                                {t("about.story_title")}
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground">
                                <p>{t("about.story_p1")}</p>
                                <p>{t("about.story_p2")}</p>
                                <p>{t("about.story_p3")}</p>
                                <p>{t("about.story_p4")}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Partners Section */}
                <section className="bg-primary py-16 ">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl font-bold text-primary-foreground mb-12 text-center">
                                {t("about.partners_title")}
                            </h2>
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                plugins={[
                                    Autoplay({
                                        delay: 1000,
                                    }),
                                ]}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-4">
                                    {[
                                        {
                                            icon: Building2,
                                            name: "Corporate Partners",
                                        },
                                        { icon: Store, name: "Retail Chain" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        { icon: Store, name: "Retail Chain" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        { icon: Store, name: "Retail Chain" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        { icon: Store, name: "Retail Chain" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Fashion Brands",
                                        },
                                        { icon: Package, name: "E-commerce" },
                                        {
                                            icon: Building2,
                                            name: "Logistics Co",
                                        },
                                        { icon: Store, name: "Supermarkets" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Boutiques",
                                        },
                                        { icon: Store, name: "Supermarkets" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Boutiques",
                                        },
                                        { icon: Store, name: "Supermarkets" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Boutiques",
                                        },
                                        { icon: Store, name: "Supermarkets" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Boutiques",
                                        },
                                        { icon: Store, name: "Supermarkets" },
                                        {
                                            icon: ShoppingBag,
                                            name: "Boutiques",
                                        },
                                        { icon: Package, name: "Distribution" },
                                    ].map((partner, index) => {
                                        const Icon = partner.icon;
                                        return (
                                            <CarouselItem
                                                key={index}
                                                className=" pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                                            >
                                                <div className="flex items-center justify-center p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
                                                    <Icon className="h-12 w-12 text-primary" />
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </section>
                {/* Values Section */}
                <section className=" py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                                {t("about.values_title")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        1
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("about.value1_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("about.value1_text")}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        2
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("about.value2_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("about.value2_text")}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        3
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t("about.value3_title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("about.value3_text")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                                {t("about.faq_title")}
                            </h2>
                            {faqs.length === 0 ? (
                                <p className="text-center text-muted-foreground">
                                    {t("about.faq_empty")}
                                </p>
                            ) : (
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-4"
                                >
                                    {faqs.map((faq) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={String(faq.id)}
                                            className="border rounded-lg px-6"
                                        >
                                            <AccordionTrigger className="text-start hover:no-underline">
                                                {lang === "ar" ? faq.question_ar : faq.question_en}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground text-start">
                                                {lang === "ar" ? faq.answer_ar : faq.answer_en}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default About;
