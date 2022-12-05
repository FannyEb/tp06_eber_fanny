import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/core/actions/shopping-actions';
import { Product } from 'src/app/core/model/product';
import { CatalogueService } from 'src/app/core/service/catalogue/catalogue.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product | undefined;
  constructor(private productService: CatalogueService, private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.productService.get(this.route.snapshot.params['id']).subscribe((data: Product) => {
      this.product = data;
    });
  }

  addToShoppingList(product: Product): void{
    this.store.dispatch(new AddProduct(product));
  }

}
