import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../components/navbar/footer";
import SearchIcon from "@mui/icons-material/Search";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { InputAdornment, MenuItem ,Autocomplete} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Logout from "../Login/Logout";
import { TimePicker } from "@mui/x-date-pickers";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import dayjs from 'dayjs';


// TODO remove, this demo shouldn't need to reset the theme.

export default function BasicLeave() {
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const viewAction = () => {
    window.location.replace("#/MainDashboard/BasicLeaveList");
  };
  const [userByFrim, setUserByFrim] = useState([]);
  const [userId, setUserId] = React.useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [endOnDate, setEndOnDate] = React.useState(dayjs(new Date()));
  const [startOnDate, setStartOnDate] = React.useState(dayjs(new Date()));
  const [state, setState] = React.useState({
    leaveReason:"",
    leaveTypeId:"",
    userId:"",
  });



  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
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
  const handleChange = (e) => {
    console.log(e);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const getUsers = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetUsersDropdownByFirm`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setUserByFrim(data);
          }
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
      });
  };
  const getLeaveTypes = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetLeaveTypesDropdown`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setLeaveTypes(data);
          }
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
      });
  };
  const getLeaveById = async (id) => {
    setIsLoading(true);
    if (id === 0) {
      setIsLoading(false);
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              leaveReason: data.leaveReason,
              usertime: data.createdOnTimeByUser,
              leaveTypeId: data.leaveTypeId,
              
            });
            setStartOnDate(dayjs(new Date(data.startOnDate)));
            setEndOnDate(dayjs(new Date(data.endOnDate)));
            setUserId(data.userId);
          }
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
      });
    setIsLoading(false);
  };
  
  const saveLeave = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("leaveForm"));

    formdata.append("userId", userId);
    formdata.append("id", id);

    console.log(formdata);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
      });
  };
 useEffect(() => {
    getLeaveById(id)
    getUsers();
    getLeaveTypes();
  }, []);
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "inherit",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: (theme) => theme.palette.customprimary.main,
                }}
              >
                <AvTimerIcon />
              </Avatar>
              <Typography component="span" variant="h5">
                Basic Leave Form
              </Typography>
            </Grid>
            <Box
             
              sx={{ mt: 3,width:"100%" }}
            >
              <form id="leaveForm" >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={userByFrim}
                  disabled={id?true:false}
                  
                  onChange={(event, value) => setUserId(value ? value.id : 0)}
                  renderInput={(params) => (
                    <TextField  {...params} label="Search Employee" />
                  )}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    color="warning"
                    required
                    fullWidth
                    id="leaveTypeId"
                    label="Leave Type"
                    name="leaveTypeId"
                    value={state.leaveTypeId}
                    onChange={handleChange}
                  >
                   {leaveTypes.map((obj, index) => (
                    <MenuItem value={obj.id} key={"attTypesdd" + index}>
                      {obj.label}
                    </MenuItem>
                  ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                <DatePicker
                  name="startOnDate"
                  sx={{ width: "100%" }}
                  label="Attencane Date"
                  format="DD/MM/YYYY"
                  onChange={(e) => setStartOnDate(e)}
                  value={startOnDate}
                />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                <DatePicker
                  name="endOnDate"
                  sx={{ width: "100%" }}
                  label="Attencane Date"
                  format="DD/MM/YYYY"
                  onChange={(e) => setEndOnDate(e)}
                  value={endOnDate}
                />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="warning"
                    required
                    fullWidth
                    id="leaveReason"
                    label="Leave Reason"
                    name="leaveReason"
                    value={state.leaveReason}
                    onChange={handleChange}
                  />
                </Grid> 
                <input type="hidden" name="startOnTime" value={"12:00 AM"}/>
                <input type="hidden" name="endOnTime" value={"12:59 PM"}/>
              </Grid>
              </form>
            </Box>
          </Grid>
        </Box>
      </Container>
      <Footer
          left_button_text="View"
          left_button_hide={false}
          hideRightButton={false}
          bottomLeftButtonAction={() => viewAction()}
          right_button_text="Save"
          bottomRightButtonAction={() => saveLeave()}
        />

      </LocalizationProvider>
      <CustomizedSnackbar
          isOpen={isOpenSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          handleCloseSnackbar={() => handleCloseSnackbar()}
        />
    </>
  );
}
