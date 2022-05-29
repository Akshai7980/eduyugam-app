/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NgOtpInputModule } from 'ng-otp-input';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  OTP: any = [];
  userId: string;
  showLoader: boolean;
  phoneNumber: any;

  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private common: CommonService,
    private tokenService: TokenStorageService,
  ) {
    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.userId = this.common.router.getCurrentNavigation().extras.state.userid;
        this.phoneNumber = this.common.router.getCurrentNavigation().extras.state.phone;
        console.log('userId:', this.userId , this.phoneNumber);
      }
    });
  }

  ngOnInit() {
    this.menu.swipeGesture(false);
    this.showLoader = false;
    this.phoneNumber = '8590395024';
  }

  moveFocus(event, nextElement, previousElement) {
    console.log(event,event.keyCode);
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event?.keyCode >= 48 && event?.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event?.keyCode === 91) {
      if (nextElement) {
        this.OTP = event.path[0].value;
        console.log('this.OTP:',this.OTP);
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }

  otpSubmit() {
    console.log('OTP:',this.OTP);
    if (this.OTP?.length !== 0) {
      this.showLoader = true;
      console.log('OTP:',this.OTP);
      this.http.post('http://18.221.228.218:3000/auth/otp-verification', {
        otp: this.OTP[0]+this.OTP[1]+this.OTP[2]+this.OTP[3]+this.OTP[4]+this.OTP[5],
        userId: this.userId,
      }).subscribe((res: any) => {
        this.showLoader = false;
        console.log('res:', res);
        if (res?.message === 'Mobile Number verified successfully') {
          const alertHead = 'Success!';
          const alertMsg = ' <strong> Mobile Number verified successfully. </strong> ';
          this.common.presentAlert(alertHead, alertMsg);
          this.tokenService.setStorage('USER_DETAILS', res?.data?.user);
          this.tokenService.setStorage('USER_TOKEN', res?.data?.token);
          const toastMsg = '⏳ Please wait we are redirecting you to Eduyugam Home...';
          const toastTime = 3000;
          this.common.presentToast(toastMsg, toastTime);
          this.OTP = [];
          this.common.navCtrl.navigateRoot('/folder');
        }
      }, err => {
        this.showLoader = false;
        console.log('Error:', err);
        const toastMsg = 'Something went wrong... Please try again later...';
        const toastTime = 3000;
        this.common.presentToast(toastMsg, toastTime);
      });
    } else {
      console.log('Failed');
      const alertHead = 'Failed!';
      const alertMsg = 'Please enter <strong>One Time Password</strong> and then click <strong>verify</strong>.';
      this.common.presentAlert(alertHead, alertMsg);
    }

  }

}


