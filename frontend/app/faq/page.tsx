"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ/FAQ";
import { useTranslation } from "react-i18next";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Heading
        title={t("page.faq_title")}
        description={t("page.description")}
        keywords={t("page.keywords")}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <br />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
