import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { useAppSelector } from "../../hooks";
import { Language } from "../../redux/language";
import { useHistory } from "react-router-dom";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

const StatisticsTable = () => {
  const classes = useStyles();
  const history = useHistory();

  const { items } = useAppSelector((s) => s.language);

  const onRowClick = (id: Language["id"]) => {
    history.push(`/languages/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.root} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Language</TableCell>
            <TableCell align="right">Questions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 &&
            items.map(({ id, title, total }) => (
              <TableRow key={id} className={classes.bodyRow} onClick={onRowClick.bind(null, id)}>
                <TableCell component="th">{title}</TableCell>
                <TableCell align="right" component="th">
                  {total}
                </TableCell>
              </TableRow>
            ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell component="th" colSpan={2} className="text-muted text-center">
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
