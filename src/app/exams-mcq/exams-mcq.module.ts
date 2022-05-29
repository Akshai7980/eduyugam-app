import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamsMcqPageRoutingModule } from './exams-mcq-routing.module';

import { ExamsMcqPage } from './exams-mcq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamsMcqPageRoutingModule
  ],
  declarations: [ExamsMcqPage]
})
export class ExamsMcqPageModule {}
