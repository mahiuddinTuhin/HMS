import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { schedules } from "./doctor.constant";
import { TDoctor } from "./doctors.interface";

export const doctorSchema = new Schema<TDoctor>(
  {
    doctorId: {
      type: String,
      index: true,
      unique: true,
      ref: "Users",
      required: [true, "Doctor id is required!"],
    },

    schedule: [
      {
        type: String,
        enum: schedules,
        message: "{VALUE} is not accepted as schedule!",
      },
    ],
    allMedicalHistory: [
      {
        type: String,
        ref: "MedicalHistory",
      },
    ],
    pendingAppointments: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    contactInfo: utilsSchema.nonPatientContactSchema,
    departmentId: {
      type: String,
      unique: true,
      ref: "Department",
      required: [true, "Department id is required!"],
    },
    education: [utilsSchema.nonPatientEducationSchema],
    license_info: String,
    personalInfo: utilsSchema.NonPatientPersonalInfo,
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const Doctor = model<TDoctor>("Doctors", doctorSchema);
