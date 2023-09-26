import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage, MyNewComponent} from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {CreateSiteComponent} from "../create/create-site/create-site.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HomePage
  ],
  declarations: [HomePage, MyNewComponent, CreateSiteComponent]
})
export class HomePageModule {}
