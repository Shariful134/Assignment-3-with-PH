import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../User/user.model';
import { blogSearchAbleFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

//creating a Blog
const createBlogIntoDB = async (payload: TBlog) => {
  const user = await User.findById(payload.author);

  if (!user) {
    throw new Error('User not found. Blog creation aborted.');
  }
  const result = await Blog.create(payload);
  return result;
};

//updating a Blog
const updatedBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload);
  return result;
};

//delete a Blog
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

//get all  Blog
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchAbleFields)
    .sort();
  const result = await blogQuery.modelQuery;
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  updatedBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
