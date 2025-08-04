import { z } from "zod";
import type { FormType } from "../../types";



export const authFormSchema = (type: FormType) => {
    return z.object({
    username: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(9),
    })
}

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]),
  dueDate: z.string().min(1, "Due date is required"),
  project: z.enum(["other", "alpha", "development", "marketing", "docs"]),
});