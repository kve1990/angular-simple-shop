import { Component, OnInit, OnDestroy } from '@angular/core';
import {IProduct} from './models/IProduct';
import {ICategory} from './models/ICategory';
import {ProductService} from './product.service';
import {CategoryService} from './category.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  public categories$: BehaviorSubject<ICategory[]>;
  public products$: BehaviorSubject<IProduct[]>;
  public countProduct: number = 0;
  public total: number = 0;
  private productsSubscription: Subscription;

  constructor(
  	private router: Router,
  	private productService: ProductService,
  	private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.router.navigate(['']);
  	this.products$ = this.productService.products$;
  	this.categories$ = this.categoryService.categories$;
    this.productsSubscription = this.productService.cartProducts$.subscribe(products => {
      this.countProduct = products.reduce((buffer, item) => {
        return item ? buffer + item.count : buffer;
      }, 0);
      this.total = products.reduce((buffer, item) => {
        return buffer + item.count * item.price;
      }, 0);
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
