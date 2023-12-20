/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  email?: string;
  phone?: string;
  role: "patient" | "doctor" | "admin" | "nurse" | "staff";
  status?: "active" | "deactive";
  failed_login_attempts?: number;
  last_login?: Date;
  last_failed_login?: Date;
  isDeleted: boolean;
};

export type UserStaticModel = {
  passwordMatched(payloadPassword: string, userPassword: string): boolean;
  isUserExist(id: string): Promise<TUser>;
  accessTokenCreation(payload: Partial<TUser>): any;
} & Model<TUser>;
