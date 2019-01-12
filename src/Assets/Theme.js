import {createMuiTheme } from '@material-ui/core/styles';
//import orange from '@material-ui/core/colors/orange';
//import red from '@material-ui/core/colors/red';
//import grey from '@material-ui/core/colors/grey';

const Theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Muli',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
    fontSize: 18,
  },
  palette: {
    primary: {
      main: '#fb8c00',
    },
    secondary: {
      main: '#f4f9f9',
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: '#f7f1ed',
      }
    }
  }
});

export default Theme;