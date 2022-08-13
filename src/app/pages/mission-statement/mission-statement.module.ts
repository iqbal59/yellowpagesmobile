import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionStatementPageRoutingModule } from './mission-statement-routing.module';

import { MissionStatementPage } from './mission-statement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionStatementPageRoutingModule
  ],
  declarations: [MissionStatementPage]
})
export class MissionStatementPageModule {}
