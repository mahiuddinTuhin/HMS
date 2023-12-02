import mongoose, { Schema } from "mongoose";
import { TDepartment } from "./department.interface";

// Define a Mongoose schema for TDepartment
const DepartmentSchema = new Schema<TDepartment>({
  departmentId: {
    type: String,
    required: [true, "Department id is required!"],
    unique: true,
  },
  departmentName: {
    type: String,
    required: [true, "Department name is required!"],
    unique: true,
  },
  allDoctors: [{ type: String, ref: "Doctors", unique: true }],
  licences: { type: String, required: true, unique: true },
  allMedicalHistory: [{ type: String, ref: "MedicalHistory", unique: true }],
});

// Create and export the Mongoose model based on the schema
const DepartmentModel = mongoose.model<TDepartment>(
  "Department",
  DepartmentSchema,
);

export default DepartmentModel;