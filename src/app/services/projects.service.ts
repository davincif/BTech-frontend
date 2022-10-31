import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, of } from 'rxjs';

import {
  ProjectCollection,
  ProjectCreateReq,
  ProjectData,
  ProjectDataExtended,
  ProjectDeletionReq,
  ProjectReq,
} from 'src/models/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  /**
   * Creates a new project for the logged user with the given name in the backend
   * @param name Project Name
   * @returns A Observable with the crated project
   */
  public create(name: string): Observable<ProjectDataExtended> {
    const body = { name };
    return this.http.post<ProjectCreateReq>('/api/project/create', body).pipe(
      map((res) => {
        return res.data!;
      })
    );
  }

  /**
   * Gets all the projects of the logged user
   * @returns A Observable with all projects of the logged user
   */
  public getAll(): Observable<ProjectCollection> {
    return this.http.get<ProjectReq>('/api/project/getAll').pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }

  /**
   * Delete the given project in the backend
   * @param projName Project Name
   */
  public del(projName: string): Observable<ProjectData> {
    const body = { projName };
    return this.http
      .request<ProjectDeletionReq>('delete', '/api/project/del', { body })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw res;
          }

          return res.data;
        })
      );
  }
}
