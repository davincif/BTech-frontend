import { Component, OnInit } from '@angular/core';

import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectCollection, ProjectData } from 'src/models/projects';

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

  /**
   * Which projects are being edited in the moment, if any
   */
  public editingProj: {
    [name: string]: { newName: string };
  } = {};

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
   * Starts the editing process (state in this module) of a project
   * @param projName name of the project to be edited
   */
  public editMe(projName: string) {
    console.log('this.projects', this.projects);
    console.log('editMe');
    console.log('projName', projName);
    console.log('this.editingProj', this.editingProj);
    if (this.editingProj[projName]) {
      // if the user is already editing then, save it
      this.saveEdition(projName);
      return;
    }

    this.editingProj[projName] = {
      newName: this.projects[projName].name,
    };
  }

  public saveEdition(oldName: string) {
    let newName = this.editingProj[oldName].newName;
    if (oldName === newName) {
      // then, there's nothing to update
      this.stopEditing(oldName);
      return;
    }

    console.log('saveEdition');
    console.log('editingProj', this.editingProj);
    console.log('oldName', oldName);
    console.log('newName', newName);
    this.projectsService.changeName(oldName, newName).subscribe({
      next: (editedProj) => {
        // now update the edited project
        delete this.projects[oldName];
        this.projects[editedProj.name] = editedProj;
      },
      complete: () => {
        this.stopEditing(oldName);
      },
    });
  }

  /**
   * Searchs all projects of the logged user
   */
  private getAllProjects() {
    console.log('getAllProjects');
    this.projectsService.getAll().subscribe({
      next: (projs) => {
        this.projects = projs || {};
        console.log('loaded ', this.projects);
      },
    });
  }

  /**
   * Stop edigint the given project
   * @param projName Project in editiong state to stop being edited
   */
  private stopEditing(projName: string) {
    delete this.editingProj[projName];
  }
}
