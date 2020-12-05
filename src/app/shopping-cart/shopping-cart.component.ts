import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';
import {ProductService} from '../product.service';
import {IProduct} from '../models/IProduct';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public mobileQuery: MediaQueryList;
  public displayedColumns: string[] = ['name', 'price', 'count', 'totalProductCount'];
  public cartProducts$: BehaviorSubject<IProduct[]>;
  public total$: BehaviorSubject<number>;

  private mobileQueryListener: () => void;

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 620px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.cartProducts$ = this.productService.cartProducts$;
    this.total$ = this.productService.total$;
  }

  ngOnDestroy(): void{
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  addProductToCart(product: IProduct): void {
    this.productService.addProductToCart(product);
  }

  removeProductFromCart(product: IProduct): void {
    this.productService.removeProductFromCart(product);
  }
}
