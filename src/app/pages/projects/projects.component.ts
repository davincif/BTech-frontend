import { Component, OnInit } from '@angular/core';

import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectCollection } from 'src/models/projects';
import { TaskData } from 'src/models/tasks';

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
   * Transform all the tasks in a particular project in a Array (no side effects)
   * @param projName The nome of the project from which to get the tasks from
   * @returns A list of tasks, or an empty one
   */
  public getTasksArray(projName: string): TaskData[] {
    if (!this.projects[projName].tasks) {
      return [];
    }

    return Object.values(this.projects[projName].tasks!);
  }

  public updateTasks(projName: string, updatedTask: TaskData) {
    if (!this.projects[projName].tasks) {
      this.projects[projName].tasks = {};
    }
    this.projects[projName].tasks![updatedTask.id] = updatedTask;
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

  /**
   * Stop edigint the given project
   * @param projName Project in editiong state to stop being edited
   */
  private stopEditing(projName: string) {
    delete this.editingProj[projName];
  }
}
