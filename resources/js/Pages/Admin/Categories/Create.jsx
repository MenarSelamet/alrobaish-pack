import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        slug: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/admin/dashboard/categories", {
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Create New Category
                    </h1>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block font-medium mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="border rounded px-3 py-2 w-full"
                            />
                            {errors.name && (
                                <div className="text-red-500 mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block font-medium mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="border rounded px-3 py-2 w-full"
                            ></textarea>
                            {errors.description && (
                                <div className="text-red-500 mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="slug"
                                className="block font-medium mb-1"
                            >
                                Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                className="border rounded px-3 py-2 w-full"
                            />
                            {errors.name && (
                                <div className="text-red-500 mt-1">
                                    {errors.slug}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
};

export default Create;
