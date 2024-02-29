import React, { useEffect, useState } from "react";
import GalleriesService from "../services/galleries.service";

export default function useGalleries(page) {
  const [galleries, setGalleries] = useState([]);
  const [metadata, setMetadata] = useState({ total: 0, count: 0, perPage: 8 });

  useEffect(() => {
    fetchGalleries();
  }, [page]);

  async function fetchGalleries() {
    try {
      const { data, metadata } = await GalleriesService.getAll(page);
      setGalleries((prevGalleries) => [...prevGalleries, ...data]);
      if (metadata) setMetadata(metadata);
    } catch (error) {}
  }

  return { galleries, setGalleries, metadata, setMetadata };
}
