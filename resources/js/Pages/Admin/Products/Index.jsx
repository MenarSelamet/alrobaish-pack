import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

export default function Products({ products }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProducts, setEditingProducts] = useState(null);
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
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProducts) {
            put(`/admin/dashboard/products/${editingProducts.id}`, data, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        } else {
            post(`/admin/dashboard/products`, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        }
    };

    const handleEdit = (product) => {
        setEditingProducts(product);
        setData({
            name: product.name,
            description: product.description,
            slug: product.slug,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(`/admin/dashboard/products/${id}`);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingProducts(null);
        reset();
    };

    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div className="m-6 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-foreground">
                            Categories
                        </h2>
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button onClick={() => handleDialogClose()}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Product
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingProducts
                                            ? "Edit Product"
                                            : "Add New Product"}
                                    </DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label htmlFor="name">Name</Label>
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
                                        <Label htmlFor="slug">Slug</Label>
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
                                            Description
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
                                    <Button type="submit" className="w-full">
                                        {editingProducts ? "Update" : "Create"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="bg-card rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Images</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            {product.title}
                                        </TableCell>
                                        <TableCell>
                                            {product.short_description}
                                        </TableCell>
                                        <TableCell>
                                            {product.image_path}
                                        </TableCell>
                                        <TableCell>
                                            {product.category_id}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(product.id)
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
        </AuthenticatedLayout>
    );
}
