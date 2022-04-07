export interface IStorage {
  remove(key: string): void;
  get(key: string): any;
  set(key: string, value: any): void
}

export class LocalStorage implements IStorage {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) ?? "{}");
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
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
