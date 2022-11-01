import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  ProjectCollection,
  ProjectCreateReq,
  ProjectData,
  ProjectDataExtended,
  ProjectReq,
  ProjectSingleReq,
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
      .request<ProjectSingleReq>('delete', '/api/project/del', { body })
      .pipe(
        map((res) => {
          if (!res.data) {
            throw res;
          }

          return res.data;
        })
      );
  }

  /**
   * Updates a project, that currently resumes to changing its name
   * @param oldName The current name of the project
   * @param newName The new name you wanna give to the project
   */
  public changeName(
    oldName: string,
    newName: string
  ): Observable<ProjectData> {
    const body = { oldName, newName };
    return this.http.put<ProjectSingleReq>('/api/project/update', body).pipe(
      map((res) => {
        if (!res.data) {
          throw res;
        }

        return res.data;
      })
    );
  }
}
