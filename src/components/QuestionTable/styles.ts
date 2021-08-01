import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    bodyRow: {
      "&:hover": {
        backgroundColor: grey[50],
      },
    },
  })
);
