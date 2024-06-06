import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  title: BehaviorSubject<string> = new BehaviorSubject<string>('');
  activeMenuSitebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  pageCurrent: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  pageSubMenuCurrent: BehaviorSubject<string> = new BehaviorSubject<string>('');
  headerHeight: BehaviorSubject<number> = new BehaviorSubject<number>(200);

  setPageCurrent(page: string) {
    console.log(page);
    this.pageCurrent.next(page);
  }

  getPageCurrent() {
    return this.pageCurrent.asObservable();
  }

  setPageSubMenuCurrent(subpage: string) {
    this.pageSubMenuCurrent.next(subpage);
  }

  getPageSubMenuCurrent() {
    return this.pageSubMenuCurrent.asObservable();
  }

  setHeaderHeight(height: number) {
    this.headerHeight.next(height);
  }

  getHeaderHeightCurrent() {
    return this.headerHeight.asObservable();
  }
}
