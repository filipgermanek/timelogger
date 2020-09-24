import { minutesToHours, findMaxId } from "../app/util";
describe("test util functions", () => {
  it("convert minutes to hours", () => {
    expect(minutesToHours(120)).toEqual(2);
  });
  it("find max id in array", () => {
    expect(findMaxId([])).toEqual(null);
    expect(findMaxId([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual(3);
  });
});
