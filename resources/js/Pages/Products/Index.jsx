import { useEffect, useRef } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { Button } from "../../Components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Products.css";

const Products = ({ categories }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
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
            </section>

            {/* Mosaic Grid */}
            <div className="mosaic-grid">
                {categories.map((category, index) => {
                    const isFeatured = index % 4 === 0;
                    const name = lang === "ar" ? category.name_ar : category.name_en;
                    const desc = lang === "ar" ? category.description_ar : category.description_en;
                    const indexLabel = String(index + 1).padStart(2, "0");
                    const staggerDelay = (index % 4) * 0.08;

                    return (
                        <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className={`mosaic-card ${isFeatured ? "mosaic-card--featured" : "mosaic-card--small"}`}
                            style={{ transitionDelay: `${staggerDelay}s` }}
                        >
                            {/* Image */}
                            {category.image_path ? (
                                <img
                                    src={`/storage/${category.image_path}`}
                                    alt={name}
                                    className="mosaic-img"
                                />
                            ) : (
                                <div className="mosaic-img-fallback">
                                    <span>{name}</span>
                                </div>
                            )}

                            {/* Index number (always visible) */}
                            <span className="mosaic-index" aria-hidden="true">
                                {indexLabel}
                            </span>

                            {/* Hover overlay */}
                            <div className="mosaic-overlay">
                                <h2 className="mosaic-name">{name}</h2>
                                {desc && (
                                    <p className="mosaic-desc">{desc}</p>
                                )}
                                <div className="mosaic-cta">
                                    <Button size="sm" variant="secondary">
                                        {t("products.view_details")}
                                        {lang === "ar" ? (
                                            <ArrowLeft className="ms-2 h-4 w-4" />
                                        ) : (
                                            <ArrowRight className="ms-2 h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </GuestLayout>
    );
};

export default Products;
