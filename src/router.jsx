import React from "react";
import { Route, Routes } from "react-router-dom";
import Galleries from "./pages/Galleries";

export default function router() {
  return (
    <Routes>
      <Route path="/" index element={<Galleries />} />
      <Route path="/galleries/:id" />
    </Routes>
  );
}
