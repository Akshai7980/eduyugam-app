/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { HttpsService } from '../services/https.service';
import { CommonService } from '../services/common.service';
import { Zoom } from '@ionic-native/zoom/ngx';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-live-classes',
  templateUrl: './live-classes.page.html',
  styleUrls: ['./live-classes.page.scss'],
})
export class LiveClassesPage implements OnInit {
  displayName = 'Akshay Mohan Dev';
  meetingPassword = '7980';
  meetingNumber = '7629856761';
  token: string;
  liveClasses: any = [];
  skeleton: any = [];
  enableButton: boolean;
  colors: any[][];

  constructor(
    private https: HttpsService,
    private common: CommonService,
    private zoomService: Zoom,
    private tokenService: TokenStorageService
  ) {
    this.enableButton = false;
  }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    console.log('token:',this.token);
    this.getAllClasses();
    this.skeleton.length = 3;
    this.currentTimePicker();
    this.colors = [  [ '#C9473F','#EE6E40' ], [ '#CA3DB4', '#F72B8B' ] ];
  }

  private getAllClasses(): void {
    this.https.getScheduledClasses().subscribe(
      (data: any) => {
        this.liveClasses = data;
        console.log('liveClasses',this.liveClasses);
      },
      err => {
        console.log('Error:',err);
      }
    );
  }

  currentTimePicker() {
    const d = new Date();
    console.log('d',d);
    const t = new Date(2021, 10, 19, 14, 0, 0, 0);
    console.log('t:',t);
    if (d === t) {
      console.log('true',this.enableButton);
      this.enableButton = true;
    } else {
      console.log('false',this.enableButton);
    }
  }

  joinMeeting(liveClass) {
    console.log('liveClass:',liveClass);
    console.log('Going to join meeting');
    // Prepare meeting option
    const options = {
      // custom_meeting_id: 'Eduyugam Learning App',
      no_share: true,
      no_audio: true,
      no_video: true,
      no_driving_mode: true,
      no_invite: true,
      no_meeting_end_message: true,
      no_dial_in_via_phone: true,
      no_dial_out_to_phone: true,
      no_disconnect_audio: true,
      no_meeting_error_message: true,
      // no_unmute_confirm_dialog: true,
      // no_webinar_register_dialog: false,
      no_titlebar: false,
      no_bottom_toolbar: false,
      // no_button_video: false,
      // no_button_audio: false,
      // no_button_share: false,
      // no_button_participants: false,
      // no_button_more: false,
      // no_text_password: true,
      // no_text_meeting_id: false,
      // no_button_leave: false
    };
    // Call join meeting method.
    this.zoomService.joinMeeting(this.meetingNumber, this.meetingPassword, this.displayName, options)
        .then((success: any) => {
          console.log('success:',success);
        }).catch((error: any) => {
          console.log('error:',error);
    });
  }

}
