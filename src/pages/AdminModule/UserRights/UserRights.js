import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Footer from "../../../components/navbar/footer";
import {
  Avatar,
  Checkbox,
  ListItem,
  Switch,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Autocomplete,
  TextField,
} from "@mui/material";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useState } from "react";
import { useEffect } from "react";

export default function UserRights() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmId: null,
    userId: 0,
    departmentId: "",
    designationId: "",
    customFieldLabel: "",
    customFieldValue: "",
    contactNo: "",
    isAccountNonLocked: "",
    branchId: "",
    cnicNo: "",
    bankAccountNo: "",
    typeId: 0,
  });
  const [openfeaturelist, setOpenFeatureList] = React.useState([]);
  const handleClickFeatureGroup = (index) => {
    debugger;
    let i=openfeaturelist;
    if(i[index]){
      i[index]=(!i[index]);
    }else{
      i[index]="true";
    }
    setOpenFeatureList([...i]);
  };
  const [name, setname] = React.useState("");

  const handleChange = (event) => {
    setname(event.target.value);
  };

  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [userId, setUserId] = React.useState(0);
  const [employees, setEmployees] = useState([]);
  const [features, setFeatures] = useState([]);
  const [isUserSelect, setIsUserSelect] = useState(false);

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
  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  const getFeaturesDataBySelect = (empid) => {
    if (empid == 0) {
      setIsUserSelect(false);
      window.location.reload();
    }
    setUserId(empid);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("userId", empid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesWithSelectionByUserId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          console.log(result.DATA);
          if (data) {
            setFeatures(result.DATA);
            // setState({
            //   userId: data.id,
            //   firstName: data.firstName,
            //   lastName: data.lastName,
            //   email: data.email,
            //   firmId: data.firmId,
            //   departmentId: data.departmentId,
            //   designationId: data.designationId,
            //   contactNo: data.contactNo,
            //   branchId: data.branchId,
            //   cnicNo: data.cnicNo,
            //   bankAccountNo: data.bankAccountNo,
            //   isAccountNonLocked: data.isAccountNonLocked,
            //   typeId: data.typeId,
            // });
            setIsUserSelect(true);
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
  const savefeatures = () => {
    debugger;
    if(userId===0){
      handleOpenSnackbar(
        " Please seclet a user and try Again later.",
        "error"
      );
      return;
    }
  
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      const formdata = new FormData();
      formdata.append("userId", userId);
      let featureIds_ele =  document.getElementsByName("featureId");
      for(let i=0; i<featureIds_ele.length; i++){
        console.log("featureIds_ele"+i, featureIds_ele[i].value);
        if(featureIds_ele[i].checked){
          formdata.append("featureId", featureIds_ele[i].value);
        }
      }
      console.log("formdata", formdata);
         
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      
      fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/Save`,  requestOptions )
        .then((response) => response.json())
        .then((result) => {
          if (result.SUCCESS === 1) {
            handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
            setTimeout(window.location.reload(), 2000);
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
  const getEmployeeDataBySelect = (empid) => {
    if (empid == 0) {
      setIsUserSelect(false);
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", empid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesWithSelectionByUserId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setFeatures([...result.DATA]);
          setIsUserSelect(true);
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
  const getemployeeData = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetUsersDropDownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setEmployees(result.DATA);
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
    getemployeeData();
  }, []);

  return (
    <>
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
              <SettingsAccessibilityIcon />
            </Avatar>
            <Typography component="span" fo variant="h5">
              User Rights
            </Typography>
          </Grid>
        </Grid>

        <Grid sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              fullWidth
              id="employeeselect"
              options={employees}
              onChange={(event, value) =>
                getFeaturesDataBySelect(value ? value.id : 0)
              }
              renderInput={(params) => (
                <TextField {...params} label="Search Employee" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid>
          <Grid>
            <Typography sx={{ p: "15px 0px" }}>User Features</Typography>
            {/* <Divider/> */}
          </Grid>
        </Grid>
        <Grid>
        <from id="featurechecks">
          {isUserSelect ? (
            <>
              
            
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  color: (theme) => theme.palette.customprimary.main,
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                  {features.map((obj, index) => {
                    return (
                      <React.Fragment key={obj.id + " " + obj.label}>
                        <ListItemButton onClick={()=>handleClickFeatureGroup(obj.id)}>
                          <ListItemIcon>
                            <AdminPanelSettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary={obj.label} />
                          {openfeaturelist[obj.id] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={openfeaturelist[obj.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <List
                              dense
                              sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                              }}
                            >
                              {obj.features.map((obj2, index2) => {
                                return (
                                  <ListItem
                                    secondaryAction={
                                      <Checkbox
                                        edge="end"
                                        defaultChecked={obj2.isChecked == 1}
                                        name="featureId"
                                        value={obj2.id}
                                      />
                                    }
                                    disablePadding
                                  >
                                    <ListItemButton>
                                      <ListItemText
                                        id={`checkbox-list-secondary-label-${obj2.id}`}
                                        primary={`${
                                          obj2.id + " - " + obj2.label
                                        }`}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                );
                              })}
                            </List>
                          </List>
                        </Collapse>
                      </React.Fragment>
                    );
                  })}
                
              </List>
            </>
            
          ) : (
            <Typography style={{ textAlign: "center", color: "gray" }}>
              Please Seckect User First
            </Typography>
          )}
          </from>
        </Grid>
      </Grid>
      <Footer
        left_button_text="View"
        left_button_hide={true}
        right_button_text="Save"
        bottomRightButtonAction={() => savefeatures()}
      />
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleCloseSnackbar={() => handleCloseSnackbar()}
      />
    </>
  );
}
