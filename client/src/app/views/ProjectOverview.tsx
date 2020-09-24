import React from "react";
import { connect } from "react-redux";
import { AppState, TimeRegType } from "../constants/types";
import Table from "../components/Table";
import { minutesToHours } from "../util";
import CreateTimeRegControls from "../components/create-time-reg-controls";
import {
  UPDATE_PROJECT_COMPLETED,
  DELETE_PROJECT,
  DELETE_TIME_REG,
  UPDATE_PROJECT_TITLE,
  UPDATE_PROJECT_DEADLINE
} from "../constants/action-types";

const mapStateToProps = (state: AppState, props: any) => {
  if (props.match.params && props.match.params.id) {
    const project_id = parseInt(props.match.params.id);
    return {
      project: state.projects.find(el => el.id === project_id),
      time_regs: state.time_regs.filter(el => el.project_id === project_id)
    };
  }
  return null;
};

const ConnectedProjectOverview = (props: {
  project: any;
  time_regs: TimeRegType[];
  dispatch: Function;
}) => {
  if (props.project) {
    const handleDeleteTimeReg = (time_reg_id: number) => {
      props.dispatch({
        type: DELETE_TIME_REG,
        payload: {
          id: time_reg_id
        }
      });
    };
    const handleUpdateProjectTitle = (title: string) => {
      props.dispatch({
        type: UPDATE_PROJECT_TITLE,
        payload: {
          id: props.project.id,
          title: title
        }
      });
    };
    const handleUpdateProjectDeadline = (deadline: string) => {
      props.dispatch({
        type: UPDATE_PROJECT_DEADLINE,
        payload: {
          id: props.project.id,
          deadline: deadline
        }
      });
    };
    return (
      <>
        <div className="flex flex-col justify-center items-center my-6">
          <div className="flex w-full flex-row justify-between border-b-2 py-4">
            <div>
              <span>Project Name</span>
              <input
                className="border py-2 px-2 rounded mx-1"
                value={props.project.title}
                onChange={e => handleUpdateProjectTitle(e.target.value)}
              />
              <span>Project Deadline</span>
              <input
                type="date"
                value={props.project.deadline || ""}
                className="border py-2 px-2 rounded mx-1"
                onChange={e => handleUpdateProjectDeadline(e.target.value)}
              />
              <span>Completed</span>
              <input
                type="checkbox"
                checked={props.project.completed}
                onChange={() => {
                  props.dispatch({
                    type: UPDATE_PROJECT_COMPLETED,
                    payload: {
                      id: props.project.id,
                      completed: !props.project.completed
                    }
                  });
                }}
              />
            </div>
            <button
              className="bg-red-500 mx-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                props.dispatch({
                  type: DELETE_PROJECT,
                  payload: {
                    id: props.project.id
                  }
                });
              }}
            >
              Delete Project
            </button>
          </div>
          <h3 className="text-lg py-6 px-2">Time Registrations</h3>
          <CreateTimeRegControls
            project_id={props.project.id}
            disabled={props.project.completed}
          />
          {props.time_regs.length ? (
            <Table
              data={props.time_regs.map((reg: TimeRegType) => ({
                id: reg.id,
                title: reg.title,
                time: minutesToHours(reg.minutes) + " h",
                date: reg.date
              }))}
              deleteRow={handleDeleteTimeReg}
              columns={[
                { key: "title", title: "Title" },
                { key: "time", title: "Reported Time" },
                { key: "date", title: "Date" }
              ]}
            />
          ) : null}
        </div>
      </>
    );
  }
  return <></>;
};

const ProjectOverview = connect(mapStateToProps)(ConnectedProjectOverview);

export default ProjectOverview;
