import { createTheme } from "@material-ui/core/styles";
import { blue, common, grey, lightBlue } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: lightBlue[300],
      contrastText: common.white,
    },
  },
  overrides: {
    MuiDivider: {
      vertical: {
        backgroundColor: grey[50],
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: common.black,
      },
    },
  },
});
