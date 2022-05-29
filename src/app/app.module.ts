/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';

import { HttpClientModule } from '@angular/common/http';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Zoom } from '@ionic-native/zoom/ngx';

import { authInterceptorProviders } from './_helper/auth.interceptor';
import { Drivers } from '@ionic/storage';

import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgOtpInputModule,
    IonicStorageModule.forRoot({
      name: '_Eduyugam',
         driverOrder: [ Drivers.IndexedDB, Drivers.LocalStorage, Drivers.SecureStorage]
    }),
   ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    authInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Zoom,
    StatusBar,
    SplashScreen,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
