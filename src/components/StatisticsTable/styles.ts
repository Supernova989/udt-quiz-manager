import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    selected: {
      backgroundColor: blue[200] + " !important",
    },
    bodyRow: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: blue[50],
      },
    },
  })
);
