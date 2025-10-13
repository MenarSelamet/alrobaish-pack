import React from "react";
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
import { Button } from "../components/button";
import { useForm } from "@inertiajs/react";

const Contact = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/contact");
    }

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
                        {/* Contact Form */}
                        <Card className="max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Send us a message
                                </CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back
                                    to you shortly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <div>{errors.name}</div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <div>{errors.email}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company">
                                                Company
                                            </Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                value={data.company}
                                                onChange={(e) =>
                                                    setData(
                                                        "company",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Your Company"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Message *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Tell us about your project..."
                                            rows={6}
                                        />
                                        {errors.message && (
                                            <div>{errors.message}</div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Send Message
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
