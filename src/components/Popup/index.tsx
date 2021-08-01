import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  title: string;
  text?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const SimpleDialog: FC<Props> = ({ open, title, text, onClose, onSubmit, children }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} className={classes.root} fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} color={"secondary"} onClick={onClose}>
          Close
        </Button>
        <Button variant={"contained"} color={"primary"} onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
