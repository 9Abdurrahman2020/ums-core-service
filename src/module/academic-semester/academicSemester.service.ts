import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { academicSemesterSearchAbleFields } from './academicSemester.constant';

const insterIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const getAllSemesters = async (
  options: IPaginationOptions,
  filterData: any
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { searchTerm, ...filterFields } = filterData;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];
  // search conditions
  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchAbleFields.map(key => ({
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
  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
  });
  // getting total amount of rows/documents
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDataById = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleData = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleData = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicSemesterService = {
  insterIntoDB,
  getAllSemesters,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
