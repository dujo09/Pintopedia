import React, { useCallback, useEffect, useRef, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { debounce } from "lodash";
import { useCart } from "../../hooks/useCart";
import LockResetIcon from '@mui/icons-material/LockReset';
import userService from "./UserService";

function UserView(user) {
  this.id = user._id;
  this.username = user.username;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.country = user.country;
  this.role = user.role;
}

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { userSession } = useAuth();

  const usersTableHeaderCells = [
    {
      id: "username",
      numeric: false,
      label: "Korisnička oznaka",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "firstName",
      numeric: false,
      label: "Ime",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "lastName",
      numeric: false,
      label: "Prezime",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "email",
      numeric: false,
      label: "Email",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "role",
      numeric: false,
      label: "Uloga",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "changePasswordLink",
      label: "Promjeni lozinku",
      numeric: false,
      disablePadding: true,
      enableSort: false,
      renderField: (value, userId) => {
        return (
          <IconButton
            onClick={async (event) => {
              event.stopPropagation(); 
              navigate(`/users/change-password/${userId}`)
            }}
            color="primary"
          >
            <LockResetIcon />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAllUsers();
        const users = response.map((item) => new UserView(item));
        setUsers(users);
      } catch (err) {
        console.log("Error getting users: ", err);
      }
    };

    fetchData();
  }, []);

  const handleRowSelect = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  const handleClickDetails = () => {
    if (!selectedItem) return;
    navigate(`/users/${selectedItem.id}`);
  };

  return (
    <Box
      sx={{
        marginX: 5,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" component="div">
        Pive
      </Typography>

      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickDetails}
          disabled={!selectedItem}
          sx={{ marginLeft: ".25rem" }}
        >
          Detalji
        </Button>
      </Box>

      <SharedTable
        headCells={usersTableHeaderCells}
        rows={users}
        onRowSelect={handleRowSelect}
        selectedItem={selectedItem}
      />
    </Box>
  );
}
