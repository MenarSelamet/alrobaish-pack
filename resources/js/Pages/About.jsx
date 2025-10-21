import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../Components/accordion";
import GuestLayout from "../Layouts/GuestLayout";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();
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
                {/* Values Section */}
                <section className="py-16 bg-muted/30">
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
                            <Accordion
                                type="single"
                                collapsible
                                className="space-y-4"
                            >
                                <AccordionItem
                                    value="item-1"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq1_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq1_a")}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-2"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq2_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq2_a")}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-3"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq3_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq3_a")}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-4"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq4_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq4_a")}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-5"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq5_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq5_a")}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-6"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        {t("about.faq6_q")}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {t("about.faq6_a")}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default About;
