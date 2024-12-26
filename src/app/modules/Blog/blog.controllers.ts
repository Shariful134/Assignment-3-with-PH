/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { blogServices } from './blog.service';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { sendRespons } from '../../utils/sendRespons';

//create a Blog
const createBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const userData = req.user;
  const authorId = userData?.data?.authorId;

  const blogData = { ...req.body, author: authorId };
  console.log(blogData);
  const result = await blogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
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
    statusCode: HttpStatus.OK,
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
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});
//Get All a Blogs
const getAllBlogs: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
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
