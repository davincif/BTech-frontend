import { StdBackReq } from './stdBackReq';

export interface ProjectData {
  name: string;
  creationDate: string;
}

export interface ProjectDataExtended extends ProjectData {
  owner: string;
}

export interface ProjectCollection {
  [name: string]: ProjectData
}

export type ProjectCreateReq = StdBackReq<ProjectDataExtended>;

export type ProjectReq = StdBackReq<ProjectCollection>;
