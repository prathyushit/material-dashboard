/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect,useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/auth_provider";

// import { useAuth } from "../../../context";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { useStores } from "../../../store";
import InputAdornment from "@mui/material/InputAdornment";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";


import { CircularProgress } from '@mui/material';

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { authStore } = useStores();
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated; // Optional chaining to avoid destructuring from undefined


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/datatool", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authStore.login({ email, password });
      if (response) {
        navigate("/datatool", { replace: true });
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth  
              onChange={(e) => {
                    setEmail(e.target.value);
                    authStore.clearError();
                  }}/>

              {/* <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    authStore.clearError();
                  }}
                  placeholder="Enter your email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{ fontSize: "1.1rem !important" }}
                      />
                    </InputAdornment>
                  }
                  sx={{
                    marginTop: "0.8em",
                  }}
                /> */}
            </MDBox>

            <MDBox mb={2}>
              <MDInput label="Password" 
                        fullWidth 
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          authStore.clearError();
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOpenOutlinedIcon
                              sx={{ fontSize: "1.1rem !important" }}
                            />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>

              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                {!authStore.isLoading && <div>sign in</div>}
                {authStore.isLoading && (
                  <CircularProgress color="white" size={20} />
                )}
              </MDButton>
            </MDBox>
            {authStore.errorMsg && (
              <MDBox textAlign="center">
                <MDTypography variant="caption" color="error">
                  {authStore.errorMsg}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
