import * as React from "react";
import loding from "../../assets/images/loading.gif";
import success from "../../assets/images/success.gif";
import Failed from "../../assets/images/link_failed.jpg";
import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import CustomizedSnackbar from "../CustomizedSnackbar/CustomizedSnackbar";
import { useParams } from "react-router-dom";

export default function LinkVerfication() {
  let parms = useParams();
  let uUID = parms.u;
  let oTP = parms.o;
  const [isLoading, setIsLoading] = React.useState(false);
  const [stauts, setStauts] = React.useState(false);

  const getAllEmp = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("uUID", uUID);
    formdata.append("oTP", oTP);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/LinkVerification`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setStauts(true);
          setTimeout(function () {
            window.location.replace("#/Login");
          }, 3000);
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllEmp();
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
            {stauts ? (
              <>
                <img src={success} alt="" style={{ height: "100vh" }} />
              </>
            ) : (
              <>
                <img src={Failed} alt="" style={{ height: "100vh" }} />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
