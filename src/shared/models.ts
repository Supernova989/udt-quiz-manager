import { languageSchema } from "../redux/language";
import * as Yup from "yup";

export const savedDataSchema = Yup.object({
  languages: Yup.array().of(languageSchema).required(),
});

export type SavedData = Yup.InferType<typeof savedDataSchema>;
