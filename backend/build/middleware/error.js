"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || req.t("error.internal_server_error");
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = req.t("error.resource_not_found", { path: err.path });
        err = new ErrorHandler_1.default(message, 400);
    }
    // Duplicate key error
    if (err.code === 11000) {
        const message = req.t("error.duplicate_key", { key: Object.keys(err.keyValue) });
        err = new ErrorHandler_1.default(message, 400);
    }
    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = req.t("error.invalid_jwt");
        err = new ErrorHandler_1.default(message, 400);
    }
    // JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = req.t("error.expired_jwt");
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
