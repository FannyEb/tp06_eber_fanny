import { Directive, ElementRef, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { PhoneNumberPipe } from '../../pipe/phone-number/phone-number.pipe';

@Directive({
  selector: '[appInputNumbers]'
})
export class InputNumbersDirective {

  @Input() appInputNumbers = "5"
  
  constructor(private el: ElementRef, private notifier: NotifierService) {
    this.el.nativeElement.onkeypress = (evt: { which: number; preventDefault: () => void; }) => {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
        notifier.notify('error', 'Dans ce champ, vous ne pouvez entrer que des chiffres');
      }
      if(this.el.nativeElement.value.length >= this.appInputNumbers){
        evt.preventDefault();
        notifier.notify('error', 'Vous ne pouvez pas entrer plus de ' + this.appInputNumbers + ' chiffres');
      }

      if(this.appInputNumbers=="18"){
        let pipe = new PhoneNumberPipe();
        this.el.nativeElement.value = pipe.transform(this.el.nativeElement.value);
      }
    }
    
 }

}
