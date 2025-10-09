import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
        <h1>Hello World!</h1>
        </AuthenticatedLayout>
    );
}
