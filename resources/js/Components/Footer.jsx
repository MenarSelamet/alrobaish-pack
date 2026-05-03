import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const HEX_CLIP =
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const Footer = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    const quickLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/about", label: t("nav.about") },
        { href: "/products", label: t("nav.products") },
        { href: "/contact", label: t("nav.contact") },
    ];

    const contactRows = [
        { Icon: Phone, text: "+1 (555) 123-4567" },
        { Icon: Mail, text: "info@ecobag.com" },
        { Icon: MapPin, text: "123 Green Street, Eco City" },
    ];

    const socialLinks = [
        { label: "Facebook", href: "#", Icon: FacebookIcon },
        { label: "Instagram", href: "#", Icon: InstagramIcon },
        { label: "WhatsApp", href: "#", Icon: WhatsAppIcon },
    ];

    const hexBulletStyle = {
        width: 8, height: 9,
        background: "hsl(var(--accent))",
        clipPath: HEX_CLIP,
    };
    const brandHexStyle = {
        width: 38, height: 44,
        background: "hsl(var(--accent))",
        clipPath: HEX_CLIP,
    };
    const contactIconStyle = {
        width: 24, height: 28,
        background: "hsl(var(--accent) / 0.15)",
        color: "hsl(var(--accent))",
        clipPath: HEX_CLIP,
    };
    const socialBtnStyle = {
        width: 38, height: 44,
        background: "hsl(0 0% 100% / 0.08)",
        clipPath: HEX_CLIP,
    };
    const dividerStyle = {
        background: "repeating-linear-gradient(90deg, hsl(var(--accent) / 0.3) 0 18px, transparent 18px 24px)",
    };

    return (
        <footer className="hex-hero mt-20 pt-16 pb-8 px-[6vw]">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="grid place-items-center text-[hsl(var(--accent-foreground))] font-extrabold text-base"
                                style={brandHexStyle}
                                aria-hidden="true"
                            >
                                A
                            </div>
                            <span className="text-lg font-extrabold leading-tight">
                                {isRtl ? "مصنع إبداعات دوما" : "Dooma Creativity Factory"}
                            </span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                            {t("footer.tagline")}
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <div className="eyebrow-hex eyebrow-hex--accent mb-4">
                            <span>{t("footer.quick_links")}</span>
                        </div>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {quickLinks.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="group inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                                    >
                                        <span aria-hidden="true" className="inline-block opacity-60 group-hover:opacity-100 transition-opacity" style={hexBulletStyle} />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <div className="eyebrow-hex eyebrow-hex--accent mb-4">
                            <span>{t("contact.title")}</span>
                        </div>
                        <ul className="flex flex-col gap-3 text-sm">
                            {contactRows.map((row, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <span className="grid place-items-center flex-shrink-0 mt-0.5" style={contactIconStyle} aria-hidden="true">
                                        <row.Icon className="h-3 w-3" strokeWidth={2.4} />
                                    </span>
                                    <span className="text-white/85 break-words">{row.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <div className="eyebrow-hex eyebrow-hex--accent mb-4">
                            <span>{t("footer.follow_us")}</span>
                        </div>
                        <p className="text-xs text-white/65 mb-4 leading-relaxed">
                            {t("footer.follow_us_desc")}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="grid place-items-center text-white/85 hover:text-[hsl(var(--accent-foreground))] transition-colors"
                                    style={socialBtnStyle}
                                >
                                    <s.Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 relative">
                    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px" style={dividerStyle} />
                    <p className="text-center text-xs text-white/65">
                        © {new Date().getFullYear()} {t("footer.rights_reserved")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
