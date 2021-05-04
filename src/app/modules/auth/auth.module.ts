import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthService} from './services/auth.service';
import {CoreModule} from '../core/core.module';
import { LogoutComponent } from './components/logout/logout.component';

/**
 * this function is used as a factory provider. It will generate a function that
 * will return a promise. Once registered as APP_INITIALIZER angular runs this function
 * on startup.
 * as long as the promise is not resolved the app shows nothing.
 * this is used to check the validity of the JWT token.
 */
export function authInitializer(authService: AuthService): () => Promise<void> {
  return () => new Promise<void>(resolve => {
    authService.initSession().subscribe(resolve);
  });
}

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: APP_INITIALIZER,
    useFactory: authInitializer,
    multi: true,
    deps: [AuthService],
  }]
})
export class AuthModule { }
