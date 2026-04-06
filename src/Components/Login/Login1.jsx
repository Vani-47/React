import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login1 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    isChecked: Yup.boolean().oneOf([true], "You must accept Remember Me"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      isChecked: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      try {
        const response = await axios.post(
          "https://staging-cloudgateway.firstshift.ai/auth/login",
          values,
        );

        localStorage.setItem("userDetails", JSON.stringify(response?.data));
        setOpen(true);

        setTimeout(() => {
          navigate("/main");
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          sign in
        </Typography>
        <Box component="form" onsubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            name="userName"
            placeholder="Enter username"
            fullWidth
            sx={{ mb: 2 }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            name="password"
            placeholder="Enter password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isChecked"
                checked={formik.values.isChecked}
                onChange={formik.handleChange}
                color="primary"
                onBlur={formik.handleBlur}
              />
            }
            label="remember me"
          />
          {formik.touched.isChecked && formik.errors.isChecked && (
            <Typography variant="body2" color="error" sx={{ ml: 1 }}>
              {formik.errors.isChecked};
            </Typography>
          )}
          <Button
            type="submit"
            variant="Contained"
            fullWidth
            sx={{ mt: 1, backgroundColor: "primary.main", color: "#fff" }}
          >
            sign in
          </Button>
        </Box>
        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item>
            <Link component={RouterLink} to={"/forgot"}>
              Forgot password
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to={"/register"}>
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Login successful"
      />
    </Container>
  );
};

export default Login1;
