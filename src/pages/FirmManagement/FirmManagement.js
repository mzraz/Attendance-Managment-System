import React, { useState, Fragment, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../components/navbar/footer";
import CustomizedSnackbar from '../../components/CustomizedSnackbar/CustomizedSnackbar';
import { InputAdornment, TextField } from "@mui/material";
import DomainAddIcon from '@mui/icons-material/DomainAdd';





export default function FirmManagement() {
  const [state, setState] = React.useState({
    firmLabel:"",
    customFields: [],
    firmId:null,
    userId:null,
  });
  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleOpenSnackbar = (msg, severity) => {
    setIsOpenSnackbar (true);
    setSnackbarMessage (msg);
    setSnackbarSeverity (severity);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSnackbar(false);
  };
const getsessiondata = () =>{
  var sessiondata = JSON.parse(localStorage.getItem("AtouBeatXData"));
  state.firmId= sessiondata.DATA.firmId;
  state.userId= sessiondata.DATA.id;
} 
  
  const addCustomField = (counter) => {
    let { customFields } = state;
    customFields.push(counter + 1);
    setState({ ...state, customFields });
  };
  
  const getFirm = ()=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+window.localStorage.getItem("AtouBeatXToken"));

var formdata = new FormData();

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Departments/GetAllByFirmId?firmId=1`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if (result.SUCCESS === 1) {
    // setDepartment(result.DATA);
    }else{
      handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>,"error");
    }
  })
  .catch(error => {
    console.log('error', error);
    handleOpenSnackbar("Failed to fetch ! Please try Again later.","error");
  });
  }
  const saveFirm = () => {
    if (state.firmLabel!=null && state.firmLabel!="" && state.firmLabel!=" ") {
          
      console.log("Email"+state.firmLabel);
    }else{
      handleOpenSnackbar(<span>Please Enter Firm Label</span>,"error");
      return;  
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+window.localStorage.getItem("AtouBeatXToken"));
    
    var formdata = new FormData();
    formdata.append("label", document.getElementById("firmLabel").value);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/SaveAndReturn`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.SUCCESS === 1) {
          var loginarry = JSON.parse(localStorage.getItem("AtouBeatXData"));
          loginarry.DATA.firm=result.DATA.label;
          loginarry.DATA.firmId=result.DATA.id;
          window.localStorage.setItem("AtouBeatXData", JSON.stringify(loginarry));
          // getDesignation();
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>,"success");
        console.log(result);
        }else{
          console.log(result);
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>,"error");
    
        }
      })
      .catch(error => {
        console.log('error', error);
        handleOpenSnackbar("Failed to fetch ! Please try Again later.","error");
      });
  }





  
   

  

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
              noValidate
            //   onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              style={{width:"100%"}}
            > 
            
             <Grid container spacing={2}>
             <Grid item  sm={11}>
              <TextField
              placeholder="ADD New Firm"
              name="firmLabel"
              id="firmLabel"
              variant="outlined"
              fullWidth
              onChange={(e) => setState({...state, firmLabel : e.target.value})}
            //   onChange={(e) => setValue(e.target.value)}
            //   value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DomainAddIcon />
                  </InputAdornment>
                ),

              
              }}
            />
          </Grid>
          <Grid item  sm={1}><Button  variant="contained" onClick={saveFirm} color="warning">+Add</Button></Grid>
          {state.customFields.map((data, index) => {
                  return (
                    <Fragment key={"cf-" + index}>
                      
                      <Grid item xs={12}>
                        <TextField
                          color="warning"
                          required
                          fullWidth
                          name="customFieldValue"
                          label="Add Branch Lable"
                          id="customFieldValue"
                        />
                      </Grid>
                    </Fragment>
                  );
                })}
          </Grid>
            
              <Grid container justifyContent="flex-start">
                <Button
                  component={Link}
                  style={{ color: "" }}
                  onClick={(e) => addCustomField(state.customFieldsCounter)}
                >
                  Add Branchies
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
              
              </Grid>
              
            </Box>
          </Grid>
         

        </Box>
      </Container>
      <Footer 
       left_button_text="View"
       left_button_hide={true}
       right_button_text="Save"
    //    bottomRightButtonAction={() => saveEmployee()}
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
