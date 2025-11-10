import React from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/card";
import { Button } from "../../Components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, ShoppingBag, Gift, UtensilsCrossed } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "../../Components/sidebar";
import { useState } from "react";

const Products = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const [selectedCategory, setSelectedCategory] = useState("shopping");
    const categories = [
        {
            id: "shopping",
            title: t("products.shopping_title"),
            icon: ShoppingBag,
            products: [
                {
                    id: 1,
                    name: t("products.shopping_prod1"),
                    image: "",
                    price: "$12.99",
                },
                {
                    id: 2,
                    name: t("products.shopping_prod2"),
                    image: "",
                    price: "$15.99",
                },
                {
                    id: 3,
                    name: t("products.shopping_prod3"),
                    image: "",
                    price: "$18.99",
                },
                {
                    id: 4,
                    name: t("products.shopping_prod4"),
                    image: "",
                    price: "$22.99",
                },
                {
                    id: 5,
                    name: t("products.shopping_prod5"),
                    image: "",
                    price: "$25.99",
                },
                {
                    id: 6,
                    name: t("products.shopping_prod6"),
                    image: "",
                    price: "$28.99",
                },
            ],
        },
        {
            id: "gift",
            title: t("products.gift_title"),
            icon: Gift,
            products: [
                {
                    id: 7,
                    name: t("products.gift_prod1"),
                    image: "",
                    price: "$8.99",
                },
                {
                    id: 8,
                    name: t("products.gift_prod2"),
                    image: "",
                    price: "$12.99",
                },
                {
                    id: 9,
                    name: t("products.gift_prod3"),
                    image: "",
                    price: "$16.99",
                },
                {
                    id: 10,
                    name: t("products.gift_prod4"),
                    image: "",
                    price: "$20.99",
                },
                {
                    id: 11,
                    name: t("products.gift_prod5"),
                    image: "",
                    price: "$24.99",
                },
                {
                    id: 12,
                    name: t("products.gift_prod6"),
                    image: "",
                    price: "$28.99",
                },
            ],
        },
        {
            id: "food",
            title: t("products.food_title"),
            icon: UtensilsCrossed,
            products: [
                {
                    id: 13,
                    name: t("products.food_prod1"),
                    image: "",
                    price: "$10.99",
                },
                {
                    id: 14,
                    name: t("products.food_prod2"),
                    image: "",
                    price: "$14.99",
                },
                {
                    id: 15,
                    name: t("products.food_prod3"),
                    image: "",
                    price: "$18.99",
                },
                {
                    id: 16,
                    name: t("products.food_prod4"),
                    image: "",
                    price: "$22.99",
                },
                {
                    id: 17,
                    name: t("products.food_prod5"),
                    image: "",
                    price: "$26.99",
                },
                {
                    id: 18,
                    name: t("products.food_prod6"),
                    image: "",
                    price: "$30.99",
                },
            ],
        },
    ];

    const selectedCategoryData = categories.find(
        (cat) => cat.id === selectedCategory
    );

    return (
        <GuestLayout>
            <div className="min-h-screen">
                <div className="min-h-screen bg-background">
                    <SidebarProvider>
                        <div className="min-h-screen flex w-full bg-background">
                            {/* Main Content */}
                            <main className="flex-1 overflow-auto">
                                {/* Hero Section */}
                                <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
                                    <div className="container mx-auto px-4">
                                        <div className="max-w-3xl mx-auto text-center">
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {t("products.tagline")}
                                            </p>
                                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                                {t("products.title")}
                                            </h1>
                                            <p className="text-lg text-muted-foreground">
                                                {t("products.subtitle")}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex">
                                    {/* Sidebar */}
                                    <Sidebar className="border-r">
                                        <SidebarContent>
                                            <SidebarGroup>
                                                <SidebarGroupLabel className="text-lg font-semibold px-4 py-4">
                                                    {t("products.categories")}
                                                </SidebarGroupLabel>
                                                <SidebarGroupContent>
                                                    <SidebarMenu>
                                                        {categories.map(
                                                            (category) => (
                                                                <SidebarMenuItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                >
                                                                    <SidebarMenuButton
                                                                        onClick={() =>
                                                                            setSelectedCategory(
                                                                                category.id
                                                                            )
                                                                        }
                                                                        isActive={
                                                                            selectedCategory ===
                                                                            category.id
                                                                        }
                                                                        className="gap-3"
                                                                    >
                                                                        <category.icon className="h-5 w-5" />
                                                                        <span>
                                                                            {
                                                                                category.title
                                                                            }
                                                                        </span>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            )
                                                        )}
                                                    </SidebarMenu>
                                                </SidebarGroupContent>
                                            </SidebarGroup>
                                        </SidebarContent>
                                    </Sidebar>

                                    {/* Products Grid */}
                                    <div className="flex-1 overflow-auto">
                                        {selectedCategoryData && (
                                            <section className="py-12 md:py-16">
                                                <div className="container mx-auto px-4">
                                                    <div className="mb-8">
                                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                                            {
                                                                selectedCategoryData.title
                                                            }
                                                        </h2>
                                                        <p className="text-muted-foreground">
                                                            {
                                                                selectedCategoryData
                                                                    .products
                                                                    .length
                                                            }{" "}
                                                            {t(
                                                                "products.products_available"
                                                            )}
                                                        </p>
                                                    </div>

                                                    {/* Products Grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {selectedCategoryData.products.map(
                                                            (product) => (
                                                                <Card
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                                                >
                                                                    <div className="relative h-64 overflow-hidden">
                                                                        <img
                                                                            src={
                                                                                product.image
                                                                            }
                                                                            alt={
                                                                                product.name
                                                                            }
                                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                                    </div>
                                                                    <CardContent className="p-6">
                                                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </h3>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-2xl font-bold text-primary">
                                                                                {
                                                                                    product.price
                                                                                }
                                                                            </span>
                                                                            <Button size="sm">
                                                                                {t(
                                                                                    "products.view_details"
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <section className="py-16 md:py-20 bg-muted/30">
                                    <div className="container mx-auto px-4 text-center">
                                        <h2 className="text-3xl font-bold text-foreground mb-6">
                                            {t("products.cta_custom_title")}
                                        </h2>
                                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                            {t("products.cta_custom_subtitle")}
                                        </p>
                                        <Button size="lg">
                                            {t("products.cta_custom_button")}
                                        </Button>
                                    </div>
                                </section>
                            </main>
                        </div>
                    </SidebarProvider>

                    {/* Hero Section */}
                    {/* <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold text-foreground mb-6">
                                {t("products.title")}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t("products.subtitle")}
                            </p>
                        </div>
                    </div>
                </section> */}

                    {/* Products Grid */}
                    {/* <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <Card
                                    key={category.id}
                                    className="overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <div className="h-64 overflow-hidden">
                                        {category.image_path && (
                                            <img
                                                src={`/storage/${category.image_path}`}
                                                // alt={category.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {lang === "ar"
                                                ? category.name_ar
                                                : category.name_en}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {lang === "ar"
                                                ? category.description_ar
                                                : category.description_en}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link
                                            href={`/products/category/${category.id}`}
                                        >
                                            <Button className="w-full">
                                                {t("products.view_details")}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section> */}
                </div>
            </div>
        </GuestLayout>
    );
};

export default Products;
