import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: "center",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome to Task Management System
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
                    To continue, please register and experience efficient task management.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" color="primary" component={Link} to="/signUp">
                        Register
                    </Button>
                    <Button variant="outlined" color="primary" component={Link} to="/signIn">
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LandingPage;
