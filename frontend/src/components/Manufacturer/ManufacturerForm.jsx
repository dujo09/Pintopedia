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
  country: yup.string("Unesi polje").required("Polje je obavezno"),
  city: yup.string("Unesi polje").required("Polje je obavezno"),
  yearEstablished: yup.number("Unesi polje").required("Polje je obavezno"),
  website: yup.string("Unesi polje").required("Polje je obavezno"),
  description: yup.string("Unesi polje").required("Polje je obavezno"),
});

export default function ManufacturerForm({ manufacturerData, handleSubmit }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: manufacturerData.name || "",
      country: manufacturerData.country || "",
      city: manufacturerData.city || "",
      yearEstablished: manufacturerData.yearEstablished || "",
      website: manufacturerData.website || "",
      description: manufacturerData.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

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
        error={formik.touched.country && Boolean(formik.errors.country)}
        margin="normal"
      >
        <FormLabel htmlFor="country">Država</FormLabel>
        <OutlinedInput
          name="country"
          type="string"
          id="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.country && formik.errors.country}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.city && Boolean(formik.errors.city)}
        margin="normal"
      >
        <FormLabel htmlFor="city">Grad</FormLabel>
        <OutlinedInput
          name="city"
          type="string"
          id="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.city && formik.errors.city}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          formik.touched.yearEstablished &&
          Boolean(formik.errors.yearEstablished)
        }
        margin="normal"
      >
        <FormLabel htmlFor="yearEstablished">Godina osnutka</FormLabel>
        <OutlinedInput
          name="yearEstablished"
          type="number"
          id="yearEstablished"
          value={formik.values.yearEstablished}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.yearEstablished && formik.errors.yearEstablished
          }
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.website && Boolean(formik.errors.website)}
        margin="normal"
      >
        <FormLabel htmlFor="website">Web stranica</FormLabel>
        <OutlinedInput
          name="website"
          type="string"
          id="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.website && formik.errors.website}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.description && Boolean(formik.errors.description)}
        margin="normal"
      >
        <FormLabel htmlFor="description">Opis</FormLabel>
        <OutlinedInput
          name="description"
          type="string"
          id="description"
          multiline
          rows={6}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.description && formik.errors.description}
        />
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
