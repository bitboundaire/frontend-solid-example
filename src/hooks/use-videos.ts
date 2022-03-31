import { useCallback } from "react";
import { Video, VideoRequest } from "../types";
import { differenceInMinutes } from "date-fns";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { API_KEY } from "../utils/constants";
import { IStorage } from "../interfaces/interfaces";

export interface UseVideosProps {
  storage: IStorage;
}

const useVideos = ({ storage }: UseVideosProps) => {
  const getVideos = useCallback(async (): Promise<Video[]> => {
    const cache = JSON.parse(storage.get("videos") ?? "{}");

    if (cache.time && differenceInMinutes(cache.time, new Date()) < 5) {
      return cache.videos as Video[];
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
