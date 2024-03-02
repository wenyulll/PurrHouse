import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { loadCartThunk } from "../../store/shoppingCart";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
        else {
            dispatch(loadCartThunk())
        }
    };

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data);
        }
        else {
            dispatch(loadCartThunk())
        }
    };

    return (
        <>
            <h1>Log In</h1>
            <div className="log-in-page-form">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div class="sumbit-demo-buttons">
                        <button class="handle-sumbit" type="submit">Log In</button>
                        <button className="handle-demo-submit" onClick={handleDemoSubmit}>Demo</button>
                    </div>
                </form>
            </div >
        </>
    );
}

export default LoginFormPage;