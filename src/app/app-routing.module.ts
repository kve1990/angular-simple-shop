import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

const routes: Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'category/:id', component: HomeComponent},
	{ path: 'cart', component: ShoppingCartComponent},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }