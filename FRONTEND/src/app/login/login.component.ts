import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { LoginService } from '../core/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('')
  });

  isConnected = false

  @Output() username = new EventEmitter<string>();
  constructor(private loginService: LoginService, private notifier: NotifierService) { }

  onSubmit() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (data) => {
        this.isConnected = true;
        console.log('loginComponent onSubmit',data['login']);
        this.username.emit(data['login']);
        this.notifier.notify('success', 'Vous êtes connecté');
      }
    );
  }


}
