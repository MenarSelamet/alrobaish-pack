import { useTranslation } from "react-i18next";
import { Button } from "../Components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../Components/dropdown-menu";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lng;
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ar")}>
                    العربية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
