import * as React from "react";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import Footer from "../../components/navbar/footer";

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
import Logout from "../Login/Logout";
import { useEffect } from "react";
import { ArrowBack, ListAltOutlined, ModeEditOutline } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';




export default function BasicLeaveList() {
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
  const [leave, setLeave] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getAllLeave = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetAllByFirm`,
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
          setLeave(result.DATA);
          console.log(leave);
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
  const editleave = (id) =>{
    window.location.replace("#/MainDashboard/BasicLeave/"+id)
  }
  const delleave = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/DeleteByIdAndFirm`,
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
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          
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
    getAllLeave();
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
           {/* <Avatar
              sx={{
                m: 1,
                bgcolor: (theme) => theme.palette.customprimary.main,
              }}
            >
              <ArrowBack />
            </Avatar> */}
            <Avatar
              sx={{
                m: 1,
                bgcolor: (theme) => theme.palette.customprimary.main,
              }}
            >
              <ListAltOutlined />
            </Avatar>
            <Typography component="span" fo variant="h5">
              List of Basic Leave
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
                      }} > Employee Name</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Leave Type</TableCell>
                      
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} >Start Date</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} >End Date</TableCell>
                      <TableCell sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} >Leave Reason</TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: "bold",
                        color: (theme) =>theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>theme.palette.customsecondary.main,
                      }} > Action</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {leave
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.userLabel}</TableCell>
                        <TableCell>{row.attendanceTypeLabel}</TableCell>
                        <TableCell>{row.startOnDateDisplay}</TableCell>
                        <TableCell>{row.endOnDateDisplay}</TableCell>
                        <TableCell>{row.leaveReason}</TableCell>
                        <TableCell align="right">
                        <Button color="warning"  size="small" variant="contained" onClick={()=>editleave(row.id)}>  <ModeEditOutline/> </Button>{" "}
                        <Button color="warning"  size="small" variant="contained" onClick={()=>delleave(row.id)}>  <DeleteIcon/> </Button>
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
            count={leave.length}
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
