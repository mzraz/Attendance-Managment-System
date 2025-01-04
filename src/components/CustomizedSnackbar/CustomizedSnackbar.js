import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from '@emotion/styled';

const useStyles = styled((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbar(props) {

  const classes = useStyles(); 
  
  return (
    <div className={classes.root}>
      <Snackbar 
        open={props.isOpen} 
        autoHideDuration={2000} 
        onClose={() => props.handleCloseSnackbar()}
      >
        <MuiAlert 
          elevation={6} 
          variant="filled"
          onClose={() => props.handleCloseSnackbar()} 
          severity={props.severity}
        >
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbar;