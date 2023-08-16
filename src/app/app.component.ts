import {AfterViewInit, Component} from '@angular/core';
import {LoadingService} from "./services/load.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    constructor(public loadingService: LoadingService) {
    }
    ngAfterViewInit(): void {
    }


}
