import * as z from "zod"
const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt must be at least 1 characters.",
    }),
  })

export default formSchema;