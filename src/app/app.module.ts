import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SkyComponent} from "./sky/sky.component";
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import { LookComponent } from './look/look.component';
import { FooterComponent } from './footer/footer.component';
import {TechnologyComponent} from "./technology/technology.component";
import { ParallaxDirective } from './parallax.directive';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    SkyComponent,
    AboutComponent,
    PortfolioComponent,
    TechnologyComponent,
    HomeComponent,
    LookComponent,
    FooterComponent,
    ParallaxDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
