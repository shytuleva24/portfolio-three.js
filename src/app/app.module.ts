import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgOptimizedImage} from "@angular/common";

import {SkyComponent} from "./all-site/sky/sky.component";
import {AboutComponent} from './all-site/about/about.component';
import {PortfolioComponent} from './all-site/portfolio/portfolio.component';
import {HomeComponent} from './all-site/home/home.component';
import {AppComponent} from "./app.component";
import {LookComponent} from './all-site/look/look.component';
import {FooterComponent} from './all-site/footer/footer.component';
import {TechnologyComponent} from "./all-site/technology/technology.component";
import {ParallaxDirective} from './directives/parallax.directive';
import { AllSiteComponent } from './all-site/all-site.component';

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
        AllSiteComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
