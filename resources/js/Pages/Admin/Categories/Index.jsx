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
import { useToast } from "../../../hooks/use-toast";

export default function Categories({ categories }) {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, reset, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(`/admin/dashboard/categories/${editingCategory.id}`, {
                onSuccess: () => {
                    toast({ title: "Category updated successfully" });
                    handleDialogClose();
                },
            });
        } else {
            post(`/admin/dashboard/categories`, {
                onSuccess: () => {
                    toast({ title: "Category created successfully" });
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
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            // You can also use `useForm().delete`, but this is fine too:
            useForm.delete(`/admin/dashboard/categories/${id}`, {
                onSuccess: () =>
                    toast({ title: "Category deleted successfully" }),
            });
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
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
                                    Add Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingCategory
                                            ? "Edit Category"
                                            : "Add New Category"}
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
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.name}
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
                                            required
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full">
                                        {editingCategory ? "Update" : "Create"}
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
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
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
                                                onClick={() =>
                                                    handleEdit(category)
                                                }
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
        </AuthenticatedLayout>
    );
}
