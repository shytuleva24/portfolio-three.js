import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[parallax]'
})
export class ParallaxDirective {
  @Input('parallax') speed!: number; // Скорость эффекта параллакса

  private initialTopPosition!: number; // Начальная позиция элемента

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.initialTopPosition = this.el.nativeElement.getBoundingClientRect().top + window.pageYOffset;
    this.renderer.setStyle(this.el.nativeElement, 'background-position', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'background-repeat', 'no-repeat');
    // this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const invertedScrollPercentage = (scrollPosition - this.initialTopPosition) / (this.el.nativeElement.offsetHeight + window.innerHeight);
    let bgPositionY = invertedScrollPercentage * 100 * this.speed;

    // Ограничиваем значение bgPositionY в диапазоне от 0 до 100
    bgPositionY = Math.max(0, Math.min(100, bgPositionY));

    const bgPosition = `center ${bgPositionY}%`;

    this.renderer.setStyle(this.el.nativeElement, 'background-position', bgPosition);
  }

}
