import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../../model/product';
import { ServiceBase } from '../service-base';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService extends ServiceBase {

  constructor(private http: HttpClient) { 
    super()
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"product");
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl+"product/"+id);
  }

  post(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl+"product", product);
  }

  put(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl+"product", product);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl+"product/"+id);
  }
  

}
