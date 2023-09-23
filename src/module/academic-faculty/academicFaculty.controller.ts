import httpStatus, { OK } from 'http-status';
import { paginationFields } from '../../constants/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const insterIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.insterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully created academic faculy',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['searchTerm', 'title']);
  const result = await AcademicFacultyServices.getAllFaculties(
    paginationOptions,
    filterOptions
  );
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Successfully retrieved faculties',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleDataById = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved academic faculty',
    data: result,
  });
});

const updateSingleData = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateSingleData(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated academic faculty',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.deleteSingleData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted academic faculty',
    data: result,
  });
});

export const AcademicFacultyController = {
  insterIntoDB,
  getAllFaculties,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
