"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true,
        index: true,
        required: [true, "User id is required!"],
    },
    password: {
        type: String,
        default: process.env.DEFAULT_PASSWORD,
        validate: {
            validator: (value) => {
                // Password should be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;
                return passwordPattern.test(value);
            },
            message: "-Password should be at least 8 characters long,\n -containing at least one uppercase letter, \n-one lowercase letter, \n-one number, \n-and one special character!",
        },
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value);
            },
            message: "Invalid email address format!",
        },
    },
    role: {
        type: String,
        required: [true, "Role is required!"],
        enum: {
            values: ["patient", "doctor", "admin", " nurse", "staff"],
            message: "{VALUES} is not correct role. Choose patient, doctor or admin as role",
        },
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "inactive"],
            message: "{VALUES} is not correct role. Choose active or inactive as status",
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
}, { timestamps: true });
exports.Users = mongoose_1.default.model("Users", userSchema);