import { NavigationExtras } from '@angular/router';
/* eslint-disable max-len */
import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpsService } from '../services/https.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  loginForm: FormGroup;
  showLoader: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private https: HttpsService,
    private common: CommonService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit() {
    this.loginFormValidator();
    this.showLoader = false;
    this.common.menu.swipeGesture(false);
  }

  loginFormValidator() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(12)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      path: ['auth/student-signin']
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm:',this.loginForm.value);
      this.showLoader = true;
      this.https.postData(this.loginForm.value).subscribe((res: any) => {
        console.log('res:',res);
          if (res?.data?.token !== '') {
            this.showLoader = false;
            this.common.navCtrl.navigateRoot('/folder');
            const loadMessage = '<strong>' + this.loginForm.value.email + '</strong> successfully logged in.';
            const loadTime = 2000;
            this.common.presentLoading(loadMessage, loadTime);
            console.log('token:',res?.data?.token);
            this.tokenService.saveToken(res?.data?.token);
            this.tokenService.saveUser(res?.data?.user);
            this.tokenService.setStorage('USER_DETAILS', res?.data?.user);
            this.tokenService.setStorage('USER_TOKEN', res?.data?.token);
        } else {
          const alertHead = 'Failed!';
          const alertMessage = 'Invalid login credentials';
          this.common.presentAlert(alertHead, alertMessage);
          console.log('failed');
        }
      }, err => {
        this.showLoader = false;
        if (err?.error?.message === 'Wrong password!') {
          const alertHead = 'Failed!';
          const alertMessage = 'You entered a wrong password...if you don`t know your correct password, then you can use <strong>Forgot Password.</strong>';
          this.common.presentAlert(alertHead, alertMessage);
        } else {
          const toastMsg = 'Something went wrong !!! Please try again later...';
          const toastTime = 3000;
          this.common.presentToast(toastMsg, toastTime);
          console.log('err:',err);
        }
      });
    } else {
      const alertHead = 'Failed!';
      const alertMessage = 'Please enter valid details and <strong>password must contain 6 digits.</strong>';
      this.common.presentAlert(alertHead, alertMessage);
      console.log('failed');
    }

  }

}

