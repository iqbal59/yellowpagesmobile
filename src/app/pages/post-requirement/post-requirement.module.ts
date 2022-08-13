import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostRequirementPageRoutingModule } from './post-requirement-routing.module';

import { PostRequirementPage } from './post-requirement.page';
import { RequirementSmallComponent } from 'src/app/components/requirement-small/requirement-small.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostRequirementPageRoutingModule,
  ],
  declarations: [PostRequirementPage, RequirementSmallComponent],
})
export class PostRequirementPageModule {}
