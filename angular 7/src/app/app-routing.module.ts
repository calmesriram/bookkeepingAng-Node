import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BillComponent } from './bill/bill.component';
import { BooksComponent } from './books/books.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path:'bill',
    component:BillComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'books',
    component:BooksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'invoice',
    component:InvoiceComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
