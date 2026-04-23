"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiGlobe } from "react-icons/bi";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center mx-2 relative">
      <BiGlobe
        size={25}
        className="cursor-pointer text-black dark:text-white"
        onClick={() => setOpen(!open)}
      />
      
      {open && (
        <div className="absolute top-10 right-0 w-[120px] py-2 bg-white dark:bg-[#111C43] border border-[#ffffff0c] shadow-xl rounded z-[100000]">
          <div
            className="px-4 py-2 cursor-pointer text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 font-Poppins text-[14px]"
            onClick={() => handleLanguageChange("uz")}
          >
            {"O'zbek"}
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 font-Poppins text-[14px]"
            onClick={() => handleLanguageChange("ru")}
          >
            Русский
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 font-Poppins text-[14px]"
            onClick={() => handleLanguageChange("en")}
          >
            English
          </div>
        </div>
      )}
    </div>
  );
};
