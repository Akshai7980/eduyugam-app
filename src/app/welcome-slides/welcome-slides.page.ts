import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-slides',
  templateUrl: './welcome-slides.page.html',
  styleUrls: ['./welcome-slides.page.scss'],
})
export class WelcomeSlidesPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.swipeGesture(false);
  }

  slideNext(event) {
    console.log('event:',event);
      const element1 = document.querySelector('.second');
      element1.classList.add('animate__animated', 'animate__bounceInUp', '--animate-duration', '0.5s');
      const element2 = document.querySelector('.text1');
      element2.classList.add('animate__animated', 'animate__fadeInLeftBig', '--animate-duration', '0.5s');
      const element3 = document.querySelector('.text2');
      element3.classList.add('animate__animated', 'animate__fadeInLeftBig', '--animate-duration', '0.5s');
      const element4 = document.querySelector('.text3');
      element4.classList.add('animate__animated', 'animate__fadeInLeftBig', '--animate-duration', '0.5s');
      const element5 = document.querySelector('.text4');
      element5.classList.add('animate__animated', 'animate__fadeInRightBig', '--animate-duration', '0.5s');
  }

  slideEnd(event) {
    console.log('event:',event);
    const element6 = document.querySelector('.third');
    element6.classList.add('animate__animated', 'animate__jackInTheBox', '--animate-duration', '0.5s');
    const element7 = document.querySelector('.third1');
    element7.classList.add('animate__animated', 'animate__zoomInDown', '--animate-duration', '0.5s');
    const element8 = document.querySelector('.third2');
    element8.classList.add('animate__animated', 'animate__zoomInDown', '--animate-duration', '0.5s');
    const element9 = document.querySelector('.third3');
    element9.classList.add('animate__animated', 'animate__zoomInDown','--animate-duration', '0.5s');
    const element0 = document.querySelector('.third4');
    element0.classList.add('animate__animated', 'animate__lightSpeedInRight', '--animate-duration', '0.5s');
    const element11 = document.querySelector('.button');
    element11.classList.add('animate__animated', 'animate__flipInY', '--animate-duration', '0.5s');
  }

}
