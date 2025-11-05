import { Package, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-primary text-primary-foreground mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="h-6 w-6" />
                            <span className="text-xl font-bold">
                                EcoBag Co.
                            </span>
                        </div>
                        <p className="text-sm opacity-90">
                            {t("footer.tagline")}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">
                            {t("footer.quick_links")}
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <Link
                                to="/"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("nav.home")}
                            </Link>
                            <Link
                                to="/about"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("nav.about")}
                            </Link>
                            <Link
                                to="/products"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("nav.products")}
                            </Link>
                            <Link
                                to="/contact"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("nav.contact")}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">
                            {t("products.title")}
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <Link
                                to="/products/shopping"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("products.shopping_title")}
                            </Link>
                            <Link
                                to="/products/gift"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("products.gift_title")}
                            </Link>
                            <Link
                                to="/products/food"
                                className="opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {t("products.food_title")}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">
                            {t("contact.title")}
                        </h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 opacity-90">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-90">
                                <Mail className="h-4 w-4" />
                                <span>info@ecobag.com</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-90">
                                <MapPin className="h-4 w-4" />
                                <span>123 Green Street, Eco City</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
                    © {new Date().getFullYear()} {t("footer.rights_reserved")}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
