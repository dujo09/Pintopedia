import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string("Unesi polje").required("Polje je obavezno"),
  alcoholPercentage: yup.string("Unesi polje").required("Polje je obavezno"),
  color: yup.string("Unesi polje").required("Polje je obavezno"),
  averagePrice: yup.string("Unesi polje").required("Polje je obavezno"),
  rating: yup.string("Unesi polje").required("Polje je obavezno"),
  flavorDescription: yup.string("Unesi polje").required("Polje je obavezno"),
  manufacturer: yup.string("Unesi polje").required("Polje je obavezno"),
});

export default function BeerForm({ beerData, manufacturers, handleSubmit }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: beerData.name || "",
      alcoholPercentage: beerData.alcoholPercentage || "",
      color: beerData.color || "",
      averagePrice: beerData.averagePrice || "",
      rating: beerData.rating || "",
      flavorDescription: beerData.flavorDescription || "",
      manufacturer: beerData.manufacturer || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    console.log("Beer data in this form: " + beerData.name);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        required
        fullWidth
        error={formik.touched.name && Boolean(formik.errors.name)}
        margin="normal"
      >
        <FormLabel htmlFor="name">Naziv</FormLabel>
        <OutlinedInput
          name="name"
          type="string"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.name && formik.errors.name}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          formik.touched.alcoholPercentage &&
          Boolean(formik.errors.alcoholPercentage)
        }
        margin="normal"
      >
        <FormLabel htmlFor="alcoholPercentage">Postotak alkohola</FormLabel>
        <OutlinedInput
          name="alcoholPercentage"
          type="number"
          id="alcoholPercentage"
          value={formik.values.alcoholPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.alcoholPercentage && formik.errors.alcoholPercentage
          }
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.color && Boolean(formik.errors.color)}
        margin="normal"
      >
        <FormLabel htmlFor="color">Boja</FormLabel>
        <OutlinedInput
          name="color"
          type="string"
          id="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.color && formik.errors.color}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          formik.touched.averagePrice && Boolean(formik.errors.averagePrice)
        }
        margin="normal"
      >
        <FormLabel htmlFor="averagePrice">Prosječna cijena</FormLabel>
        <OutlinedInput
          name="averagePrice"
          type="number"
          id="averagePrice"
          value={formik.values.averagePrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.averagePrice && formik.errors.averagePrice}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.rating && Boolean(formik.errors.rating)}
        margin="normal"
      >
        <FormLabel htmlFor="rating">Ocjena</FormLabel>
        <OutlinedInput
          name="rating"
          type="number"
          id="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.rating && formik.errors.rating}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          formik.touched.flavorDescription &&
          Boolean(formik.errors.flavorDescription)
        }
        margin="normal"
      >
        <FormLabel htmlFor="flavorDescription">Opis okusa</FormLabel>
        <OutlinedInput
          name="flavorDescription"
          type="string"
          id="flavorDescription"
          multiline
          rows={4}
          value={formik.values.flavorDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.flavorDescription && formik.errors.flavorDescription
          }
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          formik.touched.manufacturerId && Boolean(formik.errors.manufacturer)
        }
        margin="normal"
      >
        <FormLabel htmlFor="manufacturer">Proizvođač</FormLabel>
        <Select
          fullWidth
          id="manufacturer"
          name="manufacturer"
          value={formik.values.manufacturer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {manufacturers.map((manufacturer) => (
            <MenuItem
              key={`manufacturer-field-${manufacturer.id}`}
              value={manufacturer.id}
            >
              {manufacturer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{ marginTop: 5 }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Spremi
      </Button>
    </form>
  );
}
