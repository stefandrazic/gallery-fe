import React, { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import useGallery from "../hooks/useGallery";
import { Carousel, Container, Image } from "react-bootstrap";
import NotFound from "./NotFound";
import Loading from "../components/Loading";

export default function Gallery() {
  const { id } = useParams();
  const { gallery, images } = useGallery(id);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // You can show a loader here if needed
  }

  if (!gallery || Object.keys(gallery).length === 0) {
    return <NotFound />;
  }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (!gallery || Object.keys(gallery).length === 0) {
    return <NotFound />;
  }

  const time = new Date(gallery.created_at).toJSON().slice(0, 10);

  return (
    <>
      <Container className="mt-2">
        <h2>Gallery name: {gallery.name}</h2>
        <h4>
          Author:{" "}
          <Link to={"/"}>
            {gallery.author.first_name + " " + gallery.author.last_name}
          </Link>
        </h4>
        <h5>Created at: {String(time)}</h5>
        <h5>Description: {gallery.description}</h5>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {images?.map((img, i) => {
            return (
              <Carousel.Item key={i}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "70vh",
                  }}
                >
                  <Link to={img} target="_blank">
                    <Image
                      src={img}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                      }}
                      rounded
                    />
                  </Link>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
}
