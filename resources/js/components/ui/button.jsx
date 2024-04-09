import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
                gray: "border-transparent bg-gray-500 text-white",
                "gray-subtle":
                    "border-transparent bg-gray-200 text-gray-800 dark:bg-gray-800/90 dark:text-gray-200",
                blue: "border-transparent bg-blue-500 text-white",
                "blue-subtle":
                    "border-transparent bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
                purple: "border-transparent bg-purple-500 text-white",
                "purple-subtle":
                    "border-transparent bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",

                amber: "border-transparent bg-amber-400 text-black",
                "amber-subtle":
                    "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-500",
                red: "border-transparent bg-red-500 text-white",
                "red-subtle":
                    "border-transparent bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                pink: "border-transparent bg-pink-500 text-white",
                "pink-subtle":
                    "border-transparent bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
                green: "border-transparent bg-green-600 text-white",
                "green-subtle":
                    "border-transparent bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
                teal: "border-transparent bg-teal-600 text-white",
                "teal-subtle":
                    "border-transparent bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-200",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
