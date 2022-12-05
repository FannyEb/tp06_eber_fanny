import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
    { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }