import React from "react";
import { styles } from "../styles/style";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        {t("about_page.title")} <span className="text-gradient">IlmMaskan</span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          {t("about_page.p1")}
          <br />
          <br />
          {t("about_page.p2")}
          <br />
          <br />
          {t("about_page.p3")}
          <br />
          <br />
          {t("about_page.p4")}
          <br />
          <br />
          {t("about_page.p5")}
          <br />
          <br />
          {t("about_page.p6")}
          <br />
          <br />
          {t("about_page.p7")}
        </p>
        <br />
        <span className="text-[22px]">Dilshodbek Aqiyev</span>
        <h5 className="text-[18px] font-Poppins">
          {t("about_page.founder_role")}
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
