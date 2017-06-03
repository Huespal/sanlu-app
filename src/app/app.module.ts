import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdListModule, MdInputModule, MdSelectModule, MdIconModule  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WhyComponent } from './why/why.component';
import 'hammerjs';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WhyComponent
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
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdIconModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule
  ],
  exports: [
    MdButtonModule,
    MdListModule,
    MdCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
