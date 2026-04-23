"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";
import { useTranslation } from "react-i18next";

type Props = {};

const Page = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <AdminProtected>
        <Heading
          title={t("page.admin_title")}
          description={t("page.description")}
          keywords={t("page.keywords")}
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
