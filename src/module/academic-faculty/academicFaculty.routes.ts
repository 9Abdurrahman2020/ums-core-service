import { Router } from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidationSchema } from './academicFaculty.validate';

const router = Router();

router.get('/:id', AcademicFacultyController.getSingleDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicFacultyValidationSchema.update),
  AcademicFacultyController.updateSingleData
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteSingleData
);
router.get('/', AcademicFacultyController.getAllFaculties);
router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicFacultyValidationSchema.create),
  AcademicFacultyController.insterIntoDB
);

export const academicFacultyRouter = router;
