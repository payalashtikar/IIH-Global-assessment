import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        try {
            const response = await axios.post("http://localhost:8080/register", { email, password });
            console.log(response);
            setEmail("");
            setPassword("");
            alert("Registration success");

            navigate("/signIn");
        } catch (error) {
            alert("Registration failed");
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
                            <Typography variant="h4">Register</Typography>
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
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Register
                                {/* {loading ? <CircularProgress size={24} color="inherit" /> : "Register"} */}
                            </Button>
                        </form>
                    </Container>
            }
        </>
    );
};

export default Register;
