import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  projects = [
    {
      id: 'work001',
      name: 'Startup',
      year: '2022',
      image: 'assets/work01.jpg',
      link: 'https://shytuleva24.github.io/startup/',
      skills: 'Sass/Pug Vanilla JS',
      maxWidth: '100%',
      color: '#fff',
      animationClass: 'fade-in'
    },
    {
      id: 'work005',
      name: 'Repair design',
      year: '2022',
      image: 'assets/work03.jpg',
      link: 'https://shytuleva24.github.io/repair/',
      skills: 'Sass/Pug BEM jQuery',
      maxWidth: '45%',
      color: '#FFFFFF',
      animationClass: 'left'
    },
    {
      id: 'work002',
      name: 'Sea',
      year: '2022',
      image: 'assets/work02.jpg',
      link: 'https://shytuleva24.github.io/sea/',
      skills: 'Sass/Pug Bootstrap',
      maxWidth: '45%',
      color: '#000',
      animationClass: 'right'
    },
    {
      id: 'work004',
      name: 'BringitUp',
      year: '2022',
      image: 'assets/work04.jpg',
      link: 'https://shutyleva.fun/',
      skills: 'JavaScript modules OOP',
      maxWidth: '75%',
      color: '#FFFFFF',
      animationClass: 'fade-in'
    },
    {
      id: 'work005',
      name: 'Testing site',
      year: '2023',
      image: 'assets/work06.jpg',
      link: 'https://shytuleva24.github.io/portfolio-head/',
      skills: 'Angular Firebase',
      maxWidth: '45%',
      color: '#FFFFFF',
      animationClass: 'left'
    },
    {
      id: 'work006',
      name: 'Three.js',
      year: '2023',
      image: 'assets/work05.jpg',
      link: 'https://portfolio-testing-e7cfe.web.app/',
      skills: 'Three.js Angular',
      maxWidth: '45%',
      color: '#FFFFFF',
      animationClass: 'right'
    }
  ];

}
