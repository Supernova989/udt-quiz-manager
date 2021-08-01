import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Yup from "yup";

export const languageSchema = Yup.object({
  id: Yup.number().required(),
  order: Yup.number().required(),
  total: Yup.number().required(),
  title: Yup.string().max(64).required(),
});

export type Language = Yup.InferType<typeof languageSchema>;

export interface LanguageState {
  items: Language[];
}

const initialState: LanguageState = {
  items: [
    {
      id: 1,
      order: 10,
      title: "English",
      total: 0,
    },
  ],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Language[]>) => {
      state.items = payload;
    },
    add: (state, { payload }: PayloadAction<Language>) => {
      state.items.push(payload);
    },
  },
  extraReducers: (builder) => {},
});

export default languageSlice.reducer;
