import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import {RouterModule} from '@angular/router';
import { AsideLayoutComponent } from './components/aside-layout/aside-layout.component';
import { SinglePageLayoutComponent } from './components/single-page-layout/single-page-layout.component';



@NgModule({
    declarations: [
        NotFoundComponent,
        LoggedInComponent,
        AsideLayoutComponent,
        SinglePageLayoutComponent
    ],
  exports: [
    AsideLayoutComponent,
    SinglePageLayoutComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class CoreModule { }
