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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../Components/tabs";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Categories({ categories }) {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;
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
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        slug_en: "",
        slug_ar: "",
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
            name_en: category.name_en,
            name_ar: category.name_ar,
            description_en: category.description_en,
            description_ar: category.description_ar,
            slug_en: category.slug_en,
            slug_ar: category.slug_ar,
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
                                <Tabs
                                    defaultValue="english"
                                    className="space-y-4"
                                >
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="english">
                                            English
                                        </TabsTrigger>
                                        <TabsTrigger value="arabic">
                                            العربية
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent
                                        value="english"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <Label htmlFor="name_en">
                                                Category Name
                                            </Label>
                                            <Input
                                                id="name_en"
                                                value={data.name_en}
                                                onChange={(e) =>
                                                    setData(
                                                        "name_en",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name_en && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.name_en}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="slug_en">
                                                Slug
                                            </Label>
                                            <Input
                                                id="slug_en"
                                                value={data.slug_en}
                                                onChange={(e) =>
                                                    setData(
                                                        "slug_en",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.slug_en && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.slug_en}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="description_en">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description_en"
                                                value={data.description_en}
                                                onChange={(e) =>
                                                    setData(
                                                        "description_en",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.description_en && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.description_en}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="image_path">
                                                Image URL
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
                                    </TabsContent>
                                    <TabsContent
                                        value="arabic"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <Label htmlFor="name_ar">
                                                إسم الفئة
                                            </Label>
                                            <Input
                                                id="name_ar"
                                                value={data.name_ar}
                                                onChange={(e) =>
                                                    setData(
                                                        "name_ar",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name_ar && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.name_ar}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="slug_ar">
                                                الرابط المختصر
                                            </Label>
                                            <Input
                                                id="slug_ar"
                                                value={data.slug_ar}
                                                onChange={(e) =>
                                                    setData(
                                                        "slug_ar",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.slug_ar && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.slug_ar}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="description_ar">
                                                وصف الفئة
                                            </Label>
                                            <Textarea
                                                id="description_ar"
                                                value={data.description_ar}
                                                onChange={(e) =>
                                                    setData(
                                                        "description_ar",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.description_ar && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.description_ar}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="image_path">
                                                رابط الصورة
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
                                    </TabsContent>
                                </Tabs>

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
                                        {lang === "ar"
                                            ? category.name_ar
                                            : category.name_en}
                                    </TableCell>
                                    <TableCell>
                                        {lang === "ar"
                                            ? category.description_ar
                                            : category.description_en}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {category.products_count || 0}{" "}
                                                {t("dashboard.products")}
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
