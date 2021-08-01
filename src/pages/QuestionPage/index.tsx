import { Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Save } from "@material-ui/icons";
import { Button, Divider, Radio, RadioGroup, TextField } from "@material-ui/core";
import { Question, QuestionOptionName, questionSchema, questionSlice } from "../../redux/question";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getLanguageUrl, getQuestionId } from "../../shared/utils";
import clsx from "clsx";
import { useStyles } from "./styles";

interface RouteProps {
  languageId: string;
  questionId?: string;
}

type QuestionFormFields = Yup.InferType<typeof questionSchema>;

const QuestionPage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const {
    params: { languageId, questionId },
  } = match;
  const classes = useStyles();
  const { items } = useAppSelector((s) => s.question);
  const formRef = useRef<FormikProps<QuestionFormFields> | null>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!questionId) {
      return;
    }
    const found = items.find((i) => i.id === parseInt(questionId, 10));
    if (found && formRef.current) {
      formRef.current.setFormikState((s) => ({ ...s, values: found }));
    }
  }, [questionId, languageId]);

  const getOptionValue = (options: Question["options"], field: QuestionOptionName) => {
    return options[field];
  };

  return (
    <>
      <h1>{questionId ? "Edit question" : "New question"}</h1>

      <Formik
        innerRef={formRef}
        validationSchema={questionSchema}
        initialValues={{
          id: getQuestionId(items) + 1,
          title: "",
          answer: "",
          languageId: parseInt(languageId, 10),
          options: { a1: "", a4: "", a3: "", a2: "" },
        }}
        onSubmit={(values, formikHelpers) => {
          dispatch(questionSlice.actions.save(values));
          history.push(getLanguageUrl(parseInt(languageId, 10)));
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, ...props }) => (
          <form autoComplete="off" autoCorrect="off" onSubmit={props.handleSubmit}>
            <TextField
              label="Question"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ maxLength: 160 }}
              fullWidth
              helperText="Up to 160 characters"
              className={"mb-2"}
            />

            <h3>Answers</h3>

            <RadioGroup name="answer" value={values.answer} onChange={handleChange}>
              {Object.keys(values.options).map((k, i) => {
                const o = k as QuestionOptionName;
                return (
                  <div key={o} className={clsx("mb-2", classes.answerRow)}>
                    <TextField
                      fullWidth
                      label={`Answer #${i + 1}`}
                      name={`options.${k}`}
                      value={getOptionValue(values.options, o)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ maxLength: 160 }}
                      helperText="Up to 160 characters"
                    />

                    <Radio className={"ml-2"} value={k} />
                  </div>
                );
              })}
            </RadioGroup>

            <Divider className={"my-2"} />

            <Button
              type={"button"}
              className={"mr-1"}
              color={"secondary"}
              variant={"contained"}
              onClick={() => history.push(getLanguageUrl(parseInt(languageId, 10)))}
            >
              Back
            </Button>
            <Button type={"submit"} startIcon={<Save />} color="primary" variant={"contained"}>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default QuestionPage;
