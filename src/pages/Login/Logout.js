import * as React from 'react';

import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar";



export default function Logout() {
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
    const onLogOut = () => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + window.localStorage.getItem("AtouBeatXToken")
          );
    
        var requestOptions = {
          method: "POST",
          redirect: "follow",
        };
    
        fetch(
          `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Logout`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            window.localStorage.removeItem("AtouBeatXData");
            window.localStorage.removeItem("AtouBeatXToken");
            window.location.replace("#/Login");
          })
          .catch((error) => {
            console.log("error", error);
            handleOpenSnackbar(
              "Failed to fetch ! Please try Again later.",
              "error"
            );
          });
      };
      React.useEffect(() => {
        Logout();
      }, []);
  return (
    <>
    <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleCloseSnackbar={() => handleCloseSnackbar()}
      />
      </>
  );
}