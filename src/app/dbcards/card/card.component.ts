import { Component, Input } from '@angular/core';
import { ConfirmService } from '../../confirm/confirm.service';
import { DbCardsService } from '../dbcards.service';
import { TranslateService } from '@ngx-translate/core';
import { Character } from './character';
import { cardTypes } from '../dbz-constants';

@Component({
  selector: 'app-card',
  providers: [ConfirmService, DbCardsService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    /**
     * @desc
     *  Character information.
     */
    @Input() character: Character;

    /**
     * @desc
     *  Flag to detect is card administration.
     */
    @Input() isAdmin: false;

    /**
     * @desc
     *  Card types.
     * @type {Object}
     */
    cardTypes   = cardTypes;

    /**
     * @desc
     *  Card attack.
     * @param {Attack} attack - The card attack.
     */
    onAttack(attack) {
        alert(`Perform attack: ${attack.name}`);
    }

    /**
     * @desc
     *  Edits card.
     */
    onEdit() {
        console.warn(`Edit card ${this.character.name}`);
        // TODO: Output to notify admin component to edit card.
    }

    /**
     * @desc
     *  Deletes card.
     */
    onDelete() {

        this.confirmService
            .confirm(this.translateService.instant('ADMIN.DELETE'),
                this.translateService.instant('DIALOG.MSG_DELETE', {name: this.character.name}),
                this.translateService.instant('DIALOG.OK'))
            .subscribe(confirm => {

                if (confirm) {
                    this.dbcardsService.deleteCard(this.character._id)
                        .then((r) => {
                            debugger;
                            console.log(r);
                            // TODO: Delete card from list.
                        })
                        .catch((err) => { console.error(err); });
                }
            });
    }

    constructor(private confirmService: ConfirmService, private translateService: TranslateService,
                private dbcardsService: DbCardsService) {}
}
