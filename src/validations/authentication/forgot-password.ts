import z from 'zod'
import { emailRegex } from "../../constants/regex";


export const formSchema = z.object({
    email : z
    .string()
    .email("Invalid email address !")
    .regex(emailRegex.validEmail , "Enter a valid email")
    .nonempty("Email is required")
})

export type FormType = z.infer<typeof formSchema>;  