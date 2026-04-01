import { useState } from "react";
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

export default function Faqs({ faqs }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState("english");

    const { data, setData, post, put, reset, errors, delete: destroy } = useForm({
        question_en: "",
        question_ar: "",
        answer_en: "",
        answer_ar: "",
        order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => handleDialogClose(),
            onError: (errs) => {
                const hasEnglishError = errs.question_en || errs.answer_en;
                const hasArabicError = errs.question_ar || errs.answer_ar;
                if (hasArabicError && !hasEnglishError) {
                    setActiveTab("arabic");
                } else {
                    setActiveTab("english");
                }
            },
        };

        if (editingFaq) {
            put(`/admin/dashboard/faqs/${editingFaq.id}`, options);
        } else {
            post(`/admin/dashboard/faqs`, options);
        }
    };

    const handleEdit = (faq) => {
        setEditingFaq(faq);
        setData({
            question_en: faq.question_en || "",
            question_ar: faq.question_ar || "",
            answer_en: faq.answer_en || "",
            answer_ar: faq.answer_ar || "",
            order: faq.order ?? 0,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        setFaqToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (faqToDelete) {
            destroy(`/admin/dashboard/faqs/${faqToDelete}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setFaqToDelete(null);
                },
            });
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingFaq(null);
        setActiveTab("english");
        reset();
    };

    return (
        <DashboardLayout>
            <div className="m-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        {t("dashboard.faqs")}
                    </h2>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleDialogClose()}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t("dashboard.add_faq")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingFaq
                                        ? t("dashboard.edit_faq")
                                        : t("dashboard.add_new_faq")}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="space-y-4"
                                >
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="english" className="gap-2">
                                            English
                                            {(errors.question_en || errors.answer_en) && (
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                                            )}
                                        </TabsTrigger>
                                        <TabsTrigger value="arabic" className="gap-2">
                                            العربية
                                            {(errors.question_ar || errors.answer_ar) && (
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                                            )}
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="english" className="space-y-4" dir="ltr">
                                        <div>
                                            <Label htmlFor="question_en">Question</Label>
                                            <Input
                                                id="question_en"
                                                value={data.question_en}
                                                onChange={(e) => setData("question_en", e.target.value)}
                                            />
                                            {errors.question_en && (
                                                <p className="text-sm text-red-500 mt-1">{errors.question_en}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="answer_en">Answer</Label>
                                            <Textarea
                                                id="answer_en"
                                                rows={4}
                                                value={data.answer_en}
                                                onChange={(e) => setData("answer_en", e.target.value)}
                                            />
                                            {errors.answer_en && (
                                                <p className="text-sm text-red-500 mt-1">{errors.answer_en}</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="arabic" className="space-y-4" dir="rtl">
                                        <div>
                                            <Label htmlFor="question_ar">السؤال</Label>
                                            <Input
                                                id="question_ar"
                                                value={data.question_ar}
                                                onChange={(e) => setData("question_ar", e.target.value)}
                                            />
                                            {errors.question_ar && (
                                                <p className="text-sm text-red-500 mt-1">{errors.question_ar}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="answer_ar">الإجابة</Label>
                                            <Textarea
                                                id="answer_ar"
                                                rows={4}
                                                value={data.answer_ar}
                                                onChange={(e) => setData("answer_ar", e.target.value)}
                                            />
                                            {errors.answer_ar && (
                                                <p className="text-sm text-red-500 mt-1">{errors.answer_ar}</p>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div>
                                    <Label htmlFor="order">
                                        {t("dashboard.faq_order")}
                                    </Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        min={0}
                                        value={data.order}
                                        onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
                                        className="w-24"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingFaq ? t("dashboard.update") : t("dashboard.create")}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-card rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-8">#</TableHead>
                                <TableHead>{t("dashboard.faq_question")}</TableHead>
                                <TableHead>{t("dashboard.faq_answer")}</TableHead>
                                <TableHead className="text-end">
                                    {t("dashboard.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faqs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        {t("dashboard.no_faqs")}
                                    </TableCell>
                                </TableRow>
                            )}
                            {faqs.map((faq) => (
                                <TableRow key={faq.id}>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {faq.order}
                                    </TableCell>
                                    <TableCell className="font-medium max-w-xs">
                                        <p className="truncate">
                                            {lang === "ar" ? faq.question_ar : faq.question_en}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground max-w-sm">
                                        <p className="truncate">
                                            {lang === "ar" ? faq.answer_ar : faq.answer_en}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(faq)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(faq.id)}
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

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>
                            {t("dashboard.confirm_delete_title") || "Confirm Delete"}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        {t("dashboard.confirm_delete_message") ||
                            "Are you sure you want to delete this FAQ? This action cannot be undone."}
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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
