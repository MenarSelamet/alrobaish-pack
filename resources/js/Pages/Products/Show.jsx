import { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "../../Components/button";
import { useTranslation } from "react-i18next";

function ProductCard({ product, lang, t, isRtl }) {
    const [activeImage, setActiveImage] = useState(0);
    const images = product.images ?? [];

    const title       = lang === "ar" ? product.title_ar       : product.title_en;
    const description = lang === "ar" ? product.description_ar : product.description_en;
    const shortDesc   = lang === "ar" ? product.short_description_ar : product.short_description_en;
    const features    = lang === "ar" ? product.features_ar    : product.features_en;
    const catName     = product.category ? (lang === "ar" ? product.category.name_ar : product.category.name_en) : null;

    const featureList = Array.isArray(features)
        ? features
        : typeof features === "string"
            ? features.split("\n").filter(Boolean)
            : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Image gallery ── */}
            <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                    {images.length > 0 ? (
                        <>
                            <img
                                src={`/storage/${images[activeImage]?.image_path}`}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImage(i => i === 0 ? images.length - 1 : i - 1)}
                                        className="absolute start-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow transition-colors hover:bg-background"
                                    >
                                        {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                                    </button>
                                    <button
                                        onClick={() => setActiveImage(i => i === images.length - 1 ? 0 : i + 1)}
                                        className="absolute end-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow transition-colors hover:bg-background"
                                    >
                                        {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                                        {activeImage + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            {t("products.no_image")}
                        </div>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="flex gap-2 flex-wrap">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                                    activeImage === i ? "border-primary" : "border-transparent"
                                }`}
                            >
                                <img src={`/storage/${img.image_path}`} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Info ── */}
            <div className="space-y-6">
                {catName && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                        <Tag className="h-3 w-3" />
                        {catName}
                    </span>
                )}

                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    {title}
                </h2>

                {shortDesc && (
                    <p className="text-base text-muted-foreground leading-relaxed border-s-4 border-primary/30 ps-4">
                        {shortDesc}
                    </p>
                )}

                {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}

                {featureList.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-3">
                            {t("products.key_features")}
                        </h3>
                        <ul className="space-y-2">
                            {featureList.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    {f.trim()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="pt-2">
                    <Link href="/contact">
                        <Button className="w-full sm:w-auto" size="lg">
                            {t("products.request_button")}
                            {isRtl
                                ? <ArrowLeft className="ms-2 h-4 w-4" />
                                : <ArrowRight className="ms-2 h-4 w-4" />}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const ProductCategory = ({ category, products }) => {
    const { t, i18n } = useTranslation();
    const lang  = i18n.language;
    const isRtl = lang === "ar";

    const catName = lang === "ar" ? category.name_ar : category.name_en;

    return (
        <GuestLayout>
            {/* ── Hero ── */}
            <section className="pt-28 pb-10 bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto px-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-6"
                    >
                        {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                        {t("products.back_to_categories")}
                    </Link>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        {catName}
                    </h1>
                    <p className="mt-2 text-muted-foreground text-sm">
                        {products.length} {t("products.products_count")}
                    </p>
                </div>
            </section>

            {/* ── Products ── */}
            <div className="container mx-auto px-4 pb-20">
                {products.length === 0 ? (
                    <div className="text-center py-24 text-muted-foreground">
                        {t("products.no_products")}
                    </div>
                ) : (
                    <div className="space-y-20">
                        {products.map((product, idx) => (
                            <div key={product.id}>
                                {idx > 0 && <div className="border-t border-border mb-20" />}
                                <ProductCard
                                    product={product}
                                    lang={lang}
                                    isRtl={isRtl}
                                    t={t}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </GuestLayout>
    );
};

export default ProductCategory;
