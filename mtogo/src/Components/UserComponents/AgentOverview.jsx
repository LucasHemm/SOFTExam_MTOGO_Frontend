import { useState, useEffect } from "react";
import OrderFacade from "../../Facades/OrderFacade.js";
import { Button, Table, Modal, Spinner, Alert } from "react-bootstrap";
import CustomerFacade from "../../Facades/CustomerFacade.js";
import RestaurantFacade from "../../Facades/RestaurantFacade.js";
import PaymentFacade from "../../Facades/PaymentFacade.js";
import AgentFacade from "../../Facades/AgentFacade.js";

// Instantiate facades outside the component to ensure they are created only once
const orderFacade = new OrderFacade();
const customerFacade = new CustomerFacade();
const restaurantFacade = new RestaurantFacade();
const paymentFacade = new PaymentFacade();
const agentFacade = new AgentFacade();

export default function AgentOverview({ user }) { // Destructure props if needed
    const [pendingOrders, setPendingOrders] = useState([]);
    const [restaurants, setRestaurants] = useState({});
    const [customers, setCustomers] = useState({});
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true); // Optional: To handle loading states
    const [error, setError] = useState(null); // Optional: To handle errors

    // States for the active orders modal
    const [showModal, setShowModal] = useState(false);
    const [activeOrders, setActiveOrders] = useState([]);
    const [loadingActiveOrders, setLoadingActiveOrders] = useState(false);
    const [errorActiveOrders, setErrorActiveOrders] = useState(null);

    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
            try {
                // Fetch agent data
                const agentData = await agentFacade.getAgentById(user.agentId);
                setAgent(agentData);

                // Fetch pending orders
                const orders = await orderFacade.getPendingOrders();
                setPendingOrders(orders);

                // Extract unique restaurant and customer IDs to avoid duplicate fetches
                const restaurantIds = [...new Set(orders.map(order => order.restaurantId))];
                const customerIds = [...new Set(orders.map(order => order.customerId))];

                // Fetch all restaurant and customer data in parallel
                const [restaurantsData, customersData] = await Promise.all([
                    Promise.all(restaurantIds.map(id => restaurantFacade.getRestaurantById(id))),
                    Promise.all(customerIds.map(id => customerFacade.getCustomerById(id)))
                ]);

                // Process and store restaurant data
                const restaurantsMap = {};
                restaurantsData.forEach(data => {
                    restaurantsMap[data.id] = data;
                });
                setRestaurants(restaurantsMap);

                // Process and store customer data
                const customersMap = {};
                customersData.forEach(data => {
                    customersMap[data.id] = data;
                });
                setCustomers(customersMap);

                setLoading(false); // Update loading state
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, [user.agentId]); // Add user.agentId as a dependency if it can change

    const getRestaurantInfo = (id) => {
        const restaurant = restaurants[id];
        if (restaurant) {
            return `${restaurant.name} (${restaurant.address.street}, ${restaurant.address.city} ${restaurant.address.zipCode})`;
        }
        return "Loading...";
    };

    const getCustomerInfo = (id) => {
        const customer = customers[id];
        if (customer) {
            return `${customer.email} (${customer.addressDTO.street}, ${customer.addressDTO.city} ${customer.addressDTO.zipCode})`;
        }
        return "Loading...";
    };

    const handleAcceptOrder = async (order) => { // Expect the entire order object
        if (!agent) {
            console.error("Agent data is not available.");
            return;
        }

        try {
            // Assuming order.totalPrice exists. Adjust as needed.
            const payment = await paymentFacade.createPayment({
                totalPrice: order.totalPrice, // Use specific property
                agentRating: agent.rating
            });

            const updatedOrder = { ...order, status: "accepted" }; // Assuming payment has an id
            await orderFacade.updateOrder(updatedOrder, payment.id, agent.id);

            // Update the UI by removing the accepted order
            setPendingOrders(prevOrders => prevOrders.filter(o => o.id !== order.id));
        } catch (error) {
            console.error("Failed to accept order:", error);
            // Optionally, set an error state here to inform the user
        }
    };

    // Handlers for the active orders modal
    const handleShowModal = async () => {
        setShowModal(true);
        setLoadingActiveOrders(true);
        setErrorActiveOrders(null);
        try {
            const orders = await orderFacade.getOrdersByAgentId(agent.id);
            setActiveOrders(orders);

            // Extract unique restaurant and customer IDs to avoid duplicate fetches
            const restaurantIds = [...new Set(orders.map(order => order.restaurantId))];
            const customerIds = [...new Set(orders.map(order => order.customerId))];

            // Fetch all restaurant and customer data in parallel
            const [restaurantsData, customersData] = await Promise.all([
                Promise.all(restaurantIds.map(id => restaurantFacade.getRestaurantById(id))),
                Promise.all(customerIds.map(id => customerFacade.getCustomerById(id)))
            ]);

            // Process and store restaurant data
            const restaurantsMap = { ...restaurants };
            restaurantsData.forEach(data => {
                restaurantsMap[data.id] = data;
            });
            setRestaurants(restaurantsMap);

            // Process and store customer data
            const customersMap = { ...customers };
            customersData.forEach(data => {
                customersMap[data.id] = data;
            });
            setCustomers(customersMap);

            setLoadingActiveOrders(false);
        } catch (err) {
            console.error("Error fetching active orders:", err);
            setErrorActiveOrders("Failed to fetch active orders. Please try again later.");
            setLoadingActiveOrders(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActiveOrders([]);
        setErrorActiveOrders(null);
    };

    const handleDeliveredOrder = async (order) => {
        try {
            const updatedOrder = { ...order, status: "delivered" };
            await orderFacade.deliverOrder(updatedOrder);

            // Update the UI by removing the delivered order
            setActiveOrders(prevOrders => prevOrders.filter(o => o.id !== order.id));
        } catch (error) {
            console.error("Failed to mark order as delivered:", error);
            // Optionally, set an error state here to inform the user
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ); // Enhanced loading indicator
    }

    if (error) {
        return <Alert variant="danger">Error: {error}</Alert>; // Enhanced error message
    }

    return (
        <div className="container mt-4">
            <h1>Agent Overview</h1>
            <Button variant="secondary" className="mb-3" onClick={handleShowModal}>
                See your active orders
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pendingOrders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{getCustomerInfo(order.customerId)}</td>
                        <td>{getRestaurantInfo(order.restaurantId)}</td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={() => handleAcceptOrder(order)} // Pass the entire order
                                disabled={!agent} // Optional: Disable if agent is not loaded
                            >
                                Accept
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Modal for Active Orders */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Your Active Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingActiveOrders ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : errorActiveOrders ? (
                        <Alert variant="danger">Error: {errorActiveOrders}</Alert>
                    ) : activeOrders.length === 0 ? (
                        <p>You have no active orders.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Restaurant</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {activeOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{getCustomerInfo(order.customerId)}</td>
                                    <td>{getRestaurantInfo(order.restaurantId)}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => handleDeliveredOrder(order)}
                                            disabled={order.status === "delivered"}
                                        >
                                            Delivered
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
