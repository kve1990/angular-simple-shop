import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from '../product.service';
import {IProduct} from '../models/IProduct';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['name', 'price', 'count', 'totalProductCount'];
  public dataSource: IProduct[];
  public total: number;
  private cartProductsSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartProductsSubscription = this.productService.cartProducts$.subscribe(products => {
      this.dataSource = products;
      this.total = products.reduce((buffer, item) => {
        return buffer + item.count * item.price;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.cartProductsSubscription.unsubscribe();
  }

  addProductToCart(product: IProduct): void {
    this.productService.addProductToCart(product);
  }

  removeProductFromCart(product: IProduct): void {
    this.productService.removeProductFromCart(product);
  }

}
