import { Router } from "express";
import testRouter from "../modules/Test/test.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import appointmentRouter from "../modules/appointment/appointment.routes";
import authRouter from "../modules/auth/auth.routes";
import departmentRouter from "../modules/department/department.routes";
import { doctorRoutes } from "../modules/doctors/doctors.routes";
import medicalTestReportRouter from "../modules/medicalTestReport/medicalTestReport.routes";
import { patientRoutes } from "../modules/patients/patient.routes";
import { staffRoutes } from "../modules/staff/staff.routes";
import { userRoutes } from "../modules/users/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/doctors",
    route: doctorRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
  {
    path: "/staff",
    route: staffRoutes,
  },
  {
    path: "/department",
    route: departmentRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/appointment",
    route: appointmentRouter,
  },
  {
    path: "/test",
    route: testRouter,
  },
  {
    path: "/test-report",
    route: medicalTestReportRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
