import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.sass'],
})
export class ProjectCreationComponent implements OnInit, OnDestroy {
  public formProject: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  /**
   * Warns everyone when the component is being destroyed
   */
  private ngUnsubscribe = new Subject<void>();

  /**
   * Errro message to be shown to the user
   */
  public errmsg: string = '';

  /**
   * Success message to be shown to the user
   */
  public successMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.createFormProject();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Creates a new project in the back-end for the logged user with the data in
   * the form
   */
  public createProject() {
    this.errmsg = '';
    if (!this.formProject.valid) {
      this.errmsg = 'missing info! please, double check';
      return;
    }

    this.projectsService
      .create(this.formProject.controls['name'].value)
      .subscribe({
        next: (_) => {
          this.successMsg = 'Project craeted =)';
        },
      });
  }

  private createFormProject() {
    this.formProject = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
    });
    this.formProject.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.errmsg = '';
        this.successMsg = '';
      });
  }
}
