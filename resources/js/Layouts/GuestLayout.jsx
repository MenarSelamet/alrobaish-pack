import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import ThemeToggle from "../Components/ThemeToggle";
import Footer from "../Components/Footer";

export default function GuestLayout({ children }) {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/",         label: t("nav.home") },
        { href: "/about",    label: t("nav.about") },
        { href: "/products", label: t("nav.products") },
        { href: "/contact",  label: t("nav.contact") },
    ];

    return (
        <div>
            {/* Floating navbar */}
            <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4">
                <div className={`w-full max-w-6xl rounded-2xl border transition-all duration-300 ${
                    scrolled
                        ? "bg-background/80 backdrop-blur-md border-border/50 shadow-lg"
                        : "bg-background/70 backdrop-blur-md border-border/30 shadow-md"
                }`}>
                    {/* Top bar */}
                    <div className="flex items-center justify-between h-14 px-5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 shrink-0">
                            <img className="w-28" src="/images/logo.png" alt="Logo" />
                        </Link>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-sm font-medium px-4 py-1.5 rounded-xl transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
                                >
                                    {label}
                                </Link>
                            ))}
                            <div className="w-px h-4 bg-border/60 mx-1" />
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile: controls + hamburger */}
                        <div className="flex md:hidden items-center gap-1">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile dropdown */}
                    {menuOpen && (
                        <div className="md:hidden border-t border-border/40 px-4 py-3 flex flex-col gap-1">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm font-medium px-4 py-2.5 rounded-xl transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <main>{children}</main>
            <Footer />
        </div>
    );
}
