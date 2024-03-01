import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            dispatch(loadCartThunk())
            closeModal()
        }
    };

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data);
        } else {
            dispatch(loadCartThunk())
            closeModal()
        }
    };

    return (
        <>
            <h1>Log In</h1>
            <div className="login-form-container">
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
                    <div className="sumbit-demo-buttons">
                        <button className='handle-sumbit' type="submit">Log In</button>
                        <button className="handle-demo-submit" onClick={handleDemoSubmit}>Demo</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginFormModal;