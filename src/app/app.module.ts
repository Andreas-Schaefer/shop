import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { CategoryComponent } from './category/category.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TopHeaderComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'category/:id', component: CategoryComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
