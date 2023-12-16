import { RequestHandler } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import departmentService from "./department.service";

const findAllDepartment: RequestHandler = catchAsync(async (req, res) => {
  const allDepartment = await departmentService.findAllDepartment();
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all department.",
    data: allDepartment,
  });
});

const findDepartmentById: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params?.depId;
  const department = await departmentService.findDepartmentById(id);
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved department.",
    data: department,
  });
});

const findAllSpecializations: RequestHandler = catchAsync(async (req, res) => {
  const allSpecializations = await departmentService.findSpecializatios();

  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all specializations.",
    data: allSpecializations,
  });
});
const departmentController = {
  findAllDepartment,
  findAllSpecializations,
  findDepartmentById,
};

export default departmentController;
