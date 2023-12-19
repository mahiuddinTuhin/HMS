/* eslint-disable @typescript-eslint/no-var-requires */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/customError";
import { passwordPattern } from "../../validation/Common.Validation";
import Tlogin from "../auth/login/login.interface";
import { TUser, UserStaticModel } from "./user.interface";
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema<TUser, UserStaticModel>(
  {
    id: {
      type: String,
      required: [true, "User id is required!"],
      unique: true,
    },

    password: {
      type: String,
      default: process.env.DEFAULT_PASSWORD,
      // select: 0,
      validate: {
        validator: (value: string) => {
          return passwordPattern.test(value);
        },
        message:
          "-Password should be at least 8 characters long,\n -containing at least one uppercase letter, \n-one lowercase letter, \n-one number, \n-and one special character!",
      },
    },

    needsPasswordChange: {
      type: Boolean,
      default: true,
    },

    email: {
      type: String,
      unique: true,
      validate: {
        validator: (value: string) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: "Invalid email address format!",
      },
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function (value: string) {
      //     return phonePattern.test(value);
      //   },
      //   message: "Invalid phone address format!",
      // },
    },

    role: {
      type: String,
      required: [true, "Role is required!"],
      enum: ["patient", "doctor", "admin", "nurse", "staff"],
      message:
        "{VALUES} is not correct role. Choose patient, doctor, admin, nurse or staff as role",
    },

    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "deactive"],
        message:
          "{VALUES} is not correct role. Choose active or inactive as status",
      },
    },

    failed_login_attempts: {
      type: Number,
      default: 0,
    },

    last_login: {
      type: String,
    },

    last_failed_login: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * @hash_the_pass_before_saving
 */
userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALTROUNDS));
  const hashPass =
    bcrypt.hashSync(this?.password, salt) || process.env.DEFAULT_PASSWORD;

  this.password = hashPass;
  next();
});

/**
 * @hiding_the_password
 */
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.static(
  "checkingUserExistance",
  async function checkingUserExistance(payload: Tlogin) {
    const user = await User.findOne({
      $or: [{ id: payload?.id }, { email: payload?.id }],
    });

    /* if user not match by id or email */
    if (!user) {
      throw new AppError(
        "User not found. User correct id or email!",
        httpStatus.NOT_FOUND,
      );
    }

    /* if id deactivate */
    if (user.status === "deactive") {
      throw new AppError(
        "This user has been deactivate. Contact with administration!",
        httpStatus.NOT_FOUND,
      );
    }

    const passwordMatched = await bcrypt.compare(
      payload?.password,
      user?.password,
    );

    if (passwordMatched) {
      // await findDeviceInfo();
      return true;
    } else throw new AppError("Incorrect password!", httpStatus.UNAUTHORIZED);
  },
);

export const User = mongoose.model<TUser, UserStaticModel>("User", userSchema);
