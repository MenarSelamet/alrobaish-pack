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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../Components/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Products({ products, categories }) {
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState("all");

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        title: "",
        slug: "",
        category_id: "",
        description: "",
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            put(`/admin/dashboard/products/${editingProduct.id}`, data, {
                forceFormData: true,
                onSuccess: () => handleDialogClose(),
            });
        } else {
            post(`/admin/dashboard/products`, {
                forceFormData: true,
                onSuccess: () => handleDialogClose(),
            });
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setData({
            title: product.title || "",
            slug: product.slug || "",
            category_id: product.category_id || "",
            description: product.description || "",
            image_path: product.image_path || "",
        });
        setIsDialogOpen(true);
    };

    const handleViewProduct = (product) => {
        setViewingProduct(product);
        setIsViewDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(`/admin/dashboard/products/${id}`);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
        reset();
    };

    console.log(data);

    const filteredProducts =
        filterCategory === "all"
            ? products.data
            : products.data.filter((p) => p.category_id == filterCategory);

    return (
        <DashboardLayout>
            <div className="m-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        {t("dashboard.products")}
                    </h2>
                </div>

                {/* Filter + Add Product */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                    <div className="flex flex-col w-full sm:w-auto">
                        <Label className="mb-3" htmlFor="filter">
                            {t("dashboard.product_category")}
                        </Label>
                        <Select
                            value={filterCategory}
                            onValueChange={(value) => setFilterCategory(value)}
                        >
                            <SelectTrigger className="w-full sm:w-[250px]">
                                <SelectValue
                                    placeholder={t("dashboard.filter_all")}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    {t("dashboard.filter_all")}
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Create/Edit Product Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleDialogClose()}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t("dashboard.add_product")}
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add New Product"}
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">
                                        {t("dashboard.product_name")}
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="title">Slug</Label>

                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="category_id">
                                        {t("dashboard.product_category")}
                                    </Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) =>
                                            setData("category_id", value)
                                        }
                                    >
                                        <SelectTrigger id="category_id">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">
                                        {t("dashboard.product_description")}
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
                                    <Label htmlFor="images">
                                        {t("dashboard.product_images")}
                                    </Label>
                                    <Input
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData("images", e.target.files)
                                        }
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.image_path && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.image_path}
                                        </p>
                                    )}
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingProduct
                                        ? t("dashboard.edit_button")
                                        : t("dashboard.create")}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* View Product Dialog */}
                <Dialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                >
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {t("dashboard.view_product")}
                            </DialogTitle>
                        </DialogHeader>
                        {viewingProduct && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                        {t("dashboard.product_name")}
                                    </h3>
                                    <p className="text-lg font-semibold">
                                        {viewingProduct.title}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                        {t("dashboard.product_category")}
                                    </h3>
                                    <p>{viewingProduct.category?.name}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                        {t("dashboard.product_description")}
                                    </h3>
                                    <p className="text-sm">
                                        {viewingProduct.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                                        {t("dashboard.product_images")}
                                    </h3>
                                    {viewingProduct.images &&
                                    viewingProduct.images.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {viewingProduct.images.map(
                                                (img) => (
                                                    <img
                                                        key={img.id}
                                                        src={`/storage/${img.image_path}`}
                                                        alt={
                                                            viewingProduct.title
                                                        }
                                                        className="w-full h-48 object-cover rounded border"
                                                    />
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">
                                            {t("dashboard.no_image")}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        onClick={() => {
                                            setIsViewDialogOpen(false);
                                            handleEdit(viewingProduct);
                                        }}
                                        className="flex-1"
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        {t("dashboard.edit_button")}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(viewingProduct.id)
                                        }
                                        className="flex-1"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        {t("dashboard.delete_button")}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Product Table */}
                <div className="bg-card rounded-lg border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("dashboard.name")}</TableHead>
                                <TableHead>
                                    {t("dashboard.product_category")}
                                </TableHead>
                                <TableHead>
                                    {t("dashboard.product_description")}
                                </TableHead>
                                <TableHead>
                                    {t("dashboard.product_images")}
                                </TableHead>
                                <TableHead className="text-right">
                                    {t("dashboard.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow
                                    key={product.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleViewProduct(product)}
                                >
                                    <TableCell className="font-medium">
                                        {product.title}
                                    </TableCell>
                                    <TableCell>
                                        {product.category?.name}
                                    </TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>
                                        {product.images != 0 ? (
                                            <span>{product.images.length}</span>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">
                                                {t("dashboard.no_image")}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(product);
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(product.id);
                                            }}
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
