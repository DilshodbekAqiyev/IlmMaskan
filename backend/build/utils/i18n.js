"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.i18next = void 0;
const i18next_1 = __importDefault(require("i18next"));
exports.i18next = i18next_1.default;
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
exports.middleware = i18next_http_middleware_1.default;
const path_1 = __importDefault(require("path"));
i18next_1.default
    .use(i18next_fs_backend_1.default)
    .use(i18next_http_middleware_1.default.LanguageDetector)
    .init({
    fallbackLng: "uz",
    backend: {
        loadPath: path_1.default.join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
        order: ["header", "querystring", "cookie"],
        caches: false,
    },
    preload: ["uz", "ru", "en"],
});
