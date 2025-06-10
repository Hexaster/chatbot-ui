"use client"

import * as LabelPrimitive from "@radix-ui/react-label" // the base label from Radix UI
import { cva, type VariantProps } from "class-variance-authority" // manage dynamic class names
import * as React from "react"

import { cn } from "@/lib/utils" // clean class merging

// All Labels have the same styling
const labelVariants = cva(
  "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Let other code interact with the Label
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
