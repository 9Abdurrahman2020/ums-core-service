import { Router } from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { StudentController } from './student.controller';
import { studentValidationSchema } from './student.validate';

const router = Router();

router.get('/:id', StudentController.getSingleDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(studentValidationSchema.update),
  StudentController.updateSingleData
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteSingleData
);
router.get('/', StudentController.getAllStudents);
router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(studentValidationSchema.create),
  StudentController.insterIntoDB
);

export const studentRouter = router;
