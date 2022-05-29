import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.swipeGesture(false);
  }

}
