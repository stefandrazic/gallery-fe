import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CommentsService from "../services/comments.service";
import { useAuth } from "../context/auth";
import { Alert } from "react-bootstrap";

export default function CreateComment({ gallery_id }) {
  const DEFAULT_DATA = {
    gallery_id: gallery_id,
    content: "",
  };
  const DEFAULT_DATA_ERRORS = {
    content: "",
  };
  const [errors, setErrors] = useState(DEFAULT_DATA_ERRORS);

  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { change } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await CommentsService.create(formData);
      if (response) {
        setFormData(DEFAULT_DATA);
        change();
      }
    } catch (error) {
      const _errors = error?.response?.data?.errors;
      if (_errors) {
        setErrors({
          content: _errors?.content?.join(" ") || "",
        });
      }
    }
  };
  return (
    <Form
      className="border border-3 border-primary my-3 p-3 rounded"
      onSubmit={onSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Leave a comment</Form.Label>
        <textarea
          name="content"
          style={{ width: "100%" }}
          type="textarea"
          placeholder="Enter your comment"
          value={formData.content}
          onChange={(e) => {
            setErrors(DEFAULT_DATA_ERRORS);
            setFormData({ ...formData, content: e.target.value });
          }}
        />
      </Form.Group>
      {errors.content && (
        <Alert style={{ border: 0 }} variant="danger">
          {errors.content}
        </Alert>
      )}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
