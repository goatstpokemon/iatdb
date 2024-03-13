import React from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const StarRating = ({
    numStars = 5,
    icon,
    setValue,
    value,
    disabled,
    showcase,
    iconProps = {},
    wrapperProps = {},
}) => {
    const { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
    const { className: iconClassName, ...restIconProps } = iconProps;
    const IconComponent = icon;

    return (
        <div
            className={cn("flex items-center gap-1", wrapperClassName)}
            {...restWrapperProps}
        >
            {Array.from({ length: numStars }, (_, i) => {
                const isRated = i < value;
                const styledIconProps = {
                    onMouseEnter: () =>
                        !showcase && !disabled && setValue(i + 1),
                    className: cn(
                        "size-6 fill-yellow-400 stroke-none",
                        {
                            "opacity-50 pointer-events-none": disabled,
                            "transition-transform duration-300 hover:scale-110":
                                !disabled && !showcase,
                            "!fill-muted": !isRated,
                        },
                        iconClassName
                    ),
                    ...restIconProps,
                };
                return IconComponent ? (
                    <IconComponent key={i} {...styledIconProps} />
                ) : (
                    <StarIcon key={i} {...styledIconProps} />
                );
            })}
        </div>
    );
};

export { StarRating };
