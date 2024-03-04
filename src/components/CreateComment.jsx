import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CommentsService from "../services/comments.service";
import { useNavigate } from "react-router-dom";

export default function CreateComment({ gallery_id }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gallery_id: gallery_id,
    content: "",
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await CommentsService.create(formData);
      console.log(response);
      navigate(`/galleries/${gallery_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          name="content"
          type="textarea"
          placeholder="Enter your comment"
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
