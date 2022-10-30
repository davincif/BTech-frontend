import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  /**
   * All projects of the logged users to be shown
   */
  public projects = [];

  constructor() {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  private getAllProjects() {
    // code
  }
}
