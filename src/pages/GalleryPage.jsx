import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGallery from "../hooks/useGallery";
import { Button, Carousel, Container, Image } from "react-bootstrap";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import { useAuth } from "../context/auth";
import GalleriesService from "../services/galleries.service";
import CommentCard from "../components/CommentCard";
import CreateComment from "../components/CreateComment";

export default function Gallery() {
  const { id } = useParams();
  const { gallery, images } = useGallery(id);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const deleteGallery = async (id) => {
    try {
      const response = await GalleriesService.delete(id);
      if (response) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const time = new Date(gallery.created_at).toJSON().slice(0, 10);

  return (
    <Container className="mt-2">
      <h2>Gallery name: {gallery.name}</h2>
      <h4>
        Author:{" "}
        <Link
          style={{ textDecoration: "none", color: "purple" }}
          to={`/authors/${gallery.author.id}`}
        >
          {gallery.author.first_name + " " + gallery.author.last_name}
        </Link>
      </h4>
      <h5>Created at: {String(time)}</h5>
      <h5>Description: {gallery.description}</h5>
      {user && user.id === gallery.author.id ? (
        <>
          <Link to={`/edit-gallery/${gallery.id}`}>
            <Button variant="info">Edit</Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${gallery.name} gallery?`
                )
              ) {
                deleteGallery(gallery.id);
              }
            }}
          >
            Delete
          </Button>
        </>
      ) : (
        ""
      )}

      <Carousel className="mt-2" activeIndex={index} onSelect={handleSelect}>
        {images?.map((img, i) => {
          return (
            <Carousel.Item key={i}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "80vh",
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
      {!gallery || Object.keys(gallery.comments).length === 0 ? (
        <h3>Be first to comment on this gallery</h3>
      ) : (
        <h3>Comments:</h3>
      )}
      <Container
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mx-auto mb-3"
        style={{ gap: "1rem" }}
      >
        {gallery.comments
          ?.sort((a, b) => b.id - a.id)
          .map((comment) => {
            return (
              <CommentCard
                key={comment.id}
                id={comment.id}
                author={comment.author}
                content={comment.content}
                created_at={comment.created_at}
              />
            );
          })}
      </Container>
      {user ? (
        <CreateComment gallery_id={gallery.id} />
      ) : (
        <h5>Log in to leave a comment</h5>
      )}
    </Container>
  );
}
