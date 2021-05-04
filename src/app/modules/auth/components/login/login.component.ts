import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {of, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error: Error = null;
  login$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.login$
      .pipe(
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        switchMap(() => {
          const {username, password} = this.form.value;
          return this.authService.login(username, password)
            .pipe(
              switchMap(() => {
                return this.router.navigate(['/dashboard']);
              }),
              catchError(error => {
                this.error = error;
                return of(null);
              }),
            );
        }),
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.login$.next();
    }
  }
}
