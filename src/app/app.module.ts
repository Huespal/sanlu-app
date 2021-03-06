import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdListModule, MdInputModule, MdSnackBarModule,
         MdSelectModule, MdIconModule, MdCardModule, MdDialogModule, MdTabsModule, MdSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WhoComponent } from './who/who.component';
import { WhatComponent } from './what/what.component';
import { WhereComponent } from './where/where.component';
import { WhyComponent } from './why/why.component';
import { DbCardsComponent } from './dbcards/dbcards.component';
import { AdminComponent } from './dbcards/admin/admin.component';
import { CardComponent } from './dbcards/card/card.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CardDialogComponent } from './dbcards/cardDialog/cardDialog.component';
import 'hammerjs';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WhoComponent,
    WhatComponent,
    WhereComponent,
    WhyComponent,
    DbCardsComponent,
    AdminComponent,
    ConfirmComponent,
    CardDialogComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [Http]
      }
    }),
    RoutesModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdCheckboxModule,
    MdInputModule,
    MdSnackBarModule,
    MdSelectModule,
    MdIconModule,
    MdDialogModule,
    MdTabsModule,
    MdSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule
  ],
  exports: [
    MdButtonModule,
    MdListModule,
    MdCheckboxModule,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent,
    CardDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
