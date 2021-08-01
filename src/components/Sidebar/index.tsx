import React, { FC } from "react";
import { useStyles } from "./styles";
import StatisticsTable from "../StatisticsTable";

const SideBar: FC = () => {
  const classes = useStyles();

  return (
    <aside className={classes.root}>
      <div className={classes.container}>
        <StatisticsTable />
      </div>
    </aside>
  );
};

export default SideBar;
