import Card from "react-bootstrap/Card";

export default function CommentCard({ id, author, content, created_at }) {
  const time = new Date(created_at).toJSON().slice(0, 10);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{author}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
