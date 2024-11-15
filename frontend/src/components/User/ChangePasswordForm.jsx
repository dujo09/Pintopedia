import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import userService from "./UserService";

const validationSchema = yup.object({
  currentPassword: yup.string("Unesi polje").required("Polje je obavezno"),
  newPassword: yup.string("Unesi polje").required("Polje je obavezno"),
  newPasswordRepeat: yup.string("Unesi polje").required("Polje je obavezno"),
});

export default function ChangePasswordForm() {
  const { userId } = useParams();
  const [isSubmitErrorPopup, setSubmitErrorPopup] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await userService.updateUserPasswordById(userId, {currentPassword: values.currentPassword, newPassword: values.newPassword});
      } catch (err) {
        console.error("Error updating password: ", err);
        setSubmitErrorPopup(true)
      }
    },
  });

  const handleCloseSubmitErrorPopup = () => {
    setSubmitErrorPopup(false);
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
          <Snackbar
            autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSubmitErrorPopup}
        onClose={handleCloseSubmitErrorPopup}
        message="Greška u promjeni lozinke"
      />
    
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        width: "300px",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Promjena lozinke
      </Typography>
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        required
        fullWidth
        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
        margin="normal"
      >
        <FormLabel htmlFor="currentPassword">Trenutna Lozinka</FormLabel>
        <OutlinedInput
          name="currentPassword"
          type="string"
          id="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
        />
      </FormControl>

      <FormControl
        required
        fullWidth
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        margin="normal"
      >
        <FormLabel htmlFor="newPassword">Nova lozinka</FormLabel>
        <OutlinedInput
          name="newPassword"
          type="string"
          id="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
      </FormControl>

      <FormControl
        required
        fullWidth
        error={formik.touched.newPasswordRepeat && Boolean(formik.errors.newPasswordRepeat)}
        margin="normal"
      >
        <FormLabel htmlFor="newPasswordRepeat">Nova lozinka (ponovi)</FormLabel>
        <OutlinedInput
          name="newPasswordRepeat"
          type="string"
          id="newPasswordRepeat"
          value={formik.values.newPasswordRepeat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.newPasswordRepeat && formik.errors.newPasswordRepeat}
        />
      </FormControl>

      <Button
        sx={{ marginTop: 5 }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Promjeni lozinku
      </Button>
    </form>
    </Paper>
    </Box>
  );
}
