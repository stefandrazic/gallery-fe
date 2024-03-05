import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CommentsService from "../services/comments.service";
import { useAuth } from "../context/auth";
import moment from "moment";

export default function CommentCard({ id, author, content, created_at }) {
  const { change, user } = useAuth();
  const timeAgo = moment(created_at).fromNow();
  const authorName = author.first_name + " " + author.last_name;
  const deleteComment = async (id) => {
    try {
      const response = await CommentsService.delete(id);
      if (response) change();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{authorName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Posted {timeAgo}
        </Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        {user?.id === author.id ? (
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to delete your comment?`)
              ) {
                deleteComment(id);
              }
            }}
          >
            Delete
          </Button>
        ) : (
          false
        )}
      </Card.Body>
    </Card>
  );
}
