import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectCollection } from 'src/models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {
  /**
   * All projects of the logged users to be shown
   */
  public projects: ProjectCollection = {};

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  /**
   * Delete the given project in the backend and removes it from the screen
   * @param name Project name
   */
  public deleteProject(name: string) {
    this.projectsService.del(name).subscribe({
      next: (res) => {
        delete this.projects[res.name];
      },
      error: (_) => {
        // code
      },
    });
  }

  /**
   * Searchs all projects of the logged user
   */
  private getAllProjects() {
    this.projectsService.getAll().subscribe({
      next: (projs) => {
        this.projects = projs || {};
      },
    });
  }
}
