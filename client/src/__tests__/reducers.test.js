import rootReducer from "../app/redux/reducers";
import { AppState } from "../app/constants/types";
import {
  ADD_PROJECT,
  ADD_TIME_REG,
  DELETE_PROJECT,
  DELETE_TIME_REG,
  UPDATE_PROJECT_TITLE
} from "../app/constants/action-types";
const initialState = {
  projects: [],
  time_regs: []
};
const stateWithOneProject = {
  projects: [{ id: 1, title: "First Project" }],
  time_regs: []
};
const stateWithOneProjectAndTimeReg = {
  projects: [{ id: 1, title: "First Project" }],
  time_regs: [{ id: 1, title: "First Time Reg", minutes: 120, project_id: 1 }]
};

describe("authenticate reducer actions", () => {
  it("return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
  it("add project to the state", () => {
    const payload = { id: 1, title: "My Project" };
    expect(rootReducer(undefined, { type: ADD_PROJECT, payload })).toEqual({
      projects: [{ id: 1, title: "My Project" }],
      time_regs: []
    });
  });
  it("add time reg to the state", () => {
    const validPayload = {
      title: "My First Time Reg",
      minutes: 60,
      project_id: 1
    };
    const invalidPayload = {
      title: "My First Time Reg",
      project_id: 1,
      minutes: 15
    };
    expect(
      rootReducer(stateWithOneProject, {
        type: ADD_TIME_REG,
        payload: validPayload
      })
    ).toEqual({
      projects: [{ id: 1, title: "First Project" }],
      time_regs: [
        { id: 1, title: "My First Time Reg", minutes: 60, project_id: 1 }
      ]
    });
    expect(
      rootReducer(stateWithOneProject, {
        type: ADD_TIME_REG,
        payload: invalidPayload
      })
    ).toEqual({ projects: [{ id: 1, title: "First Project" }], time_regs: [] });
  });
  it("delete project from the state", () => {
    const payload = { id: 1 };
    expect(
      rootReducer(stateWithOneProject, { type: DELETE_PROJECT, payload })
    ).toEqual({ projects: [], time_regs: [] });
    expect(
      rootReducer(stateWithOneProjectAndTimeReg, {
        type: DELETE_PROJECT,
        payload
      })
    ).toEqual({ projects: [], time_regs: [] });
  });
  it("delete time reg from the state", () => {
    const payload = { id: 1 };
    const invalidPayload = { id: 99999 };
    expect(
      rootReducer(stateWithOneProjectAndTimeReg, {
        type: DELETE_TIME_REG,
        payload
      })
    ).toEqual({ projects: [{ id: 1, title: "First Project" }], time_regs: [] });
    expect(
      rootReducer(stateWithOneProjectAndTimeReg, {
        type: DELETE_TIME_REG,
        payload: invalidPayload
      })
    ).toEqual({
      projects: [{ id: 1, title: "First Project" }],
      time_regs: [
        { id: 1, title: "First Time Reg", minutes: 120, project_id: 1 }
      ]
    });
  });
  it("update project in the state", () => {
    const payload = { id: 1, title: "Updated title" };
    expect(
      rootReducer(stateWithOneProject, { type: UPDATE_PROJECT_TITLE, payload })
    ).toEqual({ projects: [{ id: 1, title: "Updated title" }], time_regs: [] });
  });
});
