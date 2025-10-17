import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";

const Edit = ({ category }) => {
    console.log(category);
    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div>
                    <div>{category.id}</div>
                    <h1> {category.name}</h1>
                    <div>{category.description}</div>
                    <div>{category.slug}</div>
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
};

export default Edit;
