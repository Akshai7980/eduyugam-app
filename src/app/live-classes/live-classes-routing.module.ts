import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveClassesPage } from './live-classes.page';

const routes: Routes = [
  {
    path: '',
    component: LiveClassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveClassesPageRoutingModule {}
