import { Pipe, PipeTransform } from '@angular/core';
import { ProductCategory } from '../../model/product-category';

@Pipe({
  name: 'productCategory'
})
export class ProductCategoryPipe implements PipeTransform {

  transform(value: ProductCategory, ...args: unknown[]): string {
    if(value === ProductCategory.Soup){
      return 'Soupe';
    }
    if(value === ProductCategory.Pie){
      return 'Tarte';
    }
    if(value === ProductCategory.Desert){
      return 'Dessert';
    }

    return 'Inconnu';
  }

}
