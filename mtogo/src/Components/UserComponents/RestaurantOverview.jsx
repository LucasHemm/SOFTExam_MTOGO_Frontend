import { useEffect, useState } from "react";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RestaurantOverview({ restaurant, setRestaurant }) {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        region: '',
        cuisineType: '',
        minRating: ''
    });

    const restaurantFacade = new RestaurantFacade();

    useEffect(() => {
        restaurantFacade.getAllRestaurants()
            .then(data => {
                setRestaurants(data);
                setFilteredRestaurants(data); // Initialize filtered restaurants
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Apply filters whenever the filters or restaurants change
        let filtered = restaurants;

        // Filter by name
        if (filters.name) {
            filtered = filtered.filter(restaurant =>
                restaurant.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Filter by region
        if (filters.region) {
            filtered = filtered.filter(restaurant =>
                restaurant.address.region === filters.region
            );
        }

        // Filter by cuisine type
        if (filters.cuisineType) {
            filtered = filtered.filter(restaurant =>
                restaurant.cuisineType === filters.cuisineType
            );
        }

        // Filter by minimum rating
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

    // Extract unique regions and cuisine types for the dropdowns
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
        console.log(restaurant);
        setRestaurant(restaurant);
    };

    return (
        <div className="container mt-4">
            <h1>Restaurants</h1>

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
        </div>
    );
}
