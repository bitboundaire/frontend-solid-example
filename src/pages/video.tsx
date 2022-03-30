import { Layout } from "../components/layout";
import { useCallback, useEffect, useState } from "react";
import { Video, VideoRequest } from "../types";
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid, Skeleton,
  Stack,
  Typography
} from "@mui/material";
import { useParams } from "react-router-dom";
import { differenceInMinutes, format } from "date-fns";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { API_KEY } from "../utils/constants";
import {
  Doorbell,
  MoreHoriz,
  Share,
  ThumbDown,
  ThumbUp,
  VideoLibrary,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import * as React from "react";

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video>();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const error = !loading && !video;

  const viewsCount = Intl.NumberFormat().format(Number(video?.statistics?.viewCount ?? 0));

  const publishedAt = format(new Date(video?.snippet.publishedAt ?? new Date()), "MMMM, dd - y");

  const description = video?.snippet.localized.description.replaceAll("\n", "<br />") ?? "";

  const getVideo = useCallback(() => {
    setLoading(true);

    try {
      const cache = JSON.parse(localStorage.getItem(`video-${id}`) ?? "{}");

      if (cache.time && differenceInMinutes(cache.time, new Date()) < 5) {
        setLoading(false);
        setVideo(cache.video);
        return;
      }

      api.get<any, AxiosResponse<VideoRequest>>("videos", {
        params: {
          id,
          key: API_KEY,
          maxWidth: 1080,
          part: "snippet,player,statistics"
        }
      })
          .then(response => {
            localStorage.setItem(`video-${id}`, JSON.stringify({
              time: Date.now(),
              video: response.data.items[0]
            }));

            setVideo(response.data.items[0]);
            setLoading(false);
          });
    } catch (e) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  return (
      <Layout>
        {loading && (
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <CircularProgress color="secondary" />
              <Typography sx={{ paddingTop: 2 }} variant="h5">
                Loading video
              </Typography>
            </Box>
        )}
        {error && (
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Typography sx={{ paddingBottom: 2 }} variant="h5">
                Unable to load videos
              </Typography>
              <Button variant="contained" color="secondary" disableElevation onClick={getVideo}>
                Try again
              </Button>
            </Box>
        )}
        {video && (
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Box width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                  <Box display="flex" flexDirection="column">
                    <div dangerouslySetInnerHTML={{ __html: video.player.embedHtml }} />
                    <Box marginTop={1}>
                      <Box>
                        <Typography variant="h6">
                          {video.snippet.title}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1">
                          {viewsCount} views &bull; {publishedAt}
                        </Typography>
                        <Box marginLeft="auto" display="flex" alignItems="center" sx={{ gap: 1 }}>
                          <Button variant="text" color="error" startIcon={<ThumbUp />}>
                            {video.statistics.likeCount}
                          </Button>
                          <Button variant="text" disabled startIcon={<ThumbDown />}>
                            Deslike
                          </Button>
                          <Button variant="text" disabled startIcon={<Share />}>
                            Share
                          </Button>
                          <Button variant="text" disabled startIcon={<VideoLibrary />}>
                            Save
                          </Button>
                          <Button variant="text" disabled startIcon={<MoreHoriz />} />
                        </Box>
                      </Box>
                      <Divider sx={{ marginTop: 1 }} />
                    </Box>
                    <Box marginTop={2}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <CardHeader
                            sx={{ padding: 0, paddingBottom: 2 }}
                            avatar={
                              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {video.snippet.channelTitle.charAt(0)}
                              </Avatar>
                            }
                            title={video.snippet.channelTitle}
                            subheader="1.304.20 subscribers"
                        />
                        <Button color="error" endIcon={<Doorbell />}>
                          Subscribe
                        </Button>
                      </Box>
                      <Box sx={{ paddingLeft: 7 }}>
                        {!expanded && (
                            <Typography>
                              {video.snippet.localized.title}
                            </Typography>
                        )}
                        {expanded && (
                            <Box>
                              <Typography>
                                <span dangerouslySetInnerHTML={{ __html: description }} />
                              </Typography>
                              <Box sx={{ marginTop: 2, gap: 1, display: "flex" }}>
                                {video.snippet.tags.map(tag => <Chip label={tag} key={tag} />)}
                              </Box>
                            </Box>
                        )}
                        <Button sx={{ marginTop: 1 }} variant="text" onClick={() => setExpanded(init => !init)}>
                          {expanded ? "Show Less" : "Show More"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3} display="flex" gap={2} flexDirection="column">
                {Array(10).fill(1).map((_, index) => (
                    <Box display="flex" flexDirection="row" sx={{ pt: 0.5 }}>
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Box marginLeft={1}>
                        <Skeleton width={130} height={60} />
                        <Skeleton width="50%" height={15} />
                        <Skeleton width="50%" height={15} />
                      </Box>
                    </Box>
                ))}
              </Grid>
            </Grid>
        )}
      </Layout>
  );
};

export { VideoPage };
