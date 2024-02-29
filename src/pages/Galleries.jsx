import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import useGalleries from "../hooks/useGalleries";
import { Link } from "react-router-dom";

export default function Galleries() {
  const query = useQuery();
  const [page, setPage] = useState(1);
  const { galleries, metadata } = useGalleries(page);

  const loadMoreGalleries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      {galleries?.map((gallery) => {
        return (
          <div key={gallery.id}>
            <h2>{gallery.name}</h2>
            <p>{gallery.description}</p>
            <p>{gallery.img_urls}</p>
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
