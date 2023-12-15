import FindQueryBuilder from "../../builder/FindQueryBuilder";
import AppError from "../../errors/customError";
import generateServiceId from "../../utils/generateServiceId";
import TTest from "../Test/Test.interface";
import Department from "../department/department.model";

import Test from "../Test/Test.model";
import TDepartment from "../department/department.interface";
import { nonPatientSearchableField } from "./admin.constant";
import { Admin } from "./admin.mode";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* creating department */
const createDepartment = async (payload: TDepartment) => {
  payload.id = await generateServiceId(Department);

  const newDepartment: any = await Department.create(payload);

  return newDepartment;
};

/* creating Test service*/
const createTest = async (data: TTest) => {
  try {
    data.id = await generateServiceId(Test);

    const newTest: any = await Test.create(data);
    return newTest;
  } catch (error: any) {
    // console.log({ error });
    // console.log({ error });
    throw new AppError("Failed to create new Test service!", 400);
  }
};

/**
 * @find_all_admin service
 */

const findAllAdmin = async (query: any) => {
  /* query for all admin */

  const adminQuery = new FindQueryBuilder(Admin.find(), query)
    .populate("user")
    .search(nonPatientSearchableField)
    .filter()
    .sort()
    .pagination()
    .limit()
    .fields();

  const result = await adminQuery?.modelQuery;
  return result;
};

export const adminServices = {
  createDepartment,
  createTest,
  findAllAdmin,
};
