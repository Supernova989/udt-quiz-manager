import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { RouteComponentProps, useHistory } from "react-router-dom";
import QuestionTable from "../../components/QuestionTable";

interface RouteProps {
  id: string;
}

const LanguagePage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const history = useHistory();
  const { items } = useAppSelector((s) => s.language);
  const {
    params: { id },
  } = match!;

  useEffect(() => {
    const language = items.find((l) => l.id === parseInt(id, 10));
    if (!language) {
      history.replace("/");
    }
  }, [id]);

  return (
    <>
      <QuestionTable languageId={parseInt(id, 10)} />
    </>
  );
};

export default LanguagePage;
