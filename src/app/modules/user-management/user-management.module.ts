import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {UserManagementLayoutComponent} from './components/user-management-layout/user-management-layout.component';
import {RouterModule} from '@angular/router';
import {UserManagementRoutingModule} from './user-management-routing.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserManagementLayoutComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserManagementRoutingModule,
    CoreModule,
  ]
})
export class UserManagementModule {
}
