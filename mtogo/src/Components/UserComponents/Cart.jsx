// src/components/CartModal.js
import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export default function Cart({ show, handleClose, cartItems, removeFromCart }) {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);


    const createOrder = () => {
        // You can implement the logic to create an order here
        alert('Order created!');
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
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
                            <th>Name</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.itemName}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => removeFromCart(index)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>${totalPrice.toFixed(2)}</strong></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* You can add a Checkout button here */}
                {cartItems.length > 0 && (
                    <Button variant="primary" onClick={createOrder}>
                        Checkout
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
