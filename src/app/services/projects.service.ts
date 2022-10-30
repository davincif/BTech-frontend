import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectData, ProjectReq } from 'src/models/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  /**
   * Creates a new project for the logged user with the given name in the backend
   * @param name Project Name
   * @returns The Observable with the crated project
   */
  public create(name: string): Observable<ProjectData> {
    const body = { name };
    return this.http.post<ProjectReq>('/api/project/create', body).pipe(
      map((res) => {
        return res.data!;
      })
    );
  }
}
