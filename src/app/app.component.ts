import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';
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
  public countProduct$: BehaviorSubject<number>;
  public total$: BehaviorSubject<number>;

  private mobileQueryListener: () => void;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 620px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void{
    this.products$ = this.productService.products$;
    this.total$ = this.productService.total$;
    this.countProduct$ = this.productService.countProduct$;
    this.categories$ = this.categoryService.categories$;
  }

  ngOnDestroy(): void{
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
