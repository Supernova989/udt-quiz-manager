import React, { AppBar, Button, Divider, Input, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { SystemUpdateAlt, Launch, Add } from "@material-ui/icons";
import clsx from "clsx";
import SimpleDialog from "../Popup";
import { useRef, useState } from "react";
import { Formik, FormikErrors, FormikProps } from "formik";
import * as Yup from "yup";
import { decodeBase64ToObject, encodeObjectToBase64, getLanguageId, getLanguageSort } from "../../shared/utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { languageSchema, languageSlice } from "../../redux/language";
import { SavedData, savedDataSchema } from "../../shared/models";

const importSchema = Yup.object({
  serializedData: Yup.string().required(),
});

type ImportFormFields = Yup.InferType<typeof importSchema>;

const addSchema = languageSchema;

type AddFormFields = Yup.InferType<typeof addSchema>;

const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {items: languages} = useAppSelector((s) => s.language)
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const formImportRef = useRef<FormikProps<ImportFormFields>>(null);
  const formAddRef = useRef<FormikProps<AddFormFields>>(null);
  
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
        initialValues={{ id: getLanguageId(languages) + 1, order: getLanguageSort(languages) + 10, total: 0, title: "" }}
        onSubmit={(values, formikHelpers) => {
          dispatch(languageSlice.actions.add(values));
          setShowAdd(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, ...props }) => (
          <form autoComplete="off" autoCorrect="off" onSubmit={props.handleSubmit}>
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
          // eyJsYW5ndWFnZXMiOlt7ImlkIjoxLCJ0aXRsZSI6ImZnamZnaiIsIm9yZGVyIjoxLCJ0b3RhbCI6NH1dfQ==
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
          setShowImport(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, ...props }) => (
          <form autoComplete="off" autoCorrect="off" onSubmit={props.handleSubmit}>
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
  
  return (
    <>
      <AppBar position={"relative"} className={classes.root}>
        <div className={clsx(classes.inner)}>
          <Typography variant={"h5"}>Manager</Typography>

          <div className={classes.grow1} />
          
          <Button
            startIcon={<Add />}
            variant={"contained"}
            color={"primary"}
            onClick={setShowAdd.bind(null, true)}
          >
            Add language
          </Button>
          
          <Divider orientation={"vertical"} className="ml-2" flexItem={true}/>
          
          <Button
            className="ml-2"
            startIcon={<SystemUpdateAlt />}
            variant={"contained"}
            color={"primary"}
            onClick={setShowImport.bind(null, true)}
          >
            Import
          </Button>
          <Button className="ml-1" startIcon={<Launch />} variant={"contained"} color={"primary"}>
            Export
          </Button>
        </div>
      </AppBar>
  
      {importDialog}
      {addDialog}
      
    </>
  );
};

export default Header;
