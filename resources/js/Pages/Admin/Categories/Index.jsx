import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const Index = ({ categories }) => {
    return (
        <AuthenticatedLayout>
            <div className="m-6 p-6">
                {categories.map((category) => (
                    <div className="m-6" key={category.id}>
                        <ul>
                            <li>{category.id}</li>
                            <li className="bg-gray-200">{category.name}</li>
                            <li>{category.slug}</li>
                            <li>{category.description}</li>
                        </ul>
                        <div className="flex justify-between">
                            <button className="bg-blue-200 m-2 px-3 rounded-md">
                                <Link
                                    href={`/admin/dashboard/categories/${category.id}/edit`}
                                >
                                    Edit Category
                                </Link>
                            </button>
                            <button className="bg-red-200 m-2 px-3 rounded-md">
                                Delete Category
                            </button>
                        </div>
                    </div>
                ))}
                <button className="bg-green-200 m-2 px-3 rounded-md">
                    <Link href="/admin/dashboard/categories/create">
                        Create New Category
                    </Link>
                </button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
