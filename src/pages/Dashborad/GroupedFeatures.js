import React, { useEffect } from "react";

import Footer from "../../components/navbar/footer";

import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import { Avatar, Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LockClockIcon from "@mui/icons-material/LockClock";
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from "@mui/icons-material/Summarize";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Logout from "../Login/Logout";
import { Link, useParams } from "react-router-dom";
export default function GroupedFeatures() {

  let parms = useParams();
  let groupId = parseInt(parms.groupId);
  if (isNaN(groupId)) groupId = 0;
  const viewFeaturePage = (url) => {
    window.location=url;
  };

  const [isOpenSnackbar, setIsOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [groupFeature, setGroupFeature] = React.useState([]);
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
  const getFeaturesGroups = async (groupId) => {
    setIsLoading(true);
    var formdata = new FormData();
    formdata.append("groupId", groupId);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllByGroupIdAndUser`,
      {
        method: "POST",
        headers: {Authorization:"Bearer " + window.localStorage.getItem("AtouBeatXToken"),},
        body:formdata,
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
          setGroupFeature(result.DATA);
          console.log("setGroupFeature:",groupFeature);
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
    getFeaturesGroups(groupId);
  }, [groupId]);
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
                backgroundColor: "rgb(225 224 229)",
                borderRadius: "5px",
              }}
            >
              <Typography
                component="span"
                style={{ padding: "10px", fontSize: "1.1rem" }}
              >
                {groupFeature[0]?groupFeature[0].featureGroupLabel:""}
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{paddingTop:'10px'}} >
            {(groupFeature).map((obj, index2) => {
             let icon=<Avatar alt="img" src="" />;
             if(obj.featureId==2001){
               icon=<PersonAddIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==1002){
               icon=<SettingsAccessibilityIcon  style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==1003){
               icon=<ApartmentIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==1004){
               icon=<DomainAddIcon style={{height:'100%',width:'100%'}} />;
             }else if(obj.featureId==4001){
               icon= <EventRoundedIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==5001){
               icon= <CalendarMonthIcon style={{height:'100%',width:'100%'}} />;
             }else if(obj.featureId==5002){
               icon= <CalendarMonthIcon style={{height:'100%',width:'100%'}} />;
             }else if(obj.featureId==6001){
               icon= <SummarizeIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==6002){
               icon= <SummarizeIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==6003){
               icon= <SummarizeIcon style={{height:'100%',width:'100%'}}/>;
             }else if(obj.featureId==7001){
               icon= <AvTimerIcon style={{height:'100%',width:'100%'}} />;
             }
              return(
              <>
            <Grid item xs={12} sm={4} key={obj.featureId} >
<div style={{cursor: "pointer",}} onClick={()=>viewFeaturePage(obj.featureUrl)}>
                <Card sx={{ display: "flex", border:'.5px solid green'}}>
                <CardMedia sx={{ width:'25%' }} >
                    {icon}
                  </CardMedia>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography style={{fontWeight:'bold'}}>
                      {obj.featureLabel}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div" style={{color:'green'}}>
                      {obj.featureSubLabel}
          </Typography>
                    </CardContent>
                    
                  </Box>
                 
                </Card>
                </div>
              </Grid>
            </>
            )})}
              
              {/* <Grid item xs={12} sm={4}>
                <Card sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        Live From Space
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Mac Miller
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <IconButton aria-label="previous">
                         {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} 
                      </IconButton>
                      <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      </IconButton>
                      <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} 
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                  />
                </Card>
              </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer
        left_button_text="View"
        left_button_hide={false}
        hideRightButton={false}
        // bottomLeftButtonAction={() => viewAction()}
        right_button_text="Save"
        // bottomRightButtonAction={() => saveLeave()}
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
