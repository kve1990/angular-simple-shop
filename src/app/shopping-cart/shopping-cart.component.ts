import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductService} from '../product.service';
import {IProduct} from '../models/IProduct';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'price', 'count', 'totalProductCount'];
  public cartProducts$: BehaviorSubject<IProduct[]>;
  public total$: BehaviorSubject<number>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartProducts$ = this.productService.cartProducts$;
    this.total$ = this.productService.total$;
  }

  addProductToCart(product: IProduct): void {
    this.productService.addProductToCart(product);
  }

  removeProductFromCart(product: IProduct): void {
    this.productService.removeProductFromCart(product);
  }
}
