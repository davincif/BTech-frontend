import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TasksService } from 'src/app/services/tasks.service';
import { TaskData } from 'src/models/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  /**
   * The task that shall be shown in this component
   */
  @Input('tasks') tasks: TaskData[] = [];

  /**
   * The name of the project in which the given task is part of
   */
  @Input('projName') projName: string = '';

  /**
   * Emitts when a new task is added to this project
   */
  @Output('taskAdded') taskAdded = new EventEmitter<TaskData>();

  /**
   * the name of the new task the user wanna add
   */
  public newTaskDescription: string = '';

  /**
   * Stores all the tasks that are already finished
   */
  public finishedTasks: TaskData[] = [];

  /**
   * Stores all the tasks that are still not finished
   */
  public freshTasks: TaskData[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.filterTasks();
  }

  /**
   * Request the creating of a new user in the system with the given name
   * @param taskDescription The new task description
   */
  public addTask(taskDescription: string) {
    console.log('addTask');
    if (!this.newTaskDescription) {
      return;
    }

    this.tasksService.addTask(this.projName, taskDescription).subscribe({
      next: (newTask) => {
        this.taskAdded.emit(newTask);
        this.newTaskDescription = '';
        this.tasks.unshift(newTask);
        this.filterTasks();
      },
    });
  }

  private filterTasks() {
    this.finishedTasks = this.tasks.filter((task) => task.terminationDate);
    this.freshTasks = this.tasks.filter((task) => !task.terminationDate);
  }
}
