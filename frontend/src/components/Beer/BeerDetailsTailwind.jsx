import { useTheme } from "@emotion/react";
import { Divider, Rating, Typography } from "@mui/material";
import yellowImage from "../../static/images/Solid_yellow.jpg";

export default function BeerDetailsTailwind({
  beerData,
  manufacturerData,
  handleRateBeer,
}) {
  return (
    <div class="flex-col items-center content-around mx-2">
      <div>
        <img src={yellowImage} alt="Beer" class="m-auto max-w-full max-h-full"/>
      </div>

      <div class="my-5">
        <p class="text-3xl">Postotak alkohola</p>
        <p class="text-xl">{beerData.alcoholPercentage}%</p>
        <hr class="mb-5" />
        
        <p class="text-3xl">Boja</p>
        <p class="text-xl">{beerData.color}</p>
        <hr class="mb-5" />
        
        <p class="text-3xl">Prosječna cijena</p>
        <p class="text-xl">{beerData.averagePrice}</p>
        <hr class="mb-5" />

        <p class="text-3xl">Proizvođač</p>
        <p class="text-xl">{manufacturerData?.name}</p>
        <hr class="mb-5" />

        <p class="text-3xl">Opis okusa</p>
        <p class="text-xl">{beerData.flavorDescription}</p>


      </div>
    </div>
    
    // <>
    //   <Typography style={{ fontWeight: "bold" }} variant="h5">
    //     Prosječna ocjena
    //   </Typography>
    //   <Rating value={beerData.averageRating || 0} precision={0.5} readOnly />
    //   <Divider />

    //   <Typography style={{ fontWeight: "bold" }} variant="h5">
    //     Osobna ocjena
    //   </Typography>
    //   <Rating
    //     value={Number(beerData.userRating) || 0}
    //     precision={0.5}
    //     onChange={(e) => handleRateBeer(beerData._id, e.target.value)}
    //   />
    // </>
  );
}
