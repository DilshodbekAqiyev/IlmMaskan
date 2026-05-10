import React from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineTrophy } from "react-icons/hi2";
import { styles } from "@/app/styles/style";
import Link from "next/link";

type Props = {
  setOpen: (open: boolean) => void;
  courseName: string;
};

const CourseCompletionModal = ({ setOpen, courseName }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 text-center">
      <div className="w-[80px] h-[80px] bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
        <HiOutlineTrophy size={45} className="text-white" />
      </div>
      <h1 className="text-[28px] font-Poppins font-[700] text-black dark:text-white mb-2">
        {t("completion.title")}
      </h1>
      <p className="text-[18px] text-black dark:text-[#ffffffb3] font-Poppins mb-4">
        {t("completion.subtitle", { courseName })}
      </p>
      <p className="text-[16px] text-black dark:text-[#ffffff8e] font-Poppins mb-8 px-4">
        {t("completion.description")}
      </p>
      <div className="w-full flex flex-col 800px:flex-row gap-4 items-center justify-center">
        <div
          className={`${styles.button} !bg-[#37a39a] !h-[45px] !text-[16px]`}
          onClick={() => {
            // Placeholder for certificate download
            alert("Sertifikat tayyorlanmoqda...");
          }}
        >
          {t("completion.get_certificate")}
        </div>
        <Link
          href="/courses"
          className={`${styles.button} !bg-transparent border border-[#37a39a] !text-[#37a39a] !h-[45px] !text-[16px]`}
        >
          {t("completion.back_to_courses")}
        </Link>
      </div>
    </div>
  );
};

export default CourseCompletionModal;
