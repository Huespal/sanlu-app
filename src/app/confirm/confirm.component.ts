import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    /**
     * @desc
     *  Dialog title.
     * @type {string}
     */
    title   = '';

    /**
     * @desc
     *  Dialog message.
     * @type {string}
     */
    message = '';

    /**
     * @desc
     *  Dialog ok button.
     * @type {string}
     */
    okBtn   = '';

    constructor(public dialogRef: MdDialogRef<any>) {}
}
