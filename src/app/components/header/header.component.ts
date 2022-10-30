import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  /**
   * A mirror of the information about the user present in the auth service
   */
  public userData$

  constructor(private authService: AuthService) {
    this.userData$ = this.authService.userData$
  }

  ngOnInit(): void {}

  /**
   * Logs the user out of the system
   */
  public logout() {
    this.authService.logout().subscribe();
  }
}
