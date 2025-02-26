import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, AppBar, Toolbar, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function OutlinedCard() {
    const [taskCounts, setTaskCounts] = useState({ totalTasks: 0, completeTasks: 0, pendingTasks: 0 });
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        const fetchTaskCounts = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/getCount", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTaskCounts(response.data);
                setLoading(false)

            } catch (error) {
                console.error("Failed to fetch task counts", error);
            }
        };
        setTimeout(() => {
            fetchTaskCounts();
        }, 1000)
    }, []);

    return (
        <>
            {
                loading
                    ?
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <CircularProgress size="3rem" />
                    </div>
                    :

                    <Container sx={{ mt: 10 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
                                        <Typography color="textSecondary">Total Tasks</Typography>
                                        <Typography variant="h5">{taskCounts.totalTasks ? taskCounts.totalTasks : 0}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
                                        <Typography color="textSecondary">Completed Tasks</Typography>
                                        <Typography variant="h5">{taskCounts.completeTasks}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ width: 200 }}>
                                    <CardContent>
                                        <Typography color="textSecondary">Pending Tasks</Typography>
                                        <Typography variant="h5">{taskCounts.pendingTasks}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
            }
        </>
    );
}
