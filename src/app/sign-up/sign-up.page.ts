/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable id-blacklist */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { HttpsService } from '../services/https.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;
  classNames: any = [];
  mediaFile: any = [];
  areas: any = [];
  classes: any = [];
  showLoader: boolean;
  userClassName: string;
  userClassId: any;
  pincode: any;
  areaId: any;

  constructor(
    private formBuilder: FormBuilder,
    private common: CommonService,
    private https: HttpsService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.registerFormValidator();
    this.common.menu.swipeGesture(false);
    this.getRegistrationFormData();
    this.showLoader = false;
  }

  registerFormValidator() {
    this.registerForm = this.formBuilder.group({
      parentsName: [null, [Validators.required, Validators.minLength(3)]],
      studentFullName: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      relationship: [null, [Validators.required, Validators.minLength(3)]],
      contactNumber: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(12)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      profilePicture: [null],
  });
}

getRegistrationFormData() {
  this.http.get('http://18.221.228.218:3000/auth/get-registration-form-data').subscribe((res: any) => {
    this.areas = res?.data?.areas;
    this.classes = res?.data?.classes;
    console.log('res:', res, 'areas:', this.areas, 'classes:', this.classes);
  }, err => {
    console.log('Error:', err);
  });
}

onSelectClass(event) {
  console.log('classDetail:',event);
  console.log('value:',event?.target?.value);
  this.userClassName = event?.target?.value?.className;
  this.userClassId = event?.target?.value?._id;
}

onSelectPincode(event) {
  console.log('classDetail:',event);
  console.log('value:',event?.target?.value);
  this.pincode = event?.target?.value?.pincode;
  this.areaId = event?.target?.value?._id;
}

registerSubmit() {
  console.log('loginForm:',this.registerForm.value);
  if (this.registerForm.valid) {
    this.showLoader = true;
    const formData = new FormData();
    formData.append('parentsName', this.registerForm.value.parentsName);
    formData.append('studentFullName', this.registerForm.value.studentFullName);
    formData.append('address', this.registerForm.value.address);
    formData.append('relationship', this.registerForm.value.relationship);
    formData.append('contactNumber', this.registerForm.value.contactNumber);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('classId', this.userClassId);
    formData.append('className', this.userClassName);
    formData.append('profilePicture',this.mediaFile[0]);
    formData.append('area[pincode]', this.pincode);
    formData.append('area[areaId]', this.areaId);
    this.http.post('http://18.221.228.218:3000/auth/student-signup',formData
    ).subscribe((res: any) => {
      if (res["message"] === 'Registration completed successfully') {
        const toastMsg = 'Student registration successful';
        const toastTime = 3000;
        this.common.presentToast(toastMsg, toastTime);
        this.showLoader = true;
        const navigationExtras: NavigationExtras = {
          state: {
            userid: res?.data?.userId,
            phone: this.registerForm.value.contactNumber,
          }
        };
        this.registerForm.reset();
        this.common.router.navigate(['/otp'], navigationExtras);
      }
      console.log(res);
      }, err => {
        this.showLoader = false;
        console.log('Error:',err);
      });
    // this.https.postMethod('auth/student-signup',this.registerForm.value).then((res: any) => {
    //   console.log('res:',res);
    // }, err => {
    //   console.log('Error:',err);
    // });
  } else {
    const alertHead = 'Failed!';
    const alertMessage = 'Please enter valid details and <strong>password must contain 6 digits.</strong>';
    this.common.presentAlert(alertHead, alertMessage);
    console.log('failed');
  }
}

inputChange(event: any, type) {
  console.log('event:',event?.target?.files, 'type:',type );
  this.mediaFile = event.target.files;
}

}

