import { buttonStyles } from "./commonStyles";
import { forwardRef } from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    type?: "submit" | "button";
}

const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, children, type = "button", ...props }, ref) => {
        return (
            <button
                type={type}
                className={`${buttonStyles} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

// export default function Button({
//     children,
//     className,
// }: {
//     children: React.ReactNode;
//     className?: string;
// }) {
//     return (
//         <button className={`${buttonStyles} ${className}`}>{children}</button>
//     );
// }
