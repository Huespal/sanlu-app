import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-who',
  providers: [AppService],
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.scss']
})
export class WhoComponent {

    /**
     * @desc
     *  Who form.
     * @type {FormGroup}
     */
    whoForm = this.fb.group({
        whoName   : ['', Validators.required],
        whoText   : ['', Validators.required]
    });

    /**@todo: Save information in server.
     * @desc
     *  Callback to send information about someone.
     */
    onSendWho() {

        const data = {
            name: this.whoForm.get('whoName').value,
            text: this.whoForm.get('whoText').value
        };

        this.appService.createGreet(data)
            .then(() => {
                this.snackBar.open(this.translateService.instant('FB.SUCCESS.SEND_GREET', {name: this.whoForm.get('whoName').value}));
                this.whoForm.reset();
            })
            .catch((err) => { this.snackBar.open(err); });
    }

    constructor(public fb: FormBuilder, public snackBar: MdSnackBar, public translateService: TranslateService,
                public appService: AppService) { }
}
