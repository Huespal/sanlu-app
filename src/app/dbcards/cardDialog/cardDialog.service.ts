import { Observable } from 'rxjs/Rx';
import { CardDialogComponent } from './cardDialog.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class CardDialogService {

    public open(character, skill, isCreating): Observable<boolean> {

        let dialogRef: MdDialogRef<any>;

        dialogRef = this.dialog.open(CardDialogComponent);
        dialogRef.componentInstance.character   = character;
        dialogRef.componentInstance.skill       = skill;
        dialogRef.componentInstance.isCreating  = isCreating;

        return dialogRef.afterClosed();
    }

    constructor(private dialog: MdDialog) {}
}
