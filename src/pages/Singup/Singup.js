import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginBG from "../../assets/images/Login-bg.png";
import { CircularProgress, InputAdornment } from "@mui/material";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        sx={{ color: (theme) => theme.palette.customsecondary.main }}
        href=""
      >
        Attendence-Management-System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [resString, setResString] = React.useState("");
  const [vCodeBool, setvCodeBool] = React.useState(true);
  const [responeBool, setResponeBool] = React.useState(false);
  // console.log(state.firstName);
  const onEmailSubmit = async (e) => {
    // e.preventDefault();
    if (state.firstName.length > 2) {
      // console.log("firstName" + state.firstName);
    } else {
      handleOpenSnackbar(
        <span>First Name lenght must greater then 3 words.</span>,
        "error"
      );
      return;
    }
    if (state.lastName.length > 2) {
      // console.log("firstName" + state.lastName);
    } else {
      handleOpenSnackbar(
        <span>Last Name lenght must greater then 3 words.</span>,
        "error"
      );
      return;
    }
       
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (state.email.match(validRegex)) {
      // console.log("Email"+state.email);
    }else{
      handleOpenSnackbar(<span>Please enter a valid email.</span>,"error");
      setIsLoading(false);
      return;  
    }
    // let regex = new RegExp("^(?=.[A-Z])(?=.[a-z])(?=.*\\d).{8,}$");
      //  debugger;
    // var validpass = "^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$";
    
    // let regex = /^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/g;

    

let regex =  
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/g; 
    
    if (state.password.match(regex)) {
      // console.log("Password"+state.password);
    }else{
      handleOpenSnackbar(<span>Password must contain eight characters(uppercase,lowercase,number).</span>,"error");
      setIsLoading(false);
      return;  
    }

    const data = new FormData(document.getElementById("singupForm"));
    setIsLoading(true);
    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var raw = JSON.stringify(object);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/Signup`;
    await fetch(url, { 
        method: "POST", 
        body: raw,
        headers: myHeaders
      })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setvCodeBool(false);
          setResponeBool(true);
          setResString(result.DATA);
          handleOpenSnackbar(<span>Code hase been sent yo your Email</span>,"success");
        } else {
          console.log(result.SYSTEM_MESSAGE);
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        setError("Someting Went Wrong");
        console.log("error", error);
        handleOpenSnackbar("Failed to fetch ! Please try Again later.","error");
      });
    setIsLoading(false);
  };
  const onVCodeSubmit = async (e) => {
    const formdata = new FormData(document.getElementById("singupForm"));
    formdata.append("uUID", resString);
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/OTPVerification`;
    await fetch(url, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          setTimeout(() => {
            window.location.replace("/login");
          }, 3000);
        } else {
          console.log(result.SYSTEM_MESSAGE);
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        setError("Someting Went Wrong");
        console.log("error", error);
        handleOpenSnackbar("Failed to fetch ! Please try Again later.","error");
      });
  };
  const handleOpenSnackbar = (msg, severity) => {
    setIsOpenSnackbar(true);
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSnackbar(false);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(" + loginBG + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid
            xs={false}
            sm={12}
            md={12}
            sx={{
              opacity: "0.7",
              height: "100%",
              width: "100%",
              backgroundColor: "#00145b",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: (theme) => theme.palette.customprimary.main,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: (theme) => theme.palette.customprimary.main }}
            >
              Sign Up
            </Typography>
            <Box
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <form id="singupForm">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={(e) =>
                        setState({ ...state, firstName: e.target.value })
                      }
                      autoFocus
                      disabled={responeBool}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      onChange={(e) =>
                        setState({ ...state, lastName: e.target.value })
                      }
                      autoComplete="family-name"
                      disabled={responeBool}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="warning"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                      disabled={responeBool}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="warning"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      disabled={responeBool}
                      onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                      }
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="warning"
                      margin="normal"
                      required
                      fullWidth
                      name="oTP"
                      label="Verfication code"
                      id="oTP"
                      disabled={vCodeBool}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: (theme) => theme.palette.customsecondary.main,
                      }}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                </Grid>
                {vCodeBool === true ? (
                  <>
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => onEmailSubmit(e)}
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress size={24} color="warning" /> : "Get Verification Code" }
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={(e) => onVCodeSubmit(e)}
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isLoading}
                    >
                     {isLoading ? <CircularProgress size={24} color="warning"/>:"Verify"}
                    </Button>
                  </>
                )}
              </form>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    component={Link}
                    href="#/Login"
                    sx={{
                      color: (theme) => theme.palette.customsecondary.main,
                    }}
                  >
                    Already have an account? Sign in
                  </Button>
                  <Link href="" variant="body2"></Link>
                </Grid>
              </Grid>
              <Copyright
                style={{ position: "fixed", bottom: "0", right: "10%" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleCloseSnackbar={() => handleCloseSnackbar()}
      />
    </>
  );
}
