import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import useGalleries from "../hooks/useGalleries";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

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
    <Container>
      {galleries?.map((gallery) => {
        return (
          <div key={gallery.id}>
            <Link to={`/galleries/${gallery.id}`}>{gallery.name}</Link>
            <p>{gallery.description}</p>
            {/* Render other gallery data as needed */}
          </div>
        );
      })}
      {metadata.total > galleries.length && ( // Render the "Load more" button conditionally
        <Button onClick={loadMoreGalleries}>Load more</Button>
      )}
    </Container>
  );
}
<Link to={`/?page=2`}>2</Link>;
