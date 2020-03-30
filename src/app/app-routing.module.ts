import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YlistComponent } from './ylist/ylist.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ylist/:name', component: YlistComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
