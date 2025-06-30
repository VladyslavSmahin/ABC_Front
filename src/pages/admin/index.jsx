import {useEffect, useState} from 'react'
import axios from 'axios'
import "./style.scss";

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    /*useEffect(() => {
        axios.get(`${API_URL}/auth/me`, { withCredentials: true })
            .then()
    }, [])*/


    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true })
            window.location.href = '/admin'  // перенаправление в админку
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            setError('wrong password')
        }
    }

    return (
        <div className="loginPage">
            <h2>Log in</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Log in</button>
            {error && <p>{error}</p>}
        </div>
    )
}