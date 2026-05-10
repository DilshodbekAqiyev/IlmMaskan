"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const stream_1 = require("stream");
const generateCertificatePDF = async (userName, courseName) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new pdfkit_1.default({
                layout: "landscape",
                size: "A4",
            });
            const buffers = [];
            const stream = new stream_1.Writable({
                write: (chunk, encoding, next) => {
                    buffers.push(chunk);
                    next();
                },
            });
            doc.pipe(stream);
            // Certificate Background/Border
            doc
                .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
                .lineWidth(10)
                .stroke("#001B4B");
            doc
                .rect(35, 35, doc.page.width - 70, doc.page.height - 70)
                .lineWidth(2)
                .stroke("#001B4B");
            // Title
            doc.y = 120;
            doc
                .font("Times-Bold")
                .fontSize(50)
                .fillColor("#001B4B")
                .text("CERTIFICATE", { align: "center" });
            doc
                .fontSize(20)
                .fillColor("#000")
                .text("OF COMPLETION", { align: "center", continued: false });
            doc.moveDown(2);
            // Subtext
            doc
                .fontSize(16)
                .font("Helvetica")
                .text("This certificate is proudly presented to", { align: "center" });
            doc.moveDown(1);
            // User Name
            doc
                .fontSize(40)
                .font("Helvetica-Bold")
                .fillColor("#001B4B")
                .text(userName, { align: "center" });
            doc.moveDown(1);
            // Subtext
            doc
                .fontSize(16)
                .font("Helvetica")
                .fillColor("#000")
                .text("for successfully completing the course", { align: "center" });
            doc.moveDown(1);
            // Course Name
            doc
                .fontSize(25)
                .font("Helvetica-Bold")
                .fillColor("#001B4B")
                .text(courseName, { align: "center" });
            doc.moveDown(3);
            const date = new Date().toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            // Date and Signature area
            const bottomY = doc.page.height - 150;
            doc.fontSize(16).font("Helvetica").fillColor("#000");
            doc.text(date, 150, bottomY);
            doc.moveTo(100, bottomY + 20).lineTo(250, bottomY + 20).stroke();
            doc.text("Date", 160, bottomY + 30);
            doc.text("IlmMaskan", doc.page.width - 250, bottomY);
            doc.moveTo(doc.page.width - 250, bottomY + 20).lineTo(doc.page.width - 100, bottomY + 20).stroke();
            doc.text("Platform", doc.page.width - 210, bottomY + 30);
            doc.end();
            stream.on("finish", () => {
                resolve(Buffer.concat(buffers));
            });
            stream.on("error", (err) => {
                reject(err);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.generateCertificatePDF = generateCertificatePDF;
