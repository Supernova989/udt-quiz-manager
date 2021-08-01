import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

interface RouteProps {
  id?: string;
}

const QuestionPage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  return (
    <>
      {id && <> id: {id}</>}
      {!id && "New question"}
    </>
  );
};

export default QuestionPage;
