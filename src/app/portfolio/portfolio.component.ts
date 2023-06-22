import {Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {MouseIconService} from "../services/mouse-icon.service";

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
    @ViewChildren('card') cards!: QueryList<ElementRef>;
    @ViewChild('cardsContainer') cardsContainer!: ElementRef;
    parallax = 0.5;
    x = 0
    projects = [
        {
            id: 'work 001',
            name: 'Startup',
            year: '2022',
            image: 'assets/work01.jpg',
            link: 'https://shytuleva24.github.io/startup/',
            skills: 'Sass/Pug Vanilla JS',
            maxWidth: '100%',
            height: '33vw',
            color: '#fff',
            animationClass: 'fade-in'
        },
        {
            id: 'work 002',
            name: 'Sea',
            year: '2022',
            image: 'assets/work02.jpg',
            link: 'https://shytuleva24.github.io/sea/',
            skills: 'Sass/Pug Bootstrap',
            maxWidth: '50vw',
            height: '57vw',
            color: '#000',
            animationClass: 'left'
        },
        {
            id: 'work 005',
            name: 'Repair design',
            year: '2022',
            image: 'assets/work03.jpg',
            link: 'https://shytuleva24.github.io/repair/',
            skills: 'Sass/Pug BEM jQuery',
            maxWidth: '26vw',
            height: '43vw',
            color: '#FFFFFF',
            animationClass: 'right'
        },
        {
            id: 'work 004',
            name: 'BringitUp',
            year: '2022',
            image: 'assets/work04.jpg',
            link: 'https://shutyleva.fun/',
            skills: 'JavaScript modules OOP',
            maxWidth: '66vw',
            height: '35vw',
            color: '#FFFFFF',
            animationClass: 'fade-in'
        },
        {
            id: 'work 005',
            name: 'Testing site',
            year: '2023',
            image: 'assets/work06.jpg',
            link: 'https://shytuleva24.github.io/portfolio-head/',
            skills: 'Angular Firebase',
            maxWidth: '41vw',
            height: '43vw',
            color: '#FFFFFF',
            animationClass: 'left'
        },
        {
            id: 'work 006',
            name: 'Three.js',
            year: '2023',
            image: 'assets/work05.jpg',
            link: 'https://shytuleva24.github.io/portfolio-head/',
            skills: 'Three.js Angular',
            maxWidth: '35vw',
            height: '55vw',
            color: '#FFFFFF',
            animationClass: 'right'
        }
    ];
    private scrollSubject = new Subject();
    constructor(private mouseService: MouseIconService) {
    }
    onMouseEnter() {
        this.mouseService.onMouseEnter();
    }

    onMouseLeave() {
        this.mouseService.onMouseLeave();
    }
    ngAfterViewInit() {
        this.calculateCardRotations();
        this.scrollSubject
            .pipe(debounceTime(500))
            .subscribe(() => {
                this.calculateCardRotations();
            });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.calculateCardRotations();
    }

    calculateCardRotations() {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.cards.forEach((card, i) => {
            const cardElement = card.nativeElement;
            const cardPosY = this.getElementPosition(cardElement);

            if (scrollPosition >= cardPosY - viewportHeight) {
                const scrollDelta = cardPosY - scrollPosition;
                const maxScrollDelta = viewportHeight;
                const posX = 50;
                const posY = 80;
                const posRotate = 3;

                if (cardElement.classList.contains('left')) {
                    let translateX = (scrollDelta / maxScrollDelta) * -posX;
                    let translateY = (scrollDelta / maxScrollDelta) * posY;
                    let rotation = (scrollDelta / maxScrollDelta) * posRotate;

                    translateX = Math.max(-posX, Math.min(0, translateX));
                    translateY = Math.max(0, Math.min(posY, translateY));
                    rotation = Math.max(0, Math.min(posRotate, rotation));

                    cardElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotation}deg)`;
                } else if (cardElement.classList.contains('right')) {
                    let translateX = (scrollDelta / maxScrollDelta) * posX;
                    let translateY = (scrollDelta / maxScrollDelta) * posY;
                    let rotation = (scrollDelta / maxScrollDelta) * -posRotate;

                    translateX = Math.max(0, Math.min(posX, translateX));
                    translateY = Math.max(0, Math.min(posY, translateY));
                    rotation = Math.max(-posRotate, Math.min(0, rotation));

                    cardElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotation}deg)`;
                } else if (cardElement.classList.contains('fade-in')) {
                    let translateX = (scrollDelta / maxScrollDelta) * 0;
                    let translateY = (scrollDelta / maxScrollDelta) * posY;
                    let rotation = (scrollDelta / maxScrollDelta) * 0;

                    translateY = Math.max(0, Math.min(posY, translateY));

                    cardElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotation}deg)`;
                }
            }
        });
    }

    getElementPosition(element: HTMLElement): number {
        let yPos = 0;
        while (element) {
            yPos += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent as HTMLElement;
        }
        return yPos;
    }
}
