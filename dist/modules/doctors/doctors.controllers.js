"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsController = void 0;
const ResponseToServer_1 = require("../../util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const doctors_services_1 = require("./doctors.services");
const getAllDocController = (0, catchAsync_1.default)(async (req, res) => {
    const newDoc = doctors_services_1.doctorServices.getAllDocService();
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully retrieved all doctor's data.", newDoc);
});
const findDocByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const newDoc = doctors_services_1.doctorServices.findDocByIdService(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully get doctor's data.", newDoc);
});
const deleteDocByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const newDoc = doctors_services_1.doctorServices.deleteDocByIdService(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully deleted doctor's data.", newDoc);
});
const updateDocByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const newDoc = doctors_services_1.doctorServices.updateDocByIdService(id, data);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully updated doctor's data.", newDoc);
});
exports.doctorsController = {
    findDocByIdController,
    updateDocByIdController,
    deleteDocByIdController,
    getAllDocController,
};