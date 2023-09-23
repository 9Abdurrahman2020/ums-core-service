import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../constants/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const insterIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentService.insterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created Student',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationFields);
  const filterData = pick(req.query, studentFilterableFields);
  const result = await StudentService.getAllStudents(options, filterData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully retrived students',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDataById = catchAsync(async (req, res) => {
  const result = await StudentService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved student',
    data: result,
  });
});

const updateSingleData = catchAsync(async (req, res) => {
  const result = await StudentService.updateSingleData(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated student',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req, res) => {
  const result = await StudentService.deleteSingleData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted student',
    data: result,
  });
});

export const StudentController = {
  insterIntoDB,
  getAllStudents,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
