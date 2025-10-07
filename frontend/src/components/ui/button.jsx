import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/button-variants" 

/**
 * Renders a customizable button component using Radix Slot for 'asChild' behavior.
 * @param {object} props - Component properties.
 * @param {string} [props.className] - Additional classes to merge.
 * @param {string} [props.variant] - Button variant (default, destructive, etc.).
 * @param {string} [props.size] - Button size (default, sm, lg, icon).
 * @param {boolean} [props.asChild] - If true, renders the Slot component instead of a button.
 * @returns {JSX.Element} The rendered button or slotted element.
 */
const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button }
