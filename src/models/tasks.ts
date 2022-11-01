import { StdBackReq } from "./stdBackReq";

export interface TaskData {
  id: number;
  description: string;
  creationDate: string;
  terminationDate?: string;
}

export type TaskSimpleReq = StdBackReq<TaskData>;
