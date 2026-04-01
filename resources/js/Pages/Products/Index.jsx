import { useEffect, useRef, useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { Button } from "../../Components/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowLeft, Leaf, ShieldCheck, Printer, PackageCheck, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Products.css";

const Products = ({ categories, products }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const isRtl = lang === "ar";

    const [activeFilter, setActiveFilter] = useState("all");
    const carouselRef = useRef(null);
    const animRefs = useRef([]);

    // IntersectionObserver for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
            { threshold: 0.12 }
        );
        animRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const addRef = (el) => {
        if (el && !animRefs.current.includes(el)) animRefs.current.push(el);
    };

    const scrollCarousel = (dir) => {
        if (!carouselRef.current) return;
        const amount = 440;
        carouselRef.current.scrollBy({ left: isRtl ? -dir * amount : dir * amount, behavior: "smooth" });
    };

    const filteredCategories =
        activeFilter === "all"
            ? categories
            : categories.filter((c) => c.id === activeFilter);

    const cat0 = categories[0];
    const cat1 = categories[1];
    const cat2 = categories[2];

    const services = [
        { icon: Printer,      titleKey: "service1_title", descKey: "service1_desc", cat: categories[3] },
        { icon: PackageCheck, titleKey: "service2_title", descKey: "service2_desc", cat: categories[4] },
        { icon: Wrench,       titleKey: "service3_title", descKey: "service3_desc", cat: categories[5] },
    ];

    const name = (c) => c ? (isRtl ? c.name_ar : c.name_en) : "";

    return (
        <GuestLayout>
            {/* ── Hero ───────────────────────────────────── */}
            <section className="pt-28 pb-14 bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                        {t("products.tagline")}
                    </p>
                    <h1 className="text-5xl font-bold text-foreground mb-4 max-w-2xl mx-auto leading-tight">
                        {t("products.title")}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        {t("products.subtitle")}
                    </p>
                </div>
            </section>

            {/* ── Bento Feature Grid ─────────────────────── */}
            <div className="bento-grid">

                {/* Card 1 — large split: text + category image (span 2) */}
                <div className="bento-card bento-col-2 fade-up" ref={addRef}>
                    <div className="bento-split">
                        <div className="bento-split__text">
                            <span className="bento-label">{t("products.tagline")}</span>
                            <h2 className="bento-title bento-title--lg">{t("products.bento_heading")}</h2>
                            <p className="bento-desc">{t("products.bento_desc")}</p>
                            <div className="flex gap-2 flex-wrap mt-1">
                                <Link href="#discover">
                                    <Button size="sm">{t("products.bento_cta")}</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="sm" variant="outline">{t("products.cta_custom_button")}</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="bento-split__image">
                            {cat0?.image_path ? (
                                <img src={`/storage/${cat0.image_path}`} alt={name(cat0)} />
                            ) : (
                                <div className="bento-split__fallback">{name(cat0) || "—"}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Card 2 — USP text card */}
                <div className="bento-card fade-up delay-1" ref={addRef}>
                    <div className="bento-text">
                        <span className="bento-label">USP</span>
                        <h3 className="bento-title">{t("products.bento_usp_heading")}</h3>
                        <p className="bento-desc">{t("products.bento_usp_desc")}</p>
                        <Link href="/contact" className="mt-1">
                            <Button size="sm" variant="outline">{t("contact.title")}</Button>
                        </Link>
                    </div>
                </div>

                {/* Card 3 — wide image (span 2) */}
                <div className="bento-card bento-col-2 fade-up" ref={addRef}>
                    <div className="bento-image">
                        {cat1?.image_path ? (
                            <img src={`/storage/${cat1.image_path}`} alt={name(cat1)} />
                        ) : (
                            <div className="bento-image__fallback">{name(cat1) || "—"}</div>
                        )}
                    </div>
                </div>

                {/* Card 4 — stacked: text + image */}
                <div className="bento-card fade-up delay-1" ref={addRef}>
                    <div className="bento-stacked">
                        <div className="bento-stacked__text">
                            <h3 className="bento-title">{t("products.bento_quality_heading")}</h3>
                            <p className="bento-desc">{t("products.bento_quality_desc")}</p>
                        </div>
                        <div className="bento-stacked__image">
                            {cat2?.image_path ? (
                                <img src={`/storage/${cat2.image_path}`} alt={name(cat2)} />
                            ) : (
                                <div style={{ width: "100%", height: "100%", background: "hsl(var(--muted))" }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Card 5 — eco feature */}
                <div className="bento-card fade-up" ref={addRef}>
                    <div className="bento-feature">
                        <div className="bento-feature__icon"><Leaf size={20} /></div>
                        <h3 className="bento-title">{t("products.feature_eco_title")}</h3>
                        <p className="bento-desc">{t("products.feature_eco_desc")}</p>
                        <Link href="/about">
                            <Button size="sm" variant="ghost" className="px-0 text-primary">
                                {t("products.view_details")}
                                {isRtl ? <ArrowLeft className="ms-1 h-3 w-3" /> : <ArrowRight className="ms-1 h-3 w-3" />}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Card 6 — durability feature */}
                <div className="bento-card fade-up delay-1" ref={addRef}>
                    <div className="bento-feature">
                        <div className="bento-feature__icon"><ShieldCheck size={20} /></div>
                        <h3 className="bento-title">{t("products.feature_durable_title")}</h3>
                        <p className="bento-desc">{t("products.feature_durable_desc")}</p>
                        <Link href="/contact">
                            <Button size="sm" variant="ghost" className="px-0 text-primary">
                                {t("products.view_details")}
                                {isRtl ? <ArrowLeft className="ms-1 h-3 w-3" /> : <ArrowRight className="ms-1 h-3 w-3" />}
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>

            {/* ── Services Section ───────────────────────── */}
            <section className="services-section">
                <div className="services-section__header fade-up" ref={addRef}>
                    <h2 className="text-2xl font-bold text-foreground leading-snug mb-2">
                        {t("products.services_heading")}
                    </h2>
                    <p className="text-sm text-muted-foreground">{t("products.services_subtitle")}</p>
                </div>
                <div className="services-grid">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        return (
                            <div key={i} className={`service-card fade-up delay-${i}`} ref={addRef}>
                                <div className="service-card__image">
                                    {svc.cat?.image_path ? (
                                        <img src={`/storage/${svc.cat.image_path}`} alt={t(svc.titleKey)} />
                                    ) : (
                                        <div className="service-card__image-fallback">
                                            <Icon size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className="service-card__body">
                                    <h3 className="font-semibold text-foreground text-sm leading-snug">
                                        {t(svc.titleKey)}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {t(svc.descKey)}
                                    </p>
                                    <Link href="/contact" className="mt-1 block">
                                        <Button size="sm" variant="link" className="px-0 text-xs h-auto">
                                            {t("contact.title")}
                                            {isRtl ? <ArrowLeft className="ms-1 h-3 w-3" /> : <ArrowRight className="ms-1 h-3 w-3" />}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Products Carousel ──────────────────────── */}
            {products && products.length > 0 && (
                <section className="carousel-section">
                    <div className="carousel-header fade-up" ref={addRef}>
                        <h2 className="text-xl font-bold text-foreground">{t("products.carousel_heading")}</h2>
                        <Link href="#discover" className="text-sm text-primary font-medium hover:underline">
                            {t("products.carousel_see_all")}
                        </Link>
                    </div>
                    <div className="carousel-track-wrapper" ref={carouselRef}>
                        {products.map((product) => {
                            const pName = isRtl ? product.title_ar : product.title_en;
                            const catName = product.category ? (isRtl ? product.category.name_ar : product.category.name_en) : "";
                            return (
                                <Link
                                    key={product.id}
                                    href={`/products/category/${product.category_id}`}
                                    className="carousel-item"
                                >
                                    <div className="carousel-item__image">
                                        {product.image_path ? (
                                            <img src={`/storage/${product.image_path}`} alt={pName} />
                                        ) : (
                                            <div className="carousel-item__image-fallback">{pName}</div>
                                        )}
                                    </div>
                                    <div className="carousel-item__body">
                                        {catName && <p className="carousel-item__category">{catName}</p>}
                                        <p className="carousel-item__name">{pName}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="carousel-nav">
                        <button className="carousel-nav-btn" onClick={() => scrollCarousel(-1)} aria-label="Previous">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="carousel-nav-btn" onClick={() => scrollCarousel(1)} aria-label="Next">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </section>
            )}

            {/* ── Discover Categories ────────────────────── */}
            <section id="discover" className="discover-section">
                <div className="discover-header fade-up" ref={addRef}>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{t("products.discover_heading")}</h2>
                    <p className="text-sm text-muted-foreground">{t("products.discover_subtitle")}</p>
                </div>

                {/* Filter tabs */}
                <div className="discover-filters fade-up" ref={addRef}>
                    <button
                        className={`discover-filter-btn${activeFilter === "all" ? " active" : ""}`}
                        onClick={() => setActiveFilter("all")}
                    >
                        {t("products.discover_all")}
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            className={`discover-filter-btn${activeFilter === c.id ? " active" : ""}`}
                            onClick={() => setActiveFilter(c.id)}
                        >
                            {name(c)}
                        </button>
                    ))}
                </div>

                {/* Category grid */}
                <div className="discover-grid">
                    {filteredCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            className="discover-card"
                        >
                            {category.image_path ? (
                                <img src={`/storage/${category.image_path}`} alt={name(category)} />
                            ) : (
                                <div className="discover-card__fallback">{name(category)}</div>
                            )}
                            <div className="discover-card__label">{name(category)}</div>
                        </Link>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
};

export default Products;
