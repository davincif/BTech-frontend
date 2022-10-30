import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.sass'],
})
export class ProjectCreationComponent implements OnInit {
  public formProject: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  /**
   * Errro message to be shown to the user
   */
  public errmsg: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createFormProject();
  }

  /**
   * Creates a new project in the back-end for the logged user with the data in
   * the form
   */
  public createProject() {
    if (!this.formProject.valid)
      this.errmsg = 'missing info! please, double check';
    return;
  }

  private createFormProject() {
    this.formProject = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
    });
  }
}
