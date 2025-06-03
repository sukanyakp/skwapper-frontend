import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().nonempty("Name is required"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/\d/, "Password must contain at least one number")
    //   .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain one special character")
    ,

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
