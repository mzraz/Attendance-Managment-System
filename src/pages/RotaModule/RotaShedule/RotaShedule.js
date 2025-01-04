import * as React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../../../components/navbar/footer";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Stack from "@mui/material/Stack";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Slider,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import Logout from "../../Login/Logout";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useEffect } from "react";
import {
  ClearIcon,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function valueLabelFormat(value) {
  let hr = "00";
  let min = "00";
  let str = value + "";
  let arr = str.split(".");
  if (arr[0].length < 2) {
    hr = "0" + arr[0];
  } else {
    hr = arr[0];
  }
  if (arr[1] === "25") {
    min = "15";
  }
  if (arr[1] === "5") {
    min = "30";
  }
  if (arr[1] === "75") {
    min = "45";
  }
  let strr = hr + ":" + min;
  return strr;
}
export default function RotaShedule() {
  const [userAllData, setUserAllData] = React.useState([]);
  const [userListByday, setUserListByday] = React.useState([]);
  const [allWeekDays, setAllWeekDays] = React.useState([]);
  const [allWeekDaysByUser, setAllWeekDaysByUser] = React.useState([]);
  const [selectedDayId, setSelectedDayId] = React.useState([]);
  const [selectedDayLabel, setSelectedDayLabel] = React.useState([]);
  const [selectedEmpId, setSelectedEmpId] = React.useState([]);
  const [selectedEmpLabel, setSelectedEmpLabel] = React.useState([]);
  // const [startTimebyday, setStartTimebyday] = React.useState(dayjs(new Date(14400000)));
  // const [endTimebyDay, setEndTimebyDay] = React.useState(dayjs(new Date(43200000)));
  const [startTimebyEmp, setStartTimebyEmp] = React.useState(
    dayjs(new Date(14400000))
  );
  const [endTimebyEmp, setEndTimebyEmp] = React.useState(
    dayjs(new Date(43200000))
  );

  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
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

  const [isLoading, setIsLoading] = React.useState(false);
  const [openDays, setOpenDays] = React.useState(false);
  const [openEmp, setOpenEmp] = React.useState(false);
  const [openEmpAndDay, setOpenEmpAndDay] = React.useState(false);

  const handleClickOpenDays = (id, label) => {
    setSelectedDayId(id);
    setSelectedDayLabel(label);
    setOpenDays(true);
    getAllEmpByDay(id);
  };
  const handleClickOpenEmp = (id, label) => {
    setSelectedEmpId(id);
    setSelectedEmpLabel(label);
    setOpenEmp(true);
    getWeekDaysByUser(id);
  };
  const handleClickOpenEmpAndDay = (id, label, dayId) => {
    setSelectedDayId(dayId);
    setSelectedEmpId(id);
    setSelectedEmpLabel(label);
    setOpenEmpAndDay(true);
    getWeekDaysByUser(id);
  };
  const handleCloseDays = () => {
    setOpenDays(false);
  };
  const handleCloseEmp = () => {
    setOpenEmp(false);
  };
  const handleCloseEmpAndDay = () => {
    setOpenEmpAndDay(false);
  };

  const [sliderValue, setSliderValue] = React.useState([0, 12, 14, 19]);

  const handleChangeSlider = (event, newValue) => {
    setSliderValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: "00:00",
    },
    {
      value: 0.25,
      label: "",
    },
    {
      value: 0.5,
      label: "",
    },
    {
      value: 0.75,
      label: "",
    },
    {
      value: 1,
      label: "01:00",
    },

    {
      value: 1.25,
      label: "",
    },
    {
      value: 1.5,
      label: "",
    },
    {
      value: 1.75,
      label: "",
    },
    {
      value: 2,
      label: "02:00",
    },
    {
      value: 2.25,
      label: "",
    },
    {
      value: 2.5,
      label: "",
    },
    {
      value: 2.75,
      label: "",
    },
    {
      value: 3,
      label: "03:00",
    },
    {
      value: 3.25,
      label: "",
    },
    {
      value: 3.5,
      label: "",
    },
    {
      value: 3.75,
      label: "",
    },
    {
      value: 4,
      label: "04:00",
    },
    {
      value: 4.25,
      label: "",
    },
    {
      value: 4.5,
      label: "",
    },
    {
      value: 4.75,
      label: "",
    },
    {
      value: 5,
      label: "05:00",
    },
    {
      value: 5.25,
      label: "",
    },
    {
      value: 5.5,
      label: "",
    },
    {
      value: 5.75,
      label: "",
    },
    {
      value: 6,
      label: "06:00",
    },
    {
      value: 6.25,
      label: "",
    },
    {
      value: 6.5,
      label: "",
    },
    {
      value: 6.75,
      label: "",
    },
    {
      value: 7,
      label: "07:00",
    },
    {
      value: 7.25,
      label: "",
    },
    {
      value: 7.5,
      label: "",
    },
    {
      value: 7.75,
      label: "",
    },
    {
      value: 8,
      label: "08:00",
    },
    {
      value: 8.25,
      label: "",
    },
    {
      value: 8.5,
      label: "",
    },
    {
      value: 8.75,
      label: "",
    },
    {
      value: 9,
      label: "09:00",
    },
    {
      value: 9.25,
      label: "",
    },
    {
      value: 9.5,
      label: "",
    },
    {
      value: 9.75,
      label: "",
    },
    {
      value: 10,
      label: "10:00",
    },
    {
      value: 10.25,
      label: "",
    },
    {
      value: 10.5,
      label: "",
    },
    {
      value: 10.75,
      label: "",
    },
    {
      value: 11,
      label: "11:00",
    },
    {
      value: 11.25,
      label: "",
    },
    {
      value: 11.5,
      label: "",
    },
    {
      value: 11.75,
      label: "",
    },
    {
      value: 12,
      label: "12:00",
    },
    {
      value: 12,
      label: "12:00",
    },
    {
      value: 12.25,
      label: "",
    },
    {
      value: 12.5,
      label: "",
    },
    {
      value: 12.75,
      label: "",
    },
    {
      value: 13,
      label: "13:00",
    },

    {
      value: 13.25,
      label: "",
    },
    {
      value: 13.5,
      label: "",
    },
    {
      value: 13.75,
      label: "",
    },
    {
      value: 14,
      label: "14:00",
    },
    {
      value: 14.25,
      label: "",
    },
    {
      value: 14.5,
      label: "",
    },
    {
      value: 14.75,
      label: "",
    },
    {
      value: 15,
      label: "15:00",
    },
    {
      value: 15.25,
      label: "",
    },
    {
      value: 15.5,
      label: "",
    },
    {
      value: 15.75,
      label: "",
    },
    {
      value: 16,
      label: "16:00",
    },
    {
      value: 16.25,
      label: "",
    },
    {
      value: 16.5,
      label: "",
    },
    {
      value: 16.75,
      label: "",
    },
    {
      value: 17,
      label: "17:00",
    },
    {
      value: 17.25,
      label: "",
    },
    {
      value: 17.5,
      label: "",
    },
    {
      value: 17.75,
      label: "",
    },
    {
      value: 18,
      label: "18:00",
    },
    {
      value: 18.25,
      label: "",
    },
    {
      value: 18.5,
      label: "",
    },
    {
      value: 18.75,
      label: "",
    },
    {
      value: 19,
      label: "19:00",
    },
    {
      value: 19.25,
      label: "",
    },
    {
      value: 19.5,
      label: "",
    },
    {
      value: 19.75,
      label: "",
    },
    {
      value: 20,
      label: "20:00",
    },
    {
      value: 20.25,
      label: "",
    },
    {
      value: 20.5,
      label: "",
    },
    {
      value: 20.75,
      label: "",
    },
    {
      value: 21,
      label: "21:00",
    },
    {
      value: 21.25,
      label: "",
    },
    {
      value: 21.5,
      label: "",
    },
    {
      value: 21.75,
      label: "",
    },
    {
      value: 22,
      label: "22:00",
    },
    {
      value: 22.25,
      label: "",
    },
    {
      value: 22.5,
      label: "",
    },
    {
      value: 22.75,
      label: "",
    },
    {
      value: 23,
      label: "23:00",
    },
    {
      value: 23.25,
      label: "",
    },
    {
      value: 23.5,
      label: "",
    },
    {
      value: 23.75,
      label: "",
    },
    {
      value: 24,
      label: "24:00",
    },
  ];

  const mark = [
    {
      value: 0,
      label: "00:00",
    },

    {
      value: 0.5,
      label: "00:30",
    },

    {
      value: 1,
      label: "01:00",
    },

    {
      value: 1.5,
      label: "01:30",
    },

    {
      value: 2,
      label: "02:00",
    },

    {
      value: 2.5,
      label: "02:30",
    },

    {
      value: 3,
      label: "03:00",
    },

    {
      value: 3.5,
      label: "03:30",
    },

    {
      value: 4,
      label: "04:00",
    },

    {
      value: 4.5,
      label: "04:30",
    },

    {
      value: 5,
      label: "05:00",
    },

    {
      value: 5.5,
      label: "05:30",
    },

    {
      value: 6,
      label: "06:00",
    },

    {
      value: 6.5,
      label: "06:30",
    },

    {
      value: 7,
      label: "07:00",
    },

    {
      value: 7.5,
      label: "07:30",
    },

    {
      value: 8,
      label: "08:00",
    },

    {
      value: 8.5,
      label: "08:30",
    },

    {
      value: 9,
      label: "09:00",
    },

    {
      value: 9.5,
      label: "09:30",
    },

    {
      value: 10,
      label: "10:00",
    },

    {
      value: 10.5,
      label: "10:30",
    },

    {
      value: 11,
      label: "11:00",
    },

    {
      value: 11.5,
      label: "11:30",
    },

    {
      value: 12,
      label: "12:00",
    },
  ];

  const [openEmpAddSlot, setOpenEmpAddSlot] = React.useState(false);
  const handleOpenEmpAddSlot = () => {
    setOpenEmpAddSlot(true);
  };
  const addSloteByEmp = (i) => {
    let data = [...allWeekDaysByUser];
    let stifts = [...data[i].dayRotaSchedule];
    let myobj = { startOnTime: 14400000, endOnTime: 43200000 };
    stifts.push(myobj);
    data[i].dayRotaSchedule = stifts;
    setAllWeekDaysByUser(data);
  };
  const dellShiftByEmp = (i, index) => {
    let data = [...allWeekDaysByUser];
    let stifts = [...data[i].dayRotaSchedule];
    stifts.splice(index, 1);
    data[i].dayRotaSchedule = stifts;
    setAllWeekDaysByUser(data);
  };
  const addSloteByDay = (i) => {
    let data = [...userListByday];
    let stifts = [...data[i].dayRotaSchedule];
    let myobj = { startOnTime: 14400000, endOnTime: 43200000 };
    stifts.push(myobj);
    data[i].dayRotaSchedule = stifts;
    setAllWeekDaysByUser(data);
  };
  const dellShiftByDay = (i, index) => {
    let data = [...userListByday];
    let stifts = [...data[i].dayRotaSchedule];
    stifts.splice(index, 1);
    data[i].dayRotaSchedule = stifts;
    setAllWeekDaysByUser(data);
  };

  const handleClose = (value) => {
    setOpenEmpAddSlot(false);
  };
  const getAllEmp = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/GetAllByFirm`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setUserAllData(result.DATA);
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
  const getWeekDays = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/GetDaysOfWeek`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setAllWeekDays(result.DATA);
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
  const getWeekDaysByUser = async (id) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("userId", id);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/GetAllByFirmAndUserId`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          setAllWeekDaysByUser(result.DATA);
          setSelectedEmpId(id);
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
  const getAllEmpByDay = async (id) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("dayId", id);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/GetAllByFirmAndDayId`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setUserListByday(result.DATA);
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
  const saveByDay = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("rotaByDay"));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/SaveForUsersWithDay`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          handleCloseDays();
          window.location.reload();
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
  const saveByEmpAndDay = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("rotaByDay"));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/SaveForUsersWithDay`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          handleCloseDays();
          window.location.reload();
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
  const saveByEmp = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("rotaByEmp"));
    formdata.append("userId", selectedEmpId);
    console.log(formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/RotaSchedule/SaveForUserWithDays`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          handleCloseEmp();
          window.location.reload();
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
    getAllEmp();
    getWeekDays();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog onClose={handleClose} open={openEmpAddSlot}>
          <DialogTitle>Add Employee Time Slot</DialogTitle>
          <Stack
            sx={{ height: "100em", overflow: "hidden" }}
            spacing={1}
            direction="row"
          >
            <TableCell align="center" sx={{ width: "-webkit-fill-available" }}>
              <Slider
                value={sliderValue}
                orientation="vertical"
                onChange={handleChangeSlider}
                valueLabelFormat={valueLabelFormat}
                marks={marks}
                min={0}
                max={24}
                valueLabelDisplay="on"
                step={0.25}
                disableSwap
              />
            </TableCell>
          </Stack>
        </Dialog>
        <Dialog
          fullScreen
          open={openEmp}
          onClose={handleCloseEmp}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{
              position: "relative",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseEmp}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {selectedEmpLabel}
              </Typography>
              <Button autoFocus color="inherit" onClick={saveByEmp}>
                {" "}
                Save{" "}
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={11}>
                <br />
                <form id="rotaByEmp">
                  <Table sy aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "20%",
                          }}
                        >
                          <b>Week Days</b>
                        </TableCell>

                        <TableCell align="center">
                          <b>Slots</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allWeekDaysByUser.map((day, i) => (
                        <TableRow key={day.dayId}>
                          <TableCell component="th" scope="row">
                            <div
                              style={{
                                margin: "5px",
                                padding: "10px",
                                backgroundColor: "#f0f0f0",
                              }}
                            >
                              {day.dayLabel}
                            </div>
                          </TableCell>

                          <TableCell align="left">
                            {day.dayRotaSchedule.map((shift, index) => (
                              <>
                                <input
                                  type="hidden"
                                  name="dayId"
                                  value={day.dayId}
                                />
                                <TimePicker
                                  name="startOnTime"
                                  ampm={false}
                                  format="HH:mm"
                                  size="small"
                                  sx={{ width: "45%", margin: "0.5%" }}
                                  label="Start Time"
                                  defaultValue={
                                    day.dayRotaSchedule.length
                                      ? dayjs(
                                          day.dayRotaSchedule[index].startOnTime
                                        )
                                      : startTimebyEmp
                                  }
                                />

                                <TimePicker
                                  ampm={false}
                                  name="endOnTime"
                                  format="HH:mm"
                                  sx={{ width: "45%", margin: "0.5%" }}
                                  label="End Time"
                                  defaultValue={
                                    day.dayRotaSchedule.length
                                      ? dayjs(
                                          day.dayRotaSchedule[index].endOnTime
                                        )
                                      : endTimebyEmp
                                  }
                                />
                                <Button
                                  style={{ marginTop: "15px" }}
                                  onClick={() => dellShiftByEmp(i, index)}
                                >
                                  <ClearIcon color="error" />
                                </Button>
                              </>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() => addSloteByEmp(i)}
                              style={{ height: "100%" }}
                            >
                              +Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
        <Dialog
          fullScreen
          open={openEmpAndDay}
          onClose={handleCloseEmpAndDay}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{
              position: "relative",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseEmpAndDay}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {selectedEmpLabel}
              </Typography>
              <Button autoFocus color="inherit" onClick={saveByEmpAndDay}>
                {" "}
                Save{" "}
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={11}>
                <br />
                <form id="rotaByDay">
                  <Table sy aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "20%",
                          }}
                        >
                          <b>Week Days</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Slots</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allWeekDaysByUser.map((day, i) => (
                        <>
                          {day.dayId == selectedDayId ? (
                            <TableRow key={day.dayId}>
                              <TableCell component="th" scope="row">
                                <div
                                  style={{
                                    margin: "5px",
                                    padding: "10px",
                                    backgroundColor: "#f0f0f0",
                                  }}
                                >
                                  {day.dayLabel}
                                </div>
                              </TableCell>
                              <input
                                type="hidden"
                                name="dayId"
                                value={day.dayId}
                              />
                              <input
                                type="hidden"
                                name="userId"
                                value={selectedEmpId}
                              />
                              <TableCell align="left">
                                {day.dayRotaSchedule.map((shift, index) => (
                                  <>
                                  <input
                                type="hidden"
                                name="slotDayId"
                                value={day.dayId}
                              />
                              <input
                                type="hidden"
                                name="slotUserId"
                                value={selectedEmpId}
                              />
                                    <TimePicker
                                      name="startOnTime"
                                      ampm={false}
                                      format="HH:mm"
                                      sx={{ width: "45%", margin: "0.5%" }}
                                      label="Start Time"
                                      defaultValue={
                                        day.dayRotaSchedule.length
                                          ? dayjs(
                                              day.dayRotaSchedule[index]
                                                .startOnTime
                                            )
                                          : startTimebyEmp
                                      }
                                    />
                                    <TimePicker
                                      ampm={false}
                                      name="endOnTime"
                                      format="HH:mm"
                                      sx={{ width: "45%", margin: "0.5%" }}
                                      label="End Time"
                                      defaultValue={
                                        day.dayRotaSchedule.length
                                          ? dayjs(
                                              day.dayRotaSchedule[index]
                                                .endOnTime
                                            )
                                          : endTimebyEmp
                                      }
                                    />
                                    <Button
                                      style={{ marginTop: "15px" }}
                                      onClick={() => dellShiftByEmp(i, index)}
                                    >
                                      <ClearIcon color="error" />
                                    </Button>
                                  </>
                                ))}
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  variant="contained"
                                  color="warning"
                                  onClick={() => addSloteByEmp(i)}
                                  style={{ height: "100%" }}
                                >
                                  +Add
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
        <Dialog
          fullScreen
          open={openDays}
          onClose={handleCloseDays}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{
              position: "relative",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDays}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {" "}
                {selectedDayLabel}{" "}
              </Typography>
              <Button autoFocus color="inherit" onClick={saveByDay}>
                {" "}
                Save{" "}
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={11}>
                <br />
                <form id="rotaByDay">
                  <Table sy aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "20%",
                          }}
                        >
                          <b>Employees</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Slots</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userListByday.map((emp, i) => (
                        <TableRow key={emp.userId}>
                          <TableCell component="th" scope="row">
                            <div
                              style={{
                                margin: "5px",
                                padding: "10px",
                                backgroundColor: "#f0f0f0",
                              }}
                            >
                              {emp.userLabel}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <input
                              type="hidden"
                              name="userId"
                              value={emp.userId}
                            />
                            <input
                              type="hidden"
                              name="dayId"
                              value={selectedDayId}
                            />
                            {emp.dayRotaSchedule.map((shift, index) => (
                              <>
                                <input
                                  type="hidden"
                                  name="slotDayId"
                                  value={selectedDayId}
                                />
                                <input
                              type="hidden"
                              name="slotUserId"
                              value={emp.userId}
                            />
                                <TimePicker
                                  name="startOnTime"
                                  ampm={false}
                                  format="HH:mm"
                                  sx={{ width: "45%", margin: "0.5%" }}
                                  label="Start Time"
                                  defaultValue={
                                    emp.dayRotaSchedule.length
                                      ? dayjs(
                                          emp.dayRotaSchedule[index].startOnTime
                                        )
                                      : startTimebyEmp
                                  }
                                />
                                <TimePicker
                                  ampm={false}
                                  name="endOnTime"
                                  format="HH:mm"
                                  sx={{ width: "45%", margin: "0.5%" }}
                                  label="End Time"
                                  defaultValue={
                                    emp.dayRotaSchedule.length
                                      ? dayjs(
                                          emp.dayRotaSchedule[index].endOnTime
                                        )
                                      : endTimebyEmp
                                  }
                                />
                                <Button
                                  style={{ marginTop: "15px" }}
                                  onClick={() => dellShiftByDay(i, index)}
                                >
                                  <ClearIcon color="error" />
                                </Button>
                              </>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() => addSloteByDay(i)}
                              style={{ height: "100%" }}
                            >
                              +Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
        <DndProvider backend={HTML5Backend}>
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
                  <CalendarMonthIcon />
                </Avatar>
                <Typography component="span" fo variant="h5">
                  Rota Shedule
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={12}>
                <Table aria-label="customized table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "rgb(240, 240, 240)" }}
                        align="center"
                      >
                        Employees
                      </TableCell>
                      {allWeekDays.map((days) => {
                        return (
                          <TableCell
                            key={days.id}
                            sx={{ backgroundColor: "rgb(240, 240, 240)" }}
                            align="center"
                          >
                            <Button
                              variant="text"
                              size="small"
                              onClick={() =>
                                handleClickOpenDays(days.id, days.label)
                              }
                              style={{ color: "black" }}
                            >
                              {days.label}
                            </Button>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userAllData.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell
                          style={{ backgroundColor: "#f0f0f0" }}
                          component="th"
                          scope="row"
                          onClick={() =>
                            handleClickOpenEmp(emp.userId, emp.userLabel)
                          }
                        >
                          <div
                            style={{
                              border: "1px solid darkgray",
                              padding: ".5em",
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              borderRadius: "5px",
                            }}
                          >
                            {emp.userLabel}
                          </div>
                        </TableCell>
                        {emp.rotaSchedule.map((day) => {
                          return (
                            <TableCell
                              onClick={() =>
                                handleClickOpenEmpAndDay(
                                  emp.userId,
                                  emp.userLabel,
                                  day.dayId
                                )
                              }
                              align="center"
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {day.dayRotaSchedule.map((shift, index) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          backgroundColor: "#f0f0f0",
                                          width: "max-content",
                                          margin: ".3em",
                                          borderRadius: "5px",
                                          fontSize: "9pt",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "inline-block",
                                            margin: ".3em",
                                          }}
                                        >
                                          {dayjs(shift.startOnTime).format(
                                            "HH:mm"
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            display: "inline-block",
                                            margin: ".3em",
                                          }}
                                        >
                                          {dayjs(shift.endOnTime).format(
                                            "HH:mm"
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
          <Footer
            left_button_text="View"
            left_button_hide={true}
            hideRightButton={true}
          />
        </DndProvider>
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
