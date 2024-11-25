import React, { useState } from 'react';
import {Button} from "react-bootstrap";

const CreateUser = () => {
    const [role, setRole] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {

    };

    return (
        <div>
            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                />
                <br/>
                <br/>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    required
                />
                <br/>
                <br/>

                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    className="dropdown"
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
                <br/>
                <br/>
                {role === 'restaurant'


                }

                {role === 'agent'


                }
                {role === 'customer'


                }
                <br/>
                <br/>

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
};

export default CreateUser;
