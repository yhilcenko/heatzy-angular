import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private service: LoginService,
              private router: Router) {
  }

  isLogged() {
    return this.service.isLogged();
  }

  logOut() {
    this.service.logOut();
    this.router.navigate(['/login']);
  }
}
