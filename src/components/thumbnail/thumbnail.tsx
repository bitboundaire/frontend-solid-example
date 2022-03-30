import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Video } from "../../types";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

const Thumbnail = ({ video }: { video: Video }) => {
  const navigate = useNavigate();

  const publishedAt = new Date(video.snippet.publishedAt);

  const formattedDate = format(publishedAt, "dd/MM/yy");

  const distance = formatDistance(publishedAt, new Date(), {
    locale: ptBR,
    addSuffix: true,
  });

  const navigateToVideo = () => navigate(`/video/${video.id.videoId}`);

  return (
      <Card
          variant="outlined"
          onClick={navigateToVideo}
          sx={{ width: '100%', height: '100%' }}
      >
        <CardActionArea>
          <CardMedia
              component="img"
              image={video.snippet.thumbnails.high.url}
              height={video.snippet.thumbnails.high.height / 2}
          />
          <CardContent>
            <Typography noWrap gutterBottom variant="body1" component="div">
              {video.snippet.title}
            </Typography>
            <Box>
              <CardHeader
                  sx={{ padding: 0 }}
                  avatar={
                    <Avatar sx={{ bgcolor: grey[500], height: 32, width: 32 }}>
                      {video.snippet.channelTitle.charAt(0)}
                    </Avatar>
                  }
                  title={video.snippet.channelTitle}
                  subheader={`${formattedDate} - ${distance}`}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export { Thumbnail };
