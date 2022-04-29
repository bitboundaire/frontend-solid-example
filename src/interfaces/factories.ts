import { IStorage, LocalStorage } from "./storage";
import { ICache, Cache } from "./cache";
import { HttpServerApi, ServerApi } from "./server-api";
import { VideoRepository } from "../repositories/video-repository";

export const createLocalStorage = (): IStorage => new LocalStorage();

export const createCache = (): ICache => {
  const storage = createLocalStorage();

  return new Cache(storage);
};

export const createServerApi = (): ServerApi => new HttpServerApi();

export const createVideoRepository = ()=> {
  const storage = createLocalStorage();
  const cache = createCache();
  const serverApi = createServerApi();

  return new VideoRepository(
      storage,
      cache,
      serverApi
  );
};
