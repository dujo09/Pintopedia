import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import beerService from "./BeerService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const validationSchema = yup.object({
  name: yup.string("Unesi polje").required("Polje je obavezno"),
  alcoholPercentage: yup.string("Unesi polje").required("Polje je obavezno"),
  color: yup.string("Unesi polje").required("Polje je obavezno"),
  averagePrice: yup.string("Unesi polje").required("Polje je obavezno"),
  rating: yup.string("Unesi polje").required("Polje je obavezno"),
  flavorDescription: yup.string("Unesi polje").required("Polje je obavezno"),
  manufacturer: yup.string("Unesi polje").required("Polje je obavezno"),
});

export default function BeerDetailsForm() {
  const { beerId } = useParams();
  const [beerData, setBeerData] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [isViewMode, setViewMode] = useState(!!beerId);
  const { userSession } = useAuth();

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
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async function (values) {
    if (beerId) updateBeer(values);
    else createBeer(values);
    setViewMode(true);
  };

  async function updateBeer(values) {
    try {
      const updatedBeerData = await beerService.updateBeerById(beerId, values);
      setBeerData(updatedBeerData);
    } catch (err) {
      console.log("Error updating Beer: ", err);
      formik.resetForm();
    }
  }

  async function createBeer(values) {
    try {
      const createdBeerData = await beerService.createBeer(values);
      setBeerData(createdBeerData);
    } catch (err) {
      console.log("Error creating Beer: ", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (beerId) {
          const beerData = await beerService.getBeerById(beerId);
          setBeerData(beerData);
        }

        const manufacturers =
          await beerService.getAllManufacturersForDropdown();
        const manufacturersData = manufacturers.map((manufacturer) => {
          return {
            id: manufacturer._id,
            name: manufacturer.name,
          };
        });
        setManufacturers(manufacturersData);
      } catch (err) {
        console.log("Error getting beer data: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {userSession.role === "admin" && isViewMode && (
        <Button variant="contained" onClick={() => setViewMode(false)}>
          Uredi
        </Button>
      )}
      <form onSubmit={formik.handleSubmit}>
        {isViewMode ? (
          <>
            <Typography variant="h5">NAZIV: {formik.values.name}</Typography>
            <Typography variant="h5">
              POSTOTAK ALKOHOLA: {formik.values.alcoholPercentage}
            </Typography>
            <Typography variant="h5">BOJA: {formik.values.color}</Typography>
            <Typography variant="h5">
              PROSJEČNA CIJENA: {formik.values.averagePrice}
            </Typography>
            <Typography variant="h5">OCJENA: {formik.values.rating}</Typography>
            <Typography variant="h5">
              OPIS OKUSA: {formik.values.flavorDescription}
            </Typography>
            {/* <Typography variant="h5">
              PROIZVOĐAČ:
              {
                manufacturers.find(
                  (item) => item.id === formik.values.manufacturer,
                ).name
              }
            </Typography> */}
          </>
        ) : (
          <>
            <FormControl
              disabled={isViewMode}
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
              disabled={isViewMode}
              required
              fullWidth
              error={
                formik.touched.alcoholPercentage &&
                Boolean(formik.errors.alcoholPercentage)
              }
              margin="normal"
            >
              <FormLabel htmlFor="alcoholPercentage">
                Postotak alkohola
              </FormLabel>
              <OutlinedInput
                name="alcoholPercentage"
                type="number"
                id="alcoholPercentage"
                value={formik.values.alcoholPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.alcoholPercentage &&
                  formik.errors.alcoholPercentage
                }
              />
            </FormControl>

            <FormControl
              disabled={isViewMode}
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
              disabled={isViewMode}
              required
              fullWidth
              error={
                formik.touched.averagePrice &&
                Boolean(formik.errors.averagePrice)
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
                helperText={
                  formik.touched.averagePrice && formik.errors.averagePrice
                }
              />
            </FormControl>

            <FormControl
              disabled={isViewMode}
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
              disabled={isViewMode}
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
                  formik.touched.flavorDescription &&
                  formik.errors.flavorDescription
                }
              />
            </FormControl>

            <FormControl
              disabled={isViewMode}
              required
              fullWidth
              error={
                formik.touched.manufacturerId &&
                Boolean(formik.errors.manufacturer)
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
          </>
        )}

        {!isViewMode && (
          <Button color="primary" variant="contained" fullWidth type="submit">
            Spremi
          </Button>
        )}
      </form>
    </>
  );
}
