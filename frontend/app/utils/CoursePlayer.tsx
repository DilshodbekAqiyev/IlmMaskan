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

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1].split("?")[0];
    }

    if (videoId) {
      // Preserve timestamp if present
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const start = urlParams.get("t") || urlParams.get("start");
      return `https://www.youtube.com/embed/${videoId}${start ? `?start=${parseInt(start)}` : ""}`;
    }
    return url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
    const match = url.match(vimeoRegex);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
    return url;
  };

  const isDirectVideoLink = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
      className="w-full"
    >
      {videoUrl && videoUrl.startsWith("http") ? (
        videoUrl.includes("youtube") || videoUrl.includes("youtu.be") ? (
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
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
        ) : videoUrl.includes("vimeo.com") ? (
          <iframe
            src={getVimeoEmbedUrl(videoUrl)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen={true}
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        ) : isDirectVideoLink(videoUrl) ? (
          <video
            src={videoUrl}
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <iframe
            src={videoUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen={true}
          ></iframe>
        )
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

