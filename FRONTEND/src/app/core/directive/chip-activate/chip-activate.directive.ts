import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChipActivate]'
})
export class ChipActivateDirective {

  constructor(private el: ElementRef) { 
    //if chip is clicked change color
    this.el.nativeElement.style.backgroundColor = 'white';
    //white text
    this.el.nativeElement.style.color = 'black';
   
  }

  @HostListener('click') onClick() {
    if(this.el.nativeElement.style.color === 'white'){
      this.el.nativeElement.style.backgroundColor = 'white';
      this.el.nativeElement.style.color = 'black';
    }
    else{
      this.el.nativeElement.style.backgroundColor = '#673ab7';
      //white text
      this.el.nativeElement.style.color = 'white';
    }
  }

}
