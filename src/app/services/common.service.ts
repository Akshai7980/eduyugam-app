/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';

import {
   ModalController,
   ToastController,
    Platform,
     NavController,
      AlertController,
       ActionSheetController,
        LoadingController
       } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public platform: Platform,
    public router: Router,
  ) { }

  passNavigationExtras(page: any, userDetails: any, detail1: any, detail2: any, detail3: any) {
    const p = page;
    const navigationExtras: NavigationExtras = {
      state: {
        user: userDetails,
        one: detail1,
        two: detail2,
        three: detail3,
      }
    };
    this.router.navigate([p], navigationExtras);
  }
      // ----- App's Alert Controller -----
      async presentAlert(head, msg) {
        const alert = await this.alertCtrl.create({
          header: head,
          message: msg,
          buttons: ['OK']
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
      }
          // ----- App's Alert Controller -----

                // ----- App's Toast Controller -----
      async presentToast(msg, time) {
        const toast = await this.toastCtrl.create({
          message: msg,
          duration: time
        });
        toast.present();
      }

      async presentToastWithOptions(msg, head) {

        try {
          this.toastCtrl.dismiss().then(() => {
          })
          .catch(() => {
          })
          .finally(() => {
            console.log('Closed');
          });
        }
        catch(e) {
          console.log('e:',e);
        }

        const toast = await this.toastCtrl.create({
          header: head,
          message: msg,
          position: 'top',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        await toast.present();

        const { role } = await toast.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
      }
        // ----- App's Toast Controller -----

                // ----- App's Loader Controller -----
                async presentLoading(msg, time) {
                  const loading = await this.loadingCtrl.create({
                    cssClass: 'my-custom-class',
                    message: msg,
                    duration: time
                  });
                  await loading.present();

                  const { role, data } = await loading.onDidDismiss();
                  console.log('Loading dismissed!');
                }
                // ----- App's Loader Controller -----

                async presentAlertConfirm(head, msg) {
                  const alert = await this.alertCtrl.create({
                    cssClass: 'my-custom-class',
                    header: head,
                    message: msg,
                    buttons: [
                      {
                        text: 'NO',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                          console.log('Confirm Cancel: blah');
                        }
                      }, {
                        text: 'YES',
                        handler: () => {
                          navigator['app'].exitApp();
                          console.log('Confirm Okay');
                        }
                      }
                    ]
                  });

                  await alert.present();
                }

                async presentAlertPrompt() {
                  const alert = await this.alertCtrl.create({
                    header: 'Forgot Password !',
                    inputs: [
                      {
                        name: 'email',
                        type: 'email',
                        placeholder: 'Enter your Email'
                      },
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                          console.log('Confirm Cancel');
                        }
                      }, {
                        text: 'Ok',
                        handler: (alertData) => {
                          console.log(alertData.email);
                          if (alertData.email !== '' && alertData.email !== undefined) {
                          } else {
                            const toastMsg = 'Please enter your registered mail id and then click OK';
                            const toastTime = 1000;
                            this.presentToast(toastMsg, toastTime);
                          }
                        }
                      }
                    ]
                  });

                  await alert.present();
                }
}
