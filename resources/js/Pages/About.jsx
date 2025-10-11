import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../Components/accordion";
import GuestLayout from "../Layouts/GuestLayout";

const About = () => {
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                About EcoBag Co.
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Leading the way in sustainable packaging
                                solutions since 2009
                            </p>
                        </div>
                    </div>
                </section>
                {/* Story Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground mb-8">
                                Our Story
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground">
                                <p>
                                    Founded in 2009, EcoBag Co. started with a
                                    simple mission: to provide businesses with
                                    high-quality, sustainable packaging
                                    alternatives that don't compromise on
                                    quality or aesthetics.
                                </p>
                                <p>
                                    What began as a small workshop with just
                                    three employees has grown into a thriving
                                    company serving over 10,000 businesses
                                    worldwide. Our commitment to sustainability
                                    and excellence has remained unchanged
                                    throughout our journey.
                                </p>
                                <p>
                                    Today, we produce millions of custom paper
                                    bags annually, each one crafted with care
                                    and made from 100% recyclable materials.
                                    We're proud to be part of the solution to
                                    reducing plastic waste while helping
                                    businesses present their products
                                    beautifully.
                                </p>
                                <p>
                                    Our team of dedicated professionals works
                                    tirelessly to ensure every bag meets our
                                    high standards of quality and
                                    sustainability. From design to delivery,
                                    we're committed to providing exceptional
                                    service and products that make a positive
                                    impact on our planet.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Values Section */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                                Our Values
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        1
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Sustainability First
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Every decision we make prioritizes
                                        environmental responsibility and
                                        long-term sustainability.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        2
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Quality Excellence
                                    </h3>
                                    <p className="text-muted-foreground">
                                        We never compromise on quality, ensuring
                                        every product meets the highest
                                        standards.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        3
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Customer Focus
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Your success is our success. We work
                                        closely with each client to deliver
                                        perfect solutions.
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
                                Frequently Asked Questions
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
                                        What materials are your bags made from?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        All our bags are made from 100%
                                        recyclable kraft paper sourced from
                                        sustainably managed forests. We use
                                        eco-friendly inks and adhesives to
                                        ensure the entire product is
                                        environmentally responsible.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-2"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        What is the minimum order quantity?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Our minimum order quantity varies
                                        depending on the bag type and
                                        customization level. Generally, we
                                        require a minimum of 500 units for
                                        custom-printed bags and 100 units for
                                        standard designs. Contact us for
                                        specific details about your needs.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-3"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        How long does production take?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Standard orders typically take 2-3 weeks
                                        from approval of the design to delivery.
                                        Custom orders with special printing or
                                        unique specifications may take 3-4
                                        weeks. Rush orders are available for an
                                        additional fee.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-4"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        Can you print my logo on the bags?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Yes! We offer full custom printing
                                        services. You can add your logo, brand
                                        colors, and any design elements you'd
                                        like. We provide design assistance and
                                        will send you proofs for approval before
                                        production begins.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-5"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        Do you ship internationally?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Yes, we ship to most countries
                                        worldwide. Shipping costs and delivery
                                        times vary by location and order size.
                                        Contact us for a detailed shipping quote
                                        for your specific location.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value="item-6"
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        Are the bags strong enough for heavy
                                        items?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Absolutely! Our bags are designed for
                                        durability. We offer various thicknesses
                                        and reinforcement options depending on
                                        your needs. Our heavy-duty bags can
                                        safely carry up to 15 pounds, and we can
                                        customize the strength for your specific
                                        requirements.
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
