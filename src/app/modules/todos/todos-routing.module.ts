import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodosLayoutComponent} from './components/todos-layout/todos-layout.component';
import {TodosOverviewComponent} from './components/todos-overview/todos-overview.component';
import {TodosAddComponent} from './components/todos-add/todos-add.component';

const routes: Routes = [{
  path: '',
  component: TodosLayoutComponent,
  children: [{
    path: '',
    component: TodosOverviewComponent,
  }, {
    path: 'add',
    component: TodosAddComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
