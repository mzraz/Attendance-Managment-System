import * as React from "react";
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
} from "@mui/material";
const columns = [
  { id: "EmpID", label: "Employee ID" },
  { id: "Name", label: "Employee Name" },
  { id: "CheckIN", label: "CheckIN" },
  { id: "CheckOUT", label: "CheckOUT" },
  { id: "Workinghours", label: "Working Hours", align: "right" },
];

function createData(Name, EmpID, CheckIN, CheckOUT, Workinghours) {
  return { Name, EmpID, CheckIN, CheckOUT, Workinghours };
}

const rows = [
  createData(
    "Ali Hamza",
    "123",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
  createData(
    "Umer Nadeem",
    "456",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
  createData(
    "Haseeb liaqat",
    "789",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
];

export default function AttendanceReport() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
              <SummarizeIcon />
            </Avatar>
            <Typography component="span" fo variant="h5">
              Attendance Report
            </Typography>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        fontWeight: "bold",
                        color: (theme) =>
                          theme.palette.customprimary.contrastText,
                        backgroundColor: (theme) =>
                          theme.palette.customsecondary.main,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.EmpID}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
        // bottomLeftButtonAction={this.viewReport}
        //  right_button_text="Save"
        // bottomRightButtonAction={this.clickOnFormSubmit}
        // loading={this.state.isLoading}
        // isDrawerOpen={ this.props.isDrawerOpen}
      />
    </>
  );
}
