import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { deleteLanguage } from "../actions";

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
  items: [],
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
    delete: (state, { payload }: PayloadAction<number[]>) => {
      state.items = state.items.filter(i => {
        for (let n = 0; n < payload.length; n++) {
          if (i.id !== payload[n]) {
            return true;
          }
        }
        return false;
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLanguage, (state, { payload: { id } }) => {
        state.items = state.items.filter(i => i.languageId !== id);
      });
  },
});

export default questionSlice.reducer;
