import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {CreateSiteComponent} from "../create/create-site/create-site.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {path: 'create', component: CreateSiteComponent},
  {path: 'home', component: HomePage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
