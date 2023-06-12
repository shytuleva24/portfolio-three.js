import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollAnimationService {
  private elementsToAnimate: ElementRef[] = [];
  private animationClass = 'show-anim'; // Класс анимации для появления элемента

  constructor() {
    window.addEventListener('scroll', this.checkElementsVisibility.bind(this));
  }

  observe(element: ElementRef) {
    this.elementsToAnimate.push(element);
  }

  private checkElementsVisibility() {
    for (const element of this.elementsToAnimate) {
      if (this.isElementInViewport(element.nativeElement)) {
        this.addAnimationClass(element.nativeElement);
      }
    }
  }

  private isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private addAnimationClass(element: HTMLElement) {
    element.classList.add(this.animationClass);
    this.elementsToAnimate = this.elementsToAnimate.filter(el => el.nativeElement !== element);
  }
}
