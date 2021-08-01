import { getLanguageId, getLanguageSort, getQuestionId } from "../utils";
import { Language } from "../../redux/language";
import { Question } from "../../redux/question";

describe("function " + getQuestionId.name, () => {
  const questions: Question[] = [
    {
      id: 3,
      title: "A",
      answer: "a1",
      languageId: 1,
      options: { a1: "answer1", a2: "answer2", a3: "answer3", a4: "answer4" },
    },
    {
      id: 4,
      title: "B",
      answer: "a2",
      languageId: 1,
      options: { a1: "answer1", a2: "answer2", a3: "answer3", a4: "answer4" },
    },
  ];
  test("Should return max id", () => {
    expect(getQuestionId(questions)).toBe(4);
  });
  test("Should return 0 when empty array provided", () => {
    expect(getQuestionId([])).toBe(0);
  });
});

describe("function " + getLanguageId.name, () => {
  const languages: Language[] = [
    { id: 2, title: "A", order: 11, total: 0 },
    { id: 3, title: "B", order: 22, total: 0 },
  ];
  test("Should return max id", () => {
    expect(getLanguageId(languages)).toBe(3);
  });
  test("Should return 0 when empty array provided", () => {
    expect(getLanguageId([])).toBe(0);
  });
});

describe("function " + getLanguageSort.name, () => {
  const languages: Language[] = [
    { id: 2, title: "A", order: 11, total: 0 },
    { id: 3, title: "B", order: 22, total: 0 },
  ];
  test("Should return max sort", () => {
    expect(getLanguageSort(languages)).toBe(22);
  });
  test("Should return 0 when empty array provided", () => {
    expect(getLanguageSort([])).toBe(0);
  });
});
