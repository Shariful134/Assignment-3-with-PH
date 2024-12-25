/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { blogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';

//creating a Blog
const createBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await blogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog created is Successfully!',
    data: result,
  });
});

//updating a Blog
const updatedBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await blogServices.updatedBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog Updated is Successfully!',
    data: result,
  });
});

//deleteing a Blog
const deleteBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog Deleted is Successfully!',
    data: result,
  });
});
//Get All a Blogs
const getAllBlogs: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog are retrived Successfully!',
    data: result,
  });
});
export const blogControllers = {
  createBlog,
  updatedBlog,
  deleteBlog,
  getAllBlogs,
};
