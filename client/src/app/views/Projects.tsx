import React from "react";
import { connect } from "react-redux";
import Table from "../components/Table";
import { AppState, ProjectType } from "../constants/types";
import CreateProjectControls from "../components/create-project-controls";
import { minutesToHours } from "../util";

const mapStateToProps = (state: AppState) => {
  const projectsWithTimeRegs = state.projects;
  const time_regs_sum_map = new Map();

  state.time_regs.forEach(reg => {
    const project_id = reg.project_id;
    let registered_time_sum = reg.minutes;
    if (time_regs_sum_map.has(project_id)) {
      registered_time_sum += time_regs_sum_map.get(project_id);
    }
    time_regs_sum_map.set(project_id, registered_time_sum);
  });

  return { projects: projectsWithTimeRegs, time_regs_sum_map };
};

const ConnectedProjects = (props: {
  projects: ProjectType[];
  time_regs_sum_map: Map<number, number>;
}) => (
  <>
    <div className="flex items-center my-6">
      <CreateProjectControls />
      <div className="w-1/2 flex justify-end">
        {/*<form>
          <input
            className="border rounded-full py-2 px-4"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
            type="submit"
          >
            Search
          </button>
        </form>*/}
      </div>
    </div>

    <Table
      data={props.projects.map((el: ProjectType) => ({
        id: el.id,
        title: el.title,
        registered_time:
          minutesToHours(props.time_regs_sum_map.get(el.id) || 0) + " h",
        deadline: el.deadline ? el.deadline : "",
        completed: el.completed + ""
      }))}
      columns={[
        { key: "id", title: "#" },
        { key: "title", title: "Project Name" },
        { key: "registered_time", title: "Registered Time" },
        { key: "deadline", title: "Deadline", sortable: true },
        { key: "completed", title: "Completed" }
      ]}
      base_url={"/project/"}
    />
  </>
);

const Projects = connect(mapStateToProps)(ConnectedProjects);

export default Projects;
