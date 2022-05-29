import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveClassesPageRoutingModule } from './live-classes-routing.module';

import { LiveClassesPage } from './live-classes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveClassesPageRoutingModule
  ],
  declarations: [LiveClassesPage]
})
export class LiveClassesPageModule {}
