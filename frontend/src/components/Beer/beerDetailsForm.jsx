import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import beerService from './BeerService';
import {useParams} from "react-router-dom";

const validationSchema = yup.object({
    name: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    alcoholPercentage: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    color: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    averagePrice: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    rating: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    flavorDescription: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    manufacturer: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
});

export default function BeerDetailsForm() {
  const {beerId} = useParams();
  const [beerData, setBeerData] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [isViewMode, setViewMode] = useState(!!beerId);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: beerData.name || "",
      alcoholPercentage: beerData.alcoholPercentage || "",
      color: beerData.color || "",
      averagePrice: beerData.averagePrice || "",
      rating: beerData.rating || "",
      flavorDescription: beerData.flavorDescription || "",
      manufacturer: beerData.manufacturer || ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async function(values) {
    if (beerId) updateBeer(values);
    else createBeer(values);
    setViewMode(true);
  }

  async function updateBeer(values) {
    const updatedBeerData = await beerService.updateBeerById(beerId, values);
    setBeerData(updatedBeerData);
  }

  async function createBeer(values) {
    const createdBeerData = await beerService.createBeer(values);
    setBeerData(createdBeerData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (beerId) {
          const beerData = await beerService.getBeerById(beerId);
          setBeerData(beerData);
        }

        const manufacturers = await beerService.getAllManufacturersForDropdown();
        const manufacturersData = manufacturers.map((manufacturer) => {
          return {
            id: manufacturer._id,
            name: manufacturer.name
          }
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
      {isViewMode && <Button variant="contained" onClick={() => setViewMode(false)}>Uredi</Button>}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          disabled={isViewMode}
          fullWidth
          id="name"
          name="name"
          label="Naziv"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          disabled={isViewMode}
          fullWidth
          id="alcoholPercentage"
          name="alcoholPercentage"
          label="Postotak alkohola"
          value={formik.values.alcoholPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.alcoholPercentage && Boolean(formik.errors.alcoholPercentage)}
          helperText={formik.touched.alcoholPercentage && formik.errors.alcoholPercentage}
        />
        <TextField
          disabled={isViewMode}
          fullWidth
          id="color"
          name="color"
          label="Boja"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.color && Boolean(formik.errors.color)}
          helperText={formik.touched.color && formik.errors.color}
        />
        <TextField
          disabled={isViewMode}
          fullWidth
          id="averagePrice"
          name="averagePrice"
          label="Prosječna cijena"
          value={formik.values.averagePrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.averagePrice && Boolean(formik.errors.averagePrice)}
          helperText={formik.touched.averagePrice && formik.errors.averagePrice}
        />
        <TextField
          disabled={isViewMode}
          fullWidth
          id="rating"
          name="rating"
          label="Ocjena"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
          helperText={formik.touched.rating && formik.errors.rating}
        />
        <TextField
          disabled={isViewMode}
          fullWidth
          id="flavorDescription"
          name="flavorDescription"
          label="Opis okusa"
          value={formik.values.flavorDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.flavorDescription && Boolean(formik.errors.flavorDescription)}
          helperText={formik.touched.flavorDescription && formik.errors.flavorDescription}
        />
        <Select
          disabled={isViewMode}
          fullWidth
          id="manufacturer"
          name="manufacturer"
          label="Proizvođač"
          value={formik.values.manufacturer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.manufacturerId && Boolean(formik.errors.manufacturer)}
          // helperText={formik.touched.manufacturer && formik.errors.manufacturer}
        >
        {manufacturers.map((manufacturer) => (
          <MenuItem key={`manufacturer-field-${manufacturer.id}`} value={manufacturer.id}>
            {manufacturer.name}
          </MenuItem>
        ))}
      </Select>
      {!isViewMode && <Button color="primary" variant="contained" fullWidth type="submit">Spremi</Button>}
      </form>
    </>
  );
};
