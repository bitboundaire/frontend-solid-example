import { useCallback } from "react";
import { Video } from "../types";
import { createVideoRepository } from "../interfaces/factories";

const useVideos = () => {
  const getVideos = useCallback(async (search?: string): Promise<Video[]> => {
    return createVideoRepository().findVideos(search);
  }, []);

  return { getVideos };
};

export { useVideos };
