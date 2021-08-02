import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RouteComponentProps, useHistory } from "react-router-dom";
import QuestionTable from "../../components/QuestionTable";
import { ROUTES } from "../../routes";
import { Alert, AlertTitle } from '@material-ui/lab';
import { IconButton } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./styles";
import { Delete } from "@material-ui/icons";
import SimpleDialog from "../../components/SimpleDialog";
import { deleteLanguage } from "../../redux/actions";

interface RouteProps {
  id: string;
}

const LanguagePage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const { params: { id } } = match;
  const { items: languages } = useAppSelector((s) => s.language);
  const { items: questions } = useAppSelector((s) => s.question);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const languageId = parseInt(id, 10);
  const classes = useStyles();
  
  useEffect(() => {
    if (!languages.find((l) => l.id === languageId)) {
      history.replace(ROUTES.INDEX);
    }
  }, [id, languages]);

  return (
    <>
      <QuestionTable languageId={languageId} questions={questions.filter((i) => i.languageId === languageId)} />
  
      <Alert severity={"warning"} variant={"outlined"} className={clsx("mt-8", classes.deleteAlert)}>
        <AlertTitle><strong>Delete this language</strong></AlertTitle>
        Once you delete a language, there is no going back. Please be certain.
        <div className={classes.deleteLanguageButtonWrap}>
          <IconButton onClick={setShowDelete.bind(null, true)}><Delete color={"error"}/></IconButton>
        </div>
      </Alert>
  
      <SimpleDialog
        open={showDelete}
        title="Delete language"
        text={"Are you sure you want to delete this language?"}
        onClose={setShowDelete.bind(null, false)}
        onSubmit={() => dispatch(deleteLanguage({id: languageId}))}
      />
    </>
  );
};

export default LanguagePage;
