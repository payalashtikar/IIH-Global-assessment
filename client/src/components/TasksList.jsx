import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Checkbox,
    Button,
    MenuItem,
    Select,
    CircularProgress
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import SearchBar from "./Search";

const itemsPerPage = 10;

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const fetchTasks = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/get", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data.data);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        setTimeout(() => {
            fetchTasks();
        }, 1000)
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDelete = async (taskId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8080/delete/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleStatusChange = async (taskId, isChecked) => {
        const newStatus = isChecked ? "Complete" : "Pending";
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch(
                `http://localhost:8080/updateStatus/${taskId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === taskId ? { ...task, status: newStatus } : task
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };


    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
        .filter(task => statusFilter === "All" || task.status === statusFilter);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

    return (

        <>
            {
                loading ?
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <CircularProgress size="3rem" />
                    </div>
                    :

                    <Container>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                displayEmpty
                                sx={{ width: 150 }}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Complete">Complete</MenuItem>
                            </Select>
                        </Box>

                        <TableContainer component={Paper} style={{ minHeight: "100vh", display: 'flex', flexDirection: "column", justifyContent: "space-between" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task Title</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentData.map((task) => (
                                        <TableRow key={task._id}>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={task.status === "Complete"}
                                                    onChange={(e) => handleStatusChange(task._id, e.target.checked)}
                                                />
                                                {task.status}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color="secondary" onClick={() => handleDelete(task._id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box sx={{ textAlign: "right", m: 2 }}>
                                <Button variant="outlined" onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                                    Previous
                                </Button>
                                {currentPage}
                                <Button variant="outlined" onClick={() => setCurrentPage((prev) => prev + 1)} disabled={startIndex + itemsPerPage >= filteredTasks.length}>
                                    Next
                                </Button>
                            </Box>
                        </TableContainer>

                    </Container>
            }
        </>
    );
};

export default TaskList;
