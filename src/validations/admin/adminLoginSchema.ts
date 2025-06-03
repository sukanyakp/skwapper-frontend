import z from "zod";
import { emailRegex } from "../../constants/regex";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address")
    .regex(emailRegex.validEmail, "Enter a valid email!"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type AdminLoginType = z.infer<typeof adminLoginSchema>;
