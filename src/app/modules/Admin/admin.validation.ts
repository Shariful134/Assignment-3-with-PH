import z from 'zod';

const adminValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['admin', 'user']).default('user'),
  }),
});

//login validation
const adminLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const adminValidation = {
  adminValidationSchema,
  adminLoginValidationSchema,
};
