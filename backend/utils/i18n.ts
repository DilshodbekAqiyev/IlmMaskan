import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "uz",
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      caches: false,
    },
    preload: ["uz", "ru", "en"],
  });

export { i18next, middleware };
