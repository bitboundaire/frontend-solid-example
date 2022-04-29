import { IStorage } from "../interfaces/storage";
import { ICache } from "../interfaces/cache";
import { ServerApi } from "../interfaces/server-api";
import { Video, VideoRequest } from "../types";
import { API_KEY } from "../utils/constants";

export class VideoRepository {
  constructor(
      private readonly storage: IStorage,
      private readonly cache: ICache,
      private readonly serverApi: ServerApi
  ) {}

  async findVideos(search?: string) {
    const videosFromCache = this.cache.get<Video[]>("videos");

    if (videosFromCache) {
      return videosFromCache;
    }

    const response = await this.serverApi.get<VideoRequest>("search", {
      part: "snippet",
      location: "-23.551205, -46.634018",
      locationRadius: "1000km",
      maxResults: 50,
      type: "video",
      order: "date",
      q: search,
      key: API_KEY
    });

    this.storage.set("videos", JSON.stringify({
      time: Date.now(),
      videos: response.items
    }));

    return response.items;
  }
}
