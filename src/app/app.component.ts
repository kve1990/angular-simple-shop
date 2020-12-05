import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IProduct} from './models/IProduct';
import {ICategory} from './models/ICategory';
import {ProductService} from './product.service';
import {CategoryService} from './category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  public mobileQuery: MediaQueryList;
  public categories$: BehaviorSubject<ICategory[]>;
  public products$: BehaviorSubject<IProduct[]>;
  public countProduct: number;
  public total: number;

  private productsSubscription: Subscription;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 620px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void{
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

  ngOnDestroy(): void{
    this.productsSubscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
