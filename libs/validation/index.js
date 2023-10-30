import { z } from "zod";

export const VSRegister = z.object({
  first_name: z.string({ required_error: "First Name is required" }),
  last_name: z.string({ required_error: "Last Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z.string({ required_error: "Password is required" }),
  confirm_password: z.string({
    required_error: "Confirm Password is required",
  }),
});

export const VSLogin = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z.string({ required_error: "Password is required" }),
});

export const VSUpdateProfile = z.object({
  first_name: z
    .string({ invalid_type_error: "First Name must be a string" })
    .optional(),
  last_name: z
    .string({ invalid_type_error: "Last Name must be a string" })
    .optional(),
  birth_date: z
    .string({ invalid_type_error: "Birth Date must be a string" })
    .optional(),
});
