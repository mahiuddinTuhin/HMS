"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../../errors/customError"));
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const doctors_services_1 = require("./doctors.services");
/* creating appointment  controller by doctor */
const createAppointment = (0, catchAsync_1.default)(async (req, res) => {
    const appointmentData = req.body;
    const newAppointment = await doctors_services_1.doctorServices.createAppointment(appointmentData);
    if (newAppointment) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newAppointment);
    }
    else {
        throw new customError_1.default("Creating appointment failed from doctor controller!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
/* creating a medical history controller by doctor */
const createMedicalHistory = (0, catchAsync_1.default)(async (req, res) => {
    const medicalHistoryData = req.body;
    const newMedicalHistory = await doctors_services_1.doctorServices.createMedicalHistory(medicalHistoryData);
    if (newMedicalHistory) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newMedicalHistory);
    }
    else {
        throw new customError_1.default("Creating new Medical History failed from doctor controller!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
const getAllDocController = (0, catchAsync_1.default)(async (req, res) => {
    const allDoc = await doctors_services_1.doctorServices.getAllDocService();
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully retrieved all doctor's data.", allDoc);
});
const findDocByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.userId;
    const newDoc = await doctors_services_1.doctorServices.findDocByIdService(id);
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
const appointedTimeOfDoc = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const newDoc = await doctors_services_1.doctorServices.appointedTimeOfDoc(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully get doctor's data.", newDoc);
});
const findDoctorBySymptoms = (0, catchAsync_1.default)(async (req, res) => {
    const symptoms = req.body;
    const doctors = await doctors_services_1.doctorServices.findDoctorBySymptoms(symptoms);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully get doctors data by symptoms", doctors);
});
exports.doctorsController = {
    findDocByIdController,
    updateDocByIdController,
    deleteDocByIdController,
    getAllDocController,
    createAppointment,
    createMedicalHistory,
    appointedTimeOfDoc,
    findDoctorBySymptoms,
};
