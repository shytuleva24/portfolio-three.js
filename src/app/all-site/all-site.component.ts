import {AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {ScrollAnimationService} from "../services/scroll-animation.service";
import {MouseIconService} from "../services/mouse-icon.service";
import {LoadingService} from "../services/load.service";

@Component({
  selector: 'app-all-site',
  templateUrl: './all-site.component.html',
  styleUrls: ['./all-site.component.css']
})
export class AllSiteComponent implements AfterViewInit {
  @ViewChild('homePage', {static: true}) homePage!: ElementRef;
  mouseX!: number;
  mouseY!: number;
  delay = 10;
  speed = 0.2;
  mouseIconX!: number;
  mouseIconY!: number;
  mouseIconSize: number = this.mouseService.mouseIconSize;
  mouseIconScale: number = 1;
  constructor(
      private scrollAnimationService: ScrollAnimationService,
      private elementRef: ElementRef,
      private renderer: Renderer2,
      private mouseService: MouseIconService,
      public loadService: LoadingService
  ) {
  }

  smoothScroll(): void {
    const element = this.elementRef.nativeElement.querySelector('#footer');
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }

  ngAfterViewInit() {
    const lineElements = this.elementRef.nativeElement.querySelectorAll('.line');
    lineElements.forEach((element: HTMLElement) => {
      const elementRef = new ElementRef(element);
      this.scrollAnimationService.observe(elementRef);
    });
    this.mouseService.mouseIconXChange.subscribe((x: number) => {
      this.mouseIconX = x;
    });

    this.mouseService.mouseIconYChange.subscribe((y: number) => {
      this.mouseIconY = y;
    });

    this.mouseService.mouseIconScaleChange.subscribe((scale: number) => {
      this.mouseIconScale = scale;
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY + window.pageYOffset;
    this.mouseService.updateMouseIconPosition(x, y);
  }

  onMouseEnter() {
    this.mouseService.onMouseEnter();
  }

  onMouseLeave() {
    this.mouseService.onMouseLeave();
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const opacity = Math.max(0.4, 1 - (scrollPosition / 1000));
    this.renderer.setStyle(this.homePage.nativeElement, 'opacity', opacity.toString());
  }
}
