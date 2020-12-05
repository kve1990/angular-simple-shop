import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IProduct} from './models/IProduct';
import products from '../assets/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products$: BehaviorSubject<IProduct[]>;
  public cartProducts$: BehaviorSubject<IProduct[]>;
  public total$: BehaviorSubject<number>;
  public countProduct$: BehaviorSubject<number>;

  constructor() {
    this.products$ = new BehaviorSubject(products);
    this.cartProducts$ = new BehaviorSubject([]);
    this.total$ = new BehaviorSubject(0);
    this.countProduct$ = new BehaviorSubject(0);
  }

  addProductToCart(newProduct: IProduct): void{
    const cartProducts = this.cartProducts$.getValue();
    const productExisted = cartProducts.find(product => product.id === newProduct.id);

    this.countProduct$.next(this.countProduct$.getValue() + 1);
    this.total$.next(this.total$.getValue() + newProduct.price);

    if (productExisted) {
      productExisted.count++;
      this.cartProducts$.next([...cartProducts]);
    } else {
      newProduct = {...newProduct};
      newProduct.count = 1;
      this.cartProducts$.next([...cartProducts, newProduct]);
    }
  }

  removeProductFromCart(removedProduct: IProduct): void{
    const cartProducts = this.cartProducts$.getValue();
    const index = cartProducts.findIndex(product => product.id === removedProduct.id);

    this.countProduct$.next(this.countProduct$.getValue() - 1);
    this.total$.next(this.total$.getValue() - removedProduct.price);

    if (cartProducts[index].count === 1) {
      cartProducts.splice(index, 1);
    } else if (cartProducts[index].count > 1) {
      cartProducts[index].count--;
    }

    this.cartProducts$.next([...cartProducts]);
  }
}
