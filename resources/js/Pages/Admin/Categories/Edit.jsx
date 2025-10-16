import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ category }) => {
    console.log(category);
    return (
        <AuthenticatedLayout>
            <div>
                <div>{category.id}</div>
                <h1> {category.name}</h1>
                <div>{category.description}</div>
                <div>{category.slug}</div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
