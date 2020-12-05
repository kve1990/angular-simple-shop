import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import categories from '../assets/categories.json';
import {ICategory} from './models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories$: BehaviorSubject<ICategory[]>;
  public currentCategoy$: Subject<ICategory>;

  constructor() {
    this.categories$ = new BehaviorSubject(categories);
    this.currentCategoy$ = new Subject();
  }

  chooseCategory(category: ICategory): void{
    this.currentCategoy$.next(category);
  }

  resetCategory(): void{
    this.currentCategoy$.next(null);
  }
}
