import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordedClassesPageRoutingModule } from './recorded-classes-routing.module';

import { RecordedClassesPage } from './recorded-classes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordedClassesPageRoutingModule
  ],
  declarations: [RecordedClassesPage]
})
export class RecordedClassesPageModule {}
