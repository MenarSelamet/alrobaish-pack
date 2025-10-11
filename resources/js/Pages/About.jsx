const About = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-foreground mb-6">
                            About EcoBag Co.
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Leading the way in sustainable packaging solutions
                            since 2009
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
                                high-quality, sustainable packaging alternatives
                                that don't compromise on quality or aesthetics.
                            </p>
                            <p>
                                What began as a small workshop with just three
                                employees has grown into a thriving company
                                serving over 10,000 businesses worldwide. Our
                                commitment to sustainability and excellence has
                                remained unchanged throughout our journey.
                            </p>
                            <p>
                                Today, we produce millions of custom paper bags
                                annually, each one crafted with care and made
                                from 100% recyclable materials. We're proud to
                                be part of the solution to reducing plastic
                                waste while helping businesses present their
                                products beautifully.
                            </p>
                            <p>
                                Our team of dedicated professionals works
                                tirelessly to ensure every bag meets our high
                                standards of quality and sustainability. From
                                design to delivery, we're committed to providing
                                exceptional service and products that make a
                                positive impact on our planet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
