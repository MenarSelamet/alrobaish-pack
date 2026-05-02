import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Mail, Globe, Clock } from "lucide-react";

import GuestLayout from "../../Layouts/GuestLayout";
import { Button } from "../../Components/button";
import ProductLightbox from "../../Components/ProductLightbox";
import "./products.css";

/* ── Diamond shape lookup for 1-9 featured categories ────────────────── */
const DIAMOND_SHAPES = {
    1: [[0]],
    2: [[0, 1]],
    3: [[0], [1, 2]],
    4: [[0], [1, 2], [3]],
    5: [[0, 1], [2, 3, 4]],
    6: [[0, 1], [2, 3, 4], [5]],
    7: [[0], [1, 2], [3, 4, 5], [6]],
    8: [[0], [1, 2], [3, 4, 5], [6, 7]],
    9: [[0], [1, 2], [3, 4, 5], [6, 7], [8]],
};

const FULLRANGE_PER_ROW = 5;

const Products = ({ featuredCategories = [], categories = [], products = [] }) => {
    const { t, i18n } = useTranslation();
    const lang  = i18n.language;
    const isRtl = lang === "ar";

    const name = (item) => (item ? (isRtl ? item.name_ar : item.name_en) : "");
    const desc = (item) => (item ? (isRtl ? item.description_ar : item.description_en) : "");

    /* ── Group products by category for the strip + lightbox ── */
    const productsByCategory = useMemo(() => {
        return products.reduce((map, p) => {
            (map[p.category_id] ||= []).push(p);
            return map;
        }, {});
    }, [products]);

    /* ── Selected category state ── */
    const initialId =
        featuredCategories[0]?.id ?? categories[0]?.id ?? null;
    const [activeId, setActiveId] = useState(initialId);
    const featuredRef = useRef(null);
    const userInteracted = useRef(false);

    const activeCategory = useMemo(
        () => categories.find((c) => c.id === activeId) || featuredCategories[0] || null,
        [activeId, categories, featuredCategories]
    );

    const activeProducts = activeCategory ? (productsByCategory[activeCategory.id] || []) : [];

    const selectCategory = (id) => {
        setActiveId(id);
        if (userInteracted.current && featuredRef.current) {
            featuredRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    /* ── Lightbox state ── */
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIdx, setLightboxIdx]   = useState(0);

    const openLightbox = (idx) => {
        setLightboxIdx(idx);
        setLightboxOpen(true);
    };

    /* ── Scroll-reveal animations ── */
    const animRefs = useRef([]);
    const addRef = (el) => {
        if (el && !animRefs.current.includes(el)) animRefs.current.push(el);
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
            { threshold: 0.12 }
        );
        animRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [featuredCategories.length, categories.length]);

    /* ── Track first user interaction so the initial render doesn't auto-scroll ── */
    useEffect(() => {
        const handler = () => { userInteracted.current = true; };
        window.addEventListener("click", handler, { once: true });
        return () => window.removeEventListener("click", handler);
    }, []);

    /* ── Diamond + full-range layouts ── */
    const featuredCount = Math.min(featuredCategories.length, 9);
    const diamondShape  = DIAMOND_SHAPES[featuredCount] || [];

    const fullRangeRows = useMemo(() => {
        const rows = [];
        for (let i = 0; i < categories.length; i += FULLRANGE_PER_ROW) {
            rows.push(categories.slice(i, i + FULLRANGE_PER_ROW));
        }
        return rows;
    }, [categories]);

    /* ── Helpers ── */
    const eyebrowCategory = isRtl ? "الفئة" : "CATEGORY";
    const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

    return (
        <GuestLayout>
            <div className="products-page bg-background text-foreground">

                {/* ───────────────────────── HERO ───────────────────────── */}
                <section className="products-hero">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="eyebrow-hex eyebrow-hex--accent mb-5">
                            <span>{t("products.hero_eyebrow")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5 max-w-3xl">
                            {t("products.hero_title_1")}{" "}
                            <span className="text-[hsl(var(--accent))]">
                                {t("products.hero_title_2")}
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg leading-relaxed max-w-xl text-white/75 mb-8">
                            {t("products.hero_subtitle")}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="#honeycomb">
                                <Button
                                    size="lg"
                                    className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground,30_30%_15%))] hover:bg-[hsl(var(--accent))]/90"
                                >
                                    {t("products.hero_cta_browse")}
                                    <ArrowIcon className="ms-2 h-4 w-4" />
                                </Button>
                            </a>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="bg-white/5 text-white border border-white/30 hover:bg-white/10 hover:text-white"
                                >
                                    {t("products.hero_cta_quote")}
                                </Button>
                            </Link>
                        </div>

                        {/* Stats strip */}
                        <div className="flex flex-wrap gap-x-9 gap-y-4 mt-12 text-sm text-white/70">
                            <div>
                                <strong className="block text-2xl font-bold text-white leading-none">
                                    {featuredCategories.length || categories.length || 9}
                                </strong>
                                {t("products.hero_stat_families")}
                            </div>
                            <div>
                                <strong className="block text-2xl font-bold text-white leading-none">500+</strong>
                                {t("products.hero_stat_moq")}
                            </div>
                            <div>
                                <strong className="block text-2xl font-bold text-white leading-none">2–3w</strong>
                                {t("products.hero_stat_lead")}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───────────────────── HONEYCOMB DIAMOND ───────────────────── */}
                <section id="honeycomb" className="py-20 sm:py-24 px-[6vw]">
                    <div
                        ref={addRef}
                        className="fade-up flex items-end justify-between gap-6 flex-wrap mb-12"
                    >
                        <div className="max-w-xl">
                            <div className="eyebrow-hex mb-2">
                                <span>{t("products.honeycomb_eyebrow")}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground">
                                {t("products.honeycomb_title")}
                            </h2>
                        </div>
                        <p className="max-w-sm text-sm text-muted-foreground">
                            {t("products.honeycomb_subtitle")}
                        </p>
                    </div>

                    {featuredCategories.length === 0 ? (
                        <div className="text-center text-muted-foreground py-16">
                            {t("products.no_products")}
                        </div>
                    ) : (
                        <div className="honeycomb">
                            {diamondShape.map((row, ri) => (
                                <div key={ri} className="hex-row">
                                    {row.map((idx) => {
                                        const cat = featuredCategories[idx];
                                        if (!cat) return null;
                                        const isActive = cat.id === activeId;
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => selectCategory(cat.id)}
                                                className={`hex${isActive ? " is-active" : ""}`}
                                                aria-label={name(cat)}
                                            >
                                                <div className="hex-inner">
                                                    {cat.image_path ? (
                                                        <img src={`/storage/${cat.image_path}`} alt="" />
                                                    ) : (
                                                        <div className="w-full h-full bg-muted" />
                                                    )}
                                                </div>
                                                <div className="hex-num">{String(cat.id).padStart(2, "0")}</div>
                                                <div className="hex-label">{name(cat)}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}

                    <p className="mt-9 text-center text-sm text-muted-foreground">
                        {t("products.honeycomb_hint")}
                    </p>
                </section>

                {/* ─────────────────── FEATURED CATEGORY PANEL ─────────────────── */}
                {activeCategory && (
                    <section
                        ref={featuredRef}
                        className="px-[6vw] pb-20 sm:pb-24 bg-gradient-to-b from-background to-muted/40"
                    >
                        <div ref={addRef} className="fade-up featured-card">
                            <div className="featured-banner">
                                <div className="featured-tag">
                                    <span>{eyebrowCategory} {String(activeCategory.id).padStart(2, "0")}</span>
                                </div>
                                {activeCategory.image_path ? (
                                    <img src={`/storage/${activeCategory.image_path}`} alt={name(activeCategory)} />
                                ) : (
                                    <div className="w-full h-full bg-muted" />
                                )}
                            </div>

                            <div className="p-8 sm:p-12 flex flex-col gap-7 relative">
                                <div>
                                    <div className="eyebrow-hex mb-3">
                                        <span>{t("products.featured_eyebrow")}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                                        {name(activeCategory)}
                                    </h3>
                                    {desc(activeCategory) && (
                                        <p className="mt-3 text-muted-foreground leading-relaxed">
                                            {desc(activeCategory)}
                                        </p>
                                    )}
                                </div>

                                {/* Strip */}
                                {activeProducts.length > 0 ? (
                                    <>
                                        <div className="featured-strip">
                                            {activeProducts.slice(0, 8).map((p, idx) => {
                                                const pName = isRtl ? p.title_ar : p.title_en;
                                                const hasDesc = Boolean(
                                                    (isRtl ? p.description_ar : p.description_en) ||
                                                    (isRtl ? p.short_description_ar : p.short_description_en)
                                                );
                                                return (
                                                    <button
                                                        key={p.id}
                                                        type="button"
                                                        onClick={() => openLightbox(idx)}
                                                        className={`featured-strip-item${hasDesc ? " has-desc" : ""}`}
                                                        aria-label={pName}
                                                    >
                                                        {p.image_path ? (
                                                            <img src={`/storage/${p.image_path}`} alt={pName} />
                                                        ) : (
                                                            <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">
                                                                {pName}
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="text-xs text-muted-foreground -mt-2">
                                            {t("products.featured_strip_hint")}
                                        </p>
                                    </>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                                        {t("products.featured_no_products")}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                                    <Link href={`/products/category/${activeCategory.id}`}>
                                        <Button size="lg">
                                            {t("products.featured_view_range")}
                                            <ArrowIcon className="ms-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button size="lg" variant="outline">
                                            {t("products.featured_request_sample")}
                                        </Button>
                                    </Link>
                                    <span className="ms-auto text-xs text-muted-foreground inline-flex items-center gap-1.5">
                                        <span aria-hidden="true">●</span>
                                        {activeProducts.length} {t("products.featured_sub_skus")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ─────────────────────── FULL RANGE ─────────────────────── */}
                {categories.length > 0 && (
                    <section className="px-[6vw] pb-24">
                        <div ref={addRef} className="fade-up flex items-end justify-between gap-6 flex-wrap mb-10">
                            <div className="max-w-xl">
                                <div className="eyebrow-hex mb-2">
                                    <span>{t("products.fullrange_eyebrow")}</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-foreground">
                                    {t("products.fullrange_title")}
                                </h2>
                            </div>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                {t("products.fullrange_subtitle")}
                            </p>
                        </div>

                        <div ref={addRef} className="fade-up fullrange-grid">
                            {fullRangeRows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className={`fullrange-row${ri % 2 === 1 ? " offset" : ""}`}
                                >
                                    {row.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => selectCategory(cat.id)}
                                            className={`mini-hex${cat.id === activeId ? " is-active" : ""}`}
                                            aria-label={name(cat)}
                                        >
                                            <div className="mini-hex-inner">
                                                {cat.image_path ? (
                                                    <img src={`/storage/${cat.image_path}`} alt="" />
                                                ) : (
                                                    <div className="w-full h-full bg-muted" />
                                                )}
                                            </div>
                                            <div className="mini-hex-label">{name(cat)}</div>
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ───────────────────────── USPs ───────────────────────── */}
                <section className="usps-section py-20 sm:py-24 px-[6vw]">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div ref={addRef} className="fade-up">
                            <div className="eyebrow-hex eyebrow-hex--accent mb-2">
                                <span>{t("products.usps_eyebrow")}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                                {t("products.usps_title")}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
                            {[1, 2, 3, 4].map((n) => (
                                <div
                                    key={n}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col gap-3"
                                >
                                    <div className="usp-icon">{n}</div>
                                    <h4 className="font-bold text-lg">{t(`products.usps_u${n}_title`)}</h4>
                                    <p className="text-sm text-white/65 leading-relaxed">
                                        {t(`products.usps_u${n}_desc`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── CTA ───────────────────────── */}
                <section className="py-24 px-[6vw] grid place-items-center">
                    <div ref={addRef} className="fade-up cta-card w-full max-w-5xl p-10 sm:p-14">
                        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-9 items-center relative z-10">
                            <div>
                                <div className="eyebrow-hex mb-3">
                                    <span>{t("products.cta_card_eyebrow")}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight mb-3">
                                    {t("products.cta_card_title")}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-5">
                                    {t("products.cta_card_subtitle")}
                                </p>
                                <Link href="/contact">
                                    <Button size="lg">
                                        {t("products.cta_card_button")}
                                        <ArrowIcon className="ms-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="rounded-2xl bg-[hsl(var(--primary-deep))] text-white p-7 flex flex-col gap-2">
                                <small className="text-[hsl(var(--accent))] tracking-widest uppercase text-xs font-bold">
                                    {t("products.cta_card_contact_label")}
                                </small>
                                <strong className="text-xl font-bold flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    sales@alrobaish-pack.com
                                </strong>
                                <a href="https://alrobaish-pack.com" className="text-sm text-white/80 inline-flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    alrobaish-pack.com
                                </a>
                                <span className="text-sm text-white/80 inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {t("contact.phone_hours")}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───────────────────────── Lightbox ───────────────────────── */}
                <ProductLightbox
                    open={lightboxOpen}
                    onOpenChange={setLightboxOpen}
                    products={activeProducts}
                    index={lightboxIdx}
                    onIndexChange={setLightboxIdx}
                    category={activeCategory}
                />
            </div>
        </GuestLayout>
    );
};

export default Products;
