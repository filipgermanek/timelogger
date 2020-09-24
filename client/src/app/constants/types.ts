export interface ProjectType {
  id: number;
  title: string;
  deadline: string;
  completed?: boolean;
}
export interface TimeRegType {
  id: number;
  title: string;
  minutes: number;
  date: string;
  project_id: number;
}

export interface AppState {
  projects: ProjectType[];
  time_regs: TimeRegType[];
}

export interface ColumnType {
  key: string;
  title: string;
  sortable?: false;
}

export interface SortType {
  key: string;
  ascending: boolean;
}
