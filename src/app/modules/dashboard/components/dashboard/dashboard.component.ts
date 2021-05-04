import {Component, OnInit} from '@angular/core';
import {AuthService, UserResponse} from '../../../auth/services/auth.service';
import {of, Subject} from 'rxjs';
import {catchError, delay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: UserResponse;
  error: Error = null;
  loading = false;
  reload$ = new Subject();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.reload$
      .pipe(
        tap(() => {
          console.log('reload!');
          this.loading = true;
          this.error = null;
          this.data = null;
        }),
        // adding a delay to show loading spinner. Don't do that in any production app!
        delay(Math.random() * 1000),
        switchMap(() => this.authService.getMe().pipe(catchError(error => {
          this.error = error;
          return of(null);
        }))),
        tap(response => {
          this.data = response;
          this.loading = false;
        }),
      )
      .subscribe();

    this.reload$.next();
  }
}
