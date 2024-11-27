import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";

export default function RestaurantManager({ user }) {
    const restaurantFacade = new RestaurantFacade();

    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [showCreateItem, setShowCreateItem] = useState(false);
    const [showUpdateItem, setShowUpdateItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(""); // For live preview of Base64 image

    useEffect(() => {
        if (user.restaurantId) {
            restaurantFacade.getRestaurantById(user.restaurantId)
                .then(data => setRestaurant(data))
                .catch(error => console.error(error));
        }
    }, [user.restaurantId]);

    useEffect(() => {
        if (restaurant) {
            setMenuItems(restaurant.menuItems);
        }
    }, [restaurant]);

    const handleCreateItem = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const menuItem = {
            itemName: formData.get("name"),
            itemDescription: formData.get("description"),
            price: parseFloat(formData.get("price")),
            restaurantId: user.restaurantId,
            image: formData.get("image"),
        };

        try {
            const data = await restaurantFacade.createMenuItem(menuItem);
            setMenuItems([...menuItems, data]);
            setShowCreateItem(false);
        } catch (error) {
            console.error("Failed to create menu item:", error);
        }
    };

    const handleUpdateItem = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const menuItem = {
            id: selectedItem.id,
            itemName: formData.get("name"),
            itemDescription: formData.get("description"),
            price: parseFloat(formData.get("price")),
            restaurantId: user.restaurantId,
            image: formData.get("image"),
        };

        try {
            const data = await restaurantFacade.updateMenuItem(menuItem);
            const updatedMenuItems = menuItems.map((item) =>
                item.id === data.id ? data : item
            );
            setMenuItems(updatedMenuItems);
            setShowUpdateItem(false);
        } catch (error) {
            console.error("Failed to update menu item:", error);
        }
    };

    const handleImageChange = (event) => {
        const base64 = event.target.value;
        if (isValidBase64(base64)) {
            setImagePreview(base64); // Update preview
        } else {
            setImagePreview(""); // Clear preview if invalid
            alert("Invalid Base64 string");
        }
    };

    const isValidBase64 = (str) => {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    };

    return (
        <div>
            <h1>Restaurant Manager</h1>

            <Button
                variant="success"
                onClick={() => {
                    setShowCreateItem(true);
                    setImagePreview(""); // Reset image preview
                }}
                className="mb-3"
            >
                Add Menu Item
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.itemName}</td>
                        <td>{item.itemDescription}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                            {item.image && (
                                <img
                                    src={
                                        item.image.startsWith("data:image")
                                            ? item.image
                                            : `data:image/png;base64,${item.image}`
                                    }
                                    alt={item.itemName}
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                        </td>
                        <td>
                            <Button
                                variant="warning"
                                onClick={() => {
                                    setSelectedItem(item);
                                    setShowUpdateItem(true);
                                    setImagePreview(item.image); // Set current image as preview
                                }}
                                className="me-2"
                            >
                                Update
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Modal for Adding a New Item */}
            <Modal show={showCreateItem} onHide={() => setShowCreateItem(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateItem}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter item name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter item description"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                step="0.01"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image (Base64)</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                placeholder="Enter Base64 string"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={`data:image/png;base64,${imagePreview}`}
                                    alt="Preview"
                                    style={{ width: "100px", height: "100px", marginTop: "10px" }}
                                />
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCreateItem(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Add Item
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal for Updating an Existing Item */}
            {selectedItem && (
                <Modal show={showUpdateItem} onHide={() => setShowUpdateItem(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Menu Item</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleUpdateItem}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    defaultValue={selectedItem.itemName}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    defaultValue={selectedItem.itemDescription}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    defaultValue={selectedItem.price}
                                    step="0.01"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image (Base64)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    defaultValue={selectedItem.image}
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={`data:image/png;base64,${imagePreview}`}
                                        alt="Preview"
                                        style={{ width: "100px", height: "100px", marginTop: "10px" }}
                                    />
                                )}
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowUpdateItem(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Update Item
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}
        </div>
    );
}
