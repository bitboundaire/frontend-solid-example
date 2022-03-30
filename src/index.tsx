import React from "react";
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./index.css";

import { HomePage } from './pages/home';
import { ProfilePage } from "./pages/profile";
import { SearchPage } from "./pages/search";
import { VideoPage } from "./pages/video";
import { UserProvider } from "./context/user";
import { LoginPage } from "./pages/login";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
