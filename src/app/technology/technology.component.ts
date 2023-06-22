import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MouseIconService} from "../services/mouse-icon.service";

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
  @ViewChild('maskContainer') maskContainerRef!: ElementRef;
  @ViewChild('blockElement') blockElement!: ElementRef;

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
      title: 'Development tools',
      skills: ['GitHub', 'Webpack', 'Gulp'],
      isActive: false
    }
  ];

  currentBlockIndex = 0;
  maskHeight: string| number = '0px';
  maskActiveHeight: string| number  = '0px';
  constructor(private mouseService: MouseIconService) {
  }
  ngOnInit() {
    this.activateBlock(this.currentBlockIndex);
  }
  onMouseEnter() {
    this.mouseService.onMouseEnter();
  }

  onMouseLeave() {
    this.mouseService.onMouseLeave();
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
          this.calculateMaskHeight(index);
        }
      }
    });
  }

  activateBlock(index: number) {
    this.blocks.forEach((block, i) => {
      block.isActive = i === index;
    });
  }

  calculateMaskHeight(index: number) {
    const activeBlockHeight = this.blockElement.nativeElement.clientHeight;
    const maskStartHeight = activeBlockHeight * index;

    this.maskHeight = activeBlockHeight + 'px';
    this.maskActiveHeight = maskStartHeight + 'px';
  }
}
