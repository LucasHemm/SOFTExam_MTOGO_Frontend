// CreateUser.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import react-datepicker CSS
import RestaurantFacade from '../../Facades/RestaurantFacade.js';
import UserFacade from '../../Facades/UserFacade.js';
import CustomerFacade from '../../Facades/CustomerFacade.js';
import AgentFacade from '../../Facades/AgentFacade.js'; // Ensure this path is correct

const CreateUser = ({ setUser, setRegister }) => {
    const [role, setRole] = useState('');
    const [expirationDate, setExpirationDate] = useState(null); // State for expiration date

    const userFacade = new UserFacade();

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => { // Make the function async
        event.preventDefault(); // Prevent default form submission behavior

        try {
            let user = null;

            switch (role) {
                case 'restaurant':
                    const restaurant = {
                        id: 0,
                        name: event.target.name.value,
                        cuisineType: event.target.cuisineType.value,
                        description: event.target.description.value,
                        phoneNumber: event.target.phoneNumber.value,
                        rating: 0,
                        numberOfRatings: 0,
                        menuItems: [
                        ],
                        address: {
                            id: 0,
                            street: event.target.street.value,
                            city: event.target.city.value,
                            zipCode: event.target.zipCode.value,
                            region: event.target.region.value
                        }
                    };

                    const restaurantFacade = new RestaurantFacade();
                    const createdRestaurant = await restaurantFacade.addRestaurant(restaurant); // Await the promise

                    user = {
                        id:0,
                        email: event.target.email.value,
                        password: event.target.password.value,
                        restaurantId: createdRestaurant.id
                    };
                    const createdUserRestaurant = await userFacade.addUser(user); // Await the promise
                    setUser(createdUserRestaurant);

                    break;

                case 'agent':
                    const agent = {
                        id: 0,
                        name: event.target.name.value,
                        phoneNumber: event.target.phoneNumber.value,
                        region: event.target.region.value,
                        accountNumber: event.target.accountNumber.value,
                        agentId: '',
                        status: 'available',
                        rating: 0,
                        numberOfRatings: 0
                    };
                    const agentFacade = new AgentFacade();
                    const createdAgent = await agentFacade.createAgent(agent); // Await the promise

                    user = {
                        id:0,
                        email: event.target.email.value,
                        password: event.target.password.value,
                        agentId: createdAgent.id
                    };
                    const createdUserAgent = await userFacade.addUser(user); // Await the promise
                    setUser(createdUserAgent);

                    break;

                case 'customer':
                    const customer = {
                        id: 0,
                        email: event.target.email.value,
                        paymentInfoDTO: {
                            id: 0,
                            cardNumber: event.target.cardNumber.value,
                            expirationDate: expirationDate,
                        },
                        addressDTO: {
                            id: 0,
                            street: event.target.street.value,
                            city: event.target.city.value,
                            zipCode: event.target.zipCode.value,
                            region: event.target.region.value
                        }
                    };

                    const customerFacade = new CustomerFacade();
                    const createdCustomer = await customerFacade.createCustomer(customer); // Await the promise

                    user = {
                        id:0,
                        email: event.target.email.value,
                        password: event.target.password.value,
                        customerId: createdCustomer.id
                    };
                    const createdUserCustomer = await userFacade.addUser(user); // Await the promise
                    setUser(createdUserCustomer);

                    break;

                default:
                    alert('Please select a valid role.');
                    return;
            }
            setRegister(false);

            // Optionally, reset the form or provide feedback
            alert('User created successfully!');
            event.target.reset();
            setRole('');
            setExpirationDate(null);
        } catch (error) {
            console.error("Failed to create user:", error);
            alert(`Failed to create user: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>
                {/* Common Fields */}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-control"
                />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="form-control"
                />
                <br />
                <br />

                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    className="form-control dropdown"
                    value={role}
                    onChange={handleRoleChange}
                    required
                >
                    <option value="" disabled>
                        Select a role
                    </option>
                    <option value="restaurant">Restaurant</option>
                    <option value="agent">Agent</option>
                    <option value="customer">Customer</option>
                </select>
                <br />
                <br />

                {/* Role-Specific Fields */}
                {role === 'restaurant' && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="cuisineType">Cuisine Type</label>
                        <input
                            type="text"
                            id="cuisineType"
                            name="cuisineType"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="region">Region</label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            required
                            className="form-control"
                        />
                    </div>
                )}

                {role === 'agent' && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="region">Region</label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="accountNumber">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            required
                            className="form-control"
                        />
                    </div>
                )}

                {role === 'customer' && (
                    <div>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="expirationDate">Expiration Date</label>
                        <DatePicker
                            selected={expirationDate}
                            onChange={(date) => setExpirationDate(date)}
                            id="expirationDate"
                            name="expirationDate"
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Select a date"
                            className="form-control"
                            required
                        />
                        <br />
                        <br />
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            className="form-control"
                        />
                        <br />
                        <br />
                        <label htmlFor="region">Region</label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            required
                            className="form-control"
                        />
                    </div>
                )}
                <br />
                <br />

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
};

export default CreateUser;
