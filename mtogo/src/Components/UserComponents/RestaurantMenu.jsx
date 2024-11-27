// src/components/RestaurantMenu.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import OrderFacade from "../../Facades/OrderFacade.js";

export default function RestaurantMenu({ user, res, setRes }) {
    const orderFacade = new OrderFacade();

    // State for cart items
    const [cartItems, setCartItems] = useState([]);

    // State for modal visibility
    const [showCart, setShowCart] = useState(false);

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add item to cart
    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex >= 0) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    // Function to remove item from cart by index
    const removeFromCart = (index) => {
        const newCart = [...cartItems];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
        } else {
            newCart.splice(index, 1);
        }
        setCartItems(newCart);
    };

    // Functions to handle modal visibility
    const handleShowCart = () => setShowCart(true);
    const handleCloseCart = () => setShowCart(false);

    const createOrder = () => {

        cartItems.map(item => {
            console.log(item)
        });

        let s= '';

        const order = {
            id: 0,
            customerId: user.customerId,
            restaurantId: res.id,
            agentId: 0,
            paymentId: 0,
            orderLinesDTOs: cartItems.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity
            })),
            totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            status: 'Pending',
            receipt: cartItems
                    .map(item => `${item.itemName} x${item.quantity}`)
                    .join(', ') +
                `, Total: $${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`
        };
        orderFacade.createOrder(order);


        setCartItems([]);
        setShowCart(false);
        setRes(null);

        alert('Order placed!');

    }

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            {/* Cart Button */}
            <Button
                variant="light"
                onClick={handleShowCart}
                style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}
            >
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ position: 'absolute', top: 0, right: 0 }}>
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                )}
            </Button>

            <h1>Menu</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Add to Cart</th>
                </tr>
                </thead>
                <tbody>
                {res.menuItems.map(item => (
                    <tr key={item.id}>
                        <td>{item.itemName}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.itemDescription}</td>
                        <td>
                            <img src={item.image} alt={item.itemName} style={{ width: "100px", height: "100px" }} />
                        </td>
                        <td>
                            <Button variant="primary" onClick={() => addToCart(item)}>
                                Add to Cart
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Cart Modal */}
            <Modal show={showCart} onHide={handleCloseCart} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.itemName}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => removeFromCart(index)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3"><strong>Total</strong></td>
                                <td colSpan="2"><strong>${totalPrice.toFixed(2)}</strong></td>
                            </tr>
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCart}>
                        Close
                    </Button>
                    {cartItems.length > 0 && (
                        <Button variant="primary" onClick={createOrder}>
                            Checkout
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}
