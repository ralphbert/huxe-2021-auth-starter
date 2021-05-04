import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManagementLayoutComponent} from './components/user-management-layout/user-management-layout.component';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {AddUserComponent} from './components/add-user/add-user.component';

const routes: Routes = [{
  path: '',
  component: UserManagementLayoutComponent,
  children: [{
    path: '',
    component: UserManagementComponent,
  }, {
    path: 'add',
    component: AddUserComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
