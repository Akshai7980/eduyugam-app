/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from './../services/token-storage.service';

const AUTH_API = 'http://18.221.228.218:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) { }

  postData(credentials): Observable<any> {
    return this.http.post(AUTH_API + credentials.path,{
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  postMethod(path, param) {
    // console.log('params:',param);
    return new Promise((resolve, reject) => {
      var headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      let options = { headers: headers };

      this.http.post(AUTH_API + path, param, options).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  registrationData(credentials): Observable<any> {
    return this.http.post(AUTH_API + credentials.path,{
      parentsName: credentials.parentsName,
      fullName: credentials.fullName,
      address: credentials.address,
      relationship: credentials.relationship,
      contactNumber: credentials.contactNumber,
      email: credentials.email,
      password: credentials.password,
      pincode: credentials.pincode,
    }, httpOptions);
  }

  getScheduledClasses(): Observable<any> {
    return this.http.get(AUTH_API
       + 'student/get-scheduld-classes' + '?classId=' + '6156e7dfca0b2c510682b3b5', { responseType: 'json' });
  }

}
