import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentsSpacePageRoutingModule } from './parents-space-routing.module';

import { ParentsSpacePage } from './parents-space.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentsSpacePageRoutingModule
  ],
  declarations: [ParentsSpacePage]
})
export class ParentsSpacePageModule {}
