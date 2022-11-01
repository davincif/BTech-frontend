import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { TaskData, TaskSimpleReq } from 'src/models/tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  /**
   * Adds, in the back-end, a new tasks
   * @param projName Project in which to add the task
   * @param description the description of the task
   * @returns The added task
   */
  public addTask(projName: string, description: string): Observable<TaskData> {
    const body = { projName, description };
    return this.http.post<TaskSimpleReq>('/api/task/create', body).pipe(
      map((res) => {
        if (!res.data) {
          throw res;
        }

        return res.data;
      })
    );
  }
}
