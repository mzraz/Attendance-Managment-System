import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function BottomBar(props) {
  const bottomRightButtonAction = (props) => {
    props.bottomRightButtonAction();
  };

  const bottomLeftButtonAction = (props) => {
    props.bottomLeftButtonAction();
  };
  return (
    <Box
      sx={{
        width: "-webkit-fill-available",
        backgroundColor: (theme) => theme.palette.customprimary.main,
      }}
      style={{ position: "fixed", bottom: 0, margin: "0", padding: "0.5%" }}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={() => bottomLeftButtonAction(props)}
        disabled={props.disableLeftButton}
        style={{ float:'inline-start',display: props.left_button_hide ? "none" : "inline-block" }}
      >
        {props.left_button_text}
      </Button>
      <Button
        color="warning"
        variant="contained"
        disabled={props.disableRightButton || props.loading}
        onClick={() => bottomRightButtonAction(props)}
        style={{ float:'inline-end',
          display: props.hideRightButton ? "none" : "inline-block",
        }}
      >
      {props.right_button_text}
      </Button>
    </Box>
  );
}

BottomBar.propTypes = {
  isDrawerOpen: PropTypes.bool,
  disableLeftButton: PropTypes.bool,
  left_button_hide: PropTypes.bool,
  left_button_text: PropTypes.any,
  bottomLeftButtonAction: PropTypes.func,
  disableRightButton: PropTypes.bool,
  hideRightButton: PropTypes.bool,
  right_button_text: PropTypes.any,
  bottomRightButtonAction: PropTypes.func,
  loading: PropTypes.bool,
  otherActions: PropTypes.any,
};

BottomBar.defaultProps = {
  isDrawerOpen: true,
  disableLeftButton: false,
  left_button_hide: false,
  left_button_text: "View",
  bottomLeftButtonAction: (fn) => fn,
  disableRightButton: false,
  hideRightButton: false,
  right_button_text: "Save",
  bottomRightButtonAction: (fn) => fn,
  loading: false,
  otherActions: "",
};
