import { languageSchema } from "../redux/language";
import * as Yup from "yup";
import { questionSchema } from "../redux/question";

export const savedDataSchema = Yup.object({
  languages: Yup.array().of(languageSchema).required(),
  questions: Yup.array().of(questionSchema).required(),
});

export type SavedData = Yup.InferType<typeof savedDataSchema>;
