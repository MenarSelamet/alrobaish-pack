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
        </div>
    );
};

export default About;
