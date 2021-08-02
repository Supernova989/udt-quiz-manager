import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Yup from "yup";
import { deleteLanguage } from "../actions";

export const languageSchema = Yup.object({
  id: Yup.number().required(),
  order: Yup.number().required(),
  title: Yup.string().max(64).required(),
});

export type Language = Yup.InferType<typeof languageSchema>;

export interface LanguageState {
  items: Language[];
  selected?: number;
}

const initialState: LanguageState = {
  items: [],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Language[]>) => {
      state.items = payload;
    },
    save: (state, { payload }: PayloadAction<Language>) => {
      state.items.push(payload);
    },
    select: (state, { payload }: PayloadAction<number>) => {
      state.selected = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLanguage, (state, { payload: { id } }) => {
        state.items = state.items.filter(i => i.id !== id);
      });
  },
});

export default languageSlice.reducer;
