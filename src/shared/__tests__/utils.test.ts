import { getLanguageId, getLanguageSort } from "../utils";
import { Language } from "../../redux/language";

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
