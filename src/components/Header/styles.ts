import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    inner: {
      padding: theme.spacing(2, 2),
      display: "flex",
    },
    grow1: {
      flexGrow: 1,
    },
  })
);
