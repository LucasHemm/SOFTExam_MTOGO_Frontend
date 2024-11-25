import './App.css'
import { useState } from "react";
import { Button } from "react-bootstrap";
import RestaurantOverview from './Components/UserComponents/RestaurantOverview.jsx';
import CreateUser from "./Components/UserComponents/CreateUser.jsx";
import Login from "./Components/UserComponents/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

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
            {showRegister && <CreateUser setUser={setUser} />}
            {user != null && user.customerId > 0 && <RestaurantOverview />}
        </>
    );
}

export default App;
