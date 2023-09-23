import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';

const insterIntoDB = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};

const getAllDepartments = async (
  options: IPaginationOptions,
  query: any
): Promise<IGenericResponse<AcademicDepartment[]>> => {
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
    | Prisma.AcademicDepartmentWhereInput
    | Record<string, unknown> =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicDepartment.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
  });
  const total = await prisma.academicDepartment.count();
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
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleData = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleData = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  insterIntoDB,
  getAllDepartments,
  getSingleDataById,
  updateSingleData,
  deleteSingleData,
};
