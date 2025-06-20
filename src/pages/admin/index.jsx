import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleLogin = async () => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include", // важно!
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        });

        if (res.ok) {
            navigate("/admin");
        } else {
            alert("Неверный логин или пароль");
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
