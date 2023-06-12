import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SkyComponent} from "./sky/sky.component";
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TechnologyComponent } from './technology/technology.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import { LookComponent } from './look/look.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SkyComponent,
    AboutComponent,
    PortfolioComponent,
    TechnologyComponent,
    HomeComponent,
    LookComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
