import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useHistory } from "react-router-dom";
import { getLanguageUrl } from "../../shared/utils";
import clsx from "clsx";
import { languageSlice } from "../../redux/language";

const StatisticsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { items, selected } = useAppSelector((s) => s.language);
  const dispatch = useAppDispatch();
  const onRowClick = (id: number) => {
    history.push(getLanguageUrl(id));
    dispatch(languageSlice.actions.select(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.root} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Language</TableCell>
            <TableCell component="th" align="right" width={50}>
              Questions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 &&
            items.map(({ id, title, total }) => (
              <TableRow
                key={id}
                className={clsx(classes.bodyRow, { [classes.selected]: id === selected })}
                onClick={onRowClick.bind(null, id)}
              >
                <TableCell component="td">
                  <span>{title}</span>
                </TableCell>
                <TableCell align="right" component="td">
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
