import { useEffect, useState } from "react";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OrderFacade from "../../Facades/OrderFacade.js";

export default function RestaurantOverview({ user, restaurant, setRestaurant }) {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        region: '',
        cuisineType: '',
        minRating: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [reviews, setReviews] = useState({});

    // Instantiate facades outside of useEffect to prevent re-creation on each render
    const restaurantFacade = new RestaurantFacade();
    const orderFacade = new OrderFacade();

    // Fetch data on component mount or when user.customerId changes
    useEffect(() => {
        // Fetch all restaurants
        restaurantFacade.getAllRestaurants()
            .then(data => {
                setRestaurants(data);
                setFilteredRestaurants(data);
            })
            .catch(error => {
                console.error("Error fetching restaurants:", error);
            });

        // Fetch previous orders
        orderFacade.getFinishedOrders(user.customerId)
            .then((data) => setPreviousOrders(data))
            .catch(error => {
                console.error("Error fetching previous orders:", error);
            });
    }, [user.customerId]); // Only re-run when user.customerId changes

    // Filter restaurants based on filters
    useEffect(() => {
        let filtered = restaurants;

        if (filters.name) {
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        if (filters.region) {
            filtered = filtered.filter(restaurant =>
                restaurant.address.region === filters.region
            );
        }

        if (filters.cuisineType) {
            filtered = filtered.filter(restaurant =>
                restaurant.cuisineType === filters.cuisineType
            );
        }

        if (filters.minRating) {
            const min = parseFloat(filters.minRating);
            if (!isNaN(min)) {
                filtered = filtered.filter(restaurant =>
                    restaurant.rating >= min
                );
            }
        }

        setFilteredRestaurants(filtered);
    }, [filters, restaurants]);

    const uniqueRegions = [...new Set(restaurants.map(r => r.address.region))];
    const uniqueCuisineTypes = [...new Set(restaurants.map(r => r.cuisineType))];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleRowClick = (restaurant) => {
        setRestaurant(restaurant);
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleReviewChange = (orderId, field, value) => {
        setReviews(prevReviews => ({
            ...prevReviews,
            [orderId]: {
                ...prevReviews[orderId],
                [field]: value
            }
        }));
    };

    // Handlers for review modal
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [reviewForm, setReviewForm] = useState({
        title: '',
        description: '',
        restaurantRating: '1',
        deliveryAgentRating: '1'
    });

    const handleReviewButtonClick = (order) => {
        setCurrentOrder(order);
        setShowReviewModal(true);
    };

    const handleReviewModalClose = () => {
        setShowReviewModal(false);
        setCurrentOrder(null);
        setReviewForm({
            title: '',
            description: '',
            restaurantRating: '1',
            deliveryAgentRating: '1'
        });
    };

    const handleReviewFormChange = (e) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const { title, description, restaurantRating, deliveryAgentRating } = reviewForm;

        // Basic validation
        if (!title.trim() || !description.trim()) {
            alert("Please fill out all fields.");
            return;
        }

        const review = {
            id: 0, // Assuming backend assigns the correct ID
            orderDTO: currentOrder,
            title: title.trim(),
            description: description.trim(),
            agentRating: parseInt(deliveryAgentRating, 10),
            restaurantRating: parseInt(restaurantRating, 10),
            overAllRating: Math.round((parseInt(deliveryAgentRating, 10) + parseInt(restaurantRating, 10)) / 2)
        }

        orderFacade.createReview(review)
            .then(r => {
                alert("Review submitted successfully!");
                handleReviewModalClose();
                // Update the previousOrders state by removing the reviewed order
                setPreviousOrders(prevOrders => prevOrders.filter(order => order.id !== currentOrder.id));
            })
            .catch(error => {
                console.error("Error submitting review:", error);
                alert("Failed to submit review. Please try again.");
            });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Restaurants</h1>
                <Button variant="primary" onClick={handleModalShow}>
                    Review Previous Orders
                </Button>
            </div>

            {/* Filter Section */}
            <Form className="mb-4">
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="filterName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by name"
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="filterRegion">
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                as="select"
                                name="region"
                                value={filters.region}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Regions</option>
                                {uniqueRegions.map(region => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="filterCuisineType">
                            <Form.Label>Cuisine Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="cuisineType"
                                value={filters.cuisineType}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Types</option>
                                {uniqueCuisineTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="filterMinRating">
                            <Form.Label>Minimum Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g., 4.0"
                                name="minRating"
                                value={filters.minRating}
                                onChange={handleFilterChange}
                                min="0"
                                max="5"
                                step="0.1"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {/* Restaurants Table */}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Cuisine Type</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(restaurant => (
                        <tr
                            key={restaurant.id}
                            onClick={() => handleRowClick(restaurant)}
                            className="clickable-row"
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{restaurant.name}</td>
                            <td>
                                {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.zipCode}, {restaurant.address.region}
                            </td>
                            <td>{restaurant.cuisineType}</td>
                            <td>{restaurant.rating} ({restaurant.numberOfRatings})</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No restaurants found.</td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* Modal for Previous Orders */}
            <Modal
                show={showModal}
                onHide={handleModalClose}
                dialogClassName="custom-modal-dialog"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Previous Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        overflowX: 'auto',
                    }}
                >
                    {previousOrders.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Restaurant</th>
                                <th>Receipt</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {previousOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.restaurantName || order.restaurantId}</td>
                                    <td>
                                        {order.receipt}
                                    </td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleReviewButtonClick(order)}
                                        >
                                            Review
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No previous orders to display.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Submitting a Review */}
            <Modal
                show={showReviewModal}
                onHide={handleReviewModalClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentOrder ? `Submit Review for ${currentOrder.restaurantName || currentOrder.restaurantId}` : 'Submit Review'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleReviewSubmit}>
                        <Form.Group controlId="reviewTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={reviewForm.title}
                                onChange={handleReviewFormChange}
                                placeholder="Enter review title"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="reviewDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                value={reviewForm.description}
                                onChange={handleReviewFormChange}
                                placeholder="Write your review here..."
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="reviewRestaurantRating" className="mb-3">
                            <Form.Label>Restaurant Rating</Form.Label>
                            <Form.Control
                                as="select"
                                name="restaurantRating"
                                value={reviewForm.restaurantRating}
                                onChange={handleReviewFormChange}
                                required
                            >
                                <option value="">Select Rating</option>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="reviewDeliveryAgentRating" className="mb-3">
                            <Form.Label>Delivery Agent Rating</Form.Label>
                            <Form.Control
                                as="select"
                                name="deliveryAgentRating"
                                value={reviewForm.deliveryAgentRating}
                                onChange={handleReviewFormChange}
                                required
                            >
                                <option value="">Select Rating</option>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
