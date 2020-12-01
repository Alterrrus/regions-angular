import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionListComponent} from "./region-list/region-list.component";
import {RegionEditComponent} from "./region-edit/region-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/region-list', pathMatch: 'full' },
  {
    path: 'region-list',
    component: RegionListComponent
  },
  {
    path: 'region-add',
    component: RegionEditComponent
  },
  {
    path: 'region-edit/:id',
    component: RegionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
