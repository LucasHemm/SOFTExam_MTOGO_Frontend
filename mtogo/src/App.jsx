import './App.css'
import { useState } from "react";
import { Button } from "react-bootstrap";
import RestaurantOverview from './Components/UserComponents/RestaurantOverview.jsx';
import CreateUser from "./Components/UserComponents/CreateUser.jsx";
import Login from "./Components/UserComponents/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantMenu from "./Components/UserComponents/RestaurantMenu.jsx";





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

    return (
        <>
            {user == null && (
                <div>
                    <Button onClick={handleShowLogin}>Login</Button>
                    <Button onClick={handleShowRegister}>Register</Button>
                </div>
            )}
            {showLogin && <Login setUser={setUser} setShowLogin={setShowLogin} />}
            {showRegister && <CreateUser setUser={setUser} setRegister={setShowRegister} />}
            {user != null && user.customerId > 0 && !restaurant && <RestaurantOverview restaurant={restaurant} setRestaurant={setRestaurant}/>}
            {user != null && user.customerId > 0 && restaurant && <RestaurantMenu user={user} res={restaurant}/>}


        </>
    );
}

export default App;
