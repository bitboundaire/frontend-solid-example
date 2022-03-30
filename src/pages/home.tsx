import * as React from 'react';
import { Grid } from "@mui/material";
import { Thumbnail } from "../components";
import { useCallback, useEffect, useState } from "react";
import { Video, VideoRequest } from "../types";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { API_KEY } from "../utils/constants";
import { differenceInMinutes } from "date-fns";
import { Layout } from "../components/layout";

export const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const getVideos = useCallback(() => {
    const cache = JSON.parse(localStorage.getItem("videos") ?? "{}");

    if (cache.time && differenceInMinutes(cache.time, new Date()) < 5) {
      setVideos(cache.videos);
      return;
    }

    api.get<any, AxiosResponse<VideoRequest>>("search", {
      params: {
        part: "snippet",
        location: "-23.551205, -46.634018",
        locationRadius: "1000km",
        maxResults: 50,
        type: "video",
        order: "date",
        key: API_KEY
      }
    }).then(response => {
      localStorage.setItem("videos", JSON.stringify({
        time: Date.now(),
        videos: response.data.items
      }));

      setVideos(response.data.items);
    });
  }, []);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
      <Layout>
        <Grid container spacing={2}>
          {videos.map((video, index) => (
              <Grid item sm={3} key={video.id.videoId}>
                <Thumbnail video={video} />
              </Grid>
          ))}
        </Grid>
      </Layout>
  );
};
