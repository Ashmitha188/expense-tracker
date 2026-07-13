import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>💰 SpendWise</h1>

                <p>Create your account</p>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="register-btn"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

                <p className="login-link">
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

        </div>

    );

}

export default Register;