import React from "react";
import { styles } from "../styles/style";
import { useTranslation } from "react-i18next";

type Props = {};

const Policy = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={"w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"}>
        <h1 className={`${styles.title} !text-start pt-2`}>
          {t("policy_page.title")}
        </h1>
      <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p1")}
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p2")}
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p3")}
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p4")}
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p5")}
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
          {t("policy_page.p6")}
        </p>
      </ul>
      </div>
    </div>
  );
};

export default Policy;
