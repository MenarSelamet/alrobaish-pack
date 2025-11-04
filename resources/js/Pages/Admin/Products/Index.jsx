import React, { useState, useRef } from "react";
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../Components/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../Components/select";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Products({ products, categories }) {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // --- STATE ---
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState("all");
    const [imagePreviews, setImagePreviews] = useState([]);
    const fileInputRef = useRef(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        title_en: "",
        title_ar: "",
        slug_en: "",
        slug_ar: "",
        category_id: "",
        description_en: "",
        description_ar: "",
        images: [],
    });

    // --- FORM HANDLERS ---
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
            title_en: product.title_en || "",
            title_ar: product.title_ar || "",
            slug_en: product.slug_en || "",
            slug_ar: product.slug_ar || "",
            category_id: product.category_id || "",
            description_en: product.description_en || "",
            description_ar: product.description_ar || "",
            images: [],
        });

        if (product.images && product.images.length > 0) {
            const previews = product.images.map((img) => ({
                url: `/storage/${img.image_path}`,
                name: img.image_path,
                isExisting: true,
            }));
            setImagePreviews(previews);
        } else {
            setImagePreviews([]);
        }
        setIsDialogOpen(true);
    };

    const handleViewProduct = (product) => {
        setViewingProduct(product);
        setIsViewDialogOpen(true);
    };

    // --- DELETE HANDLERS ---
    const handleDelete = (id) => {
        setProductToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            destroy(`/admin/dashboard/products/${productToDelete}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setProductToDelete(null);
                },
            });
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
        setImagePreviews([]);
        reset();
    };

    // --- IMAGE HANDLERS ---
    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newPreviews = files.map((file) => ({
                url: URL.createObjectURL(file),
                name: file.name,
                file: file,
                isExisting: false,
            }));
            setImagePreviews((prev) => [...prev, ...newPreviews]);

            const currentFiles = data.images ? Array.from(data.images) : [];
            const updatedFiles = [...currentFiles, ...files];

            const dataTransfer = new DataTransfer();
            updatedFiles.forEach((file) => dataTransfer.items.add(file));

            setData("images", dataTransfer.files);
        }
    };

    const handleRemoveImage = (index) => {
        const previewToRemove = imagePreviews[index];
        if (!previewToRemove.isExisting) {
            URL.revokeObjectURL(previewToRemove.url);
        }
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);

        if (updatedPreviews.length === 0) {
            setData("images", []);
        } else {
            const dataTransfer = new DataTransfer();
            updatedPreviews
                .filter((preview) => !preview.isExisting)
                .forEach((preview) => dataTransfer.items.add(preview.file));

            setData("images", dataTransfer.files);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

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

                {/* FILTER + ADD PRODUCT */}
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
                                            <Label htmlFor="title_en">
                                                {t("dashboard.product_name")}
                                            </Label>
                                            <Input
                                                id="title_en"
                                                value={data.title_en}
                                                onChange={(e) =>
                                                    setData(
                                                        "title_en",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.title_en && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.title_en}
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
                                            <Label htmlFor="category_id">
                                                {t(
                                                    "dashboard.product_category"
                                                )}
                                            </Label>
                                            <Select
                                                value={data.category_id}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "category_id",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger id="category_id">
                                                    <SelectValue>
                                                        {data.category_id
                                                            ? categories.find(
                                                                  (cat) =>
                                                                      cat.id ==
                                                                      data.category_id
                                                              )?.name
                                                            : "Select category"}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {
                                                                    category.name_en
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="description_en">
                                                {t(
                                                    "dashboard.product_description"
                                                )}
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
                                    </TabsContent>
                                    <TabsContent
                                        value="arabic"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <Label htmlFor="title_ar">
                                                {t("dashboard.product_name")}
                                            </Label>
                                            <Input
                                                id="title_ar"
                                                value={data.title_ar}
                                                onChange={(e) =>
                                                    setData(
                                                        "title_ar",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.title_ar && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.title_ar}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="slug_ar">
                                                Slug
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
                                            <Label htmlFor="category_id">
                                                {t(
                                                    "dashboard.product_category"
                                                )}
                                            </Label>
                                            <Select
                                                value={data.category_id}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "category_id",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger id="category_id">
                                                    <SelectValue>
                                                        {data.category_id
                                                            ? categories.find(
                                                                  (cat) =>
                                                                      cat.id ==
                                                                      data.category_id
                                                              )?.name
                                                            : "Select category"}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {
                                                                    category.name_ar
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="description_ar">
                                                {t(
                                                    "dashboard.product_description"
                                                )}
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
                                    </TabsContent>
                                </Tabs>

                                {/* IMAGE UPLOAD */}
                                <div>
                                    <Label htmlFor="images">
                                        {t("dashboard.product_images")}
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="file"
                                            id="images"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            multiple
                                            onChange={handleAddImages}
                                            className="hidden"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Select images..."
                                            value={
                                                imagePreviews.length > 0
                                                    ? `${imagePreviews.length} image(s) selected`
                                                    : ""
                                            }
                                            readOnly
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={triggerFileInput}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {errors.images && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.images}
                                        </p>
                                    )}

                                    {imagePreviews.length > 0 && (
                                        <div className="mt-4">
                                            <Label className="text-sm font-medium mb-2 block">
                                                Image Previews:
                                            </Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {imagePreviews.map(
                                                    (preview, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative group"
                                                        >
                                                            <img
                                                                src={
                                                                    preview.url
                                                                }
                                                                alt={`Preview ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-24 object-cover rounded border"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveImage(
                                                                        index
                                                                    )
                                                                }
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                            <div className="text-xs text-center mt-1 truncate">
                                                                {preview.name}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
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

                {/* VIEW PRODUCT DIALOG */}
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

                {/* PRODUCT TABLE */}
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
                                        {lang === "ar"
                                            ? product.title_ar
                                            : product.title_en}
                                    </TableCell>
                                    <TableCell>
                                        {lang === "ar"
                                            ? product.category?.name_ar
                                            : product.category?.name_en}
                                    </TableCell>
                                    <TableCell>
                                        {lang === "ar"
                                            ? product.description_ar
                                            : product.description_en}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {product.images?.length > 0 ? (
                                                    <span>
                                                        {product.images.length}{" "}
                                                        Images
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">
                                                        {t(
                                                            "dashboard.no_image"
                                                        )}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
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

            {/* CONFIRM DELETE DIALOG */}
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
                            {t("dashboard.delete_button") || "Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
