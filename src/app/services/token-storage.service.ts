/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTVmZWMwZTcyNmNhMjQ3MGMwYzRhNWYiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTYzNjY1NDc5MiwiZXhwIjoxNjM3MjU5NTkyfQ.vta3y6noWrbl0tUPxTXB7H5rbTSoKNh3h4dizB8DYXo';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private _storage: Storage | null = null;

  constructor(
    public storage: Storage,
  ) {
    this.init();
   }

   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  async setStorage(key: string, value: any) {
    this._storage?.set(key, value);
  }

  getStorage(key: string) {
     this._storage?.get(key).then((val) => {
      console.log('Value From Storage:', val);
      return val;
    });
  }

  clearStorage() {
    this._storage?.remove('USER_DETAILS');
  }
}
