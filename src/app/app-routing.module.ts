import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './modules/core/components/not-found/not-found.component';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {LoggedInGuard} from './modules/auth/guards/logged-in.guard';
import {LoggedOutGuard} from './modules/auth/guards/logged-out.guard';
import {LoggedInComponent} from './modules/core/components/logged-in/logged-in.component';
import {LogoutComponent} from './modules/auth/components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    children: [{
      path: 'dashboard',
      canLoad: [LoggedInGuard],
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
      path: 'user-management',
      canLoad: [LoggedInGuard],
      loadChildren: () => import('./modules/user-management/user-management.module').then(m => m.UserManagementModule)
    }, {
      path: 'todos',
      canLoad: [LoggedInGuard],
      loadChildren: () => import('./modules/todos/todos.module').then(m => m.TodosModule)
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }]
  },
  {
    path: 'logout',
    canActivate: [LoggedInGuard],
    component: LogoutComponent,
  },
  {
    path: 'login',
    canActivate: [LoggedOutGuard],
    component: LoginComponent,
  }, {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
