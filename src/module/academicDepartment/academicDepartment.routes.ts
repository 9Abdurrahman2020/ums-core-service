import { Router } from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidationSchema } from './academicDepartment.validate';

const router = Router();

router.get('/:id', AcademicDepartmentController.getSingleDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicDepartmentValidationSchema.update),
  AcademicDepartmentController.updateSingleData
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteSingleData
);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.post(
  '/create-department',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicDepartmentValidationSchema.create),
  AcademicDepartmentController.insterIntoDB
);

export const academicDepartmentRouter = router;
