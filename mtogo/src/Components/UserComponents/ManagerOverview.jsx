// import { useEffect, useState } from "react";
// import { Tabs, Tab, Table, Button } from "react-bootstrap";
// import ManagerFacade from "../../facades/ManagerFacade";
//
// export default function ManagerOverview({ user, setUser, setShowLogin }) {
//     const [restaurants, setRestaurants] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [agents, setAgents] = useState([]);
//     const managerFacade = new ManagerFacade();
//
//     // Fetch data functions
//     const fetchRestaurants = () => {
//         managerFacade.getRestaurants()
//             .then(data => setRestaurants(data))
//             .catch(error => console.error("Error fetching restaurants:", error));
//     };
//
//     const fetchCustomers = () => {
//         managerFacade.getCustomers()
//             .then(data => setCustomers(data))
//             .catch(error => console.error("Error fetching customers:", error));
//     };
//
//     const fetchOrders = () => {
//         managerFacade.getOrders()
//             .then(data => setOrders(data))
//             .catch(error => console.error("Error fetching orders:", error));
//     };
//
//     const fetchAgents = () => {
//         managerFacade.getAgents()
//             .then(data => setAgents(data))
//             .catch(error => console.error("Error fetching agents:", error));
//     };
//
//     // Logout function
//     const handleLogout = () => {
//         setUser(null); // Clear user state
//         setShowLogin(true); // Redirect to login page
//         localStorage.removeItem("user"); // Clear saved user data
//     };
//
//     useEffect(() => {
//         fetchRestaurants();
//         fetchCustomers();
//         fetchOrders();
//         fetchAgents();
//     }, []);
//
//     return (
//         <div className="container mt-4">
//             <h1>Manager Overview</h1>
//
//             <Tabs defaultActiveKey="restaurants" className="mb-3">
//                 {/* Restaurants Tab */}
//                 <Tab eventKey="restaurants" title="Restaurants">
//                     <div className="mb-3 d-flex justify-content-end">
//                         <Button variant="primary" onClick={fetchRestaurants}>
//                             Reload Restaurants
//                         </Button>
//                     </div>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>Phone</th>
//                             <th>Rating</th>
//                             <th>Number of Ratings</th>
//                             <th>Cuisine Type</th>
//                             <th>Description</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {restaurants.length > 0 ? (
//                             restaurants.map(restaurant => (
//                                 <tr key={restaurant.id}>
//                                     <td>{restaurant.name}</td>
//                                     <td>
//                                         {restaurant.address
//                                             ? `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.zipCode}, ${restaurant.address.region}`
//                                             : "No address available"}
//                                     </td>
//                                     <td>{restaurant.phoneNumber}</td>
//                                     <td>{restaurant.rating.toFixed(1)}</td>
//                                     <td>{restaurant.numberOfRatings}</td>
//                                     <td>{restaurant.cuisineType}</td>
//                                     <td>{restaurant.description}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center">
//                                     No restaurants found.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </Table>
//                 </Tab>
//
//                 {/* Customers Tab */}
//                 <Tab eventKey="customers" title="Customers">
//                     <div className="mb-3 d-flex justify-content-end">
//                         <Button variant="primary" onClick={fetchCustomers}>
//                             Reload Customers
//                         </Button>
//                     </div>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Email</th>
//                             <th>Payment Info</th>
//                             <th>Address</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {customers.length > 0 ? (
//                             customers.map(customer => (
//                                 <tr key={customer.id}>
//                                     <td>{customer.id}</td>
//                                     <td>{customer.email}</td>
//                                     <td>{customer.paymentInfoDTO?.cardNumber || "N/A"}</td>
//                                     <td>
//                                         {customer.addressDTO
//                                             ? `${customer.addressDTO.street}, ${customer.addressDTO.city}, ${customer.addressDTO.zipCode}, ${customer.addressDTO.region}`
//                                             : "No address available"}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4" className="text-center">
//                                     No customers found.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </Table>
//                 </Tab>
//
//                 {/* Orders Tab */}
//                 <Tab eventKey="orders" title="Orders">
//                     <div className="mb-3 d-flex justify-content-end">
//                         <Button variant="primary" onClick={fetchOrders}>
//                             Reload Orders
//                         </Button>
//                     </div>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Order Number</th>
//                             <th>Customer ID</th>
//                             <th>Agent ID</th>
//                             <th>Restaurant ID</th>
//                             <th>Status</th>
//                             <th>Total Price</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {orders.length > 0 ? (
//                             orders.map(order => (
//                                 <tr key={order.id}>
//                                     <td>{order.id}</td>
//                                     <td>{order.orderNumber}</td>
//                                     <td>{order.customerId}</td>
//                                     <td>{order.agentId}</td>
//                                     <td>{order.restaurantId}</td>
//                                     <td>{order.status}</td>
//                                     <td>{order.totalPrice}</td>
//                                     <td>{order.receipt}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center">
//                                     No orders found.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </Table>
//                 </Tab>
//
//                 {/* Agents Tab */}
//                 <Tab eventKey="agents" title="Agents">
//                     <div className="mb-3 d-flex justify-content-end">
//                         <Button variant="primary" onClick={fetchAgents}>
//                             Reload Agents
//                         </Button>
//                     </div>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Phone</th>
//                             <th>Account Number</th>
//                             <th>Agent ID</th>
//                             <th>Status</th>
//                             <th>Region</th>
//                             <th>Rating</th>
//                             <th>Number of Ratings</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {agents.length > 0 ? (
//                             agents.map(agent => (
//                                 <tr key={agent.id}>
//                                     <td>{agent.id}</td>
//                                     <td>{agent.name}</td>
//                                     <td>{agent.phoneNumber}</td>
//                                     <td>{agent.accountNumber}</td>
//                                     <td>{agent.agentId}</td>
//                                     <td>{agent.status}</td>
//                                     <td>{agent.region}</td>
//                                     <td>{agent.rating.toFixed(1)}</td>
//                                     <td>{agent.numberOfRatings}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="text-center">
//                                     No agents found.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </Table>
//                 </Tab>
//             </Tabs>
//         </div>
//     );
// }
