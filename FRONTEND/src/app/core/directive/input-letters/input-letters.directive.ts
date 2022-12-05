import { Directive, ElementRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Directive({
  selector: '[appInputLetters]'
})
export class InputLettersDirective {

  constructor(private el: ElementRef, private notifier: NotifierService) {
    this.el.nativeElement.onkeypress = (evt: { which: number; preventDefault: () => void; }) => {
      if (evt.which < 65 || evt.which > 122) {
        evt.preventDefault();
        notifier.notify('error', 'Dans ce champ, vous ne pouvez entrer que des lettres');
      }
    }
    
 }

}
