import GuestLayout from "../../Layouts/GuestLayout";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "../../components/card";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductCategory = ({ category, products }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === products[0]?.images?.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? products[0]?.images?.length - 1 : prev - 1
        );
    };

    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-primary hover:underline mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />{" "}
                            {t("products.back_to_categories")}
                        </Link>
                        <h1 className="text-5xl font-bold text-foreground">
                            {t("products.products_in_category")}:
                            {lang === "ar"
                                ? category.name_ar
                                : category.name_en}
                        </h1>
                    </div>
                </section>

                {/* Product Details */}
                {products.map((product) => (
                    <section key={product.id} className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                                {/* Images Section */}
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                                        {product.images &&
                                        product.images.length > 0 ? (
                                            <>
                                                <img
                                                    src={`/storage/${product.images[selectedImageIndex]?.image_path}`}
                                                    alt={product.title}
                                                    className="w-full h-96 object-cover rounded-lg"
                                                />

                                                {/* Navigation Arrows */}
                                                {product.images.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={prevImage}
                                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                                                        >
                                                            <ChevronLeft className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={nextImage}
                                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                                                        >
                                                            <ChevronRight className="h-5 w-5" />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Image Counter */}
                                                {product.images.length > 1 && (
                                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                        {selectedImageIndex + 1}{" "}
                                                        /{" "}
                                                        {product.images.length}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-500">
                                                    No Image Available
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {product.images &&
                                        product.images.length > 1 && (
                                            <div className="grid grid-cols-4 gap-2">
                                                {product.images.map(
                                                    (image, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                setSelectedImageIndex(
                                                                    index
                                                                )
                                                            }
                                                            className={`relative rounded-md overflow-hidden border-2 ${
                                                                selectedImageIndex ===
                                                                index
                                                                    ? "border-primary"
                                                                    : "border-transparent"
                                                            }`}
                                                        >
                                                            <img
                                                                src={`/storage/${image.image_path}`}
                                                                alt={`${
                                                                    product.title
                                                                } ${index + 1}`}
                                                                className="w-full h-20 object-cover"
                                                            />
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>

                                {/* Product Information Section */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-foreground mb-4">
                                            {lang === "ar"
                                                ? product.title_ar
                                                : product.title_en}
                                        </h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {lang === "ar"
                                                ? product.description_ar
                                                : product.description_en}
                                        </p>
                                    </div>

                                    {/* Key Features */}
                                    {product.features && (
                                        <div className="bg-primary/5 rounded-lg p-6">
                                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                                Key Features
                                            </h3>
                                            <div className="space-y-3">
                                                {product.features
                                                    .split("\n")
                                                    .map((feature, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start"
                                                        >
                                                            <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                                            <span className="text-muted-foreground">
                                                                {feature.trim()}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Product Specifications */}
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="text-2xl font-bold text-foreground mb-6">
                                                {t(
                                                    "products.product_specifications"
                                                )}
                                            </h3>
                                            <div className="space-y-4">
                                                {product.short_description && (
                                                    <div className="flex items-start">
                                                        <span className="h-2 w-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                                                        <div>
                                                            <span className="font-medium text-foreground">
                                                                {t(
                                                                    "products.product_description"
                                                                )}
                                                                :{" "}
                                                            </span>
                                                            <span className="text-muted-foreground">
                                                                {lang === "ar"
                                                                    ? product.description_ar
                                                                    : product.description_en}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {product.category && (
                                                    <div className="flex items-start">
                                                        <span className="h-2 w-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                                                        <div>
                                                            <span className="font-medium text-foreground">
                                                                {t(
                                                                    "products.category"
                                                                )}
                                                                :{" "}
                                                            </span>
                                                            <span className="text-muted-foreground">
                                                                {lang === "ar"
                                                                    ? product
                                                                          .category
                                                                          .name_ar
                                                                    : product
                                                                          .category
                                                                          .name_en}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {product.slug && (
                                                    <div className="flex items-start">
                                                        <span className="h-2 w-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                                                        <div>
                                                            <span className="font-medium text-foreground">
                                                                Product Code:{" "}
                                                            </span>
                                                            <span className="text-muted-foreground">
                                                                {lang === "ar"
                                                                    ? product.slug_ar
                                                                    : product.slug_en}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Call to Action */}
                                    <div className="pt-4">
                                        <Link href="/contact">
                                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                                {t("products.request_button")}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </GuestLayout>
    );
};

export default ProductCategory;
