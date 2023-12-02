/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import { userServices } from "./users.services";

/* 1. creating admin */
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const newAdmin: any = await userServices.createAdminService(data);

  if (newAdmin) {
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully created doctor's data.",
      newAdmin,
    );
  } else {
    throw new Error("Failed to create doc!");
  }
});

/* creating doctor */
const createDoctor: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const newDoc: any = await userServices.createDocService(data);

  if (newDoc) {
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully created doctor's data.",
      newDoc,
    );
  } else {
    throw new Error("Failed to create doc!");
  }
});

/* creating patient */
const createPatient: RequestHandler = catchAsync(async (req, res) => {
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.createPatientService(body);
  if (result) {
    ResponseToServer(req, res, true, 200, "Successfyully created users!", {
      data: result,
    });
  } else {
    throw new Error("");
  }
});

const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.getUserById(id);
  ResponseToServer(req, res, true, 200, "Successfyully retreive the users!", {
    data: result,
  });
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.getAllUser();
  ResponseToServer(
    req,
    res,
    true,
    200,
    "Successfyully retreive all the users!",
    {
      data: result,
    },
  );
});

const deleteUserById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.deleteUserById(id);
  ResponseToServer(req, res, true, 200, "Successfyully deleted the users!", {
    data: result,
  });
});

const updateUserById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.updateUserById(id, body);
  ResponseToServer(req, res, true, 200, "Successfyully update the users!", {
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllUser,
};
