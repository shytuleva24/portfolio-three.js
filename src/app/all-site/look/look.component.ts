import { Component } from '@angular/core';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookComponent {
  imageX: number = 0;
  imageY: number = 0;
  isHovered: boolean = false;
  transitionDuration: string = '0s'; // Длительность анимации по умолчанию

  moveImage(event: MouseEvent) {
    if (this.isHovered && window.innerWidth >= 650) {
      const marquee = event.currentTarget as HTMLElement;
      const marqueeRect = marquee.getBoundingClientRect();
      const mouseX = event.clientX - marqueeRect.left;
      const mouseY = event.clientY - marqueeRect.top;

      // Обновляем значения переменных
      this.imageX = mouseX;
      this.imageY = mouseY;
      this.transitionDuration = '0.3s'; // Устанавливаем длительность анимации
    }
  }


}
