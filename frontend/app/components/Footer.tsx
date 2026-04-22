import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Footer = (props: Props) => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              {t("footer.about")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("footer.our_story")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("footer.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("nav.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              {t("footer.quick_links")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("nav.courses")}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("footer.my_account")}
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  {t("footer.course_dashboard")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              {t("footer.social_links")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/channel/UCHz6Sne9splmvm-q2w1_HWQ"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/shahriar_sajeeb_/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/shahriarsajeeb"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                  github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              {t("footer.contact_info")}
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              {t("footer.call_us")}
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              {t("footer.address")}
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
              {t("footer.mail_us")}
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          {t("footer.copyright")}
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
