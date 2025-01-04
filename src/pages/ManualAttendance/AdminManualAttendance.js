import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import Footer from "../../components/navbar/footer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import {
  TextField,
  Grid,
  Avatar,
  Typography,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useEffect } from "react";
import { useState } from "react";
import Logout from "../Login/Logout";
import { TimePicker } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
export default function AdminManualAttendance() {
 
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const viewAction = () => {
    window.location.replace("#/MainDashboard/AdminManualAttendanceList");
  };
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [attTypes, setAttTypes] = useState([]);
  const [userByFrim, setUserByFrim] = useState([]);
  const [userId, setUserId] = React.useState("");
  const [userTime, setUserTime] = React.useState(dayjs(new Date()));
  const [userDate, setUserDate] = React.useState(dayjs(new Date()));
  const [state, setState] = React.useState({
    userdate:"",
    usertime:"",
    attendanceTypeId:"",
    userId:"",
  });

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
  const [value, setValue] = React.useState("");
  const getattendanceById = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetManualByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              userdate: data.createdOnDateByUser,
              usertime: data.createdOnTimeByUser,
              attendanceTypeId: data.attendanceTypeId,
              
            });
            setUserTime(dayjs(new Date(data.createdOnDateByUser)));
            setUserDate(dayjs(new Date(data.createdOnTimeByUser)));
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
  const getAttTypes = async () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetAttendanceTypesDropdown`,
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
            setAttTypes(data);
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


  const getselecteduser = (userobj) => {
    setUserId(userobj);
  };
  const saveAtt = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("attForm"));

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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/SaveManual`,
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
    getattendanceById(id)
    getUsers();
    getAttTypes();
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid sx={{ p: 5 }}>
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
                <EventRoundedIcon />
              </Avatar>
              <Typography component="span" fo variant="h5">
                Manual Attendance Admin
              </Typography>
            </Grid>
          </Grid>
          <form id="attForm">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={userByFrim}
                  disabled={id?true:false}
                  
                  onChange={(event, value) => setUserId(value ? value.id : 0)}
                  renderInput={(params) => (
                    <TextField  {...params} label="Search Employee" value={state.userId}/>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  name="createdOnDateByUser"
                  sx={{ width: "100%" }}
                  label="Attencane Date"
                  format="DD/MM/YYYY"
                  onChange={(e) => setUserDate(e)}
                  value={userDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  color="warning"
                  autoComplete="given-name"
                  name="attendanceTypeId"
                  required
                  fullWidth
                  id="attendanceTypeId"
                  onChange={handleChange}
                  label="Attendance Type"
                  value={state.attendanceTypeId}
                >
                  {attTypes.map((obj, index) => (
                    <MenuItem value={obj.id} key={"attTypesdd" + index}>
                      {obj.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  onChange={(e) => setUserTime(e)}
                  name="createdOnTimeByUser"
                  format="hh:mm a"
                  sx={{ width: "100%" }}
                  label="Attendance Time"
                  value={userTime}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Footer
          left_button_text="View"
          left_button_hide={false}
          hideRightButton={false}
          bottomLeftButtonAction={() => viewAction()}
          right_button_text="Save"
          bottomRightButtonAction={() => saveAtt()}
        />
        <CustomizedSnackbar
          isOpen={isOpenSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          handleCloseSnackbar={() => handleCloseSnackbar()}
        />
      </LocalizationProvider>
    </>
  );
}
