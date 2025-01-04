import * as React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../../../components/navbar/footer";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  TableContainer,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Slider,
  TextField,
} from "@mui/material";
import   styled  from "@emotion/styled";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ItemTypes = {
  CARD: "card",
};

const Tablee = ({ items, onDrop }) => {
  return (
    <div onDrop={(e) => onDrop(e)} onDragOver={(e) => e.preventDefault()}>
      <div
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData(ItemTypes.CARD, JSON.stringify(items))
        }
        style={{
          margin: "5px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          cursor: "move",
        }}
      >
        {items.name}
      </div>
    </div>
  );
};

const StyledTableCell = styled('TableCell')(({theme}) => ({
  head: {
    backgroundColor: theme.palette.customsecondary.main, //theme.palette.common.black,
    color: "white",
    fontWeight: 500,
    border: "1px solid rgb(29, 95, 152)",
  },
  body: {
    fontSize: 14,
    border: "1px solid rgb(29, 95, 152)",
  },
}));

const StyledTableRow = styled('TableRow')(({theme}) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function RotaShedule() {
  const [openDays, setOpenDays] = React.useState(false);
  const [openEmp, setOpenEmp] = React.useState(false);

  const handleClickOpenDays = () => {
    setOpenDays(true);
  };
  const handleClickOpenEmp = () => {
    setOpenEmp(true);
  };
  const handleCloseDays = () => {
    setOpenDays(false);
  };
  const handleCloseEmp = () => {
    setOpenEmp(false);
  };
  const [sliderValue, setSliderValue] = React.useState([0, 10]);

  const handleChangeSlider = (event, newValue) => {
    setSliderValue(newValue);
  };
  const [assignEmployee, setassignEmployee] = useState([
    { id: 0, name: "+Add Employee" },
  ]);
  const [unAssignEmployee, setunAssignEmployee] = useState([
    { id: 1, name: "Ali hamaza" },
    { id: 2, name: "Umer Nadeem" },
    { id: 3, name: "Umer Ijaz" },
    { id: 3, name: "Umer Ijaz" },
    { id: 3, name: "Umer Ijaz" },
  ]);
  const [weekDays, setWeekDays] = useState([
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ]);
  const handleDrop = (e) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData(ItemTypes.CARD));
    setassignEmployee([...assignEmployee, droppedItem]);

    // Remove the item from the source Tablee
    const updatedTable1 = unAssignEmployee.filter(
      (item) => item.id !== droppedItem.id
    );
    setunAssignEmployee(updatedTable1);
  };
  return (
    <>
     <Dialog
        fullScreen
        open={openEmp}
        onClose={handleCloseEmp}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            //backgroundColor: (theme)=>theme.palette.customsecondary.main
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
              {" "}
              Ali Hamza{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseEmp}>
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
              <Table sy aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        width: "20%",
                        borderLeft: "1px solid rgb(29, 95, 152)",
                      }}
                    >
                      <b>Week Days</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ borderRight: "1px solid rgb(29, 95, 152)" }}
                    >
                      <b>Employee Slots</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{width:'10%', borderRight: "1px solid rgb(29, 95, 152)" }}
                    >
                      <b>Add Slots</b>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {weekDays.map((day) => (
                    <StyledTableRow key={day.id}>
                      <StyledTableCell component="th" scope="row">
                        {" "}
                        <Tablee
                          items={day}
                        //   onDrop={handleDrop}
                        />{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {day.name ==='Monday' ?
                      <div style={{
                        width: '100%',
                        display: 'inline-block',
                    
                      }}> 
                         <Slider
                         style={{
                            width: '45%',
                            display: 'inline-block',
                            float: 'inline-start'
                         }}
                          getAriaLabel={() => "Temperature range"}
                          value={sliderValue}
                          onChange={handleChangeSlider}
                          valueLabelDisplay="auto"
                          min={0}
                          max={24}
                          // getAriaValueText={valuetext}
                        />
                       
                        <Slider
                         style={{
                            width: '45%',
                            display: 'inline-block',
                            float: 'inline-end'
                         }}
                        getAriaLabel={() => "Temperature range"}
                        value={sliderValue}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="auto"
                        min={0}
                        max={24}
                        // getAriaValueText={valuetext}
                      />
                      </div> : day.name ==='Tuesday' ?<div style={{
                     width: '100%',
                     display: 'inline-block',
                 
                   }}> 
                      <TextField
                   color="warning"
                   required
                   style={{
                    width:'45%',
                    float: 'inline-start'
                   }}
                   id="time"
                   name="time"
                   autoComplete="time"
                   type="time"
                 />
                    <TextField
                   color="warning"
                   required
                   style={{
                    width:'45%',
                    float: 'inline-end'
                   }}
                   id="time"
                   name="time"
                   autoComplete="time"
                   type="time"
                 />
                   </div> 
                    
                   
                    :<Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    min={0}
                    max={24}
                    // getAriaValueText={valuetext}
                  />}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Button  variant="contained" color="warning">+Add</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
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
            //backgroundColor: (theme)=>theme.palette.customsecondary.main
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
              Monday{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDays}>
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
              <Table sy aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        width: "20%",
                        borderLeft: "1px solid rgb(29, 95, 152)",
                      }}
                    >
                      <b>Employees</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ borderRight: "1px solid rgb(29, 95, 152)" }}
                    >
                      <b>Slots</b>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {unAssignEmployee.map((assignEmployee) => (
                    <StyledTableRow key={assignEmployee.id}>
                      <StyledTableCell component="th" scope="row">
                        {" "}
                        <Tablee
                          items={assignEmployee}
                          onDrop={handleDrop}
                        />{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={sliderValue}
                          onChange={handleChangeSlider}
                          // valueLabelDisplay="auto"
                          // getAriaValueText={valuetext}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
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
            <Grid item xs={12} sm={3}>
              <Table aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{ borderLeft: "1px solid rgb(29, 95, 152)" }}
                    >
                      Unassign Employees
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {unAssignEmployee.map((unAssignEmployee) => (
                    <StyledTableRow key={unAssignEmployee.id}>
                      <StyledTableCell draggable component="th" scope="row">
                        <Tablee items={unAssignEmployee} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Table aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{ borderLeft: "1px solid rgb(29, 95, 152)" }}
                    >
                      Assign Employees
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Monday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Tuesday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Wednesday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Thursday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Friday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Saturday
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ borderRight: "1px solid rgb(29, 95, 152)" }}
                    >
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleClickOpenDays}
                        style={{ color: "white" }}
                      >
                        Sunday
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {assignEmployee.map((assignEmployee) => (
                    <StyledTableRow key={assignEmployee.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        onClick={handleClickOpenEmp}
                        style={{ cursor: "pointer" }}
                      >
                        <Tablee items={assignEmployee} onDrop={handleDrop} />
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
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
    </>
  );
}
