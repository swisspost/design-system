import { fetchPage } from ".";
import testResult from "./fixtures/test-result.json";

jest
  .spyOn(global, "fetch")
  .mockImplementation(
    jest.fn(() => Promise.resolve({ json: Promise.resolve(testResult) }))
  );

describe("fetchPage", () => {
  it("Should fetch a page of data", async () => {
    const json = await fetchPage("test");
    expect(json?.count).toBeDefined();
    expect(json?.count).toBe(10);
  });
});
