import { z } from "zod";
import { FormType } from "../../types";



export const authFormSchema = (type: FormType) => {
    return z.object({
    username: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(9),
    })
}