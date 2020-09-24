import React, { useState } from "react";
import { connect } from "react-redux";
import { ADD_TIME_REG } from "../constants/action-types";

function CreateTimeRegControls(props: {
  dispatch: Function;
  project_id: number;
  disabled: boolean;
}) {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [title, setTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = () => {
    if (hours && parseFloat(hours) >= 0.5) {
      props.dispatch({
        type: ADD_TIME_REG,
        payload: {
          title: title,
          date: date,
          minutes: parseFloat(hours) * 60.0,
          project_id: props.project_id
        }
      });
      setDate("");
      setHours("");
      setTitle("");
      setErrorMsg("");
    } else {
      setErrorMsg("You need to register at least 0.5h");
    }
  };

  return (
    <div className="max-w-full my-2">
      {errorMsg ? <span>{errorMsg}</span> : null}
      <input
        disabled={props.disabled}
        className="border py-2 px-2 rounded mx-1"
        value={title}
        placeholder="title"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        disabled={props.disabled}
        className={`border py-2 px-2 rounded mx-1 ${
          errorMsg ? "border-red-700" : ""
        }`}
        value={hours}
        type="number"
        placeholder="hours"
        step={0.5}
        min="0.5"
        onChange={e => {
          setHours(e.target.value);
          setErrorMsg("");
        }}
      />
      <input
        disabled={props.disabled}
        className="border py-2 px-2 rounded mx-1"
        placeholder="date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button
        disabled={props.disabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submit}
      >
        Report Time
      </button>
    </div>
  );
}
export default connect()(CreateTimeRegControls);
