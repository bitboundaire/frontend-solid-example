import * as React from "react";
import { Layout } from "../components/layout";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Thumbnail } from "../components";
import { useVideos } from "../hooks/use-videos";
import { Video } from "../types";

export const SearchPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [videos, setVideos] = useState<Video[]>([]);

  const { getVideos } = useVideos();

  useEffect(() => {
    const search = searchParams.get("q") ?? "";

    getVideos(search).then(setVideos);
  }, [getVideos, searchParams]);

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
