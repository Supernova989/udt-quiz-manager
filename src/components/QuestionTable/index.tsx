import React, { FC } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { useStyles } from "./styles";
import { useAppDispatch } from "../../hooks";
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
import { Question, questionSlice } from "../../redux/question";

interface Props {
  languageId: Language["id"];
  questions: Question[];
}

const QuestionTable: FC<Props> = ({ languageId, questions }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  
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
                    <IconButton onClick={() => dispatch(questionSlice.actions.delete([id]))}>
                      <Delete color={"error"}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {questions.length === 0 && (
              <TableRow>
                <TableCell component="td" colSpan={4} className="text-muted text-center">
                  No questions found.{" "}
                  <Link to={getNewQuestionUrl(languageId)} className={"MuiTypography-root MuiLink-root MuiTypography-colorPrimary"}>
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

// <MuiLink
//                     href={getNewQuestionUrl(languageId)}
//                     onClick={(e: React.MouseEvent) => {
//                       e.preventDefault();
//                       history.push(getNewQuestionUrl(languageId));
//                     }}
//                   >
//                     Create one?
//                   </MuiLink>
