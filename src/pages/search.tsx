import * as React from "react";
import { Layout } from "../components/layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Video, VideoRequest } from "../types";
import { differenceInMinutes } from "date-fns";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { API_KEY } from "../utils/constants";
import { Grid, Typography } from "@mui/material";
import { Thumbnail } from "../components";

export const SearchPage = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const [videos, setVideos] = useState<Video[]>([]);

  const getVideos = useCallback(() => {
    const search = searchParams.get("q");

    const cache = JSON.parse(localStorage.getItem(`videos-${search}`) ?? "{}");

    if (cache.time && differenceInMinutes(cache.time, new Date()) < 5) {
      setVideos(cache.videos);
      return;
    }

    api.get<any, AxiosResponse<VideoRequest>>("search", {
      params: {
        part: "snippet",
        maxResults: 50,
        type: "video",
        order: "date",
        location: "-23.551205, -46.634018",
        locationRadius: "1000km",
        q: search,
        key: API_KEY
      }
    }).then(response => {
      localStorage.setItem(`videos-${search}`, JSON.stringify({
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
        <Typography variant="body1">
          Results for "{searchParams.get("q")}"
        </Typography>
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
