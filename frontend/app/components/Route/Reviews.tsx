import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import { useTranslation } from "react-i18next";

type Props = {};

const Reviews = (props: Props) => {
  const { t } = useTranslation();
  const reviews = [
    {
      name: "Gene Bates",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: t("review_data.r1.profession"),
      comment: t("review_data.r1.comment"),
    },
    {
      name: "Verna Santos",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      profession: t("review_data.r2.profession"),
      comment: t("review_data.r2.comment"),
    },
    {
      name: "Jay Gibbs",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      profession: t("review_data.r3.profession"),
      comment: t("review_data.r3.comment"),
    },
    {
      name: "Mina Davidson",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      profession: t("review_data.r4.profession"),
      comment: t("review_data.r4.comment"),
    },
  ];

  return (
  <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
      <div className="800px:w-[50%] w-full">
        <Image
        src={require("../../../public/assests/business-img.png")}
        alt="business"
        width={700}
        height={700}
        />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            {t("reviews.title1")} <span className="text-gradient">{t("reviews.strength")}</span>{" "}
            <br /> {t("reviews.title2")}
          </h3>
          <br />
          <p className={styles.label}>
            {t("reviews.lorem")}
          </p>
        </div>
        <br />
        <br />
       </div>
       <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
            reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
        </div>
  </div>
  );
};

export default Reviews;
