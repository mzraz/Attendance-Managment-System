import * as React from "react";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import Footer from "../../../components/navbar/footer";

import {
  TableContainer,
  TablePagination,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import Logout from "../../Login/Logout";
import { useEffect } from "react";
import { ArrowBack, ListAltOutlined, ModeEditOutline } from "@mui/icons-material";




export default function StoreLocationList() {
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
  const [country, setCountry] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [managers, setManagers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getAllstores = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetAllByFirm`,
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
          console.log(managers);
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
  const editBranch = (id) =>{
    window.location.replace("#/MainDashboard/AddStoreLocation/"+id)
  }
  useEffect(() => {
    getAllstores();
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
              <ArrowBack />
            </Avatar>
            <Avatar
              sx={{
                m: 1,
                bgcolor: (theme) => theme.palette.customprimary.main,
              }}
            >
              <ListAltOutlined />
            </Avatar>
            <Typography component="span" fo variant="h5">
              List of Branches
            </Typography>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Brach ID</TableCell>
                    <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Brach Name</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Manager Name</TableCell>
                      
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Country</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > City</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Content No</TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Action</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {managers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.managerLabel}</TableCell>
                        <TableCell>{row.countryLabel}</TableCell>
                        <TableCell>{row.cityLabel}</TableCell>
                        <TableCell >{row.contactNo}</TableCell>
                        <TableCell align="right">
                          <Button color="warning"  size="small" variant="contained" onClick={()=>editBranch(row.id)}>  <ModeEditOutline/> </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={managers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Footer
        left_button_text="View"
        left_button_hide={true}
        hideRightButton={true}
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
