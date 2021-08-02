import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    deleteAlert: {
      position: "relative",
      paddingRight: theme.spacing(8),
    },
    deleteLanguageButtonWrap: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      padding: theme.spacing(0, 1, 0, 0),
      alignItems: "center",
    },
  })
);
