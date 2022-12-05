import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { fromEvent, Observable } from 'rxjs';
import { ShoppingState } from '../core/state/shopping-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Select(ShoppingState.getNbProducts)
  numberProduct$!: Observable<number>;

  username: string | null = "";

  constructor(private router: Router) { }
  
  logout() {
    this.username = "";
    this.router.navigate(['/']);
  }

  getUsername($event : any) {
    console.log('header getUsername',$event);
    this.username = $event;
  }
}
