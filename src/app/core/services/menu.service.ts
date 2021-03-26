import {Injectable} from '@angular/core';
import {Menu} from '../../layout/model/menu';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MenuService {

  // BehaviorSubject with initalial value true for the sidebar
  private opened = new BehaviorSubject(true);
  // make subject as observable
  public opened$ = this.opened.asObservable().pipe(distinctUntilChanged());

  // create menu array
  menu: Menu = [
    {
      title: 'HOME',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
      // subMenu: [
      //   {
      //     title: 'Dummy Title',
      //     icon: 'search',
      //     color: '#1b87bf',
      //     link: '/test',
      //   },
      // ]
    },
  ];

  /**
   * Set BehaviorSubject value to true
   * @return void
   */
  openMenu(): void {
    this.opened.next(true);
  }

  /**
   * Set BehaviorSubject value to false
   * @return void
   */
  closeMenu(): void {
    this.opened.next(false);
  }

  /**
   * toggle menu from true-> false and false->true
   * @return void
   */
  toggleMenu(): void {
    const menuState = this.opened.value;
    this.opened.next(!menuState);
  }

}
