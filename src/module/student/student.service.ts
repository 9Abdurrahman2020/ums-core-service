import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { studentSearchAbleFields } from './student.constant';

const insterIntoDB = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  return result;
};

const getAllStudents = async (
  options: IPaginationOptions,
  filterData: any
): Promise<IGenericResponse<Student[]>> => {
  const { searchTerm, ...filterFields } = filterData;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions = [];
  // search conditions
  if (searchTerm) {
    andConditions.push({
      OR: studentSearchAbleFields.map(key => ({
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
  const whereCondition: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  // getting total amount of rows/documents
  const total = await prisma.student.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleData = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleData = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  return result;
};

export const StudentService = {
  insterIntoDB,
  getAllStudents,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
