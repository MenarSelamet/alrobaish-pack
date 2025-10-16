import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <h1>Hello World!</h1>
            <Link href="/admin/dashboard/categories">Categories</Link>
        </AuthenticatedLayout>
    );
}
