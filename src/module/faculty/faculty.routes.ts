import { Router } from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { FacultyController } from './faculty.controller';
import { facultyValidationSchema } from './faculty.validation';

const router = Router();

router.get('/:id', FacultyController.getSingleDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(facultyValidationSchema.update),
  FacultyController.updateSingleData
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.deleteSingleData
);
router.get('/', FacultyController.getAllFaculties);
router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(facultyValidationSchema.create),
  FacultyController.insterIntoDB
);

export const facultyRouter = router;
