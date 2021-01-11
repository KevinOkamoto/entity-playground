import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RequisitionComponent } from './page/requisition/requisition.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full',
}, {
  path: 'requisition/:id',
  component: RequisitionComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
