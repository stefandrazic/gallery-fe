import React, { useEffect, useState } from "react";
import GalleriesService from "../services/galleries.service";

export default function useGallery(id) {
  const [gallery, setGallery] = useState({});
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchGallery();
  }, [id]);

  async function fetchGallery() {
    try {
      const gallery = await GalleriesService.getSingle(id);
      if (gallery) {
        setGallery(gallery);
        setImages(gallery.img_urls.split(","));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { gallery, images };
}
