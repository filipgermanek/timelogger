import * as React from "react";
import { Link } from "react-router-dom";

export default function TableCell(props: { value: string; url: string }) {
  return (
    <td className="border px-0 py-0">
      {props.url ? (
        <Link className="px-4 py-2" to={props.url}>
          {props.value}
        </Link>
      ) : (
        props.value
      )}
    </td>
  );
}
