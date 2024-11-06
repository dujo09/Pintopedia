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
import {
  Button,
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
  const { cartItems, addItemQuantity, removeItemQuantity, removeAllItems } =
    useCart();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: "30vw",
        marginLeft: 3,
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
      <Box sx={{ marginTop: 3, display: "flex", flexDirection: "row" }}>
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

      <Box
        sx={{
          marginRight: 3,
          display: "flex",
          flexDirection: "column",
          flex: "1, 1, auto",
        }}
      >
        {cartItems.map((cartItem) => (
          <ShoppingCartItem
            id={cartItem.id}
            name={cartItem.name}
            manufacturer={cartItem.manufacturer}
            quantity={cartItem.quantity}
            price={cartItem.price}
            addQuantity={() => addItemQuantity(cartItem)}
            removeQuantity={() => removeItemQuantity(cartItem.id)}
          />
        ))}

        <Button
          sx={{ marginY: 5 }}
          fullWidth
          variant="outlined"
          onClick={() => removeAllItems()}
        >
          Isprazni košaricu
        </Button>
      </Box>
    </Box>
  );
}
