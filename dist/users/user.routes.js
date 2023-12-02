"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const router = (0, express_1.Router)();
router.post("/create-patient", user_controllers_1.userControllers.createPatient);
router.get("/", user_controllers_1.userControllers.getAllUser);
router.get("/:userId", user_controllers_1.userControllers.getUserById);
router.delete("/:userId", user_controllers_1.userControllers.deleteUserById);
router.put("/", user_controllers_1.userControllers.updateUserById);
exports.userRoutes = router;