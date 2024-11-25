import UserFacade from "../../Facades/UserFacade.js";
import {useState} from "react";

export default function login({setUser,setShowLogin}) {

        const userFacade = new UserFacade();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const handleLogin = async () => {
            try {
                const user = {
                    email,
                    password
                };
                const data = await userFacade.login(user);
                setUser(data);
                setShowLogin(false);
            } catch (error) {
                console.error(error);
            }
        }


        return (
            <div>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );

}