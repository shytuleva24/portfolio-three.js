import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { ScrollAnimationService } from './scroll-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(
      private scrollAnimationService: ScrollAnimationService,
      private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    const lineElements = this.elementRef.nativeElement.querySelectorAll('.line');
    lineElements.forEach((element: HTMLElement) => {
      const elementRef = new ElementRef(element);
      this.scrollAnimationService.observe(elementRef);
    });
  }

}
