import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    answerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);
