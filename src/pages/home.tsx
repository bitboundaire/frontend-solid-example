import * as React from 'react';
import { Grid } from "@mui/material";
import { Thumbnail } from "../components";
import { useEffect, useState } from "react";
import { Video } from "../types";
import { Layout } from "../components/layout";
import { useVideos } from "../hooks/use-videos";

export const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const { getVideos } = useVideos();

  useEffect(() => {
    getVideos().then(videos => {
      setVideos(videos);
    });
  }, [getVideos]);

  return (
      <Layout>
        <Grid container spacing={2}>
          {videos.map((video) => (
              <Grid item sm={3} key={video.id.videoId}>
                <Thumbnail video={video} />
              </Grid>
          ))}
        </Grid>
      </Layout>
  );
};
