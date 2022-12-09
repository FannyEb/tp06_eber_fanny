import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap } from 'rxjs';
import { CatalogueService } from '../core/service/catalogue/catalogue.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  model: Observable<any> = new Observable();
  searchField$: Observable<any> = new Observable();
  @ViewChild('input', { static: true })
  input!: ElementRef;
  
  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, `keyup`);
    this.model = this.searchField$.pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term) =>
        this.catalogueService.search(term)
      )
    );
  }

  redirectDetails(id: number): void {
    this.router.navigate([`/product/${id}`]);
    this.model = new Observable();
  }
}
