"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./button"

// The reason we need a submitting button:
// Disable the button when submitting to prevent duplicated submissions
const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { pending } = useFormStatus() // Check if the user is submitting

    return <Button disabled={pending} ref={ref} {...props} /> // If true, the button will disable itself
  }
)

SubmitButton.displayName = "SubmitButton"

export { SubmitButton }
