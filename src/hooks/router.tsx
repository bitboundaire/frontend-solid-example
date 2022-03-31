import React from "react";
import { UserProvider } from "../context/user";
import { createLocalStorage } from "../interfaces/factories";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home";
import { ProfilePage } from "../pages/profile";
import { SearchPage } from "../pages/search";
import { VideoPage } from "../pages/video";
import { LoginPage } from "../pages/login";

const storage = createLocalStorage();

const Router = () => (
    <BrowserRouter>
      <UserProvider storage={storage}>
        <Routes>
          <Route path="/" element={<HomePage storage={storage} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
);

export { Router };
