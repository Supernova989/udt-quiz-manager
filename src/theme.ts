import { createTheme } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#000000",
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
        backgroundColor: "#000000",
      },
    },
  },
});
