import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  error: string | null;

  constructor(private service: LoginService,
              private router: Router) {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl( '', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      this.service.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(result => {
          this.service.setToken(result['token']);
          this.router.navigate(['']);
        },
        error => this.error = error);
    }
  }

}
