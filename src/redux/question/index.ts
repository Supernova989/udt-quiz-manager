import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Yup from "yup";

export const questionSchema = Yup.object({
  id: Yup.number().required(),
  title: Yup.string().max(160).required(),
  languageId: Yup.number().required(),
  options: Yup.object({
    a1: Yup.string().max(100).required(),
    a2: Yup.string().max(100).required(),
    a3: Yup.string().max(100).required(),
    a4: Yup.string().max(100).required(),
  }).required(),
  answer: Yup.string().required(),
});

export type QuestionOptionName = "a1" | "a2" | "a3" | "a4";

export type Question = Yup.InferType<typeof questionSchema>;

export interface QuestionState {
  items: Question[];
}

const initialState: QuestionState = {
  items: [
    // {
    //   id: 1,
    //   title: "How ___ you?",
    //   languageId: 1,
    //   options: {
    //     a1: "are",
    //     a2: "is",
    //     a3: "am",
    //     a4: "not",
    //   },
    //   answer: "a1",
    // },
    // {
    //   id: 2,
    //   title: "How ___ I?",
    //   languageId: 1,
    //   options: {
    //     a1: "are",
    //     a2: "is",
    //     a3: "am",
    //     a4: "not",
    //   },
    //   answer: "a3",
    // },
    // {
    //   id: 3,
    //   title: "How ___ he?",
    //   languageId: 2,
    //   options: {
    //     a1: "are",
    //     a2: "is",
    //     a3: "am",
    //     a4: "not",
    //   },
    //   answer: "a2",
    // },
  ],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Question[]>) => {
      state.items = payload;
    },
    save: (state, { payload }: PayloadAction<Question>) => {
      const found = state.items.find((i) => i.id === payload.id);
      if (found) {
        const idx = state.items.indexOf(found);
        state.items[idx] = payload;
      } else {
        state.items.push(payload);
      }
    },
  },
  extraReducers: (builder) => {},
});

export default questionSlice.reducer;
