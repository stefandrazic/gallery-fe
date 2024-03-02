import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function GalleryCard({ id, author, name, created_at, img_url }) {
  const time = new Date(created_at).toJSON().slice(0, 10);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={img_url}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Author:{" "}
          <Link to={`/authors/${author.id}`}>
            {author.first_name + " " + author.last_name}
          </Link>{" "}
          <br />
          Created at: {String(time)}
        </Card.Text>
        <Link to={`/galleries/${id}`}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default GalleryCard;
