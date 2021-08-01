import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { RouteComponentProps, useHistory } from "react-router-dom";

interface Props {
  id: string;
}

const LanguagePage: FC<RouteComponentProps<Props>> = ({ match }) => {
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
      <h1>Language page</h1>
      <p>page: {id}</p>
    </>
  );
};

export default LanguagePage;
