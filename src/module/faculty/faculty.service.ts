import { Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { facultySearchAbleFields } from './faculty.constant';

const insterIntoDB = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const getAllFaculties = async (
  options: IPaginationOptions,
  filterData: any
): Promise<IGenericResponse<Faculty[]>> => {
  const { searchTerm, ...filterFields } = filterData;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions = [];
  // search conditions
  if (searchTerm) {
    andConditions.push({
      OR: facultySearchAbleFields.map(key => ({
        [key]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  // filter conditions
  if (Object.keys(filterFields).length > 0) {
    andConditions.push({
      AND: Object.keys(filterFields).map(field => ({
        [field]: {
          equals: filterFields[field],
          mode: 'insensitive',
        },
      })),
    });
  }
  // make where condition type with Prisma provided 'AcademicSemesterWhereInput' type
  const whereCondition: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  // getting total amount of rows/documents
  const total = await prisma.faculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDataById = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const updateSingleData = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleData = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const FacultyService = {
  insterIntoDB,
  getAllFaculties,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
