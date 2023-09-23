import httpStatus, { OK } from 'http-status';
import { paginationFields } from '../../constants/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const insterIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.insterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created academic department',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['searchTerm', 'title']);
  const result = await AcademicDepartmentService.getAllDepartments(
    paginationOptions,
    filterOptions
  );
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Successfully retrieved deparments',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDataById = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getSingleDataById(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved academic department',
    data: result,
  });
});

const updateSingleData = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateSingleData(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated academic department',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.deleteSingleData(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted academic department',
    data: result,
  });
});

export const AcademicDepartmentController = {
  insterIntoDB,
  getAllDepartments,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
