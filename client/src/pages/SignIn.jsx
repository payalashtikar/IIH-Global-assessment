import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert("Password must contain at least 8 characters");
            return;
        }
        // setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/login", { email, password });
            const token = response.data.data.token
            console.log(response);
            setEmail("");
            setPassword("");

            localStorage.setItem("token", token)
            alert("Login success");
            navigate("/homepage");
            window.location.reload();

        } catch (error) {
            setLoading(false);
            alert("Login failed");
        }
    };
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <>
            {
                loading ?
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <CircularProgress size="3rem" />
                    </div>
                    :
                    <Container maxWidth="sm">
                        <Box sx={{ textAlign: "center", my: 4 }}>
                            <Typography variant="h4">Login</Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                margin="normal"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                Login
                                {/* {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} */}
                            </Button>
                        </form>
                    </Container>
            }
        </>
    );
};

export default Login;
