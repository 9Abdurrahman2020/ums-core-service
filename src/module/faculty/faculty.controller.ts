import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../constants/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const insterIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyService.insterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created Faculty',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationFields);
  const filterData = pick(req.query, facultyFilterableFields);
  const result = await FacultyService.getAllFaculties(options, filterData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully retrived faculties',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDataById = catchAsync(async (req, res) => {
  const result = await FacultyService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved faculty',
    data: result,
  });
});

const updateSingleData = catchAsync(async (req, res) => {
  const result = await FacultyService.updateSingleData(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req, res) => {
  const result = await FacultyService.deleteSingleData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully delete faculty',
    data: result,
  });
});

export const FacultyController = {
  insterIntoDB,
  getAllFaculties,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
