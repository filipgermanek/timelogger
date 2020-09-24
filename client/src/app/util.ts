import { SortType } from "./constants/types";

export const minutesToHours = (minutes: number) => {
  return minutes / 60.0;
};

export const findMaxId = (array: any[]) => {
  return array.length === 0
    ? null
    : array.sort((a, b) => a.id - b.id)[array.length - 1].id;
};

export const updateSortBy = (columnKey: string, currentSortBy: SortType) => {
  return {
    key:
      currentSortBy &&
      currentSortBy.key === columnKey &&
      !currentSortBy.ascending
        ? ""
        : columnKey,
    ascending:
      !currentSortBy || !currentSortBy.key || currentSortBy.key !== columnKey
        ? true
        : !currentSortBy.ascending
  };
};

export const sortByProp = (a: string, b: string, isSortAsc: boolean) => {
  let order = 0;
  if (a > b) {
    order = 1;
  } else if (a < b) {
    order = -1;
  }
  if (!isSortAsc) {
    order *= -1;
  }
  return order;
};
