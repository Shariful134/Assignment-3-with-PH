/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { blogSearchAbleFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

//creating a Blog
const createBlogIntoDB = async (payload: TBlog) => {
  const user = await User.findById(payload.author);

  //check if the user is exist
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //check if the user is blocked
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User Allready Blocked');
  }
  const result = await Blog.create(payload);
  const populateResult = await result.populate('author');

  const { _id, title, content, author } = result;

  return {
    _id: _id.toString(),
    title: title,
    content: content,
    author: author,
  };
};

//updating a Blog
const updatedBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not Found!');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Updated Blog is not Found!');
  }
  const { _id, title, content, author } = result;
  return {
    _id: _id.toString(),
    title: title,
    content: content,
    author: author,
  };
};

//delete a Blog
const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not Found!');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

//get all Blog
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchAbleFields)
    .filter()
    .sort();
  const result = await blogQuery.modelQuery;

  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not Found!');
  }
  return result.map((blog) => {
    const { _id, title, content, author } = blog;
    return {
      _id: _id.toString(),
      title: title,
      content: content,
      author: author,
    };
  });
};

export const blogServices = {
  createBlogIntoDB,
  updatedBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
