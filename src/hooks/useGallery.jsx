import { useEffect, useState } from "react";
import GalleriesService from "../services/galleries.service";
import { useAuth } from "../context/auth";

export default function useGallery(id) {
  const [gallery, setGallery] = useState({});
  const [images, setImages] = useState([]);
  const { changed } = useAuth();
  useEffect(() => {
    fetchGallery();
  }, [id, changed]);

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
