import { Observable } from 'rxjs/Rx';
import { ConfirmComponent } from './confirm.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

    public confirm(title, message, okBtn): Observable<boolean> {

        let dialogRef: MdDialogRef<any>;

        dialogRef = this.dialog.open(ConfirmComponent);
        dialogRef.componentInstance.title   = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.okBtn   = okBtn;

        return dialogRef.afterClosed();
    }

    constructor(private dialog: MdDialog) {}
}
