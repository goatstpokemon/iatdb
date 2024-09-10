import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    link,
    title,
    description,
    header,
    icon,
}) => {
    if (link) {
        return (
            <Link
                to={`/products/categories/${link}`}
                className={cn(
                    "row-span-1 h-full rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                    className
                )}
                style={{
                    backgroundImage: `url(${header})`,
                    objectFit: "cover",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    position: "relative",
                }}
            >
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 bg-slate-50 w-fit p-2 rounded-xl">
                        {title}
                    </div>
                    {description}
                </div>
            </Link>
        );
    } else {
        <div
            className={cn(
                "row-span-1 h-full rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
            style={{
                backgroundImage: `url(${header})`,
                objectFit: "cover",
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "relative",
            }}
        >
            {console.log({ className })}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 bg-slate-50 w-fit p-2 rounded-xl">
                    {title}
                </div>
                {description}
            </div>
        </div>;
    }
};
