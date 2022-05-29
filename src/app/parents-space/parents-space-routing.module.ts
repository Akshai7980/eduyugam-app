import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentsSpacePage } from './parents-space.page';

const routes: Routes = [
  {
    path: '',
    component: ParentsSpacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentsSpacePageRoutingModule {}
