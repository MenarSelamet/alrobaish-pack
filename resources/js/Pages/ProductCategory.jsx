import GuestLayout from "../Layouts/GuestLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";

const ProductCategory = () => {
    return (
        <GuestLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-primary hover:underline mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                            Products
                        </Link>
                        <h1 className="text-5xl font-bold text-foreground">
                            Product Categories
                        </h1>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default ProductCategory;
