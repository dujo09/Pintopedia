import { useTheme } from "@emotion/react";
import { Divider, Typography } from "@mui/material";

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
        Ocjena
      </Typography>
      <Typography variant="h6">{beerData.rating}</Typography>
    </>
  );
}
