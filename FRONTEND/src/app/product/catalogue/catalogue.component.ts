import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { CatalogueService } from 'src/app/core/service/catalogue/catalogue.service';
import { ProductCategory } from '../../core/model/product-category';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/core/actions/shopping-actions';
import { catchError, debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products!: Observable<Product[]>;
  categories = [ProductCategory.Soup, ProductCategory.Pie, ProductCategory.Desert];

  filteredCategories: Set<ProductCategory> = new Set;
  filteredTerm: string = '';

  @ViewChild('search', { static: true })
  input!: ElementRef;

  searchField!: Observable<any>

  constructor(private catalogueService: CatalogueService, private store: Store) { }

  ngAfterViewInit(): void {
    this.searchField = fromEvent(this.input.nativeElement, 'keyup');
    this.products = this.searchField.pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),

      switchMap((search: string) => this.catalogueService.search(search).pipe(
        catchError((error: any) => {
          console.log(error);
          return [];
        })
      ))
    )
  }

  ngOnInit(): void {
    this.products = this.catalogueService.getAll();
  }

  removeCategory(category: ProductCategory): void {
    this.filteredCategories.delete(category);
  }

  addCategory(category: ProductCategory): void {
    this.filteredCategories.add(category);
  }

  categoryFilterUpdate(category: ProductCategory): void {
    if (this.filteredCategories.has(category)) {
      this.removeCategory(category);
    }
    else {
      this.addCategory(category);
    }

    this.getProductFiltered();
  }

  getProductFiltered(): void {
    this.products = this.catalogueService.getAll().pipe(
      map((products: Product[]) => products.filter(product => {
        let predicate = true;
        if (this.filteredTerm != '') {
          predicate = product.name.toLowerCase().includes(this.filteredTerm.toLowerCase());
        }
        if (this.filteredCategories.size > 0 && predicate) {
          predicate = this.filteredCategories.has(product.category);
        }
        return predicate;
      }
      ))
    );
  }

  addToShoppingList(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
