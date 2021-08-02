import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { RouteComponentProps, useHistory } from "react-router-dom";
import QuestionTable from "../../components/QuestionTable";
import { ROUTES } from "../../routes";

interface RouteProps {
  id: string;
}

const LanguagePage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const { params: { id } } = match;
  const { items: languages } = useAppSelector((s) => s.language);
  const { items: questions } = useAppSelector((s) => s.question);
  const history = useHistory();
  const languageId = parseInt(id, 10);
  
  useEffect(() => {
    if (!languages.find((l) => l.id === languageId)) {
      history.replace(ROUTES.INDEX);
    }
  }, [id]);

  return (
    <>
      <QuestionTable languageId={languageId} questions={questions.filter((i) => i.languageId === languageId)} />
    </>
  );
};

export default LanguagePage;
