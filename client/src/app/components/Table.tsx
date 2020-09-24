import React, { useState } from "react";
import TableCell from "./table-cell";
import { ColumnType } from "../constants/types";
import { updateSortBy, sortByProp } from "../util";

export default function Table(props: any) {
  const [sortBy, setSortBy] = useState({ key: "", ascending: false });
  let data = props.data;
  if (sortBy && sortBy.key) {
    data = data.sort((a: any, b: any) => {
      return sortByProp(a[sortBy.key], b[sortBy.key], sortBy.ascending);
    });
  }
  return (
    <table className="table-fixed w-full">
      <thead className="bg-gray-200">
        <tr>
          {props.columns.map((col: ColumnType, index: number) => (
            <th
              key={index}
              className={`border px-4 py-2 w-12 ${
                sortBy.key === col.key ? "text-blue-600" : ""
              }${col.sortable ? " cursor-pointer" : ""}`}
              onClick={() => {
                if (col.sortable) {
                  setSortBy(updateSortBy(col.key, sortBy));
                }
              }}
            >
              {col.title}
              {col.sortable && col.key === sortBy.key
                ? sortBy.ascending
                  ? " (asc)"
                  : " (desc)"
                : null}
            </th>
          ))}
          {props.deleteRow ? <th className="border px-0 py-0 w-1" /> : null}
        </tr>
      </thead>
      <tbody>
        {data.map((el: any, index: number) => (
          <tr key={index}>
            {props.columns.map((col: ColumnType, nestedIndex: number) => (
              <TableCell
                key={nestedIndex}
                value={el[col.key] + ""}
                url={props.base_url ? props.base_url + el.id : undefined}
              />
            ))}
            {props.deleteRow ? (
              <td className="border px-0 py-0">
                <button
                  onClick={() => props.deleteRow(el.id)}
                  className="bg-red-500 mx01 hover:bg-red-700 text-white font-bold py-0 px-0 rounded"
                >
                  x
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
