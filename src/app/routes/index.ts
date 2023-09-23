import express from 'express';
import { academicFacultyRouter } from '../../module/academic-faculty/academicFaculty.routes';
import { academicSemesterRouter } from '../../module/academic-semester/academicSemester.routes';
import { academicDepartmentRouter } from '../../module/academicDepartment/academicDepartment.routes';
import { facultyRouter } from '../../module/faculty/faculty.routes';
import { studentRouter } from '../../module/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/student',
    route: studentRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
