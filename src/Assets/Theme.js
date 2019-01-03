import {createMuiTheme } from '@material-ui/core/styles';
//import orange from '@material-ui/core/colors/orange';
//import red from '@material-ui/core/colors/red';
//import grey from '@material-ui/core/colors/grey';

const Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 18,
  },
  palette: {
    primary: {
      main: '#fb8c00',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default Theme;