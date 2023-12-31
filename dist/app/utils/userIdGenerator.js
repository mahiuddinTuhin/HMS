"use strict";
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../errors/customError"));
const findLastUser_1 = __importDefault(require("./findLastUser"));
/*
 *    id: pattern
 **    first_three_letter_of_Role_+year's last 2 digit(23)+monnth(12)+date(30)+(quantity+1)
 * @param role
 */
/*
 NOTE     generating id by retrieving last user(role based) or custom id
*/
const generateUserId = async (role) => {
    const date = new Date();
    const currentYear = date.getFullYear().toString().substring(2, 4);
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const currentDate = date.getDate().toString().toString().padStart(2, "0");
    const currentformattedDate = `${currentDate}${currentMonth}${currentYear}`;
    /* finding last id on a role*/
    let lastUserId;
    let newUserId;
    let newSerial;
    try {
        lastUserId = (await (0, findLastUser_1.default)(role)) || `${currentformattedDate}000`;
        // 151223001
        const lastUserIdDate = lastUserId.toString().substring(3, 9);
        const lastUserSerial = Number(lastUserId.toString().substring(9, 12)) || 0;
        if (lastUserSerial >= 999) {
            throw new customError_1.default("User is overflowed for today!", 400);
        }
        const needIncrementSerial = lastUserIdDate === currentformattedDate;
        if (needIncrementSerial) {
            newSerial = (lastUserSerial + 1).toString().padStart(3, "0");
        }
        else {
            newSerial = "001";
        }
        const roleStr = role.charAt(0).toUpperCase() + role.slice(1, 3);
        newUserId = `${roleStr}${currentformattedDate}${newSerial}`;
        return newUserId;
    }
    catch (error) {
        if (error instanceof customError_1.default) {
            throw new customError_1.default(error?.message || "Failed to generate code", 400);
        }
        else {
            throw new customError_1.default("Failed to generate code", 400);
        }
    }
};
exports.default = generateUserId;
