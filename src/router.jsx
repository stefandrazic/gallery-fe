import React from "react";
import { Route, Routes } from "react-router-dom";
import GalleriesPage from "./pages/GalleriesPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";
import CreateGalleryPage from "./pages/CreateGalleryPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function router() {
  return (
    <Routes>
      <Route path="/" index element={<GalleriesPage />} />
      <Route path="/galleries/:id" element={<GalleryPage />} />
      <Route path="/create" element={<CreateGalleryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
