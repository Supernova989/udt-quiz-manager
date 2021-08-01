import React, { FC } from "react";
import { useStyles } from "./styles";

const Content: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default Content;
