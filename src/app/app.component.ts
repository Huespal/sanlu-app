import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { language } from './app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MdSidenav;

    /**
     * @desc
     *  Language object.
     * @type {Object}
     */
    lang        = language;

    /**
     * @desc
     *  Language object.
     * @type {Object}
     */
    currentLang = this.lang.CA;

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
     *  Changes app language.
     */
    onChangeLanguage() {
        this.translate.setDefaultLang(this.currentLang);
        this.translate.use(this.currentLang);
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

    /**
     * @desc
     *  Closes sidebar.
     *  @params {Object} e - The event object.
     */
    handleMenuEvent(e) {
        if (e.close) { this.sidenav.close(); }
    }

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

    constructor(public translate: TranslateService) {
        this.onChangeLanguage();
    }
}
