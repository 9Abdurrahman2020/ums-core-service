import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';

const insterIntoDB = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

const getAllFaculties = async (
  options: IPaginationOptions,
  query: any
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, title } = query;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (title) {
    andCondition.push({
      AND: [
        {
          title: {
            equals: title,
            mode: 'insensitive',
          },
        },
      ],
    });
  }
  const whereCondition:
    | Prisma.AcademicFacultyWhereInput
    | Record<string, unknown> =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicFaculty.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
  });
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      total,
      page,
      limit: 10,
    },
    data: result,
  };
};

const getSingleDataById = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleData = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleData = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyServices = {
  insterIntoDB,
  getAllFaculties,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
