import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../../components/navbar/footer";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { CircularProgress, MenuItem } from "@mui/material";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { width } from "@mui/system";
import Logout from "../../Login/Logout";
import { useParams } from "react-router-dom";

export default function AddStoreLocation() {
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
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

  const [state, setState] = React.useState({
    label: "",
    managerId: null,
    countryId: null,
    cityId: null,
    address: null,
    branchData: {},
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [managers, setManagers] = React.useState([]);

  const getStoreById = async (id) => {
    if (id === 0) {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            getAllByCountryId(data.countryId);
            setState({
              label: data.label,
              managerId: data.managerId,
              countryId: data.countryId,
              cityId: data.cityId,
              address: data.address,
              contactNo: data.contactNo,
            });
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

  const getAllByCountryId = async (countryId) => {
    setIsLoading(true);
    if (countryId != null) {
    } else {
      handleOpenSnackbar(<span>Please select country first.</span>, "error");
      setIsLoading(false);
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("countryId", countryId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Cities/GetAllByCountryId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCity(result.DATA);
          console.log(state.city);
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
  const getAllCountries = async () => {
    setIsLoading(true);

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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Countries/GetAll`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCountry(result.DATA);
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

  const getManagers = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetUsersDropDownByFirm`,
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
          setManagers(result.DATA);
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
  const saveBranch = async () => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("branchData"));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setTimeout(function () {
            if (id != 0) {
              window.location.replace("#/MainDashboard/StoreLocationList");
            } else {
              window.location.reload();
            }
          }, 2000);
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

    setIsLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.name == "countryId") {
      getAllByCountryId(e.target.value);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const viewAction = () => {
    window.location.replace("#/MainDashboard/StoreLocationList");
  };

  useEffect(() => {
    getManagers();
    getAllCountries();
    getStoreById(id);
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
                <AddLocationAltIcon />
              </Avatar>
              <Typography component="span" variant="h5">
                Add New Store Location
              </Typography>
            </Grid>
            <Box sx={{ mt: 3 }} style={{ width: "100%" }}>
              <form id="branchData">
                <input type="hidden" name="id" value={id} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      name="label"
                      required
                      fullWidth
                      id="label"
                      label="Store Name"
                      autoFocus
                      value={state.label}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      color="warning"
                      required
                      fullWidth
                      id="managerId"
                      label="Manager"
                      name="managerId"
                      value={state.managerId}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    >
                      {isLoading ? (
                        <center>
                          <CircularProgress size={24} color="warning" />
                        </center>
                      ) : (
                        managers.map((obj) => (
                          <MenuItem value={obj.id} key={obj.id}>
                            {obj.label}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      color="warning"
                      fullWidth
                      id="countryId"
                      label="Country"
                      name="countryId"
                      autoComplete="family-name"
                      InputLabelProps={{ shrink: true }}
                      value={state.countryId}
                      onChange={handleChange}
                      oncli={(ev) => getAllByCountryId(ev.target.value)}
                    >
                      {isLoading ? (
                        <center>
                          <CircularProgress size={24} color="warning" />
                        </center>
                      ) : (
                        country.map((obj) => (
                          <MenuItem value={obj.id} key={obj.id}>
                            {obj.label}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      color="warning"
                      name="cityId"
                      fullWidth
                      id="cityId"
                      label="City"
                      onChange={handleChange}
                      value={state.cityId}
                      InputLabelProps={{ shrink: true }}
                      autoFocus
                    >
                      {city && city.length > 0
                        ? city.map((obj, index) => (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.label}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      fullWidth
                      id="address"
                      label="Address"
                      value={state.address}
                      onChange={handleChange}
                      name="address"
                      InputLabelProps={{ shrink: true }}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      autoComplete="given-cnic"
                      name="contactNo"
                      fullWidth
                      value={state.contactNo}
                      onChange={handleChange}
                      id="contactNo"
                      InputLabelProps={{ shrink: true }}
                      label="Contact No"
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Box>
      </Container>
      <Footer />
      <Footer
        loading={state.isLoading}
        left_button_text="View"
        right_button_text="Save"
        bottomRightButtonAction={() => saveBranch()}
        bottomLeftButtonAction={() => viewAction()}
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
