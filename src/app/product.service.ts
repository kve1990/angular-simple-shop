import { Injectable } from '@angular/core';
import products from '../assets/products.json';
import {IProduct} from './models/IProduct';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	public products$: BehaviorSubject<IProduct[]>;
	public cartProducts$: BehaviorSubject<IProduct[]>;

  constructor() {
  	this.products$ = new BehaviorSubject(products);
  	this.cartProducts$ = new BehaviorSubject([]);
  }

  addProductToCart(newProduct: IProduct) {
  	const cartProducts = this.cartProducts$.getValue();
  	const productExisted = cartProducts.find(product => product.id === newProduct.id);

  	if (productExisted) {
  		productExisted.count++;
  		this.cartProducts$.next([...cartProducts]);
  	} else {
  		newProduct = {...newProduct};
  		newProduct.count = 1;
  		this.cartProducts$.next([...cartProducts, newProduct]);
  	}
  }

  removeProductFromCart(removedProduct: IProduct) {
    const cartProducts = this.cartProducts$.getValue();
    const index = cartProducts.findIndex(product => product.id === removedProduct.id);

    if (cartProducts[index].count === 1) {
      cartProducts.splice(index, 1);
      this.cartProducts$.next([...cartProducts]);
    }
    if (cartProducts[index].count > 1) {
      cartProducts[index].count--;
      this.cartProducts$.next([...cartProducts]);
    }
  }
}
