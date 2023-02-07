import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { TreetableComponent } from './components/treetable/treetable.component';
import { UpdatedetailsComponent } from './components/updatedetails/updatedetails.component';

const routes: Routes = [
  {path:'treetable', component: TreetableComponent},
  {path:'addemployee',component:AddemployeeComponent},
  {path:'updatedetails',component:UpdatedetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
