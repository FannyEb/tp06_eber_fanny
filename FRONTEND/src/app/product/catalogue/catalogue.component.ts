import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AddProduct } from 'src/app/core/actions/shopping-actions';
import { Product } from 'src/app/core/model/product';
import { CatalogueService } from 'src/app/core/service/catalogue/catalogue.service';
import { ProductCategory } from '../../core/model/product-category';

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

  constructor(private catalogueService: CatalogueService, private store: Store) { }

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
    this.products = this.catalogueService.search(this.filteredTerm).pipe(
      map((products: Product[]) => products.filter(product => {
        let predicate = true;
        if (this.filteredCategories.size > 0) {
          predicate = this.filteredCategories.has(product.category);
        }
        return predicate;
      }
      ))
    )
  }

  addToShoppingList(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
