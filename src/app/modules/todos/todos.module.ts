import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosLayoutComponent } from './components/todos-layout/todos-layout.component';
import { TodosOverviewComponent } from './components/todos-overview/todos-overview.component';
import { TodosAddComponent } from './components/todos-add/todos-add.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [
    TodosLayoutComponent,
    TodosOverviewComponent,
    TodosAddComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    CoreModule
  ]
})
export class TodosModule { }
