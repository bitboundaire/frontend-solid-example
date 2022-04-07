import { useCallback } from "react";
import { Video, VideoRequest } from "../types";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { API_KEY } from "../utils/constants";
import { IStorage } from "../interfaces/storage";
import { ICache } from "../interfaces/cache";

export interface UseVideosProps {
  storage: IStorage;
  cache: ICache;
}

const useVideos = ({ storage, cache }: UseVideosProps) => {
  const getVideos = useCallback(async (): Promise<Video[]> => {
    const videosFromCache = cache.get<Video[]>("videos");

    if (videosFromCache) {
      return videosFromCache;
    }

    const response = await api.get<any, AxiosResponse<VideoRequest>>("search", {
      params: {
        part: "snippet",
        location: "-23.551205, -46.634018",
        locationRadius: "1000km",
        maxResults: 50,
        type: "video",
        order: "date",
        key: API_KEY
      }
    });

    storage.set("videos", JSON.stringify({
      time: Date.now(),
      videos: response.data.items
    }));

    return response.data.items;
  }, [storage]);

  return { getVideos };
};

export { useVideos };
