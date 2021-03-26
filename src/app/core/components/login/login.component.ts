import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /**
   * Create login form
   */
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  /**
   * variable to store possible errors
   */
  error?: string;

  constructor(private fb: FormBuilder, private toast: ToastrService,
              private router: Router, private auth: AuthService) {
  }

  /**
   * on login click function
   */
  onSubmit(): void {

    // if form is invalid return from as touched and make fields red
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // create payload to send to login
    const payload = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    // make request to service
    this.auth.login(payload).pipe(take(1)).subscribe(
      () => {
        // if response return success
        this.toast.success('Logged in successfully!', 'Success');
        this.router.navigate(['/home']);
      },
      // if credencials are not correct
      error => {
        this.error = error === 403 ? 'Username or password is not correct!' : '403';
      }
    );
  }
}
