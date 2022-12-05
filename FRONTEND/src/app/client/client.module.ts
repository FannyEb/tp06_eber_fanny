import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { InputLettersDirective } from '../core/directive/input-letters/input-letters.directive';
import { InputNumbersDirective } from '../core/directive/input-numbers/input-numbers.directive';
import { PhoneNumberPipe } from '../core/pipe/phone-number/phone-number.pipe';
import { ClientInfoComponent } from './client-info/client-info.component';
import { FormComponent } from './form/form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientGuard } from '../core/guard/client.guard';

const routes: Routes = [
  //add client list
  { path: '', component: ClientListComponent, canActivate: [ClientGuard] },
  { path: 'add', component: FormComponent },
  { path: ':id', component: ClientInfoComponent },
];

@NgModule({
  declarations: [
    ClientInfoComponent,
    FormComponent,
    InputNumbersDirective,
    InputLettersDirective,
    PhoneNumberPipe,
    ClientListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [ ClientGuard],
})
export class ClientModule { }
