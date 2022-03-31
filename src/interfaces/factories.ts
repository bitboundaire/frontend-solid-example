import { IStorage, LocalStorage } from "./interfaces";

export const createLocalStorage = (): IStorage => new LocalStorage();
