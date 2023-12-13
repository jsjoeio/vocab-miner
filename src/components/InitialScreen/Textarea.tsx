type TextareaProps = {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function Textarea({ placeholder, onChange }: TextareaProps) {
  return (
    <textarea
      className="textarea textarea-bordered textarea-lg block my-6 w-96 h-64 w-full"
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
