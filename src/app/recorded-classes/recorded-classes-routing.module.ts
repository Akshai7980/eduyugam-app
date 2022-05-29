import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordedClassesPage } from './recorded-classes.page';

const routes: Routes = [
  {
    path: '',
    component: RecordedClassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordedClassesPageRoutingModule {}
