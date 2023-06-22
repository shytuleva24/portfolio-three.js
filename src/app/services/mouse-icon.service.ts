import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MouseIconService {
    mouseIconX: number = 0;
    mouseIconY: number = 0;
    mouseIconSize: number = 100;
    mouseIconScale: number = 1;

    mouseIconXChange: Subject<number> = new Subject<number>();
    mouseIconYChange: Subject<number> = new Subject<number>();
    mouseIconScaleChange: Subject<number> = new Subject<number>();

    private mouseX: number = this.mouseIconX;
    private mouseY: number = this.mouseIconY;

    constructor() {
        this.updateCircle();
    }

    updateMouseIconPosition(x: number, y: number) {
        this.mouseX = x - (this.mouseIconSize / 2);
        this.mouseY = y - (this.mouseIconSize / 2);
    }

    private updateCircle() {
        const speed = 0.2;

        const dx = this.mouseX - this.mouseIconX;
        const dy = this.mouseY - this.mouseIconY;

        this.mouseIconX += dx * speed;
        this.mouseIconY += dy * speed;

        this.mouseIconXChange.next(this.mouseIconX);
        this.mouseIconYChange.next(this.mouseIconY);

        requestAnimationFrame(() => this.updateCircle());
    }

    onMouseMove(event: MouseEvent) {
        this.updateMouseIconPosition(event.clientX, event.clientY + window.pageYOffset);
    }

    onMouseEnter() {
        this.mouseIconScale = 0.3;
        this.mouseIconScaleChange.next(this.mouseIconScale);
    }

    onMouseLeave() {
        this.mouseIconScale = 1;
        this.mouseIconScaleChange.next(this.mouseIconScale);
    }
}
