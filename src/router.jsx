import React from "react";
import { Route, Routes } from "react-router-dom";
import GalleriesPage from "./pages/GalleriesPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";
import CreateGalleryPage from "./pages/CreateGalleryPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import MyGalleriesPage from "./pages/MyGalleriesPage";

export default function router() {
  return (
    <Routes>
      <Route path="/" index element={<GalleriesPage />} />
      <Route path="/galleries/:id" element={<GalleryPage />} />
      <Route path="/authors/:id" element={<MyGalleriesPage />} />

      <Route element={<AuthRoutes />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/create" element={<CreateGalleryPage />} />
        <Route path="/edit/:id" element={<CreateGalleryPage />} />
        <Route path="my-galleries" element={<MyGalleriesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
