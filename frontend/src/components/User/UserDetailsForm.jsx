import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import yellowImage from "../../static/images/user.webp";
import UserDetails from "./UserDetails";
import userService from "./UserService";
import UserForm from "./UserForm";

export default function UserDetailsForm() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [isViewMode, setViewMode] = useState(!!userId);
  const theme = useTheme();

  const handleSubmit = async function (values) {
    try {
      const updatedUserData = await userService.updateUserById(userId, values);
      setUserData(updatedUserData);
      setViewMode(true);
    } catch (err) {
      console.log("Error updating User: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await userService.getUserById(userId);
          setUserData(userData);
        }
      } catch (err) {
        console.log("Error getting user data: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.lighter,
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
          borderRadius: "2px",
        },
      }}
    >
      <Grid2
        sx={{
          marginY: 3,
          marginX: 2,
        }}
        container
        spacing={3}
      >
        <Grid2 size={{ xs: 12, md: 11 }}>
          {isViewMode ? (
            <Typography variant="h4">Detalji - {userData.username}</Typography>
          ) : (
            <Typography variant="h4">Uređivanje</Typography>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 1 }}>
          {isViewMode ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setViewMode(false)}
            >
              Uredi
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setViewMode(true);
              }}
            >
              Odustani
            </Button>
          )}
        </Grid2>

        <Grid2 size={12}>
          <Divider />
        </Grid2>

        <Grid2
          sx={{
            marginX: "auto",
            marginY: 0,
            [theme.breakpoints.only("xs")]: {
              width: "95%",
              height: "95%",
            },
            [theme.breakpoints.up("md")]: {
              width: "40%",
              height: "40%",
            },
          }}
          size={{ xs: 12, md: 6 }}
        >
          <img
            style={{
              display: "block",
              maxWidth: "70%",
              maxHeight: "70%",
              width: "auto",
              height: "auto",
            }}
            src={yellowImage}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          {isViewMode ? (
            <UserDetails userData={userData} />
          ) : (
            <UserForm userData={userData} handleSubmit={handleSubmit} />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
