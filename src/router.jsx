import React from "react";
import { Route, Routes } from "react-router-dom";
import GalleriesPage from "./pages/GalleriesPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";

export default function router() {
  return (
    <Routes>
      <Route path="/" index element={<GalleriesPage />} />
      <Route path="/galleries/:id" element={<GalleryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
