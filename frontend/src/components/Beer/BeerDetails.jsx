import { useTheme } from "@emotion/react";
import { Divider, Rating, Typography } from "@mui/material";

export default function BeerDetails({ beerData, manufacturerData }) {
  const theme = useTheme();

  return (
    <>
      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Postotak alkohola
      </Typography>
      <Typography variant="h6">{beerData.alcoholPercentage}%</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Boja
      </Typography>
      <Typography variant="h6">{beerData.color}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Prosječna cijena
      </Typography>
      <Typography variant="h6">{beerData.averagePrice}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Opis okusa
      </Typography>
      <Typography variant="h6">{beerData.flavorDescription}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Proizvođač
      </Typography>
      <Typography variant="h6">{manufacturerData?.name}</Typography>
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Prosječna ocjena
      </Typography>
      <Rating value={beerData.averageRating || 0} precision={0.5} readOnly />
      <Divider />

      <Typography style={{ fontWeight: "bold" }} variant="h5">
        Osobna ocjena
      </Typography>
      <Rating value={beerData.userRating || 0} precision={0.5} readOnly />
    </>
  );
}
