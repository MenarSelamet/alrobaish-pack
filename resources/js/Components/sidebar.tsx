import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Separator } from "../Components/seperator";

const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex min-h-svh w-full", className)}
            {...props}
        >
            {children}
        </div>
    );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, children, ...props }, ref) => {
        return (
            <aside
                ref={ref}
                className={cn(
                    "hidden md:flex md:w-64 md:flex-col bg-sidebar text-sidebar-foreground border-r",
                    className
                )}
                {...props}
            >
                {children}
            </aside>
        );
    }
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
    return null;
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
                className
            )}
            {...props}
        />
    );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full min-w-0 flex-col p-2",
                className
            )}
            {...props}
        />
    );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
        <Comp
            ref={ref}
            className={cn(
                "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70",
                className
            )}
            {...props}
        />
    );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full text-sm", className)} {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex w-full min-w-0 flex-col gap-1", className)}
        {...props}
    />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("group/menu-item relative", className)}
        {...props}
    />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
    "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
    {
        variants: {
            variant: {
                default:
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                outline:
                    "bg-background border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean;
        isActive?: boolean;
    } & VariantProps<typeof sidebarMenuButtonVariants>
>(
    (
        {
            asChild = false,
            isActive = false,
            variant = "default",
            size = "default",
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                data-active={isActive}
                className={cn(
                    sidebarMenuButtonVariants({ variant, size }),
                    isActive &&
                        "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                    className
                )}
                {...props}
            />
        );
    }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarSeparator = React.forwardRef<
    React.ElementRef<typeof Separator>,
    React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
    return (
        <Separator
            ref={ref}
            className={cn("mx-2 w-auto bg-sidebar-border", className)}
            {...props}
        />
    );
});
SidebarSeparator.displayName = "SidebarSeparator";

export {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
};
