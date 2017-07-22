import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    /**
     * @desc
     *  Current background counter.
     * @type {number}
     */
    bgNum       = 1;

    /**
     * @desc
     *  Max. background counter.
     * @type {number}
     */
    maxBgCount  = 6;

    /**
     * @desc
     *  Interval time. Set to 30 minutes.
     * @type {number}
     */
    interval    = 1000 * 60 * 30;

    /**
     * @desc
     *  On init.
     *  - Changes app background every interval time.
     */
    ngOnInit() {
        setInterval(() => {
            this.changeBg();
        }, this.interval);
    }

    /**
     * @desc
     *  Changes app background .
     */
    changeBg() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('sanlu-bg-' + (this.bgNum));
        this.bgNum += 1;
        if (this.bgNum === this.maxBgCount + 1) {this.bgNum = 1; }
        body.classList.add('sanlu-bg-' + this.bgNum );
    }

    constructor(translate: TranslateService) {
        translate.setDefaultLang('ca');
        translate.use('ca');
    }
}
