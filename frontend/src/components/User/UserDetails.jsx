import { useTheme } from "@emotion/react";
import { Divider, Rating, Typography } from "@mui/material";

export default function UserDetails({ userData }) {
  return (
    <>
      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Ime
      </Typography>
      <Typography variant="h6">
        {userData.firstName} {userData.lastName}
      </Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Email
      </Typography>
      <Typography variant="h6">{userData.email}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Država
      </Typography>
      <Typography variant="h6">{userData.country}</Typography>
    </>
  );
}
