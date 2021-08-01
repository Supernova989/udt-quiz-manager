import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    bodyRow: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#cecece",
      },
    },
  })
);
