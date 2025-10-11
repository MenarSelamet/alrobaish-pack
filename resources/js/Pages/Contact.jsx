import React from "react";
import GuestLayout from "../Layouts/GuestLayout";

const Contact = () => {
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                Contact Us
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Have questions? We'd love to hear from you. Send
                                us a message and we'll respond as soon as
                                possible.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Contact;
