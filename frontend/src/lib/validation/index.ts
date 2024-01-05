import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});

export const EmailValidation = z.object({
  email: z.string().email(),
});

export const PasswordResetValidation = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
