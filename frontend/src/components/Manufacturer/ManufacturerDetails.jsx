import { Divider, Rating, Typography } from "@mui/material";

export default function ManufacturerDetails({ manufacturerData }) {
  return (
    <>
      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Država
      </Typography>
      <Typography variant="h6">{manufacturerData.country}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Grad
      </Typography>
      <Typography variant="h6">{manufacturerData.city}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Godina osnutka
      </Typography>
      <Typography variant="h6">{manufacturerData.yearEstablished}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Web stranica
      </Typography>
      <Typography variant="h6">{manufacturerData.website}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Opis
      </Typography>
      <Typography variant="h6">{manufacturerData.description}</Typography>
    </>
  );
}
