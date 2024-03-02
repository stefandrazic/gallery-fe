import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import useGalleries from "../hooks/useGalleries";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import GalleryCard from "../components/GalleryCard";

export default function Galleries() {
  const query = useQuery();
  const [page, setPage] = useState(1);
  const { galleries, metadata } = useGalleries(page);
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

  if (galleries.length < 1) {
    return <Container>No movies found</Container>;
  }

  const loadMoreGalleries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container className="mt-2">
      <Container
        className="mb-3 mt-3"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <Form.Control size="lg" type="text" placeholder="Search" />
        <Button variant="success">Search</Button>
      </Container>
      <Container
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mx-auto"
        style={{ gap: "1rem" }}
      >
        {galleries?.map((gallery) => {
          return (
            <GalleryCard
              key={gallery.id}
              id={gallery.id}
              name={gallery.name}
              author={gallery.author}
              created_at={gallery.created_at}
              img_url={gallery.img_urls.split(",")[0]}
            />
          );
        })}
      </Container>
      {metadata.total > galleries.length && ( // Render the "Load more" button conditionally
        <Container className="d-flex justify-content-center mt-3">
          <Button onClick={loadMoreGalleries}>Load more</Button>
        </Container>
      )}
    </Container>
  );
}
<Link to={`/?page=2`}>2</Link>;
