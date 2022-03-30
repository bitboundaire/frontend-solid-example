import axios from "axios";

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  headers: {
    accept: "application/json",
  }
});

export { api };
