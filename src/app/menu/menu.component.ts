import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
      trigger('visibilityChanged', [
          state('0', style({ transform: 'translateX(-100%)', height: '0', opacity: 0 })),
          state('1', style({ transform: 'translateX(0%)', height: '100%', opacity: 1 })),
          transition('1 => 0', animate('.3s ease-in' )),
          transition('0 => 1', animate('.3s ease-out' ))
  ])]
})

export class MenuComponent {

    /**
     * @desc
     *  Current face image class.
     * @type {string}
     */
    faceClass       = 'sanlu_face_1';

    /**
     * @desc
     *  Max. face counter.
     * @type {number}
     */
    maxFaceCount    = 5;

    /**
     * @desc
     *  Face class number.
     * @type {number}
     */
    faceCount       = 1;

    /**
     * @desc
     *  Flag to define open/close menu.
     * @type {boolean}
     */
    openMenu = true;

    /**
     * @desc
     *  Opens / closes menu.
     */
    toggleMenu() {
        this.openMenu = !this.openMenu;
    }

    /**
     * @desc
     *  Changes menu image.
     */
    changeFace() {
        this.faceClass = 'sanlu_face_' + this.faceCount;
        this.faceCount += 1;
        if (this.faceCount === this.maxFaceCount + 1) {this.faceCount = 1; }
    }

    /**
     * @desc
     *  Callback on menu image click.
     */
    onFace() {
        this.changeFace();
        this.toggleMenu();
    }

    constructor() { }
}
