import { IStorage } from "./storage";

interface ICacheItem<T> {
  data: T;
  expiresAt: number;
}

class CacheItem<T> implements ICacheItem<T> {
  data: T;
  expiresAt: number;

  constructor(data: T, secondsToLive: number) {
    this.data = data;

    const date = new Date();
    date.setSeconds(secondsToLive);

    this.expiresAt = date.getDate();
  }

  isExpired(): boolean {
    return false;
  }

  get(): ICacheItem<T> {
    return  {
      data: this.data,
      expiresAt: this.expiresAt,
    };
  }
}

export interface ICache {
  get<T>(key: string): T | null;
  set<T>(key: string, data: T, secondsToLive: number): void;
}

class Cache implements ICache {
  constructor(
      private readonly storage: IStorage,
  ) {}

  get<T>(key: string): T | null {
    const fromStorage = this.storage.get(key) as ICacheItem<T>;

    const cachedItem = new CacheItem(fromStorage.data, fromStorage.expiresAt);

    if (!cachedItem?.isExpired()) {
      return cachedItem.data;
    }

    return null;
  }

  set<T>(key: string, data: T, secondsToLive: number) {
    const itemToCache = new CacheItem(data, secondsToLive);

    this.storage.set(key, itemToCache.get());
  }
}

export { Cache };
