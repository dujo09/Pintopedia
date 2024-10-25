import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import yellowImage from "../../static/images/Solid_yellow.png";
import {
  Button,
  FilledInput,
  Grid2,
  Input,
  makeStyles,
  OutlinedInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function ShoppingCartItem({
  name,
  manufacturer,
  quantity,
  price,
  addQuantity,
  removeQuantity,
}) {
  return (
    <Card
      sx={{
        minWidth: 500,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <CardMedia sx={{ width: 151 }} image={yellowImage} />

      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography color="textSecondary" gutterBottom>
          {manufacturer}
        </Typography>

        <Typography
          sx={{ textTransform: "uppercase" }}
          variant="div"
          component="h2"
          gutterBottom
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton variant="contained" onClick={removeQuantity}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton variant="contained" onClick={addQuantity}>
              <AddIcon />
            </IconButton>
          </Box>

          <Typography variant="h6">$100</Typography>
        </Box>
      </CardContent>
    </Card>

    //   <CardContent sx={{flex: "1 0 auto"}}>
    //     <Typography variant="div" component="h2" gutterBottom>
    //       {name}
    //     </Typography>

    //     <Grid2 container>
    //     <Grid2 item size={{xs: 9}}>
    //       <Typography
    //           variant="body1"
    //           component="div"
    //           style={{ fontWeight: "bold" }}
    //         >
    //           Price
    //         </Typography>
    //       </Grid2>
    //       <Grid2 item size={{xs: 3}}>
    //       <Typography variant="h6" component="div" color="secondary">
    //           $100
    //         </Typography>
    //       </Grid2>

    //       <Grid2 item size={{xs: 3}}>
    //         <IconButton variant="contained"><RemoveIcon /></IconButton>
    //       </Grid2>
    //       <Grid2 item size={{xs: 6}}>
    //         <Typography variant="h6">
    //           {quantity}
    //         </Typography>
    //       </Grid2>
    //       <Grid2 item size={{xs: 3}}>
    //         <IconButton variant="contained"><AddIcon /></IconButton>
    //       </Grid2>
    //     </Grid2>
    //   </CardContent>
    // </Card>

    // <Card sx={{display: "flex", marginTop: 5}}>
    //   <CardMedia
    //     sx={{width: 151}}
    //     image={yellowImage}
    //     title="Live from space album cover"
    //   />
    //   <CardContent sx={{flex: "1 0 auto"}}>
    //     <Typography variant="div" component="h2" gutterBottom>
    //       {name}
    //     </Typography>

    //     <Grid2 container>
    //     <Grid2 item size={{xs: 9}}>
    //       <Typography
    //           variant="body1"
    //           component="div"
    //           style={{ fontWeight: "bold" }}
    //         >
    //           Price
    //         </Typography>
    //       </Grid2>
    //       <Grid2 item size={{xs: 3}}>
    //       <Typography variant="h6" component="div" color="secondary">
    //           $100
    //         </Typography>
    //       </Grid2>

    //       <Grid2 item size={{xs: 3}}>
    //         <IconButton variant="contained"><RemoveIcon /></IconButton>
    //       </Grid2>
    //       <Grid2 item size={{xs: 6}}>
    //         <Typography variant="h6">
    //           {quantity}
    //         </Typography>
    //       </Grid2>
    //       <Grid2 item size={{xs: 3}}>
    //         <IconButton variant="contained"><AddIcon /></IconButton>
    //       </Grid2>
    //     </Grid2>
    //   </CardContent>
    // </Card>
  );
}
