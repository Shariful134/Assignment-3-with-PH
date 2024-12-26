import mongoose from 'mongoose';
import z from 'zod';

//validation create to blog
const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({ message: 'title is required' }),
    content: z.string({ message: 'content is required' }),
    author: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid author ID',
      }),
  }),
});

// Validation  Update to Blog
const updatedBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ message: 'title is required' }).optional(),
    content: z.string({ message: 'content is required' }).optional(),
  }),
});

export const blogValidation = {
  blogValidationSchema,
  updatedBlogValidationSchema,
};
