import { z } from "zod";

export interface IUserLogin {
  email: string | null;
  password: string | null;
}

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export interface User {
  id: string;
  name?: string;
  email?: string;
  token?: string;
  role: string;
}
