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
  Divider,
  FilledInput,
  Grid2,
  Input,
  makeStyles,
  OutlinedInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../hooks/useCart";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart() {
  const { cartItems, addItemQuantity, removeItemQuantity } = useCart();
  return (
    <>
      <Box sx={{ marginX: 2, display: "flex", flexDirection: "row" }}>
        <Typography style={{ fontWeight: "bold" }} variant="div" component="h2">
          Košarica
        </Typography>

        <Typography
          variant="div"
          component="h2"
          sx={{ marginLeft: 1, fontWeight: "lighter" }}
          gutterBottom
        >
          ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </Typography>
      </Box>

      <Box sx={{ marginX: 2, display: "flex", flexDirection: "column" }}>
        {cartItems.map((cartItem) => (
          <>
            <ShoppingCartItem
              id={cartItem.id}
              name={cartItem.name}
              manufacturer={cartItem.manufacturer}
              quantity={cartItem.quantity}
              price={cartItem.price}
              addQuantity={() => addItemQuantity(cartItem)}
              removeQuantity={() => removeItemQuantity(cartItem.id)}
            />
            <Divider />
          </>
        ))}
      </Box>
    </>
  );
}
