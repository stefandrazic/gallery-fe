import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import GalleriesService from "../services/galleries.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function CreateGalleryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img_urls: [""],
  });
  const DEFAULT_DATA = { name: "", description: "", img_urls: [""] };
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (!id) {
      setFormData(DEFAULT_DATA);
    } else {
      fetchGalleryData(id);
    }
  }, [id]);

  const fetchGalleryData = async (galleryId) => {
    try {
      const response = await GalleriesService.getSingle(galleryId);
      const { name, description, img_urls, author } = response;

      if (author.id === user.id) {
        setFormData({ name, description, img_urls: img_urls.split(",") });
        return response;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    // Validate image URLs
    const areUrlsValid = formData.img_urls.every((url) =>
      /\.(jpg|png|jpeg)/i.test(url.toLowerCase())
    );

    if (!areUrlsValid) {
      // Display error message or take appropriate action
      setUrlError("Invalid image URL format. Must be format JPG, PNG or JPEG");
      return;
    }
    const joinedUrls = formData.img_urls.join(",");

    const newData = {
      ...formData,
      img_urls: joinedUrls,
    };

    try {
      if (id && user.id) {
        await GalleriesService.edit(id, newData);
      } else {
        await GalleriesService.create(newData);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-2">
      {id ? <h1>Edit gallery</h1> : <h1>Create Gallery</h1>}
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
          {urlError && (
            <Alert className="mt-3" style={{ border: 0 }} variant="danger">
              {urlError}
            </Alert>
          )}
          <Button variant="secondary" onClick={handleAddUrl}>
            Add another URL
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!id ? "Create" : "Edit"}
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="secondary"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
