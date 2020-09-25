import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';


const routes: Routes = [
  {path: 'schools',component: SchoolListComponent},
  {path: '', redirectTo: 'schools' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
