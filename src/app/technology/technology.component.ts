import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

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
      title: 'Control Version',
      skills: ['GitHub', 'Webpack', 'Gulp'],
      isActive: false
    }
  ];

  currentBlockIndex = 0;
  maskStartHeight: string| number = '0px';
  maskActiveHeight: string| number  = '0px';
  maskEndHeight: string| number  = '100%';

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
    const blockElement = document.querySelector(`#block-${index}`);
    // if (blockElement){
    //   console.log(blockElement.offsetTop);
    // }
    const maskContainerHeight = this.maskContainerRef.nativeElement.clientHeight;
    const activeBlockHeight = this.blockElement.nativeElement.clientHeight;
    const maskStartHeight = activeBlockHeight * index + (40 * index);
    const maskEndHeight = maskContainerHeight - activeBlockHeight - maskStartHeight;

    this.maskStartHeight = maskStartHeight + 'px';
    this.maskActiveHeight = activeBlockHeight + 40 + 'px';
    this.maskEndHeight = maskEndHeight + 40 + 'px';

  //   const activeBlockElement = document.querySelector(`#block-${index}`);
  //   if (activeBlockElement) {
  //     const skillsElement = activeBlockElement.querySelector('.skill-items');
  //     const maskStartElement = document.querySelector('.mask-start');
  //     const maskActiveElement = document.querySelector('.mask-active');
  //     const maskEndElement = document.querySelector('.mask-end');
  //
  //     if (skillsElement && maskStartElement && maskActiveElement && maskEndElement) {
  //       const skillsHeight = skillsElement.clientHeight;
  //       const maskActiveHeight = activeBlockElement.clientHeight;
  //       const maskStartHeight = `${maskActiveHeight}px`;
  //       const maskEndHeight = `${skillsHeight - maskActiveHeight}px`;
  //
  //       this.maskStartHeight = maskStartHeight;
  //       this.maskActiveHeight = maskActiveHeight;
  //       this.maskEndHeight = maskEndHeight;
  //     }
  //   }
  }
}
