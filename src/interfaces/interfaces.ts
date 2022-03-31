export interface IStorage {
  remove(key: string): void;
  get(key: string): any;
  set(key: string, value: string): void
}

export class LocalStorage implements IStorage {
  get(key: string): any {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}

export class SessionStorage implements IStorage {
  get(key: string): any {
    return sessionStorage.getItem(key);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
