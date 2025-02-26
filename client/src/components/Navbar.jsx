import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put("http://localhost:8080/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                localStorage.removeItem("token");
                navigate("/signIn");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {isUserLoggedIn ? (
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <Typography variant="h6">Task Management System</Typography>

                        <div>
                            <Button color="inherit" component={Link} to="/homepage">Home</Button>
                            <Button color="inherit" component={Link} to="/create">Add Task</Button>
                            <Button color="inherit" component={Link} to="/tasks">Task List</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </div>
                    </div>

                ) : (
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/signUp">Register</Button>
                        <Button color="inherit" component={Link} to="/signIn">Login</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;