import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {IProduct} from '../models/IProduct';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flyIn', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(6px)', opacity: .2 }),
        animate(300)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  addProductToCart(product: IProduct): void {
    this.snackBar.openFromComponent(SnackBarComponent, {duration: 3000});
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

@Component({
  template: `
    <div class="center">✅ Товар добавлен в корзину</div>
  `,
  styles: [`
    .center {text-align: center}
  `]
})
export class SnackBarComponent {}
