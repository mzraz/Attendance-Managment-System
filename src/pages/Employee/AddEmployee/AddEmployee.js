import React, { useState, Fragment, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Footer from "../../../components/navbar/footer";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";

export default function AddEmployee() {
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
  const [value, setValue] = React.useState("");
  const [designation, setDesignation] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]);
  const [manager, setManager] = useState(null);
  const [department, setDepartment] = useState([]);
  const [braches, setBraches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customFields, setCustomFields] = useState([]);
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
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addCustomField = (e) => {
    let customFieldsArr = [...customFields];
    customFieldsArr.push({
      id: "",
      label: "",
      value: "",
    });
    setCustomFields(customFieldsArr);
    console.log("customFieldsArr", customFieldsArr);
  };
  const removeCustomField = (index) => {
    let customFieldsArr = [...customFields];
    customFieldsArr.splice(index, 1)
    setCustomFields(customFieldsArr);
    console.log("customFieldsArr", customFieldsArr);
  };
  const viewAction = () => {
    window.location.replace("#/MainDashboard/EmployeeList");
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

  const getDesignation = () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDesignationsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDesignation(result.DATA);
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
  const getBranches = () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetFirmBranchesDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setBraches(result.DATA);
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
  const getDepartments = () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDepartmentsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDepartment(result.DATA);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [openDesignation, setopenDesignation] = React.useState(false);

  const openDesignationModel = () => {
    setopenDesignation(true);
  };
  const closeDesignationModel = () => {
    setopenDesignation(false);
  };
  const saveDesignationModel = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("label", document.getElementById("addDesignation").value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsDesignations/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          closeDesignationModel();
          getDesignation();
          console.log(result);
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

  const [openDepartment, setopenDepartment] = React.useState(false);

  const openDepartmentModel = () => {
    setopenDepartment(true);
  };
  const closeDepartmentModel = () => {
    setopenDepartment(false);
  };
  const saveDepartmentModel = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("label", document.getElementById("addDepartment").value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsDepartments/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          closeDepartmentModel();

          getDepartments();
          console.log(result);
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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const saveEmployee = () => {
    var pass = document.getElementById("password").value;
    var confirmpass = document.getElementById("confirmPassword").value;

    if (pass === confirmpass) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      var formdata = new FormData(document.getElementById("employeedata"));
      formdata.append("id", state.userId);
      formdata.append("typeId", state.typeId);
      formdata.append("reportingToUserId", manager.id);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      var url = "";
      if (state.userId) {
        url = "/Users/Save";
      } else {
        url = "/Users/SaveInActiveUser";
      }
      fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}` +
          url,
        requestOptions
      )
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
    } else {
      handleOpenSnackbar(
        <span>New password & confirm password doesn't match</span>,
        "error"
      );
    }
  };
  const getEmployeeDataBySelect = (empid) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetWithCustomFieldsById`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          console.log(result.DATA);
          if (data) {
            // debugger;
            setState({
              userId: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              firmId: data.firmId,
              departmentId: data.departmentId,
              designationId: data.designationId,
              contactNo: data.contactNo,
              branchId: data.branchId,
              cnicNo: data.cnicNo,
              bankAccountNo: data.bankAccountNo,
              isAccountNonLocked: data.isAccountNonLocked,
              typeId: data.typeId,
            });
            if(data.reportingToUserId!=null && data.reportingToUserId!=0){
              var managerObj = employees.find(obj => { return obj.id == data.reportingToUserId });
              if(managerObj){
                setManager(managerObj);
              } else {
                setManager(null);
              }
            }
            setCustomFields([...data.customFields]);
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

  useEffect(() => {
    getemployeeData();
    getBranches();
    getDesignation();
    getDepartments();
  }, []);

  return (
    <>
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
                <PersonAddIcon />
              </Avatar>
              <Typography component="span" variant="h5">
                Add New Employee
              </Typography>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <form id="employeedata" style={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      disableClearable
                      id="employeeselect"
                      options={employees}
                      onChange={(event, value) => setSelectedEmp(value.id)}
                      renderInput={(params) => (
                        <TextField {...params} label="Select User" />
                      )}
                    />
                  </Grid>
                  <Grid item sm={1}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => getEmployeeDataBySelect(selectedEmp)}
                      style={{height:"100%"}}
                    >
                      Edit
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={state.firstName}
                      onChange={handleChange}
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
                      autoComplete="family-name"
                      value={state.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                 
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      autoComplete="given-NationalID"
                      name="cnicNo"
                      required
                      fullWidth
                      id="cnicNo"
                      value={state.cnicNo}
                      onChange={handleChange}
                      label="National ID"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      id="contactNo"
                      label="Contact No"
                      name="contactNo"
                      value={state.contactNo}
                      onChange={handleChange}
                      autoComplete="contact-No"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      id="bankAccountNo"
                      label="Bank Account"
                      name="bankAccountNo"
                      value={state.bankAccountNo}
                      onChange={handleChange}
                      autoComplete="bankAcc"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      color="warning"
                      autoComplete="departmentId"
                      name="departmentId"
                      required
                      fullWidth
                      id="departmentId"
                      label="Department"
                      value={state.departmentId}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Button
                              onClick={() => openDepartmentModel()}
                              variant="contained"
                              color="warning"
                            >
                              +Add
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    >
                      {department && department.length > 0
                        ? department.map((obj, index) => (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.label}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      color="warning"
                      required
                      fullWidth
                      id="designationId"
                      label="Designation"
                      name="designationId"
                      value={state.designationId}
                      onChange={handleChange}
                      autoComplete="designationId"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Button
                              onClick={() => openDesignationModel()}
                              variant="contained"
                              color="warning"
                            >
                              +Add
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    >
                      {designation && designation.length > 0
                        ? designation.map((obj, index) => (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.label}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      color="warning"
                      name="branchId"
                      required
                      fullWidth
                      id="branchId"
                      value={state.branchId}
                      onChange={handleChange}
                      label="Branch"
                    >
                      {braches && braches.length > 0
                        ? braches.map((obj, index) => (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.label}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Autocomplete
                      disablePortal
                      fullWidth
                      disableClearable
                      id="reportingToId"
                      value={manager}
                      options={employees}
                      onChange={(event, value) => setManager(value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Repoting To" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      color="warning"
                      name="isAccountNonLocked"
                      required
                      fullWidth
                      id="isAccountNonLocked"
                      value={state.isAccountNonLocked}
                      onChange={handleChange}
                      label="User Status"
                    >
                      <MenuItem value={0}>block</MenuItem>
                      <MenuItem value={1}>Active</MenuItem>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                    />
                  </Grid>
                  
                  {customFields.map((data, index) => (
                    <Fragment key={"cf-" + index}>
                      <Grid item xs={4}>
                        <TextField
                          color="warning"
                          required
                          fullWidth
                          name="customFieldLabel"
                          label="Custom label"
                          id={"customFieldLable" + index}
                          defaultValue={data.label}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          color="warning"
                          required
                          fullWidth
                          name="customFieldValue"
                          label="Custom Description"
                          id={"customFieldValue" + index}
                          defaultValue={data.value}
                        />
                      </Grid>
                      <Grid item sx={1}>
                        <Button
                          onClick={() => removeCustomField(index)}
                          variant="contained"
                          color="warning"
                          style={{height:"100%",padding:'10px'}}
                        >
                        <DeleteIcon fontSize="small"/>del
                        </Button>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
              </form>
              <Grid container justifyContent="flex-start">
                <Button
                  component={Link}
                  style={{ color: "" }}
                  onClick={addCustomField}
                >
                  Add Custom Field
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Grid>
          {openDepartment ? (
            <Dialog
              open={true}
              TransitionComponent={Transition}
              onClose={() => closeDepartmentModel()}
            >
              <DialogTitle>Add Department</DialogTitle>
              <IconButton
                onClick={closeDepartmentModel}
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
                    id="addDepartment"
                    label="Add Department"
                    name="addDepartment"
                    autoFocus
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  type="button"
                  onClick={() => saveDepartmentModel()}
                  color="warning"
                >
                  ADD
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            ""
          )}
          {openDesignation ? (
            <Dialog
              open={true}
              TransitionComponent={Transition}
              onClose={() => closeDesignationModel()}
            >
              <DialogTitle>Add Designation</DialogTitle>
              <IconButton
                // aria-label="close"
                onClick={closeDesignationModel}
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
                    id="addDesignation"
                    label="Add Designation"
                    name="addDesignation"
                    autoFocus
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  type="button"
                  onClick={() => saveDesignationModel()}
                  color="warning"
                >
                  ADD
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            ""
          )}
        </Box>
      </Container>
      <Footer
        left_button_text="View"
        bottomLeftButtonAction={() => viewAction()}
        right_button_text="Save"
        bottomRightButtonAction={() => saveEmployee()}
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
