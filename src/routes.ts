export const ROUTES = {
  INDEX: "/",
  QUESTION_NEW: "/languages/:languageId/questions/new",
  QUESTION: "/languages/:languageId/questions/:questionId",
  LANGUAGES: "/languages",
  LANGUAGE: "/languages/:id",
} as const;
