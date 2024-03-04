import { useEffect, useState } from "react";
import GalleriesService from "../services/galleries.service";

export default function useGalleries(page, search, userId) {
  const [galleries, setGalleries] = useState([]);
  const [metadata, setMetadata] = useState({ total: 0, count: 0, perPage: 8 });

  useEffect(() => {
    fetchGalleries(search);
  }, [page, search]);

  async function fetchGalleries(search = "") {
    try {
      const { data, metadata } = await GalleriesService.getAll(
        page,
        search,
        userId
      );
      if (page === 1) {
        setGalleries(data);
      } else {
        setGalleries((prevGalleries) => [...prevGalleries, ...data]);
      }
      if (metadata) setMetadata(metadata);
    } catch (error) {
      console.log(error);
    }
  }

  return { galleries, setGalleries, metadata, setMetadata };
}
