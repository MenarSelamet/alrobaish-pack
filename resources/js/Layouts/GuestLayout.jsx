import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import ThemeToggle from "../Components/ThemeToggle";
import Footer from "../Components/Footer";

export default function GuestLayout({ children }) {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-background/70 backdrop-blur-md border-b border-border/40 shadow-sm"
                    : "bg-transparent border-none"
            }`}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {t("nav.home")}
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {t("nav.about")}
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {t("nav.products")}
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {t("nav.contact")}
                        </Link>
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                    <Link href="/" className="flex items-center gap-2 group">
                        <img className="w-32" src="/images/logo.png"/>
                    </Link>
                </div>
            </div>

            <main>{children}</main>
            <Footer />
        </div>
    );
}
