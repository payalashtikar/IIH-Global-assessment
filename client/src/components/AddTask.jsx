
import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, AppBar, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:8080/add", { title }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Task added successfully");
            setTitle("");
            navigate("/tasks");
        } catch (error) {
            alert("Failed to add task");
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
                            {/* <Typography variant="h4">Add Task</Typography> */}
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <TextField required fullWidth margin="normal" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Add Task
                            </Button>
                        </form>
                    </Container>
            }
        </>
    );
};

export default AddTask;
