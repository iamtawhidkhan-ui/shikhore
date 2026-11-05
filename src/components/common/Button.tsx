import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest} />
  );
}

/** A router link that looks like a button. */
export function ButtonLink({
  variant,
  size,
  className,
  ...rest
}: LinkProps & StyleProps) {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />;
}
