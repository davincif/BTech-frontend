import { StdBackReq } from './stdBackReq';
import { TaskData } from './tasks';

export interface ProjectData {
  name: string;
  creationDate: string;
  tasks?: { [id: string]: TaskData };
}

export interface ProjectDataExtended extends ProjectData {
  owner: string;
}

export interface ProjectCollection {
  [name: string]: ProjectData;
}

export type ProjectCreateReq = StdBackReq<ProjectDataExtended>;

export type ProjectReq = StdBackReq<ProjectCollection>;

export type ProjectSingleReq = StdBackReq<ProjectData>;
