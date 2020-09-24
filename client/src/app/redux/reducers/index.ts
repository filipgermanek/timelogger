import {
  ADD_PROJECT,
  ADD_TIME_REG,
  UPDATE_PROJECT_COMPLETED,
  UPDATE_PROJECT_TITLE,
  DELETE_PROJECT,
  DELETE_TIME_REG,
  UPDATE_PROJECT_DEADLINE
} from "../../constants/action-types";
import { AppState } from "../../constants/types";
import { findMaxId } from "../../util";

const initialState: AppState = {
  projects: [],
  time_regs: []
};

function rootReducer(state = initialState, action: any) {
  if (action.type === ADD_PROJECT) {
    const max_id = findMaxId(state.projects);
    action.payload.id = max_id === null ? 1 : max_id + 1;
    return Object.assign({}, state, {
      projects: state.projects.concat(action.payload)
    });
  } else if (action.type === ADD_TIME_REG) {
    if (!action.payload.minutes || action.payload.minutes < 30) return state;
    const max_id = findMaxId(state.time_regs);
    action.payload.id = max_id === null ? 1 : max_id + 1;
    return Object.assign({}, state, {
      time_regs: state.time_regs.concat(action.payload)
    });
  } else if (action.type === UPDATE_PROJECT_COMPLETED) {
    return Object.assign({}, state, {
      projects: state.projects.map(el => {
        if (el.id === action.payload.id) {
          el.completed = action.payload.completed;
        }
        return el;
      })
    });
  } else if (action.type === UPDATE_PROJECT_TITLE) {
    return Object.assign({}, state, {
      projects: state.projects.map(el => {
        if (el.id === action.payload.id) {
          el.title = action.payload.title;
        }
        return el;
      })
    });
  } else if (action.type === UPDATE_PROJECT_DEADLINE) {
    return Object.assign({}, state, {
      projects: state.projects.map(el => {
        if (el.id === action.payload.id) {
          el.deadline = action.payload.deadline;
        }
        return el;
      })
    });
  } else if (action.type === DELETE_PROJECT) {
    return Object.assign({}, state, {
      time_regs: state.time_regs.filter(
        el => el.project_id !== action.payload.id
      ),
      projects: state.projects.filter(el => el.id !== action.payload.id)
    });
  } else if (action.type === DELETE_TIME_REG) {
    return Object.assign({}, state, {
      time_regs: state.time_regs.filter(el => el.id !== action.payload.id)
    });
  }
  return state;
}

export default rootReducer;
