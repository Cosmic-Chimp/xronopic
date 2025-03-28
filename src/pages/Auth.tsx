import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
} from "../redux/slices/authSlice";
import { login, signup } from "../redux/authUtils/authService";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(loginStart());
            try {
                const token = await login(formData); // Get the token
                dispatch(loginSuccess(token)); // Dispatch the token
                localStorage.setItem("token", token); //store token in localstorage
                navigate("/timelines");
            } catch (error: any) {
                dispatch(loginFailure(error.message));
            }
        } else {
            dispatch(signupStart());
            try {
                const token = await signup(formData); // Get the token
                dispatch(signupSuccess(token)); // Dispatch the token
                localStorage.setItem("token", token); //store token in localstorage
                navigate("/timelines");
            } catch (error: any) {
                dispatch(signupFailure(error.message));
            }
        }
    };

    return (
        <div>
            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button type="submit">{isLogin ? "Login" : "Signup"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Signup" : "Switch to Login"}
            </button>
        </div>
    );
}

export default Auth;
