import { TGuardian, TPersonalInfo } from "../utils/TCommon.interface";

export type TPatient = {
  patientId: string;
  allDiagnosis: string[];
  allMedicalHistory: string[];
  pendingAppointments: string[];
  currentMedicalDepartment?: string;
  isAdmitted: boolean;
  bills: number;
  contactNumber?: string;
  emergencyContact?: string;
  insuranceInfo?: string;
  guardian?: TGuardian;
  personalInfo?: TPersonalInfo;
};
