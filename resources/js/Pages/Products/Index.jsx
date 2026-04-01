import React, { useEffect, useRef } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { Button } from "../../Components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Products.css";

const Products = ({ categories }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.15 }
        );

        sectionsRef.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const isImageLeft = (index) => {
        const isEven = index % 2 === 0;
        return lang === "ar" ? !isEven : isEven;
    };

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

            {/* Showcase */}
            <div className="showcase-page">
                {categories.map((category, index) => {
                    const imageOnLeft = isImageLeft(index);
                    const name =
                        lang === "ar" ? category.name_ar : category.name_en;
                    const desc =
                        lang === "ar"
                            ? category.description_ar
                            : category.description_en;
                    const indexLabel = String(index + 1).padStart(2, "0");

                    return (
                        <React.Fragment key={category.id}>
                            <section
                                ref={(el) =>
                                    (sectionsRef.current[index] = el)
                                }
                                className={`showcase-section${index % 2 === 0 ? " showcase-section--tinted" : ""}`}
                            >
                                <div
                                    className={`showcase-row${imageOnLeft ? "" : " showcase-row--reversed"}`}
                                >
                                    {/* Image Half */}
                                    <div
                                        className={`showcase-image-half ${imageOnLeft ? "animate-slide-from-left" : "animate-slide-from-right"}`}
                                    >
                                        {category.image_path ? (
                                            <img
                                                src={`/storage/${category.image_path}`}
                                                alt={name}
                                                className="showcase-img"
                                            />
                                        ) : (
                                            <div className="showcase-img-fallback">
                                                <span>{name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Half */}
                                    <div className="showcase-content-half">
                                        <span
                                            className="showcase-index-number"
                                            aria-hidden="true"
                                        >
                                            {indexLabel}
                                        </span>
                                        <div className="showcase-text-body">
                                            <h2 className="showcase-title">
                                                {name}
                                            </h2>
                                            {desc && (
                                                <p className="showcase-desc">
                                                    {desc}
                                                </p>
                                            )}
                                            <Link
                                                href={`/products/category/${category.id}`}
                                            >
                                                <Button
                                                    size="lg"
                                                    className="showcase-cta"
                                                >
                                                    {t("products.view_details")}
                                                    {lang === "ar" ? (
                                                        <ArrowLeft className="ms-2 h-4 w-4" />
                                                    ) : (
                                                        <ArrowRight className="ms-2 h-4 w-4" />
                                                    )}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {index < categories.length - 1 && (
                                <div
                                    className="showcase-divider"
                                    aria-hidden="true"
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </GuestLayout>
    );
};

export default Products;
