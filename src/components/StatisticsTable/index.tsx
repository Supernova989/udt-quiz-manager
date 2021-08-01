import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { useAppSelector } from "../../hooks";
import { useHistory } from "react-router-dom";
import { getLanguageUrl } from "../../shared/utils";

const StatisticsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { items } = useAppSelector((s) => s.language);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.root} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Language</TableCell>
            <TableCell component="th" align="right">
              Questions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 &&
            items.map(({ id, title, total }) => (
              <TableRow key={id} className={classes.bodyRow} onClick={() => history.push(getLanguageUrl(id))}>
                <TableCell component="td">{title}</TableCell>
                <TableCell align="right" component="th">
                  {total}
                </TableCell>
              </TableRow>
            ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell component="td" colSpan={2} className="text-muted text-center">
                No languages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
