import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[parallax]'
})
export class ParallaxDirective {
  // @Input('parallax') speed!: number; // Скорость эффекта параллакса
  //
  // private initialTopPosition!: number; // Начальная позиция элемента
  //
  // constructor(private el: ElementRef, private renderer: Renderer2) { }
  //
  // ngOnInit() {
  //   this.initialTopPosition = this.el.nativeElement.getBoundingClientRect().top + window.pageYOffset;
  // }
  //
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: Event) {
  //   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  //   const yPos = (this.initialTopPosition - scrollPosition) * this.speed;
  //   this.renderer.setStyle(this.el.nativeElement, 'transform', `translate(-10%, ${yPos}px)`);
  // }
}
