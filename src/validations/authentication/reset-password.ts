import z from 'zod';
import { passwordRegex } from '../../constants/regex';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      // .regex(passwordRegex.capitalLetter, 'Password must include at least one capital letter')
      // .regex(passwordRegex.digit, 'Password must include at least one digit')
      // .regex(passwordRegex.specialSymbol, 'Password must include at least one special character')
      .nonempty('Password is required'),

    confirmPassword: z.string().nonempty('Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
