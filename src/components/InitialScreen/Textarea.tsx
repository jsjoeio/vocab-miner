import React from "react"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      className="textarea textarea-bordered textarea-lg block my-6 w-96 h-64 w-full"
      {...props}
    />
  )
}
