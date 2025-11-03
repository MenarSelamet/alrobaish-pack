import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, usePage } from "@inertiajs/react";
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
    const { flash } = usePage().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

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
        image_path: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(`/admin/dashboard/categories/${editingCategory.id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        } else {
            post(`/admin/dashboard/categories`, {
                forceFormData: true,
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
            image_path: category.image,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        setCategoryToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            destroy(`/admin/dashboard/categories/${categoryToDelete}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                },
            });
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
        reset();
    };

    console.log(categories);
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
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                                encType="multipart/form-data"
                            >
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
                                    <Label htmlFor="image_path">
                                        {t("dashboard.category_image")}
                                    </Label>
                                    <Input
                                        type="file"
                                        id="image_path"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                "image_path",
                                                e.target.files[0]
                                            )
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
                                <TableHead>
                                    {t("dashboard.products_in_category")}
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
                                        {category.image_path && (
                                            <img
                                                src={`/storage/${category.image_path}`}
                                                // alt={category.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {category.products_count || 0}{" "}
                                                products
                                            </span>
                                        </div>
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
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>
                            {t("dashboard.confirm_delete_title") ||
                                "Confirm Delete"}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        {t("dashboard.confirm_delete_message") ||
                            "Are you sure you want to delete this product? This action cannot be undone."}
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            {t("dashboard.cancel_button") || "Cancel"}
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            {t("dashboard.delete_category_button") || "Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
