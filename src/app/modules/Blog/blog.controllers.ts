/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { blogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { sendRespons } from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';

const createBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const author = req.user.data.authorId;
  console.log('hfg:', author);
  const blogData = { ...req.body, author };
  const result = await blogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created is Successfully!',
    data: result,
  });
});

//update a Blog
const updatedBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await blogServices.updatedBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

//delete a Blog
const deleteBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlogFromDB(id);
  sendRespons(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

//Get All a Blogs
const getAllBlogs: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updatedBlog,
  deleteBlog,
  getAllBlogs,
};
