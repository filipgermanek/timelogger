import React, { useState } from "react";
import { connect } from "react-redux";
import { ADD_PROJECT } from "../constants/action-types";

function CreateProjectControls(props: { dispatch: Function }) {
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [valid, setValid] = useState(true);
  const submit = () => {
    if (projectTitle) {
      props.dispatch({
        type: ADD_PROJECT,
        payload: {
          title: projectTitle,
          deadline: projectDeadline,
          completed: false
        }
      });
      setProjectDeadline("");
      setProjectTitle("");
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return (
    <div className="w-1/2">
      <input
        className={`border py-2 px-1 rounded mx-2 ${
          valid ? "" : "border-red-700"
        }`}
        value={projectTitle}
        placeholder="New Project Name"
        onChange={e => {
          setProjectTitle(e.target.value);
          setValid(true);
        }}
      />
      <input
        className="border py-2 px-1 rounded mx-2 "
        type="date"
        value={projectDeadline}
        onChange={e => setProjectDeadline(e.target.value)}
      />
      <button
        className="bg-blue-500 mx-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submit}
      >
        Add Project
      </button>
    </div>
  );
}
export default connect()(CreateProjectControls);
