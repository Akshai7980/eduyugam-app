/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Platform , NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Zoom } from '@ionic-native/zoom/ngx';
import { TokenStorageService } from './services/token-storage.service';
import { CommonService } from './services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Live Classes', url: '/live-classes', icon: 'desktop' },
    { title: 'Recorded Classes', url: '/folder/Outbox', icon: 'film' },
    { title: 'Assignment', url: '/folder/Favorites', icon: 'document-attach' },
    { title: 'Notes', url: '/folder/Archived', icon: 'document-text' },
    { title: 'Parents Space', url: '/folder/Trash', icon: 'people-circle' },
    { title: 'Payment', url: '/folder/Spam', icon: 'wallet' },
    { title: 'Exams & MCQ', url: '/folder/Trash', icon: 'school' },
    { title: 'Doubt Clearance', url: '/folder/Spam', icon: 'help' },
    { title: 'Notifications', url: '/folder/Spam', icon: 'notifications' },
    { title: 'Profile', url: '/folder/Spam', icon: 'person-circle' },
    // { title: 'Terms & Conditions', url: '/terms-and-conditions', icon: 'newspaper' },
    { title: 'Logout', url: '/login-register', icon: 'log-out' },
  ];

  SDK_KEY = '7bjN8ZH4Df6j3q6pgDFP1MqliCO5bjTBDOrI';
  SDK_SECRET = 'fu4JJDAQHtrFUTW0PBsjD2DYz6huoqjGxYRe';
  userDetails: any = [];

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private zoomService: Zoom,
    private tokenService: TokenStorageService,
    private common: CommonService,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.checkUserDetails();
      console.log('Platform ready');

      this.zoomService.initialize(this.SDK_KEY, this.SDK_SECRET)
      .then((success: any) => {
        console.log('success:',success);
      })
      .catch((error: any)=>{
        console.log('error:',error);
      });
    });
  }

  async checkUserDetails() {
    this.tokenService.storage.get('USER_DETAILS').then((Val) => {
      if (Val) {
        this.userDetails = Val;
        console.log('userDetails:',this.userDetails);
           this.navCtrl.navigateRoot('/folder');
          } else {
            this.tokenService.storage.get('USER_TOKEN').then((token) => {
              console.log('token:',token);
              if (token) {
                this.userDetails = this.tokenService.getUser();
                this.navCtrl.navigateRoot('/otp');
              } else {
                this.navCtrl.navigateRoot('/welcome-slides');
              }
            });
          }
    });
  }

  openPage(i: any) {
    if (this.appPages[i]?.title==='Logout') {
      this.tokenService.clearStorage();
      console.log('user logged out');
    }
  }

}
