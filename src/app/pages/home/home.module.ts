import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { RequirementSmallComponent } from 'src/app/components/requirement-small/requirement-small.component';
import { SearchHomeComponent } from 'src/app/components/search-home/search-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, RequirementSmallComponent, SearchHomeComponent],
})
export class HomePageModule {}
