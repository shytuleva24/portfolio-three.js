import { Component, HostListener, OnInit } from '@angular/core';

interface Block {
  title: string;
  skills: string[];
  isActive: boolean;
}

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  blocks: Block[] = [
    {
      title: 'Markup',
      skills: ['HTML', 'CSS', 'SASS', 'SCSS', 'PUG', 'BEM'],
      isActive: false
    },
    {
      title: 'UI-Frameworks',
      skills: ['Bootstrap 3', 'Bootstrap 4', 'Bootstrap 5'],
      isActive: false
    },
    {
      title: 'JavaScript',
      skills: ['Angular', 'Vanilla JS', 'jQuery'],
      isActive: false
    },
    {
      title: 'Control Version',
      skills: ['GitHub', 'Webpack', 'Gulp'],
      isActive: false
    }
  ];

  currentBlockIndex = 0;

  ngOnInit() {
    this.activateBlock(this.currentBlockIndex);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    this.blocks.forEach((block, index) => {
      const blockElement = document.querySelector(`#block-${index}`);
      if (blockElement) {
        const blockOffset = blockElement.getBoundingClientRect().top + scrollPosition;
        const isBlockVisible = blockOffset - windowHeight / 2 <= scrollPosition;

        if (isBlockVisible && !block.isActive) {
          this.activateBlock(index);
        }
      }
    });
  }

  activateBlock(index: number) {
    this.blocks.forEach((block, i) => {
      block.isActive = i === index;
    });
  }
}
