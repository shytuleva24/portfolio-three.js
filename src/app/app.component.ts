import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ScrollAnimationService } from './scroll-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('homePage', { static: true }) homePage!: ElementRef;

  circleX!: number;
  circleY!: number;
  mouseX!: number;
  mouseY!: number;
  delay = 10;
  speed = 0.2;
  isHovered: boolean = false;

  constructor(
      private scrollAnimationService: ScrollAnimationService,
      private elementRef: ElementRef,
      private renderer: Renderer2
  ) {}
  smoothScroll(): void {
    const element = this.elementRef.nativeElement.querySelector('#footer');
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
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

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const opacity = Math.max(0.4, 1 - (scrollPosition / 1000)); // Adjust the division value as needed
    this.renderer.setStyle(this.homePage.nativeElement, 'opacity', opacity.toString());
  }

  updateCircle() {
    const dx = this.mouseX - this.circleX;
    const dy = this.mouseY - this.circleY;

    this.circleX += dx * this.speed;
    this.circleY += dy * this.speed;

    requestAnimationFrame(() => this.updateCircle());
  }
}
