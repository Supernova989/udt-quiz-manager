import React, { AppBar, Button, Divider, Input, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { SystemUpdateAlt, Launch, Add } from "@material-ui/icons";
import clsx from "clsx";
import SimpleDialog from "../SimpleDialog";
import { useRef, useState } from "react";
import { Formik, FormikErrors, FormikProps } from "formik";
import * as Yup from "yup";
import { decodeBase64ToObject, encodeObjectToBase64, getLanguageId, getLanguageSort } from "../../shared/utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { languageSchema, languageSlice } from "../../redux/language";
import { SavedData, savedDataSchema } from "../../shared/models";
import { questionSlice } from "../../redux/question";

const importSchema = Yup.object({
  serializedData: Yup.string().required(),
});

type ImportFormFields = Yup.InferType<typeof importSchema>;

const addSchema = languageSchema;

type AddFormFields = Yup.InferType<typeof addSchema>;

const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { items: languages } = useAppSelector((s) => s.language);
  const { items: questions } = useAppSelector((s) => s.question);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const formImportRef = useRef<FormikProps<ImportFormFields> | null>(null);
  const formAddRef = useRef<FormikProps<AddFormFields> | null>(null);
  const exportFieldRef = useRef<HTMLInputElement | null>(null);

  const onCopy = () => {
    exportFieldRef.current?.focus();
    exportFieldRef.current?.select();
    document && document.execCommand("copy");
  };

  const addDialog = (
    <SimpleDialog
      open={showAdd}
      title="Add language"
      onClose={setShowAdd.bind(null, false)}
      onSubmit={() => formAddRef.current?.submitForm()}
    >
      <Formik
        innerRef={formAddRef}
        validationSchema={addSchema}
        initialValues={{
          id: getLanguageId(languages) + 1,
          order: getLanguageSort(languages) + 10,
          total: 0,
          title: "",
        }}
        onSubmit={(values, formikHelpers) => {
          dispatch(languageSlice.actions.save(values));
          setShowAdd(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, ...props }) => (
          <form autoComplete="off" spellCheck={false} autoCorrect="off" onSubmit={props.handleSubmit}>
            <Input
              name="title"
              placeholder={"Title"}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </form>
        )}
      </Formik>
    </SimpleDialog>
  );
  const importDialog = (
    <SimpleDialog
      open={showImport}
      title="Import data"
      onClose={setShowImport.bind(null, false)}
      onSubmit={() => formImportRef.current?.submitForm()}
    >
      <Formik
        innerRef={formImportRef}
        validationSchema={importSchema}
        initialValues={{ serializedData: "" }}
        validate={(values) => {
          const errors: FormikErrors<ImportFormFields> = {};
          let validData;
          try {
            const d = decodeBase64ToObject(values.serializedData);
            validData = savedDataSchema.isValidSync(d);
          } catch (e) {
            errors.serializedData = "Invalid data";
          }
          if (!validData) {
            errors.serializedData = "Invalid data";
          }
          return errors;
        }}
        onSubmit={(values, formikHelpers) => {
          const data = decodeBase64ToObject<SavedData>(values.serializedData);
          dispatch(languageSlice.actions.set(data.languages));
          dispatch(questionSlice.actions.set(data.questions));
          setShowImport(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, ...props }) => (
          <form autoComplete="off" spellCheck={false} autoCorrect="off" onSubmit={props.handleSubmit}>
            <Input
              name="serializedData"
              placeholder={"Enter code here"}
              value={values.serializedData}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            {errors.serializedData && touched.serializedData && (
              <Typography color={"error"} variant={"subtitle2"}>
                {errors.serializedData}
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </SimpleDialog>
  );
  const exportDialog = (
    <SimpleDialog
      open={showExport}
      title="Export data"
      onClose={setShowExport.bind(null, false)}
      additionalButtons={
        <>
          <Button onClick={onCopy}>Copy to clipboard</Button>
        </>
      }
    >
      {showExport && (
        <TextField
          inputRef={exportFieldRef}
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
          fullWidth
          value={encodeObjectToBase64({ languages, questions } as SavedData)}
        />
      )}
    </SimpleDialog>
  );

  return (
    <>
      <AppBar position={"relative"} className={classes.root}>
        <div className={clsx(classes.inner)}>
          <div>
            <Typography component={"span"} variant={"subtitle1"}>
              Quiz Manager
            </Typography>
            <Typography className={"ml-2"} component={"span"} variant={"caption"}>
              (v{require("../../../package.json").version})
            </Typography>
          </div>

          <div className={classes.grow1} />

          <Button startIcon={<Add />} variant={"outlined"} color={"secondary"} onClick={setShowAdd.bind(null, true)}>
            Add language
          </Button>

          <Divider orientation={"vertical"} className="ml-2" flexItem={true} />

          <Button
            className="ml-2"
            startIcon={<SystemUpdateAlt />}
            variant={"contained"}
            color={"primary"}
            onClick={setShowImport.bind(null, true)}
          >
            Import
          </Button>
          <Button
            className="ml-1"
            startIcon={<Launch />}
            variant={"contained"}
            color={"primary"}
            onClick={setShowExport.bind(null, true)}
          >
            Export
          </Button>
        </div>
      </AppBar>

      {importDialog}
      {addDialog}
      {exportDialog}
    </>
  );
};

export default Header;
