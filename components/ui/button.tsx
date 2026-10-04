"use client";

import * as React from "react";
import "./ui.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, children, type, ...props }, ref) => {
    const classes = `q-ui-button q-ui-button--${variant} q-ui-button--${size} ${className}`;
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
      const childProps = child.props;
      const merged: Record<string, unknown> = { ...props, ...childProps, className: `${classes} ${childProps.className ?? ""}` };
      for (const key of Object.keys(props)) {
        if (!/^on[A-Z]/.test(key)) continue;
        const parentHandler = (props as Record<string, unknown>)[key];
        const childHandler = (childProps as Record<string, unknown>)[key];
        if (typeof parentHandler === "function") {
          merged[key] = (event: React.SyntheticEvent) => {
            if (typeof childHandler === "function") childHandler(event);
            if (!event.defaultPrevented) parentHandler(event);
          };
        }
      }
      merged.ref = (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        const childRef = Number.parseInt(React.version, 10) >= 19 ? childProps.ref : (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === "function") childRef(node);
        else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      };
      return React.cloneElement(child, merged);
    }
    return <button ref={ref} type={type ?? "button"} className={classes} {...props}>{children}</button>;
  },
);
Button.displayName = "Button";
