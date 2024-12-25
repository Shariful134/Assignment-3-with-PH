import z from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({ message: 'title is required' }),
    content: z.string({ message: 'content is required' }),
    author: z.string({ message: 'author is required' }),
  }),
});

// Validation of Uodating Blog
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
