import { StdBackReq } from './stdBackReq';

export interface ProjectData {
  name: string;
  creationDate: string;
  owner: string;
}

export type ProjectReq = StdBackReq<ProjectData>;
