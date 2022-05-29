/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { CommonService } from '../services/common.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  userDetails: any = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private common: CommonService) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserDetails();
    this.common.navCtrl.setDirection('root');
  }

 getUserDetails() {
    this.tokenStorage.storage.get('USER_DETAILS').then((val) => {
      this.userDetails = val;
      console.log('userDetails:',this.userDetails);
    });
  }

}
