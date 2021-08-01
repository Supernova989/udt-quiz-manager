import { createStyles, makeStyles } from "@material-ui/core";
import { SIDEBAR_WIDTH } from "../Sidebar/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: SIDEBAR_WIDTH,
      padding: theme.spacing(2, 2),
    },
  })
);
