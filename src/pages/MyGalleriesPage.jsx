import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useGalleries from "../hooks/useGalleries";
import Loading from "../components/Loading";
import GalleryCard from "../components/GalleryCard";
import { useAuth } from "../context/auth";
import { useParams } from "react-router-dom";

export default function MyGalleries() {
  const { authToken, user } = useAuth();
  const { id } = useParams();
  let author = null;

  id ? (author = id) : (author = user.id);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { galleries, metadata } = useGalleries(page, search, author);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const loadMoreGalleries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value;
    setPage(1);
    setSearch(searchValue);
  };

  return (
    <Container className="mt-2">
      <h1>My Galleries</h1>
      <Container>
        <Form
          className="mb-3 mt-3"
          style={{ display: "flex", gap: "0.5rem" }}
          onSubmit={handleSearch}
        >
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search"
            name="search"
          />
          <Button type="submit" variant="success">
            Search
          </Button>
        </Form>
      </Container>
      {galleries.length < 1 ? (
        <Container>
          <h2>No movies found</h2>
        </Container>
      ) : (
        <>
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
            <Container className="d-flex justify-content-center mt-3 mb-3">
              <Button variant="success" onClick={loadMoreGalleries}>
                Load more
              </Button>
            </Container>
          )}
        </>
      )}
    </Container>
  );
}
