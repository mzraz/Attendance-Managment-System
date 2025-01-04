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
import { styled } from "@mui/material/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import InputAdornment from '@mui/material/InputAdornment';
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import img1 from "../../assets/images/serg.jpg";
import img2 from "../../assets/images/Login-bg.jpg";
import img3 from "../../assets/images/Login-bg.png";
import img4 from "../../assets/images/Login-bg123.webp";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  DialogContentText,
  OutlinedInput,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    email: "",
    password: "",
  });

  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  console.log("Emial:" + state.email + " PassWord" + state.password);
  
  const onFormSubmit = async (e) => {
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (state.email.match(validRegex)) {
      console.log("Email" + state.email);
    } else {
      handleOpenSnackbar(<span>Please enter a valid email.</span>, "error");
      return;
    }

    const data = new FormData(e.target);
    setIsLoading(true);

    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Login`;
    await fetch(url, { method: "POST", body: json, headers: myHeaders })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          window.localStorage.setItem("AtouBeatXData", JSON.stringify(result));
          window.localStorage.setItem("AtouBeatXToken", result.DATA.jwtToken);
          window.location.replace("#/MainDashboard");
        } else {
          console.log(result);
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        handleOpenSnackbar(
          <span>Failed to fetch ! Please try Again later.</span>,
          "error"
        );
        setError("Someting Went Wrong");
        console.log("error", error);
      });

    setIsLoading(false);
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

  const [openForgotPass, setopenForgotPass] = React.useState(false);

  const openForgotPassModel = () => {
    setopenForgotPass(true);
  };

  const closeForgotPassModel = () => {
    setopenForgotPass(false);
  };

  const handleSubmit2 = () => {
    window.location.replace("#/MainDashboard");
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  var items = [
    {
      img:img1,
     
    },
    {
      img:img2,
    },
    {
      img:img3,
     
    },
    {
      img:img4,
    },
  ];
  function Item(props) {
    return (
      <Paper
      style={{
        width:'100%',
        height:'100%'
      }}>
        <img style={{width:'100%',  height:'100%'}} src={props.item.img}
        alt="123"
        loading="lazy"
      />
      </Paper>
    );
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Dialog
          open={openForgotPass}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeForgotPassModel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Reset Your Password"}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeForgotPassModel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                color="warning"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeForgotPassModel} color="warning">
              Get Link
            </Button>
          </DialogActions>
        </Dialog>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={
            {
              // backgroundImage: 'url('+loginBG+')',
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: 'cover',
              // backgroundPosition: 'center',
            }
          }
        >
        
          <Carousel 
          indicators={false}
          height={'100vh'}
          // sx={{width:'100%',height:'100%'}}
      //    indicatorIconButtonProps={{
      //     style: {
      //         display:'none'
      //     }
      // }}
          >
            {items.map((item, i) => (
              <Item style={{width:'100%',  height:'100%'}} key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          style={{}}
        >
          <Box
            sx={{
              mt: '40%',
              mx: '13%',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar
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
              Sign in
            </Typography> */}
            <Box noValidate sx={{ mt: 1 }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: (theme) => theme.palette.customprimary.main,fontWeight:'bold',mb:'2%' }}
            >
              Welcome !👋
            </Typography>
            <Typography
              component="P"
              variant="P"
              sx={{ color: (theme) => theme.palette.customprimary.main ,mb:'2%'}}
            >
             Please sign-in to your account.
            </Typography>
              <form onSubmit={(e) => onFormSubmit(e)}>
                <TextField
                  color="warning"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  size="small"

                  label="Email Address"
                  name="email"
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  autoFocus
                />
                <TextField
                  color="warning"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  // sx={{height:'20px'}}
                  // type="password"
                  id="password"
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    ),
                   }}
                 
                />
               
                <div >
                <span  >
                <FormControlLabel
                
                  control={
                    <Checkbox
                    size="small"
                      value="remember"
                      sx={{
                        color: (theme) => theme.palette.customsecondary.main,
                      }}
                    />
                  }
                  label="Remember me"
                /></span><span  style={{display:'inline-block', float: 'right'}}>
                <Grid
                  style={{
                   
                  }}
                >
                  <Button
                    component={Link}
                    onClick={openForgotPassModel}
                    sx={{
                      fontSize:'12px',
                      marginTop:'6px',
                      color: (theme) => theme.palette.customsecondary.main,
                    }}
                  

                  >
                    Forgot password?
                  </Button>
                </Grid>
                </span>
                </div>
                <Button
                fullWidth
                  color="warning"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, display: "block" }}
                  size="small"

                >
                  Sign In
                </Button>
              </form>
              <Grid container>
                
                <Grid item>
                  <Button
                    component={Link}
                    href="#/SingUp"
                    sx={{
                      fontSize:'12px',
                      color: (theme) => theme.palette.customsecondary.main,
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
              <Copyright
                style={{ position: "fixed", bottom: "0.5%", right: "5%" }}
                sx={{ mt: 5 }}
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
