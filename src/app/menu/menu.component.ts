import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
     *  Menu event.
     *  - Close sidebar.
     */
    @Output() menuEvent = new EventEmitter();

    /**
     * @desc
     *  Event to close side nav.
     */
    onRoute() {
        this.menuEvent.emit({close: true});
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
    }

    constructor() { }
}
