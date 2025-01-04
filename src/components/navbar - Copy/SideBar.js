import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LockClockIcon from "@mui/icons-material/LockClock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "@mui/material/Link";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import SummarizeIcon from "@mui/icons-material/Summarize";
import AssessmentIcon from '@mui/icons-material/Assessment';
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import Dashboard from "../../pages/Dashborad/dashboard";
import { useState } from "react";
import Logout from "../../pages/Login/Logout";
import { Fragment } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [groupFeatures, setGroupFeatures] = useState([]);

  const getFeaturesGroups = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesByUser`,
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
        if (result.SUCCESS === 1) {
          setGroupFeatures(result.DATA);
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
  React.useEffect(() => {
    getFeaturesGroups();
    logincheck();
    firmcheck();
  }, []);
  const firmcheck = () => {
    var loginarry = JSON.parse(localStorage.getItem("AtouBeatXData"));
    const FIRMID = loginarry.DATA.firmId;
    if (FIRMID) {
    } else {
      window.location.replace("#/MainDashboard/AddCompanies");
    }
  };
  const logincheck = () => {
    const logintoken = window.localStorage.getItem("AtouBeatXToken");
    if (logintoken) {
    } else {
      window.location.replace("/Login");
    }
  };

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //model
  const [openModel, setopenModel] = React.useState(false);

  const handleClickopenModel = () => {
    setopenModel(true);
    handleCloseUserMenu();
  };

  const handleCloseModel = () => {
    setopenModel(false);
  };
  const passchangevail = () => {
    var newpass = document.getElementById("newPassword").value;
    var confirmpass = document.getElementById("rePassword").value;
    if (newpass != null && newpass != "" && newpass.length > 2) {
      if (newpass === confirmpass) {
        onPassChange();
      } else {
        handleOpenSnackbar(
          <span>New password & confirm password doesn't match</span>,
          "error"
        );
      }
    } else {
      handleOpenSnackbar(<span>Password can not be empty</span>, "error");
    }
  };
  const onPassChange = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var formdata = new FormData();
    formdata.append("password", document.getElementById("oldPassword").value);
    formdata.append("newPassword", document.getElementById("rePassword").value);
    console.log(formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/UpdatePassword`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          handleCloseModel();
        } else {
          console.log(result);
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

  const onLogOut = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );
    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Logout`,
      {
        method: "POST",
        headers: myHeaders,
      }
    )
      .then((response) => response.text())
      .then((result) => {
        window.localStorage.removeItem("AtouBeatXData");
        window.localStorage.removeItem("AtouBeatXToken");
        window.location.replace("#/Login");
      })
      .catch((error) => {
        console.log("error", error);
        window.localStorage.removeItem("AtouBeatXData");
        window.localStorage.removeItem("AtouBeatXToken");
        window.location.replace("#/Login");
      });
  };

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
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="customprimary">
          <Toolbar xs={{ display: "" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              variant="h6"
              noWrap
              component="div"
            >
              Attendence Management System
            </Typography>
            <Box sx={{ flexGrow: 0, position: "absolute", right: "2%" }}>
              <Tooltip>
                <IconButton
                  onClick={() => window.location.replace("#/MainDashboard")}
                >
                  <HomeIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Button
                    onClick={handleClickopenModel}
                    component={Link}
                    sx={{
                      color: (theme) => theme.palette.customsecondary.main,
                    }}
                  >
                    change password
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    type="button"
                    component={Link}
                    // href="#/Login"
                    onClick={onLogOut}
                    sx={{
                      color: (theme) => theme.palette.customsecondary.main,
                    }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: (theme) => theme.palette.customprimary.main,
              color: (theme) => theme.palette.customprimary.contrastText,
            },
          }}
        >
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              style={{ color: "inherit" }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <span>
              {theme.direction === "rtl" ? (
                <></>
              ) : (
                <span
                  style={{
                    position: "fixed",
                    top: "3%",
                    left: "6%",
                    fontWeight: "800",
                    color: "inherit",
                  }}
                >
                  MENU
                </span>
              )}
            </span>
          </DrawerHeader>
          <Divider />
          
          <List>
            {groupFeatures.map((obj, index) => {
              let icon="";
              if(obj.id==101){
                icon=<AdminPanelSettingsIcon />;
              }else if(obj.id==102){
                icon=<GroupsIcon />;
              }else if(obj.id==103){
                icon=<ApartmentIcon />;
              }else if(obj.id==104){
                icon=<EventAvailableIcon />;
              }else if(obj.id==105){
                icon=<LockClockIcon />;
              }else if(obj.id==106){
                icon=<AssessmentIcon />;
              }else if(obj.id==107){
                icon=<AvTimerIcon />;
              }
              return (
                <Fragment key={obj.id}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        style={{ color: "inherit" }}
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={obj.label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        </Drawer>
        <Dialog
          open={openModel}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseModel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Reset Your Password"}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModel}
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
                margin="dense"
                required
                fullWidth
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
              />
              <TextField
                margin="dense"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
              />
              <TextField
                margin="dense"
                required
                fullWidth
                name="rePassword"
                label="Re-Password"
                type="password"
                id="rePassword"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={passchangevail} color="warning">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dashboard />
      </Box>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleCloseSnackbar={() => handleCloseSnackbar()}
      />
    </>
  );
}
