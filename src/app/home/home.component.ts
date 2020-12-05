import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {IProduct} from '../models/IProduct';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  addProductToCart(product: IProduct): void {
    this.productService.addProductToCart(product);
  }

  ngOnInit(): void{
    this.products = [...this.productService.products$.getValue()];

    this. routeSubscription = this.route.params
      .pipe(
        pluck('id')
      )
      .subscribe(id => {
        const products = [...this.productService.products$.getValue()];
        this.products = id ? products.filter(product => product.category === +id) : products;
      });
  }

  ngOnDestroy(): void{
    this. routeSubscription.unsubscribe();
  }

}
