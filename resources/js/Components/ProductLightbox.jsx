import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./dialog";
import { Button } from "./button";

/**
 * Click-to-open product lightbox.
 *
 * Props:
 *   open          — boolean
 *   onOpenChange  — (open: boolean) => void
 *   products      — array of products in the active category
 *   index         — current index inside `products`
 *   onIndexChange — (newIndex: number) => void
 *   category      — the active category object (for the eyebrow line)
 */
export default function ProductLightbox({
    open,
    onOpenChange,
    products,
    index,
    onIndexChange,
    category,
}) {
    const { t, i18n } = useTranslation();
    const lang  = i18n.language;
    const isRtl = lang === "ar";

    const product = products?.[index];

    const goPrev = () => {
        if (!products?.length) return;
        onIndexChange((index - 1 + products.length) % products.length);
    };
    const goNext = () => {
        if (!products?.length) return;
        onIndexChange((index + 1) % products.length);
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "ArrowRight") isRtl ? goPrev() : goNext();
            if (e.key === "ArrowLeft")  isRtl ? goNext() : goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, index, products?.length, isRtl]);

    if (!product) return null;

    const title       = isRtl ? product.title_ar       : product.title_en;
    const description = isRtl ? product.description_ar : product.description_en;
    const shortDesc   = isRtl ? product.short_description_ar : product.short_description_en;
    const catName     = category ? (isRtl ? category.name_ar : category.name_en) : "";
    const catNumber   = category ? String(category.id).padStart(2, "0") : "";

    const eyebrowLabel = isRtl ? "الفئة" : "CATEGORY";

    const hasDesc = Boolean(description || shortDesc);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lightbox-content">
                {/* Hidden a11y title for Radix */}
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <DialogDescription className="sr-only">
                    {description || shortDesc || title}
                </DialogDescription>

                <div className="lightbox-grid">
                    {/* ─── Image side ─── */}
                    <div className="lightbox-image">
                        <div className="lightbox-image-decor" />
                        <img
                            src={product.image_path ? `/storage/${product.image_path}` : ""}
                            alt={title}
                        />
                        {products.length > 1 && (
                            <div className="lightbox-counter">
                                {index + 1} / {products.length}
                            </div>
                        )}
                    </div>

                    {/* ─── Body side ─── */}
                    <div className="p-8 sm:p-9 flex flex-col gap-4 overflow-y-auto">
                        {category && (
                            <div className="eyebrow-hex">
                                <span>
                                    {eyebrowLabel} {catNumber} · {catName}
                                </span>
                            </div>
                        )}

                        <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                            {title}
                        </h3>

                        {shortDesc && (
                            <p className="text-base text-muted-foreground leading-relaxed border-s-2 border-primary/30 ps-3">
                                {shortDesc}
                            </p>
                        )}

                        {description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        )}

                        {!hasDesc && (
                            <p className="text-sm italic text-muted-foreground">
                                {t("products.modal_no_specs")}
                            </p>
                        )}

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <Link href="/contact">
                                <Button>
                                    {t("products.modal_request_sample")}
                                    {isRtl
                                        ? <ArrowLeft  className="ms-2 h-4 w-4" />
                                        : <ArrowRight className="ms-2 h-4 w-4" />}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline">
                                    {t("products.modal_use_for_quote")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ─── Prev / Next nav ─── */}
                {products.length > 1 && (
                    <>
                        <button
                            className="lightbox-nav prev"
                            type="button"
                            onClick={goPrev}
                            aria-label={t("products.modal_prev")}
                        >
                            {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </button>
                        <button
                            className="lightbox-nav next"
                            type="button"
                            onClick={goNext}
                            aria-label={t("products.modal_next")}
                        >
                            {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
