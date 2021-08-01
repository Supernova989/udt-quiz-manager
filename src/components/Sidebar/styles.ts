import { createStyles, makeStyles } from "@material-ui/core";

export const SIDEBAR_WIDTH = 280;

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#F7F7F7",
      borderRight: "1px solid #CECECE",
      width: SIDEBAR_WIDTH,
      height: "100vh",
      position: "fixed",
      flexShrink: 0,
      zIndex: 1,
    },
    container: {
      padding: theme.spacing(0, 0.5, 0, 0.5),
      margin: theme.spacing(0, 0, 1),
    },
  })
);
