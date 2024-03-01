import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import GalleriesService from "../services/galleries.service";
import { useNavigate } from "react-router-dom";

export default function CreateGalleryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img_urls: [""],
  });

  const handleAddUrl = () => {
    setFormData({ ...formData, img_urls: [...formData.img_urls, ""] });
  };

  const handleRemoveUrl = (indexToRemove) => {
    if (formData.img_urls.length === 1) return;
    setFormData({
      ...formData,
      img_urls: formData.img_urls.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...formData.img_urls];
    newUrls[index] = value;
    setFormData({ ...formData, img_urls: newUrls });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newUrls = [...formData.img_urls];
    [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
    setFormData({ ...formData, img_urls: newUrls });
  };

  const handleMoveDown = (index) => {
    if (index === formData.img_urls.length - 1) return;
    const newUrls = [...formData.img_urls];
    [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
    setFormData({ ...formData, img_urls: newUrls });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const joinedUrls = formData.img_urls.join(",");

    const newData = {
      ...formData,
      img_urls: joinedUrls,
    };

    try {
      const response = await GalleriesService.create(newData);
      console.log(response);
      if (response) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Create Gallery</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            minLength={2}
            maxLength={255}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            maxLength={1000}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URLs</Form.Label>
          {formData.img_urls.map((url, index) => (
            <Row key={index} className="mb-2">
              <Col xs={8}>
                <Form.Control
                  type="url"
                  placeholder="Enter image url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveUrl(index)}
                >
                  Remove
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  Move Up
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === formData.img_urls.length - 1}
                >
                  Move Down
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddUrl}>
            Add another URL
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary">Cancel</Button>
      </Form>
    </Container>
  );
}
