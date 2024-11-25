// src/components/CartButton.js
import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartButton({ handleShow, cartItemCount }) {
    return (
        <Button variant="light" onClick={handleShow} style={{ position: 'fixed', top: 20, right: 20 }}>
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
                <Badge pill bg="danger" style={{ position: 'absolute', top: 0, right: 0 }}>
                    {cartItemCount}
                </Badge>
            )}
        </Button>
    );
}
