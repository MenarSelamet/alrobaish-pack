import { Link } from "@inertiajs/react";
import { Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import ThemeToggle from "../Components/ThemeToggle";
import Footer from "../Components/Footer";

export default function GuestLayout({ children }) {
    const { t } = useTranslation();
    return (
        <div>
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Package className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold text-foreground">
                            Alrobaish Pack
                        </span>
                    </Link>
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
                        <ThemeToggle/>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            <main>{children}</main>
            <Footer />
        </div>
    );
}
