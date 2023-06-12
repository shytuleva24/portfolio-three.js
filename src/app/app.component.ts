import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { ScrollAnimationService } from './scroll-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  circleX!: number;
  circleY!: number;
  mouseX!: number;
  mouseY!: number;
  delay = 10;
  speed = 0.2;

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
    this.circleX = window.innerWidth / 2;
    this.circleY = window.innerHeight / 2;
    this.mouseX = this.circleX;
    this.mouseY = this.circleY;
    this.updateCircle();

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY + window.pageYOffset;
  }

  updateCircle() {
    const dx = this.mouseX - this.circleX;
    const dy = this.mouseY - this.circleY;
    this.circleX += dx * this.speed;
    this.circleY += dy * this.speed;

    const circleElement = this.elementRef.nativeElement.querySelector('.circle');
    circleElement.style.left = this.circleX + 'px';
    circleElement.style.top = this.circleY + 'px';

    setTimeout(() => this.updateCircle(), this.delay);
  }

}
