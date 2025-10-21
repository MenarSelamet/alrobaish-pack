import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import { Button } from "../../../Components/button";
import { Input } from "../../../Components/input";
import { Label } from "../../../Components/label";
import { Textarea } from "../../../Components/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../Components/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../Components/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Categories({ categories }) {
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        reset,
        errors,
        delete: destroy,
    } = useForm({
        name: "",
        description: "",
        slug: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(`/admin/dashboard/categories/${editingCategory.id}`, data, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        } else {
            post(`/admin/dashboard/categories`, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            description: category.description,
            slug: category.slug,
            image: category.image,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            destroy(`/admin/dashboard/categories/${id}`);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
        reset();
    };

    return (
        <DashboardLayout>
            <div className="m-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        {t("dashboard.categories")}
                    </h2>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleDialogClose()}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t("dashboard.add_category")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCategory
                                        ? t("dashboard.edit_category")
                                        : t("dashboard.add_new_category")}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">
                                        {t("dashboard.category_name")}
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="slug">
                                        {t("dashboard.slug")}
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="description">
                                        {t("dashboard.category_description")}
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="name">
                                        {t("dashboard.category_image")}
                                    </Label>
                                    <Input
                                        id="image"
                                        value={data.image}
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full">
                                    {editingCategory
                                        ? t("dashboard.update")
                                        : t("dashboard.create")}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-card rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("dashboard.image")}</TableHead>
                                <TableHead>{t("dashboard.name")}</TableHead>
                                <TableHead>
                                    {t("dashboard.description")}
                                </TableHead>
                                <TableHead className="text-right">
                                    {t("dashboard.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <img
                                            src={category.image}
                                            // alt={category.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}
