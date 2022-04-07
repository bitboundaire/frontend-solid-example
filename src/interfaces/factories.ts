import { IStorage, LocalStorage } from "./storage";
import { ICache, Cache } from "./cache";

export const createLocalStorage = (): IStorage => new LocalStorage();

export const createCache = (): ICache => {
  const storage = createLocalStorage();

  return new Cache(storage);
};
