import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "../../../Components/button";
import { Input } from "../../../Components/input";
import { Label } from "../../../Components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../Components/select";
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
import { Badge } from "../../../Components/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Users({ users }) {
    console.log(users);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const roles = ["admin", "user"];
    const statuses = ["active", "inactive"];

    const { data, setData, reset } = useForm({
        name: "",
        email: "",
        role: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id ? { ...user, ...data } : user
                )
            );
        } else {
            const newUser = {
                id: Date.now(),
                ...data,
            };
            setUsers([...users, newUser]);
        }

        setIsDialogOpen(false);
        reset();
        setEditingUser(null);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingUser(null);
        reset();
    };

    return (
        <DashboardLayout>
            <div className="m-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        Users
                    </h2>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleDialogClose()}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add User
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingUser ? "Edit User" : "Add New User"}
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) =>
                                            setData("role", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem
                                                    key={role}
                                                    value={role}
                                                >
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingUser ? "Update" : "Create"}
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
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === "admin"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(user.id)
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
