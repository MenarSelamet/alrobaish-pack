import { useState, useRef } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import { Button } from "../../../Components/button";
import { Input } from "../../../Components/input";
import { Label } from "../../../Components/label";
import { Textarea } from "../../../Components/textarea";
import Checkbox from "../../../Components/Checkbox";
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
import { Plus, Pencil, Trash2, X, Star, ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

/* Convert array → newline-joined textarea text (for editing) */
const arrayToText = (arr) => Array.isArray(arr) ? arr.join("\n") : (arr ?? "");

export default function Categories({ categories }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState("english");

    /* Image previews */
    const [imagePreview, setImagePreview]   = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]); // { url, isExisting, path?, file? }

    const imageInputRef   = useRef(null);
    const bannerInputRef  = useRef(null);
    const galleryInputRef = useRef(null);

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
        image_path: null,
        banner_path: null,
        gallery_files: [],
        is_featured: false,
        sizes_en: "",
        sizes_ar: "",
        materials_en: "",
        materials_ar: "",
        features_en: "",
        features_ar: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            forceFormData: true,
            onSuccess: () => handleDialogClose(),
            onError: (errs) => {
                const hasArabicError = errs.name_ar || errs.description_ar
                    || errs.sizes_ar || errs.materials_ar || errs.features_ar;
                const hasEnglishError = errs.name_en || errs.description_en
                    || errs.sizes_en || errs.materials_en || errs.features_en;
                if (hasArabicError && !hasEnglishError) setActiveTab("arabic");
                else setActiveTab("english");
            },
        };

        if (editingCategory) {
            // Inertia routes don't natively use PUT with multipart; spoof via _method.
            post(`/admin/dashboard/categories/${editingCategory.id}`, {
                ...options,
                forceFormData: true,
                data: { ...data, _method: "put" },
            });
        } else {
            post(`/admin/dashboard/categories`, options);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name_en: category.name_en || "",
            name_ar: category.name_ar || "",
            description_en: category.description_en || "",
            description_ar: category.description_ar || "",
            image_path: null,
            banner_path: null,
            gallery_files: [],
            is_featured: Boolean(category.is_featured),
            sizes_en: arrayToText(category.sizes_en),
            sizes_ar: arrayToText(category.sizes_ar),
            materials_en: arrayToText(category.materials_en),
            materials_ar: arrayToText(category.materials_ar),
            features_en: arrayToText(category.features_en),
            features_ar: arrayToText(category.features_ar),
        });

        setImagePreview(category.image_path
            ? { url: `/storage/${category.image_path}`, isExisting: true }
            : null);
        setBannerPreview(category.banner_path
            ? { url: `/storage/${category.banner_path}`, isExisting: true }
            : null);
        setGalleryPreviews(
            (category.gallery_paths || []).map((path) => ({
                url: `/storage/${path}`,
                isExisting: true,
                path,
            }))
        );

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
        if (imagePreview && !imagePreview.isExisting)   URL.revokeObjectURL(imagePreview.url);
        if (bannerPreview && !bannerPreview.isExisting) URL.revokeObjectURL(bannerPreview.url);
        galleryPreviews.forEach((p) => { if (!p.isExisting) URL.revokeObjectURL(p.url); });
        setImagePreview(null);
        setBannerPreview(null);
        setGalleryPreviews([]);
        setActiveTab("english");
        reset();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (imagePreview && !imagePreview.isExisting) URL.revokeObjectURL(imagePreview.url);
        setImagePreview({ url: URL.createObjectURL(file), name: file.name, isExisting: false });
        setData("image_path", file);
    };
    const handleRemoveImage = () => {
        if (imagePreview && !imagePreview.isExisting) URL.revokeObjectURL(imagePreview.url);
        setImagePreview(null);
        setData("image_path", null);
        if (imageInputRef.current) imageInputRef.current.value = "";
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (bannerPreview && !bannerPreview.isExisting) URL.revokeObjectURL(bannerPreview.url);
        setBannerPreview({ url: URL.createObjectURL(file), name: file.name, isExisting: false });
        setData("banner_path", file);
    };
    const handleRemoveBanner = () => {
        if (bannerPreview && !bannerPreview.isExisting) URL.revokeObjectURL(bannerPreview.url);
        setBannerPreview(null);
        setData("banner_path", null);
        if (bannerInputRef.current) bannerInputRef.current.value = "";
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const newPreviews = files.map((f) => ({
            url: URL.createObjectURL(f),
            name: f.name,
            isExisting: false,
            file: f,
        }));
        setGalleryPreviews([...galleryPreviews, ...newPreviews]);
        const allFiles = [...(data.gallery_files || []), ...files];
        setData("gallery_files", allFiles);
        if (galleryInputRef.current) galleryInputRef.current.value = "";
    };
    const handleRemoveGalleryItem = (idx) => {
        const item = galleryPreviews[idx];
        if (!item) return;
        if (!item.isExisting) URL.revokeObjectURL(item.url);
        const next = galleryPreviews.filter((_, i) => i !== idx);
        setGalleryPreviews(next);
        // also drop from gallery_files if a fresh file
        if (item.file) {
            setData("gallery_files", (data.gallery_files || []).filter((f) => f !== item.file));
        }
    };

    const renderSpecBlock = (langKey) => {
        const isArabic = langKey === "ar";
        const dirAttr = isArabic ? "rtl" : "ltr";
        return (
            <div className="space-y-3" dir={dirAttr}>
                <div>
                    <Label htmlFor={`sizes_${langKey}`}>{t("dashboard.sizes")}</Label>
                    <Textarea
                        id={`sizes_${langKey}`}
                        rows={3}
                        value={data[`sizes_${langKey}`]}
                        onChange={(e) => setData(`sizes_${langKey}`, e.target.value)}
                        placeholder={t("dashboard.spec_help")}
                    />
                </div>
                <div>
                    <Label htmlFor={`materials_${langKey}`}>{t("dashboard.materials")}</Label>
                    <Textarea
                        id={`materials_${langKey}`}
                        rows={3}
                        value={data[`materials_${langKey}`]}
                        onChange={(e) => setData(`materials_${langKey}`, e.target.value)}
                        placeholder={t("dashboard.spec_help")}
                    />
                </div>
                <div>
                    <Label htmlFor={`features_${langKey}`}>{t("dashboard.features_label")}</Label>
                    <Textarea
                        id={`features_${langKey}`}
                        rows={3}
                        value={data[`features_${langKey}`]}
                        onChange={(e) => setData(`features_${langKey}`, e.target.value)}
                        placeholder={t("dashboard.spec_help")}
                    />
                </div>
            </div>
        );
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
                        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCategory
                                        ? t("dashboard.edit_category")
                                        : t("dashboard.add_new_category")}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">

                                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="english" className="gap-2">
                                            English
                                            {(errors.name_en || errors.description_en
                                              || errors.sizes_en || errors.materials_en || errors.features_en) && (
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                                            )}
                                        </TabsTrigger>
                                        <TabsTrigger value="arabic" className="gap-2">
                                            العربية
                                            {(errors.name_ar || errors.description_ar
                                              || errors.sizes_ar || errors.materials_ar || errors.features_ar) && (
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                                            )}
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="english" className="space-y-4" dir="ltr">
                                        <div>
                                            <Label htmlFor="name_en">Category Name</Label>
                                            <Input id="name_en" value={data.name_en}
                                                onChange={(e) => setData("name_en", e.target.value)} />
                                            {errors.name_en && <p className="text-sm text-red-500 mt-1">{errors.name_en}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="description_en">Description</Label>
                                            <Textarea id="description_en" value={data.description_en}
                                                onChange={(e) => setData("description_en", e.target.value)} />
                                        </div>
                                        <hr className="border-border" />
                                        {renderSpecBlock("en")}
                                    </TabsContent>

                                    <TabsContent value="arabic" className="space-y-4" dir="rtl">
                                        <div>
                                            <Label htmlFor="name_ar">إسم الفئة</Label>
                                            <Input id="name_ar" value={data.name_ar}
                                                onChange={(e) => setData("name_ar", e.target.value)} />
                                            {errors.name_ar && <p className="text-sm text-red-500 mt-1">{errors.name_ar}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="description_ar">وصف الفئة</Label>
                                            <Textarea id="description_ar" value={data.description_ar}
                                                onChange={(e) => setData("description_ar", e.target.value)} />
                                        </div>
                                        <hr className="border-border" />
                                        {renderSpecBlock("ar")}
                                    </TabsContent>
                                </Tabs>

                                {/* Honeycomb thumbnail */}
                                <div className="space-y-2">
                                    <Label>{activeTab === "arabic" ? "صورة السداسية" : "Honeycomb image"}</Label>
                                    <p className="text-xs text-muted-foreground">{t("dashboard.category_image_help")}</p>
                                    <div className="flex gap-2">
                                        <Input type="file" ref={imageInputRef} accept="image/*"
                                            onChange={handleImageChange} className="hidden" />
                                        <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                                            <ImageIcon className="h-4 w-4 mr-2" />
                                            {imagePreview ? "Change" : "Upload"}
                                        </Button>
                                        {imagePreview && (
                                            <Button type="button" variant="ghost" onClick={handleRemoveImage}>
                                                <X className="h-3 w-3 mr-1" />
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    {imagePreview && (
                                        <img src={imagePreview.url} alt="" className="w-24 h-24 object-cover rounded border" />
                                    )}
                                </div>

                                {/* Banner */}
                                <div className="space-y-2">
                                    <Label>{t("dashboard.banner")}</Label>
                                    <p className="text-xs text-muted-foreground">{t("dashboard.banner_help")}</p>
                                    <div className="flex gap-2">
                                        <Input type="file" ref={bannerInputRef} accept="image/*"
                                            onChange={handleBannerChange} className="hidden" />
                                        <Button type="button" variant="outline" onClick={() => bannerInputRef.current?.click()}>
                                            <ImageIcon className="h-4 w-4 mr-2" />
                                            {bannerPreview ? "Change" : "Upload banner"}
                                        </Button>
                                        {bannerPreview && (
                                            <Button type="button" variant="ghost" onClick={handleRemoveBanner}>
                                                <X className="h-3 w-3 mr-1" />
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    {bannerPreview && (
                                        <img src={bannerPreview.url} alt="" className="w-full max-w-sm h-32 object-cover rounded border" />
                                    )}
                                </div>

                                {/* Gallery */}
                                <div className="space-y-2">
                                    <Label>{t("dashboard.gallery")}</Label>
                                    <p className="text-xs text-muted-foreground">{t("dashboard.gallery_help")}</p>
                                    <Input type="file" ref={galleryInputRef} accept="image/*" multiple
                                        onChange={handleGalleryChange} className="hidden" />
                                    <Button type="button" variant="outline" onClick={() => galleryInputRef.current?.click()}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add example images
                                    </Button>
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mt-3">
                                            {galleryPreviews.map((p, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={p.url} alt="" className="w-full aspect-square object-cover rounded border" />
                                                    <button type="button" onClick={() => handleRemoveGalleryItem(idx)}
                                                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Featured-on-home toggle */}
                                <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors">
                                    <Checkbox id="is_featured"
                                        checked={Boolean(data.is_featured)}
                                        onChange={(e) => setData("is_featured", e.target.checked)}
                                        className="mt-0.5" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-foreground inline-flex items-center gap-1.5">
                                            <Star className="h-3.5 w-3.5 text-primary" />
                                            {t("dashboard.featured")}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {t("dashboard.featured_help")}
                                        </p>
                                    </div>
                                </label>

                                <Button type="submit" className="w-full">
                                    {editingCategory ? t("dashboard.update") : t("dashboard.create")}
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
                                <TableHead>{t("dashboard.description")}</TableHead>
                                <TableHead>{t("dashboard.products_in_category")}</TableHead>
                                <TableHead className="text-end">{t("dashboard.actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        {category.image_path && (
                                            <img src={`/storage/${category.image_path}`}
                                                alt={lang === "ar" ? category.name_ar : category.name_en}
                                                className="w-16 h-16 object-cover rounded-md" />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="inline-flex items-center gap-2">
                                            {lang === "ar" ? category.name_ar : category.name_en}
                                            {category.is_featured && (
                                                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 rounded">
                                                    <Star className="h-2.5 w-2.5" />
                                                    {t("dashboard.featured")}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {lang === "ar" ? category.description_ar : category.description_en}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {category.products_count || 0} {t("dashboard.products")}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{t("dashboard.confirm_delete_title") || "Confirm Delete"}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        {t("dashboard.confirm_delete_message") || "Are you sure you want to delete this item?"}
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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
