import React, { FC } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { useStyles } from "./styles";
import { useAppSelector } from "../../hooks";
import { Language } from "../../redux/language";
import { useHistory, Link } from "react-router-dom";
import { getNewQuestionUrl, getQuestionUrl } from "../../shared/utils";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink,
  Button,
} from "@material-ui/core";

interface Props {
  languageId: Language["id"];
}

const QuestionTable: FC<Props> = ({ languageId }) => {
  const classes = useStyles();
  const history = useHistory();
  const { items } = useAppSelector((s) => s.question);

  const questions = items.filter((i) => i.languageId === languageId);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" width={50}>
                ID
              </TableCell>
              <TableCell component="th">Question</TableCell>
              <TableCell component="th" width={50} />
              <TableCell component="th" width={50} />
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.length > 0 &&
              questions.map(({ id, title }) => (
                <TableRow key={id} className={classes.bodyRow}>
                  <TableCell component="td">{id}</TableCell>
                  <TableCell component="td">{title}</TableCell>
                  <TableCell component="td">
                    <IconButton onClick={() => history.push(getQuestionUrl(id, languageId))}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell component="td">
                    <IconButton>
                      <Delete color={"error"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {questions.length === 0 && (
              <TableRow>
                <TableCell component="td" colSpan={4} className="text-muted text-center">
                  No questions found.{" "}
                  <Link to={getNewQuestionUrl(languageId)} component={MuiLink}>
                    Create one?
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {questions.length > 0 && (
        <Button
          onClick={() => history.push(getNewQuestionUrl(languageId))}
          className={"mt-2"}
          color={"primary"}
          variant={"outlined"}
          fullWidth
        >
          New question
        </Button>
      )}
    </>
  );
};

export default QuestionTable;
