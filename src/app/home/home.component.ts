import { Component, OnInit, OnDestroy } from '@angular/core';
import {IProduct} from '../models/IProduct';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

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

  ngOnInit() {
    this.products = [...this.productService.products$.getValue()];

    this. routeSubscription = this.route.params.subscribe(params => {
      let products = [...this.productService.products$.getValue()]
      if (params.id) {
        this.products = products.filter(product => product.category == params.id)
      } else {
        this.products = products;
      }
    });
  }

  ngOnDestroy() {
    this. routeSubscription.unsubscribe();
  }

}
