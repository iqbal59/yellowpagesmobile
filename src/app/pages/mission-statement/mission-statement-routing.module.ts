import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionStatementPage } from './mission-statement.page';

const routes: Routes = [
  {
    path: '',
    component: MissionStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionStatementPageRoutingModule {}
