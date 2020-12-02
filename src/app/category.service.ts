import { Injectable } from '@angular/core';
import categories from '../assets/categories.json';
import {ICategory} from './models/ICategory';
import {Subject, BehaviorSubject} from 'rxjs';

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

  chooseCategory(category: ICategory) {
  	this.currentCategoy$.next(category);
  }

  resetCategory() {
  	this.currentCategoy$.next(null);
  }
}
