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
