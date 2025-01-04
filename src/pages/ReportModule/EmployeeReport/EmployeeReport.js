import * as React from 'react';
import SummarizeIcon from "@mui/icons-material/Summarize";
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

    } from '@mui/material';
import Logout from '../../Login/Logout';
import { useEffect } from 'react';
import CustomizedSnackbar from '../../../components/CustomizedSnackbar/CustomizedSnackbar';


export default function EmployeeReport() {
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
  const [employees, setEmployees] = React.useState([]);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getAllEmp = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetAllWithCustomFieldsByUserFirm`,
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
    setIsLoading(false);
  };
  useEffect(() => {
    getAllEmp();
  }, []);
  return (
    <>
    <Grid sx={{p:5}}>
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
                <SummarizeIcon />
              </Avatar>
              <Typography component="span" fo variant="h5">
                Employee Report
              </Typography>
              </Grid>
            </Grid>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
            <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} >First Name</TableCell>
                    <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Last Name</TableCell>
                     <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > National ID</TableCell>
                      
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Email</TableCell>
                     
                      <TableCell  sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Contect NO</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.cnicNo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell >{row.contactNo}</TableCell>
                  {/* <TableCell align="right">
                    <Button color="warning"  size="small" variant="contained" onClick={()=>editBranch(row.id)}>  <ModeEditOutline/> </Button>
                  </TableCell> */}
                </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
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