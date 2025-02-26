import React, { useState } from "react";
import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, Directions as DirectionsIcon } from "@mui/icons-material";

const SearchBar = ({ searchTerm, onSearch }) => {
    return (
        <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, mb: 2, float: "right" }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search tasks"
                inputProps={{ "aria-label": "search tasks" }}
                value={searchTerm}
                onChange={onSearch}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        </Paper>
    );
};

export default SearchBar;
