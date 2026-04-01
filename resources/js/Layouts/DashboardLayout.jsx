import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Package, FolderTree, Users, HelpCircle } from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { useState } from "react";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../Components/ThemeToggle";

export default function DashboardLayout({ children }) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const { url } = usePage();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const tabs = [
        { title: t("dashboard.overview"),   href: "/admin/dashboard",            icon: LayoutDashboard },
        { title: t("dashboard.categories"), href: "/admin/dashboard/categories", icon: FolderTree },
        { title: t("dashboard.products"),   href: "/admin/dashboard/products",   icon: Package },
        { title: t("dashboard.users"),      href: "/admin/dashboard/users",      icon: Users },
        { title: t("dashboard.faqs"),       href: "/admin/dashboard/faqs",       icon: HelpCircle },
    ];

    const isActive = (href) =>
        href === "/admin/dashboard"
            ? url === "/admin/dashboard"
            : url.startsWith(href);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* ── Top navbar ─────────────────────────────── */}
            <nav className="border-b border-border bg-background sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <Link href="/admin/dashboard" className="text-lg font-semibold text-foreground">
                            {t("dashboard.management")}
                        </Link>

                        {/* Desktop right side */}
                        <div className="hidden sm:flex items-center gap-2">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-background px-3 py-2 text-sm font-medium leading-4 text-muted-foreground transition duration-150 ease-in-out hover:text-foreground focus:outline-none"
                                    >
                                        {user.name}
                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        {t("dashboard.profile")}
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("logout")} method="post" as="button">
                                        {t("dashboard.logout")}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setShowingNavigationDropdown((v) => !v)}
                            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Tab bar ──────────────────────────────── */}
                <div className="border-t border-border">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center gap-1 pt-2 relative">
                            {tabs.map((tab) => {
                                const active = isActive(tab.href);
                                const Icon = tab.icon;
                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={`
                                            relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap
                                            transition-colors duration-150 rounded-t-md
                                            ${active
                                                ? "bg-primary text-primary-foreground border border-primary border-b-background -mb-px z-10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                                            }
                                        `}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {tab.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden border-t border-border"}>
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        {tabs.map((tab) => (
                            <ResponsiveNavLink
                                key={tab.href}
                                href={tab.href}
                                active={isActive(tab.href)}
                            >
                                {tab.title}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                    <div className="border-t border-border pb-1 pt-4 px-4">
                        <div className="text-base font-medium text-foreground">{user.name}</div>
                        <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Page content ───────────────────────────── */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
