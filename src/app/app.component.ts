import {AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {ScrollAnimationService} from './services/scroll-animation.service';
import {MouseIconService} from "./services/mouse-icon.service";
import {animate, animateChild, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // animations: [
    //     trigger('bounceAnimation', [
    //         transition('* => *', [
    //             animate('0.5s', keyframes([
    //                 style({ transform: 'scale(0.8) translate3d({{ x }}px, {{ y }}px, 0)', offset: 0.5 }),
    //                 style({ transform: 'scale(1) translate3d({{ x }}px, {{ y }}px, 0)', offset: 1 })
    //             ]), { params: { x: 0, y: 0 } } as any)
    //         ]),
    //         animateChild()
    //     ])
    // ]
    // animations: [
    //     trigger('bounceAnimation', [
    //         transition('* => *', [
    //             animate('0.5s', keyframes([
    //                 style({
    //                     transform: 'scale({{ startScale }}) translate3d({{ startX }}px, {{ startY }}px, 0)',
    //                     offset: 0.5
    //                 }),
    //                 style({
    //                     transform: 'scale({{ endScale }}) translate3d({{ endX }}px, {{ endY }}px, 0)',
    //                     offset: 1
    //                 })
    //             ]))
    //         ])
    //     ])
    // ]


})
export class AppComponent implements AfterViewInit {
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
        private mouseService: MouseIconService
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
        // this.circleX = window.innerWidth / 2;
        // this.circleY = window.innerHeight / 2;
        // this.mouseX = this.circleX;
        // this.mouseY = this.circleY;
        // this.updateCircle();
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

    // onMouseMove(event: MouseEvent) {
    //   this.mouseX = event.clientX;
    //   this.mouseY = event.clientY + window.pageYOffset;
    //
    // }

    @HostListener('window:scroll')
    onScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const opacity = Math.max(0.4, 1 - (scrollPosition / 1000)); // Adjust the division value as needed
        this.renderer.setStyle(this.homePage.nativeElement, 'opacity', opacity.toString());
    }

    // updateCircle() {
    //   const dx = this.mouseX - this.circleX;
    //   const dy = this.mouseY - this.circleY;
    //
    //   this.circleX += dx * this.speed;
    //   this.circleY += dy * this.speed;
    //
    //   requestAnimationFrame(() => this.updateCircle());
    // }
}
