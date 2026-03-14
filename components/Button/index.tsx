import React from "react";
import Link, { LinkProps } from "next/link";
import Icon from "@/components/Icon";

type CommonProps = {
    className?: string;
    icon?: string;
    children?: React.ReactNode;
    isPrimary?: boolean;
    isSecondary?: boolean;
    isStroke?: boolean;
    isCircle?: boolean;
};

type ButtonAsButton = {
    as?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
    as: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsLink = {
    as: "link";
} & LinkProps;

type ButtonProps = CommonProps &
    (ButtonAsButton | ButtonAsAnchor | ButtonAsLink);

const Button: React.FC<ButtonProps> = ({
    className,
    icon,
    children,
    isPrimary,
    isSecondary,
    isStroke,
    isCircle,
    as = "button",
    ...props
}) => {
    const isLink = as === "link";
    const Component: React.ElementType = isLink ? Link : as;

    return (
        <Component
            className={`inline-flex items-center justify-center h-12 px-6.5 border-[1.5px] rounded-full text-button transition-all cursor-pointer disabled:pointer-events-none hover:shadow-hover ${
                isPrimary
                    ? "bg-b-surface2 border-transparent text-t-secondary fill-t-secondary hover:text-t-primary hover:fill-t-primary dark:relative dark:after:absolute dark:after:inset-[-1.5px] dark:after:rounded-full dark:after:border-[1.5px] dark:after:border-[#FDFDFD]/10 dark:after:opacity-0 dark:after:transition-opacity dark:hover:after:opacity-100 dark:after:mask-linear-170 dark:after:mask-linear-from-1% dark:after:mask-linear-to-70%"
                    : ""
            } ${
                isSecondary
                    ? "bg-b-dark1 text-t-light border-transparent fill-t-light hover:bg-b-dark2"
                    : ""
            } ${
                isStroke
                    ? "border-stroke1 fill-t-secondary hover:border-stroke-highlight hover:shadow-none! hover:fill-t-primary"
                    : ""
            } ${isCircle ? "gap-0! w-12 px-0!" : ""} ${className || ""}`}
            {...(isLink ? (props as LinkProps) : props)}
        >
            {icon && <Icon className="mr-2 fill-inherit" name={icon} />}
            {children}
        </Component>
    );
};

export default Button;
