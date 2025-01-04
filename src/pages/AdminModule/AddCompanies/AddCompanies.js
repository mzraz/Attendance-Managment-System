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
import { CircularProgress, MenuItem } from "@mui/material";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import Logout from "../../Login/Logout";

// TODO remove, this demo shouldn't need to reset the theme.

export default function AddCompanies() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [state, setState] = React.useState({
    label: "",
    businesstypeId: null,
    webUrl: "",
    totalBranches: "",
    totalEmployees: "",
  });

  const [businessType,setBusinessType] =React.useState([]);
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
  const getBusinessTypes = async () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetBusinessTypesDropdown`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setBusinessType( result.DATA );
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
  const getCompanyData = async () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetByUser`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              label: data.label,
              webUrl: data.webUrl,
				      totalBranches: data.totalBranches,
				      totalEmployees:data.totalEmployees,
              businesstypeId:data.businessTypeId,
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

  const saveCompany = async ()  => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("companydata"));
    formdata.append("firmId", "1");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/Save`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
    setIsLoading(false);

          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log("result", result);
        if (result.SUCCESS === 1) {
          // setState({ ...state, companyData: result.DATA });

          // console.log(state.companyData);
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) =>{
         console.log("error", error)
         handleOpenSnackbar("Failed to fetch ! Please try Again later.", "error");
    });
    setIsLoading(false);

  };
  const handleChange = (e) => {
    
     setState({ ...state, [e.target.name]: e.target.value });
    };
  useEffect(() => {
    getCompanyData();
    getBusinessTypes();
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
                <DomainAddIcon />
              </Avatar>
              <Typography component="span" variant="h5">
                Add New Company
              </Typography>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 ,width:'100%'}}
            >
              <form id="companydata" >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      // autoComplete="given-name"
                      name="label"
                      required
                      fullWidth
                      value={state.label}
                      id="label"
                      label="Company Label"
                      autoFocus
                      onChange={handleChange}

                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      value={state.businesstypeId}
                      id="businessTypeId"
                      label="Business Type"
                      name="businessTypeId"
                      onChange={handleChange}

                      select
                      InputLabelProps={{ shrink: true }}
                      
                    >
                      {isLoading ? (
                        <center>
                          <CircularProgress size={24} color="warning" />
                        </center>
                      ) : (
                        businessType.map((obj) => (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.label}
                            </MenuItem>
                          ))
                          )}
                       
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      required
                      fullWidth
                      id="webUrl"
                      value={state.webUrl}
                      onChange={handleChange}

                      label="Website URL"
                      name="webUrl"
                      autoComplete="family-name"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {/* <TextField
                      color="warning"
                      required
                      fullWidth
                      value={state.totalBranches}
                      onChange={handleChange}
                      id="totalBranches"
                      label="Max Branches"
                      name="totalBranches"
                      InputLabelProps={{ shrink: true }}
                      // autoComplete="email"
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <TextField
                      color="warning"
                      required
                      onChange={handleChange}
                      fullWidth
                      value={state.totalEmployees}
                      id="totalEmployees"
                      label="Max. Employee"
                      name="totalEmployees"
                      InputLabelProps={{ shrink: true }}
                      // autoComplete="contect-No"
                    /> */}
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Box>
      </Container>
      <Footer
        left_button_text="View"
        left_button_hide={true}
        right_button_text="Save"
        bottomRightButtonAction={() => saveCompany()}
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
