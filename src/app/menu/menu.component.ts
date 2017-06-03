import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
     *  Changes app background.
     */
    changeFace() {
        this.faceClass = 'sanlu_face_' + this.faceCount;
        this.faceCount += 1;
        if (this.faceCount === this.maxFaceCount + 1) {this.faceCount = 1; }
    }

    /**
     * @desc
     *  Changes app background.
     * @param {number} state
     */
    changeState(state) {
        // TODO: https://www.sitepoint.com/angular-2-components-inputs-outputs/
        switch(state) {
            case 1:
                // TODO: Set app.component state to state.
                alert('Who!');
                break;
            case 2:
                // TODO: Set app.component state to state.
                alert('What!');
                break;
            case 3:
                // TODO: Set app.component state to state.
                alert('Where!');
                break;
            default:
                // TODO: Set app.component state to 1.
                break;
        }
    }

    constructor() { }
}
