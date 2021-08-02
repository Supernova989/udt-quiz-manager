import { createAction } from "@reduxjs/toolkit";

export const deleteLanguage = createAction<{id: number}>("DELETE_LANGUAGE");

