import { Formik, FormikErrors, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Save } from "@material-ui/icons";
import { Button, Divider, Radio, RadioGroup, TextField } from "@material-ui/core";
import { Question, QuestionOptionName, questionSchema, questionSlice } from "../../redux/question";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getLanguageUrl, getQuestionId, isQuestionTitleValid } from "../../shared/utils";
import { useStyles } from "./styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import * as Yup from "yup";
import clsx from "clsx";
import { ROUTES } from "../../routes";

interface RouteProps {
  languageId: string;
  questionId?: string;
}

type QuestionFormFields = Yup.InferType<typeof questionSchema>;

const QuestionPage: FC<RouteComponentProps<RouteProps>> = ({ match }) => {
  const { params: { languageId, questionId }, } = match;
  const classes = useStyles();
  const { items: questions } = useAppSelector((s) => s.question);
  const { items: languages } = useAppSelector((s) => s.language);
  const formRef = useRef<FormikProps<QuestionFormFields> | null>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!languages.find((l) => l.id === parseInt(languageId, 10))) {
      history.replace(ROUTES.INDEX);
    }
    if (!questionId) {
      return;
    }
    const found = questions.find((i) => i.id === parseInt(questionId, 10));
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
        validate={(values) => {
          const errors: FormikErrors<QuestionFormFields> = {};
          if (!isQuestionTitleValid(values.title) && formRef.current?.touched.title) {
            errors.title = "Title must contain a placeholder.";
          }
          return errors;
        }}
        initialValues={{
          id: getQuestionId(questions) + 1,
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
          <form autoComplete="off" spellCheck={false} autoCorrect="off" onSubmit={props.handleSubmit}>
            <TextField
              label="Question"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.title && touched.title}
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
                      error={!!(errors.options && errors.options[o]) && !!(touched.options && touched.options[o])}
                      inputProps={{ maxLength: 100 }}
                      helperText="Up to 160 characters"
                    />

                    <Radio className={"ml-2"} value={k} title={"Mark as the correct answer"}/>
                  </div>
                );
              })}
            </RadioGroup>
  
            {Object.keys(errors).length > 0 && Object.keys({...touched, ...touched?.options }).length === Object.keys({...values, ...touched?.options }).length && (
              <Alert severity={"error"} className={clsx("my-5")}>
                <AlertTitle><strong>Error</strong></AlertTitle>
                Please check the fields of the form and make sure you have selected the correct answer, and put "___" as a placeholder to the title.
              </Alert>
            )}
            
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
