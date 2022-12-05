import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteProduct } from 'src/app/core/actions/shopping-actions';
import { Product } from 'src/app/core/model/product';
import { ShoppingState } from 'src/app/core/state/shopping-state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent{

  dataSource = this.store.select(state => state.products.products);
  @Select(ShoppingState.getTotalPrice)
  totalPrice$!: Observable<number>;

  displayedColumns: string[] = ['name', 'quantity', 'price', 'action-delete'];
  constructor(private store: Store) { 
  }

  deleteFromShoppingList(element : Product) {
    this.store.dispatch(new DeleteProduct(element));
  }
}
