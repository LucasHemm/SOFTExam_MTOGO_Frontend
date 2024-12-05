import './App.css'
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import RestaurantOverview from './Components/UserComponents/RestaurantOverview.jsx';
import CreateUser from "./Components/UserComponents/CreateUser.jsx";
import Login from "./Components/UserComponents/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantMenu from "./Components/UserComponents/RestaurantMenu.jsx";
import AgentOverview from "./Components/UserComponents/AgentOverview.jsx";
import RestaurantManager from "./Components/UserComponents/RestaurantManager.jsx";
// import ManagerOverview from "./Components/UserComponents/ManagerOverview.jsx";





function App() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [restaurant, setRestaurant] = useState(null);

    const handleShowLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleShowRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleLogout = () => {
        setUser(null); // Clear user state
        setShowLogin(true); // Redirect to login page
        localStorage.removeItem("user"); // Clear saved user data
    };


    return (
        <>
            {user == null && (
                <div>
                    <Button onClick={handleShowLogin}>Login</Button>
                    <Button onClick={handleShowRegister}>Register</Button>
                </div>
            )}
            {user != null && <div className="mb-3 d-flex justify-content-end">
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>}
            {showLogin && <Login setUser={setUser} setShowLogin={setShowLogin}/>}
            {showRegister && <CreateUser setUser={setUser} setRegister={setShowRegister}/>}
            {user != null && user.customerId > 0 && !restaurant && (
                <RestaurantOverview restaurant={restaurant} setRestaurant={setRestaurant} />
            )}
            {user != null && user.customerId > 0 && restaurant && (
                <RestaurantMenu user={user} res={restaurant} setRes={setRestaurant} />
            )}
            {user != null && user.agentId > 0 && <AgentOverview user={user} />}
            {user != null && user.restaurantId > 0 && <RestaurantManager user={user} />}
            {/*{user != null && user.managerId > 0 && (*/}
            {/*    <ManagerOverview user={user} setUser={setUser} setShowLogin={setShowLogin} handleLogout={handleLogout} />*/}
            {/*)}*/}
        </>
    );
}

export default App;
