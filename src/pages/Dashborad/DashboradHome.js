import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LockClockIcon from "@mui/icons-material/LockClock";
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from "@mui/icons-material/Summarize";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SimpleLineChart from "./carts";
import {
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";

import DListItem from "@mui/material/ListItem";
import { useState } from "react";
import Logout from "../Login/Logout";
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useEffect } from "react";

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.customprimary.main,
  color: theme.palette.customprimary.contrastText,
  cursor: "pointer",
  overflow: "hidden",
  textAlign: "left",
}));

const ListItem = styled(DListItem)(({ theme }) => ({
  color: "gray",
  transition: "background-color 1s",
  "&:hover": {
    backgroundColor: theme.palette.customsecondary.main,
    color: theme.palette.customprimary.contrastText,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: "30px 80px 30px 80px",

  overflowX: "hidden",
  margin: 0,
  padding: 0,
}));

const DashboardHome = () => {
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
  const [groupFeatures, setGroupFeatures] = useState([]);
  const getFeaturesGroups = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesByUser`,
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
          setGroupFeatures(result.DATA);
          console.log("setGroupFeatures:",setGroupFeatures);
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
    getFeaturesGroups();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 5 }}>
      
        <Grid
          container
          spacing={4}
          style={{}}
          columns={{ xs: 4, sm: 8, md: 12 }}
        > {groupFeatures.map((group, index) => {
         
          let icon="";
          if(group.id==101){
            icon=<AdminPanelSettingsIcon />;
          }else if(group.id==102){
            icon=<GroupsIcon fontSize="large"/>;
          }else if(group.id==103){
            icon=<ApartmentIcon fontSize="large"/>;
          }else if(group.id==104){
            icon=<EventAvailableIcon fontSize="large"/>;
          }else if(group.id==105){
            icon=<LockClockIcon fontSize="large"/>;
          }else if(group.id==106){
            icon=<AssessmentIcon fontSize="large"/>;
          }else if(group.id==107){
            icon=<AvTimerIcon fontSize="large"/>;
          }
          return (
          <Grid item xs={4} key={group.id}>
            <Item>
              <CustomCardHeader
                title={<Typography fontWeight="bold">{group.label}</Typography>}
                subheader={
                  <Typography variant="subtitle2">
                    {group.subLabel}
                  </Typography>
                }
                avatar={icon}
              />

              <Divider />
             
                <CardContent>
                <List
                  style={{
                    margin: "-10px",
                    padding: 0,
                    minHeight: "240px",
                  }}
                >
                   {(group.features).map((obj2, index2) => {
                    
                    let icon=<Avatar alt="img" src="" />;
                    if(obj2.featureId==2001){
                      icon=<PersonAddIcon fontSize="large"/>;
                    }else if(obj2.featureId==1002){
                      icon=<SettingsAccessibilityIcon fontSize="large"/>;
                    }else if(obj2.featureId==1003){
                      icon=<ApartmentIcon fontSize="large"/>;
                    }else if(obj2.featureId==1004){
                      icon=<DomainAddIcon fontSize="large" />;
                    }else if(obj2.featureId==4001){
                      icon= <EventRoundedIcon fontSize="large"/>;
                    }else if(obj2.featureId==5001){
                      icon= <CalendarMonthIcon fontSize="large" />;
                    }else if(obj2.featureId==5002){
                      icon= <CalendarMonthIcon fontSize="large" />;
                    }else if(obj2.featureId==6001){
                      icon= <SummarizeIcon fontSize="large"/>;
                    }else if(obj2.featureId==6002){
                      icon= <SummarizeIcon fontSize="large"/>;
                    }else if(obj2.featureId==6003){
                      icon= <SummarizeIcon fontSize="large"/>;
                    }else if(obj2.featureId==7001){
                      icon= <AvTimerIcon fontSize="large" />;
                    }
                    
          return (<>
         
                  <ListItem
                    style={{
                      margin: 0,
                      cursor: "pointer",
                    }}
                    alignItems="flex-start"
                    onClick={() =>
                      window.location=obj2.featureUrl
                    }
                  >
                    <ListItemAvatar>
                    {icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">{obj2.featureLabel}</Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          style={{ paddingLeft: "2px" }}
                        >
                         {obj2.featureSubLabel}
                        </Typography>
                      }
                    />
                  </ListItem>
                  </>
                  );
                })} 
                </List>
              </CardContent>

            </Item>
          </Grid>
           );
          })}
          
          
    
          
        </Grid>
      </Box>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleCloseSnackbar={() => handleCloseSnackbar()}
      />
    </>
  );
};

export default DashboardHome;
