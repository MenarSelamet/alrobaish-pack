import React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Mail, Phone, MapPin } from "lucide-react";

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
                {/* Contact Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Phone</CardTitle>
                                    <CardDescription>
                                        Mon-Fri from 8am to 6pm
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground font-medium">
                                        +1 (555) 123-4567
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Email</CardTitle>
                                    <CardDescription>
                                        We'll respond within 24 hours
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground font-medium">
                                        info@ecobag.com
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Office</CardTitle>
                                    <CardDescription>
                                        Visit our showroom
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground font-medium">
                                        123 Green Street, Eco City, EC 12345
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Contact;
