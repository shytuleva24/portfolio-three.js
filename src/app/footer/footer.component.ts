import {Component} from '@angular/core';
import {MouseIconService} from "../services/mouse-icon.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{
  constructor(private mouseService: MouseIconService) {
  }
  onMouseEnter() {
    this.mouseService.onMouseEnter();
  }

  onMouseLeave() {
    this.mouseService.onMouseLeave();
  }
}
