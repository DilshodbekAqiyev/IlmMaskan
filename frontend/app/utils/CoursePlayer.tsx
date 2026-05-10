import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    if (videoUrl && videoUrl.trim() !== "" && !videoUrl.startsWith("http")) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((err) => {
          console.error("VdoCipher OTP Error:", err);
        });
    }
  }, [videoUrl]);

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
      className="w-full"
    >
      {videoUrl && videoUrl.startsWith("http") ? (
        <iframe
          src={videoUrl.includes("youtube.com/watch?v=") 
            ? videoUrl.replace("youtube.com/watch?v=", "youtube.com/embed/") 
            : videoUrl.includes("youtu.be/") 
            ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
            : videoUrl.includes("youtube.com/shorts/")
            ? videoUrl.replace("youtube.com/shorts/", "youtube.com/embed/")
            : videoUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen={true}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      ) : (
        videoData.otp && videoData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=3thUX4gz2Z2U5DvN`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )
      )}
    </div>
  );
};

export default CoursePlayer;
