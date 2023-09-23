import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../constants/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const insterIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.insterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created academic semester',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationFields);
  const filterData = pick(req.query, academicSemesterFilterableFields);
  const result = await AcademicSemesterService.getAllSemesters(
    options,
    filterData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully retrived semester',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDataById = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved academic semester',
    data: result,
  });
});

const updateSingleData = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.updateSingleData(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated academic semester',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.deleteSingleData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted academic semester',
    data: result,
  });
});

export const AcademicSemesterController = {
  insterIntoDB,
  getAllSemesters,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
